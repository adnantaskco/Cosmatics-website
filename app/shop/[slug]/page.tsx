"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  rating: number;
  originalPrice: string;
  currentPrice: string;
  discount: string;
  numericPrice: number;
}

const initialProducts: Product[] = [
  {
    id: "176",
    name: "Cosrx – Acne Pimple Master Patch",
    category: "Sleeping Mask, K-Beauty, Viral Picks",
    brand: "Cosrx",
    rating: 4.54,
    originalPrice: "420 ৳",
    currentPrice: "290 ৳",
    discount: "-31%",
    numericPrice: 290,
  },
  {
    id: "178",
    name: "Aplb – Glutathione Niacinamide Beauty Tablet 500mg X 30 Tablets",
    category: "Supplement, K-Beauty, Viral Picks",
    brand: "Aplb",
    rating: 4.00,
    originalPrice: "1,100 ৳",
    currentPrice: "880 ৳",
    discount: "-20%",
    numericPrice: 880,
  },
  {
    id: "180",
    name: "Ordinary – Niacinamide 10% + Zinc 1% – 30ml",
    category: "Skin Care, Face Serum",
    brand: "Ordinary",
    rating: 4.71,
    originalPrice: "1,530 ৳",
    currentPrice: "1,220 ৳",
    discount: "-20%",
    numericPrice: 1220,
  },
  {
    id: "182",
    name: "Cosrx – Advanced Snail 96 Mucin Power Essence – 100ml",
    category: "Essence, K-Beauty, Viral Picks",
    brand: "Cosrx",
    rating: 4.46,
    originalPrice: "1,880 ৳",
    currentPrice: "1,540 ৳",
    discount: "-18%",
    numericPrice: 1540,
  },
  {
    id: "183",
    name: "Beauty of Joseon – Relief Sun Aqua-Fresh : Rice + B5 Spf50+ Pa++++ – 50ml",
    category: "Sunscreen, K-Beauty, Viral Picks",
    brand: "Beauty Of Joseon",
    rating: 5.00,
    originalPrice: "1,850 ৳",
    currentPrice: "1,480 ৳",
    discount: "-20%",
    numericPrice: 1480,
  },
  {
    id: "185",
    name: "3W CLINIC – Intensive UV Sunblock Cream SPF50 PA+++ – 70ml",
    category: "Sunscreen, K-Beauty, Viral Picks",
    brand: "3W CLINIC",
    rating: 4.46,
    originalPrice: "680 ৳",
    currentPrice: "480 ৳",
    discount: "-29%",
    numericPrice: 480,
  },
];

const categories = [
  { name: "Accessories", count: 110 },
  { name: "CeraVe", count: 1 },
  { name: "Eyes", count: 326 },
  { name: "Face", count: 477 },
  { name: "Flash Sale", count: 74 },
  { name: "Hair", count: 115 },
  { name: "K-Beauty", count: 578 },
  { name: "Lips", count: 229 },
  { name: "Skin Care", count: 941 },
];

const brands = [
  "3W CLINIC",
  "A313",
  "Abib",
  "Anua",
  "Beauty Of Joseon",
  "CeraVe",
  "Cosrx",
  "Missha",
  "Ordinary",
  "Paula's Choice",
];

export default function ShopSlugPage({
  params,
}: {
  params: { slug?: string };
}) {
  const slug = params?.slug || "glass-skin-serums";
  const formattedTitle = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  // Filter & Sort States
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [brandSearch, setBrandSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [appliedMin, setAppliedMin] = useState<number>(0);
  const [appliedMax, setAppliedMax] = useState<number>(20000);
  const [sortBy, setSortBy] = useState("Sort by popularity");
  const [visibleCount, setVisibleCount] = useState(12);

  // Handle Price Filter Submit
  const handlePriceFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedMin(minPrice ? parseFloat(minPrice) : 0);
    setAppliedMax(maxPrice ? parseFloat(maxPrice) : 20000);
  };

  // Filter and Sort Products Logic
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        // Category filter
        if (selectedCategory && !product.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
          return false;
        }
        // Brand filter
        if (selectedBrand && product.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
          return false;
        }
        // Price range filter
        if (product.numericPrice < appliedMin || product.numericPrice > appliedMax) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "Sort by price: low to high") return a.numericPrice - b.numericPrice;
        if (sortBy === "Sort by price: high to low") return b.numericPrice - a.numericPrice;
        if (sortBy === "Sort by average rating") return b.rating - a.rating;
        return 0; // Default popularity
      });
  }, [selectedCategory, selectedBrand, appliedMin, appliedMax, sortBy]);

  // Filter brand list based on search input
  const filteredBrands = brands.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen text-gray-800">
      {/* Top Bar / Header Breadcrumb Area */}
      <div className="border-b bg-gray-50 py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <h1 className="text-2xl font-bold uppercase tracking-wide">
            {formattedTitle}
          </h1>
          <div className="text-sm text-gray-500">
            <Link href="/" className="hover:text-red-600">Home</Link> /{" "}
            <span className="capitalize">{formattedTitle}</span> / Page 5
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <aside className="space-y-6 lg:border-r lg:pr-8">
          {/* Price Filter */}
          <div>
            <h3 className="font-bold text-sm tracking-wider mb-3">FILTER BY PRICE</h3>
            <form onSubmit={handlePriceFilter} className="space-y-3">
              <div className="flex gap-2 items-center">
                <input 
                  type="number" 
                  placeholder="Min price" 
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full border p-2 text-sm rounded focus:outline-none focus:border-red-500" 
                />
                <span>—</span>
                <input 
                  type="number" 
                  placeholder="Max price" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full border p-2 text-sm rounded focus:outline-none focus:border-red-500" 
                />
              </div>
              <button type="submit" className="bg-black text-white text-xs font-semibold px-4 py-2 uppercase rounded hover:bg-gray-800 transition">
                Filter
              </button>
              <p className="text-xs text-gray-500">Price: {appliedMin} ৳ — {appliedMax} ৳</p>
            </form>
          </div>

          <hr />

          {/* Product Categories */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm tracking-wider">PRODUCT CATEGORIES</h3>
              {selectedCategory && (
                <button onClick={() => setSelectedCategory(null)} className="text-xs text-red-600 hover:underline">
                  Reset
                </button>
              )}
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              {categories.map((cat, idx) => (
                <li 
                  key={idx} 
                  onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                  className={`flex justify-between cursor-pointer transition ${selectedCategory === cat.name ? 'text-red-600 font-bold' : 'hover:text-red-600'}`}
                >
                  <span>{cat.name}</span>
                  <span className="text-gray-400">{cat.count}</span>
                </li>
              ))}
            </ul>
          </div>

          <hr />

          {/* Filter by Brands */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm tracking-wider">FILTER BY BRANDS</h3>
              {selectedBrand && (
                <button onClick={() => setSelectedBrand(null)} className="text-xs text-red-600 hover:underline">
                  Reset
                </button>
              )}
            </div>
            <input
              type="text"
              placeholder="Find a Brand"
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              className="w-full border p-2 text-sm rounded mb-3 focus:outline-none focus:border-red-500"
            />
            <ul className="space-y-2 text-sm text-gray-600 max-h-60 overflow-y-auto pr-2">
              {filteredBrands.map((brand, idx) => (
                <li 
                  key={idx} 
                  onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                  className={`cursor-pointer transition ${selectedBrand === brand ? 'text-red-600 font-bold' : 'hover:text-red-600'}`}
                >
                  {brand}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid Section */}
        <main className="lg:col-span-3 space-y-6">
          {/* Sort & Count Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-4 text-sm">
            <span className="text-gray-500">
              Showing {filteredProducts.length > 0 ? `49–${Math.min(48 + visibleCount, 941)} of 941` : '0'} results
            </span>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border p-1.5 rounded text-sm bg-white focus:outline-none focus:border-red-500"
              >
                <option>Sort by popularity</option>
                <option>Sort by average rating</option>
                <option>Sort by latest</option>
                <option>Sort by price: low to high</option>
                <option>Sort by price: high to low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center text-gray-500 bg-gray-50 rounded-lg">
              <p className="text-base font-semibold">No products found matching your filters.</p>
              <button 
                onClick={() => { setSelectedCategory(null); setSelectedBrand(null); setAppliedMin(0); setAppliedMax(20000); }}
                className="mt-3 bg-black text-white text-xs px-4 py-2 rounded"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.slice(0, visibleCount).map((product) => (
                <div key={product.id} className="border rounded-lg p-4 relative flex flex-col justify-between group bg-white shadow-sm hover:shadow-md transition-shadow">
                  {/* Discount Badge */}
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 font-bold rounded z-10">
                    {product.discount}
                  </span>

                  {/* Image Placeholder */}
                  <div className="bg-gray-100 h-52 rounded-md mb-4 flex items-center justify-center text-gray-400 relative overflow-hidden">
                    <span className="text-xs">[Product Image: {product.name}]</span>
                  </div>

                  {/* Product Metadata */}
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400">{product.category}</p>
                    <h4 className="font-semibold text-sm line-clamp-2 hover:text-red-600 cursor-pointer">
                      {product.name}
                    </h4>
                    <div className="flex items-center text-yellow-400 text-xs py-1">
                      {"★".repeat(Math.floor(product.rating))}
                      <span className="text-gray-400 ml-1">({product.rating})</span>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-400 line-through mr-2 text-xs">
                        {product.originalPrice}
                      </span>
                      <span className="text-red-600 font-bold">
                        {product.currentPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Pagination Button */}
          {visibleCount < 941 && (
            <div className="pt-8 text-center">
              <button 
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="bg-black text-white px-8 py-3 rounded text-sm font-semibold tracking-wide hover:bg-gray-800 transition-colors"
              >
                LOAD MORE PRODUCTS
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}