"use client"
import React, { useState, useMemo } from "react"
import { Search, Sparkles, Filter, X } from "lucide-react"
import { ALL_PRODUCTS } from "@/lib/DataALLProducts"
import ProductCard from "@/components/Products/ProductCard"

interface ImageVariants {
  thumbnail?: string;
  medium?: string;
  large?: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  has_variants: boolean;
  slug: string;
  sku: string;
  image: string;
  image_variants?: ImageVariants;
  sold_amount: number;
  review: number;
  retail_price: string;
  discount_price: string;
  has_discount: boolean;
  sale_price: string;
  stock_qty: number;
  in_stock: boolean;
  stock_availability: boolean;
  weight: number;
  discount?: string;
}

// Unified, robust price parser
function parsePrice(value: string | undefined): number {
  if (!value) return 0;
  const normalized = value.replace(/,/g, "").replace(/[^\d.-]/g, "");
  const num = Number(normalized);
  return Number.isFinite(num) ? num : 0;
}

// Safely cast and filter out any potential undefined items from ALL_PRODUCTS
const VALID_PRODUCTS: Product[] = (ALL_PRODUCTS as (Product | undefined)[]).filter(
  (p): p is Product => p !== undefined
);

export default function ProductsPage() {
  // Filter States
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<number>(8000);
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mobile Filter Drawer Toggle State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract Unique Dynamic Options for Filters
  const availableBrands = useMemo(() => {
    const counts: Record<string, number> = {};
    VALID_PRODUCTS.forEach(p => {
      if (p.brand) {
        counts[p.brand] = (counts[p.brand] || 0) + 1;
      }
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, []);

  const availableCategories = useMemo(() => {
    const counts: Record<string, number> = {};
    VALID_PRODUCTS.forEach(p => {
      if (p.category) {
        p.category.split(',').forEach(cat => {
          const trimmed = cat.trim();
          if (trimmed) {
            counts[trimmed] = (counts[trimmed] || 0) + 1;
          }
        });
      }
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, []);

  // Filter & Sort Logic with correct calculation
  const filteredProducts = useMemo(() => {
    let result = VALID_PRODUCTS.filter(product => {
      // Search Query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name?.toLowerCase().includes(query);
        const matchesBrand = product.brand?.toLowerCase().includes(query);
        const matchesCat = product.category?.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCat) return false;
      }

      // Brand Filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // Category / Product Type Filter
      if (selectedCategories.length > 0) {
        const prodCategories = product.category ? product.category.split(',').map(c => c.trim()) : [];
        const hasMatchingCategory = selectedCategories.some(cat => prodCategories.includes(cat));
        if (!hasMatchingCategory) return false;
      }

      // Availability Filter
      if (inStockOnly && !product.in_stock) return false;
      if (onSaleOnly && !product.has_discount) return false;

      // Price Range Filter
      const currentPrice = parsePrice(product.sale_price);
      if (currentPrice > priceRange) return false;

      return true;
    });

    // Sorting Logic
    return result.sort((a, b) => {
      if (sortBy === "popular") return (b.sold_amount || 0) - (a.sold_amount || 0);
      if (sortBy === "latest") return (b.id || 0) - (a.id || 0);
      if (sortBy === "low-high") return parsePrice(a.sale_price) - parsePrice(b.sale_price);
      if (sortBy === "high-low") return parsePrice(b.sale_price) - parsePrice(a.sale_price);
      return 0;
    });
  }, [selectedBrands, selectedCategories, inStockOnly, onSaleOnly, priceRange, sortBy, searchQuery]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setPriceRange(8000);
    setSearchQuery("");
  };

  // Reusable Filter Content Component
  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
        <div className="flex items-center gap-2 font-bold text-neutral-900">
          <Filter size={16} className="text-pink-600" />
          <span>Filters</span>
        </div>
        {(selectedBrands.length > 0 || selectedCategories.length > 0 || inStockOnly || onSaleOnly || searchQuery) && (
          <button 
            onClick={clearAllFilters}
            className="text-xs text-pink-600 font-semibold hover:underline flex items-center gap-1"
          >
            <X size={12} /> Clear all
          </button>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">Max Price: ৳ {priceRange}</label>
        <input 
          type="range" 
          min="500" 
          max="8000" 
          step="100"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-pink-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-neutral-400">
          <span>৳ 500</span>
          <span>৳ 8,000</span>
        </div>
      </div>

      {/* Availability Filter */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">Availability</h3>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
            <input 
              type="checkbox" 
              checked={inStockOnly} 
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded accent-pink-600 w-4 h-4"
            />
            <span>In Stock</span>
          </label>
          <label className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
            <input 
              type="checkbox" 
              checked={onSaleOnly} 
              onChange={(e) => setOnSaleOnly(e.target.checked)}
              className="rounded accent-pink-600 w-4 h-4"
            />
            <span>On Sale</span>
          </label>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">Brand</h3>
        <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 no-scrollbar">
          {availableBrands.map(([brand, count]) => (
            <label key={brand} className="flex items-center justify-between text-sm text-neutral-700 cursor-pointer hover:text-pink-600">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="rounded accent-pink-600 w-4 h-4"
                />
                <span>{brand}</span>
              </div>
              <span className="text-xs text-neutral-400">({count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Product Type / Category Filter */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">Product Type</h3>
        <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 no-scrollbar">
          {availableCategories.map(([cat, count]) => (
            <label key={cat} className="flex items-center justify-between text-sm text-neutral-700 cursor-pointer hover:text-pink-600">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="rounded accent-pink-600 w-4 h-4"
                />
                <span className="truncate max-w-[180px]">{cat}</span>
              </div>
              <span className="text-xs text-neutral-400">({count})</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top Banner / Search bar Header */}
      <div className="bg-neutral-50 border-b border-neutral-100 py-6 mb-6">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-pink-600 text-xs font-bold uppercase tracking-widest mb-1">
              <Sparkles size={14} className="animate-pulse" />
              <span>Cosmetics & Skincare Collection</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-neutral-900 uppercase">
              All Products ({filteredProducts.length})
            </h1>
          </div>
          
          {/* Active Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search products, brands..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-neutral-200 rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-pink-500 shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-16">
        
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-4 flex items-center justify-between">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold px-4 py-2 rounded-xl transition-all"
          >
            <Filter size={14} className="text-pink-600" />
            <span>Filter Products</span>
            {(selectedBrands.length > 0 || selectedCategories.length > 0 || inStockOnly || onSaleOnly) && (
              <span className="w-5 h-5 bg-pink-600 text-white rounded-full text-[10px] flex items-center justify-center">
                {selectedBrands.length + selectedCategories.length + (inStockOnly ? 1 : 0) + (onSaleOnly ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Filter Drawer Modal */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-xl p-6 overflow-y-auto z-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-4">
                  <h2 className="font-bold text-neutral-900">Filters</h2>
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 rounded-full text-neutral-500 hover:bg-neutral-100"
                  >
                    <X size={18} />
                  </button>
                </div>
                <FilterContent />
              </div>
              <div className="pt-4 border-t border-neutral-100 mt-4">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-pink-600 text-white font-bold py-2.5 rounded-xl text-sm shadow-md"
                >
                  Apply Filters ({filteredProducts.length} Results)
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-neutral-50/50 p-4 rounded-2xl border border-neutral-100 h-fit">
            <FilterContent />
          </aside>

          {/* Product Grid Section */}
          <main className="lg:col-span-3 space-y-4">
            
            {/* Sorting Header Bar */}
            <div className="flex items-center justify-between bg-neutral-50/50 p-3 rounded-xl border border-neutral-100">
              <div className="text-xs text-neutral-500 font-medium">
                Showing <span className="font-bold text-neutral-900">{filteredProducts.length}</span> products
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500 hidden sm:inline">Sort by:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-neutral-200 text-xs font-semibold rounded-lg px-3 py-1.5 focus:outline-none focus:border-pink-500 cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="latest">Latest</option>
                  <option value="low-high">Price: Low → High</option>
                  <option value="high-low">Price: High → Low</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 bg-neutral-50 rounded-2xl border border-dashed border-neutral-200 text-center">
                <p className="text-neutral-600 font-medium mb-2">No products found matching your filters.</p>
                <button 
                  onClick={clearAllFilters}
                  className="text-xs bg-pink-600 text-white font-semibold px-4 py-2 rounded-full shadow-md hover:bg-pink-700 transition-all"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {filteredProducts.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </main>

        </div>
      </div>
    </div>
  )
}