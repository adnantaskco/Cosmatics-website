"use client"
import React, { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Star, ShoppingCart, Search, Heart, Sparkles, Filter, X } from "lucide-react"
import { ALL_PRODUCTS } from "@/lib/DataALLProducts"

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

export default function ProductsPage() {
  // Filter States
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<number>(8000);
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  
  // Mobile Filter Drawer Toggle State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract Unique Dynamic Options for Sidebar Filters
  const availableBrands = useMemo(() => {
    const counts: Record<string, number> = {};
    ALL_PRODUCTS.forEach(p => {
      counts[p.brand] = (counts[p.brand] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, []);

  const availableCategories = useMemo(() => {
    const counts: Record<string, number> = {};
    ALL_PRODUCTS.forEach(p => {
      p.category.split(',').forEach(cat => {
        const trimmed = cat.trim();
        counts[trimmed] = (counts[trimmed] || 0) + 1;
      });
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, []);

  // Helper to parse price string like "1,650 ৳" to number
  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^0-9]/g, ""), 10) || 0;
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = ALL_PRODUCTS.filter(product => {
      // Search Query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCat) return false;
      }

      // Brand Filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // Category / Product Type Filter
      if (selectedCategories.length > 0) {
        const prodCategories = product.category.split(',').map(c => c.trim());
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
      if (sortBy === "popular") return b.sold_amount - a.sold_amount;
      if (sortBy === "latest") return b.id - a.id;
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

  // Reusable Filter Content Component to avoid duplication between Sidebar & Mobile Drawer
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
        <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
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
        <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
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
              <span className="text-xs font-semibold text-neutral-500">
                Showing <strong className="text-neutral-900">{filteredProducts.length}</strong> products
              </span>
              
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
                {filteredProducts.map((product: Product) => {
                  const hasHoverImage = product.image_variants?.medium && 
                                        product.image_variants.medium !== "null" && 
                                        product.image_variants.medium.trim() !== "";

                  const isTouched = activeCardId === product.id;

                  return (
                    <Card
                      key={product.id}
                      onClick={() => setActiveCardId(isTouched ? null : product.id)}
                      className="group relative bg-white rounded-2xl border border-neutral-100/80 shadow-sm hover:shadow-xl hover:border-pink-200 flex flex-col justify-between p-2.5 md:p-3.5 transition-all duration-300 overflow-hidden cursor-pointer"
                    >
                      <div>
                        {/* Product Image & Floating Action Hub */}
                        <div className="relative w-full aspect-square bg-gradient-to-b from-neutral-50/80 to-neutral-100/50 rounded-xl overflow-hidden mb-2">
                          
                          {/* Discount Badge */}
                          {product.has_discount && product.discount && (
                            <span className="absolute top-2 left-2 z-20 bg-gradient-to-r from-pink-600 to-rose-500 text-white text-[9px] md:text-[10px] font-extrabold tracking-wider px-1.5 py-0.5 rounded-full shadow-md shadow-pink-500/20">
                              {product.discount}
                            </span>
                          )}

                          {/* Quick Wishlist Icon */}
                          <button 
                            aria-label="Add to wishlist"
                            className={`absolute top-2 right-2 z-20 w-7 h-7 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-neutral-500 hover:text-pink-600 hover:bg-white shadow-sm transition-all ${
                              isTouched ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`}
                          >
                            <Search size={12} />
                          </button>
                          
                          {/* Default Image */}
                          <img
                            src={product.image}
                            alt={product.name}
                            className={`w-full h-full object-cover transition-all duration-500 ${
                              hasHoverImage ? (isTouched ? "opacity-0" : "group-hover:opacity-0") : ""
                            } group-hover:scale-105`}
                          />

                          {/* Hover Image */}
                          {hasHoverImage && product.image_variants?.medium && (
                            <img
                              src={product.image_variants.medium}
                              alt={`${product.name} hover`}
                              className={`w-full h-full object-cover absolute inset-0 transition-all duration-500 group-hover:scale-105 pointer-events-none ${
                                isTouched ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                              }`}
                            />
                          )}

                          {/* Floating Action Buttons Hub */}
                          <div className={`absolute inset-x-0 bottom-2 flex items-center justify-center gap-1.5 transition-all duration-300 z-20 px-2 ${
                            isTouched ? "opacity-100 transform translate-y-0" : "opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                          }`}>
                            <button 
                              onClick={(e) => { e.stopPropagation(); alert(`Added to cart: ${product.name}`); }}
                              aria-label="Add to cart" 
                              className="w-7 h-7 md:w-9 md:h-9 bg-white/95 backdrop-blur text-neutral-800 hover:bg-rose-600 hover:text-white rounded-full flex items-center justify-center shadow-md transition-all transform hover:scale-105"
                            >
                              <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); alert(`Quick view: ${product.name}`); }}
                              aria-label="Quick search view" 
                              className="w-7 h-7 md:w-9 md:h-9 bg-white/95 backdrop-blur text-neutral-800 hover:bg-rose-600 hover:text-white rounded-full flex items-center justify-center shadow-md transition-all transform hover:scale-105"
                            >
                              <Heart className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-0.5 md:space-y-1 text-left px-0.5">
                          <p className="text-[9px] md:text-xs text-pink-600 font-semibold tracking-wider uppercase truncate">
                            {product.brand} • {product.category.split(',')[0]}
                          </p>

                          <h3 className="text-xs md:text-sm font-bold text-neutral-800 line-clamp-2 leading-snug hover:text-pink-600 transition-colors">
                            <a href={`/product/${product.slug}`}>{product.name}</a>
                          </h3>

                          <div className="flex items-center gap-1 pt-0.5">
                            <div className="flex text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-2.5 h-2.5 md:w-3 md:h-3 ${
                                    i < Math.floor(product.review)
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-neutral-200"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-[9px] md:text-[10px] text-neutral-400 font-medium">({product.review})</span>
                          </div>

                          <div className="flex items-center gap-1.5 pt-0.5">
                            <span className="text-xs md:text-sm font-bold text-neutral-900">
                              {product.sale_price}
                            </span>
                            {product.retail_price && (
                              <span className="text-[10px] md:text-[11px] text-neutral-400 line-through font-normal">
                                {product.retail_price}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            )}

          </main>

        </div>
      </div>
    </div>
  )
}