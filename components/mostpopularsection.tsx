"use client"
import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Star, ShoppingCart, Search, Heart, Sparkles } from "lucide-react"
import { DataMostPopularProducts } from "@/lib/DataMostPopular"

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
  image_variants?: ImageVariants; // Made optional to prevent undefined issues
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

export function MostPopularSectionExact() {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  return (
    <section className="container mx-auto px-4 md:px-8 lg:px-16 bg-white font-sans py-6">
      
      {/* Section Header */}
      <div className="flex items-end justify-between border-b border-neutral-100 pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2 text-pink-600 text-xs font-bold uppercase tracking-widest mb-0.5">
            <Sparkles size={14} className="animate-pulse" />
            <span>Customer Favorites</span>
          </div>
          <h2 className="text-xl md:text-3xl font-black tracking-tight text-neutral-900 uppercase">
            Most Popular
          </h2>
        </div>
        <span className="text-xs font-semibold text-neutral-400 hidden sm:inline-block">
          Discover our top-rated cosmetic essentials ✨
        </span>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-5">
        {DataMostPopularProducts.map((product: Product) => {
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
                    <a href={`/products/${product.slug}`}>{product.name}</a>
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
    </section>
  )
}