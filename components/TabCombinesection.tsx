"use client";
import React, { useState } from 'react';
import { ShoppingCart, Search, Sparkles, Star, Heart } from 'lucide-react';
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

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
  image_variants: ImageVariants;
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
  isNew?: boolean;
  productUrl: string;
}

interface ForYouTabsData {
  FORYOU: Product[];
  NEW: Product[];
  FEATURED: Product[];
  TOPSELLERS: Product[];
  [key: string]: Product[];
}

const forYouTabsData: ForYouTabsData = {
  FORYOU: [
    {
      id: 86,
      name: "Real Technique – Cheeky Trio Makeup Brush & Sponge Set",
      category: "Tool, Face Tool",
      brand: "Real Technique",
      has_variants: true,
      slug: "real-technique-cheeky-trio-makeup-brush-sponge-set",
      sku: "RT-86",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGHftuOM5xfF3xngC0ySbNkUEunVfT_DBT7bU0fg15xw&s=10",
      image_variants: {
        medium: "https://media.ulta.com/i/ulta/2659195_alt05?w=800&h=800&fmt=auto"
      },
      sold_amount: 140,
      review: 4.8,
      retail_price: "3,460 ৳",
      discount_price: "2,980 ৳",
      has_discount: true,
      sale_price: "2,980 ৳",
      stock_qty: 30,
      in_stock: true,
      stock_availability: true,
      weight: 100,
      discount: "-14%",
      isNew: true,
      productUrl: ""
    },
    {
      id: 89,
      name: "Real Technique – Tapered Cheek Makeup Brush",
      category: "Tool, Face Tool",
      brand: "Real Technique",
      has_variants: false,
      slug: "real-technique-tapered-cheek-makeup-brush",
      sku: "RT-89",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP47ubywKZS2KE2PKKpW80mR81lsKSaE0TDKzHtiJlF516cjm0ZAhV83A&s=10",
      image_variants: {
        medium: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDj_6hFKWdAAg8jERBbbo3mZ5do2miLHoEEk64rkjPPRaSz7FIYq8J1KQ&s=10"
      },
      sold_amount: 95,
      review: 4.6,
      retail_price: "1,510 ৳",
      discount_price: "1,480 ৳",
      has_discount: true,
      sale_price: "1,480 ৳",
      stock_qty: 45,
      in_stock: true,
      stock_availability: true,
      weight: 40,
      discount: "-2%",
      isNew: true,
      productUrl: ""
    },
    {
      id: 90,
      name: "Real Technique – Spot Concealer Brush",
      category: "Tool, Face Tool",
      brand: "Real Technique",
      has_variants: true,
      slug: "real-technique-spot-concealer-brush",
      sku: "RT-90",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScTs9EgwWr6YRftqygZJlj6e_WiFY0Y-6s9YMcbB3bMg&s",
      image_variants: {
        medium: "https://dynamic.zacdn.com/PGLVMP8XNkzT1rcQqa3gVoL9Obo=/filters:quality(70):format(webp)/https://static-my.zacdn.com/p/real-techniques-8774-2141574-8.jpg"
      },
      sold_amount: 110,
      review: 4.7,
      retail_price: "1,670 ৳",
      discount_price: "1,480 ৳",
      has_discount: true,
      sale_price: "1,480 ৳",
      stock_qty: 50,
      in_stock: true,
      stock_availability: true,
      weight: 30,
      discount: "-11%",
      isNew: true,
      productUrl: ""
    },
    {
      id: 91,
      name: "Real Technique – Expert Concealer Makeup Brush",
      category: "Tool, Face Tool",
      brand: "Real Technique",
      has_variants: false,
      slug: "real-technique-expert-concealer-makeup-brush",
      sku: "RT-91",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwCJAEkT7EazvQ3GX9wCU00EifteIUul_m43ei5O11EZy5ktSOtUuaFXY&s=10",
      image_variants: {
        medium: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwCJAEkT7EazvQ3GX9wCU00EifteIUul_m43ei5O11EZy5ktSOtUuaFXY&s=10"
      },
      sold_amount: 130,
      review: 4.9,
      retail_price: "1,310 ৳",
      discount_price: "1,280 ৳",
      has_discount: true,
      sale_price: "1,280 ৳",
      stock_qty: 60,
      in_stock: true,
      stock_availability: true,
      weight: 30,
      discount: "-2%",
      isNew: true,
      productUrl: "https://lavishta.com/product/real-technique-expert-concealer-makeup-brush/"
    },
    {
      id: 92,
      name: "Real Technique – Cheeky Trio Makeup Brush & Sponge Set",
      category: "Tool, Face Tool",
      brand: "Real Technique",
      has_variants: true,
      slug: "real-technique-cheeky-trio-makeup-brush-sponge-set",
      sku: "RT-86",
      image: "https://media.ulta.com/i/ulta/2659195_alt06?w=800&h=800&fmt=auto",
      image_variants: {
        medium: "https://media.ulta.com/i/ulta/2659195_alt06?w=800&h=800&fmt=auto"
      },
      sold_amount: 140,
      review: 4.8,
      retail_price: "3,460 ৳",
      discount_price: "2,980 ৳",
      has_discount: true,
      sale_price: "2,980 ৳",
      stock_qty: 30,
      in_stock: true,
      stock_availability: true,
      weight: 100,
      discount: "-14%",
      isNew: true,
      productUrl: ""
    },
    {
      id: 93,
      name: "Real Technique – Skin Tint Base Brush",
      category: "Tool, Face Tool",
      brand: "Real Technique",
      has_variants: false,
      slug: "real-technique-skin-tint-base-brush",
      sku: "RT-93",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGHftuOM5xfF3xngC0ySbNkUEunVfT_DBT7bU0fg15xw&s=10",
      image_variants: {
        medium: "https://media.ulta.com/i/ulta/2659195_alt05?w=800&h=800&fmt=auto"
      },
      sold_amount: 105,
      review: 4.5,
      retail_price: "2,450 ৳",
      discount_price: "2,080 ৳",
      has_discount: true,
      sale_price: "2,080 ৳",
      stock_qty: 40,
      in_stock: true,
      stock_availability: true,
      weight: 60,
      discount: "-15%",
      isNew: true,
      productUrl: ""
    }
  ],
  NEW: [
    {
      id: 86,
      name: "Real Technique – Cheeky Trio Makeup Brush & Sponge Set",
      category: "Tool, Face Tool",
      brand: "Real Technique",
      has_variants: true,
      slug: "real-technique-cheeky-trio-makeup-brush-sponge-set",
      sku: "RT-86",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGHftuOM5xfF3xngC0ySbNkUEunVfT_DBT7bU0fg15xw&s=10",
      image_variants: {
        medium: "https://media.ulta.com/i/ulta/2659195_alt05?w=800&h=800&fmt=auto"
      },
      sold_amount: 140,
      review: 4.8,
      retail_price: "3,460 ৳",
      discount_price: "2,980 ৳",
      has_discount: true,
      sale_price: "2,980 ৳",
      stock_qty: 30,
      in_stock: true,
      stock_availability: true,
      weight: 100,
      discount: "-14%",
      isNew: true,
      productUrl: ""
    },
  ],
  FEATURED: [
    {
      id: 93,
      name: "Real Technique – Skin Tint Base Brush",
      category: "Tool, Face Tool",
      brand: "Real Technique",
      has_variants: false,
      slug: "real-technique-skin-tint-base-brush",
      sku: "RT-93",
     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGHftuOM5xfF3xngC0ySbNkUEunVfT_DBT7bU0fg15xw&s=10",
      image_variants: {
        medium: "https://media.ulta.com/i/ulta/2659195_alt05?w=800&h=800&fmt=auto"
      },
      sold_amount: 105,
      review: 4.5,
      retail_price: "2,450 ৳",
      discount_price: "2,080 ৳",
      has_discount: true,
      sale_price: "2,080 ৳",
      stock_qty: 40,
      in_stock: true,
      stock_availability: true,
      weight: 60,
      discount: "-15%",
      isNew: true,
      productUrl: ""
    }
  ],
  TOPSELLERS: [
    {
      id: 86,
      name: "Real Technique – Cheeky Trio Makeup Brush & Sponge Set",
      category: "Tool, Face Tool",
      brand: "Real Technique",
      has_variants: true,
      slug: "real-technique-cheeky-trio-makeup-brush-sponge-set",
      sku: "RT-86",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGHftuOM5xfF3xngC0ySbNkUEunVfT_DBT7bU0fg15xw&s=10",
      image_variants: {
        medium: "https://media.ulta.com/i/ulta/2659195_alt05?w=800&h=800&fmt=auto"
      },
      sold_amount: 140,
      review: 4.8,
      retail_price: "3,460 ৳",
      discount_price: "2,980 ৳",
      has_discount: true,
      sale_price: "2,980 ৳",
      stock_qty: 30,
      in_stock: true,
      stock_availability: true,
      weight: 100,
      discount: "-14%",
      isNew: true,
      productUrl: ""
    },
  ]
};

export default function ForYouTabCarouselSection() {
  const [activeTab, setActiveTab] = useState<string>("FORYOU");
  const [activeImageState, setActiveImageState] = useState<{ [key: number]: boolean }>({});
  const currentProducts = forYouTabsData[activeTab] || forYouTabsData["FORYOU"];

  const toggleMobileImage = (id: number) => {
    setActiveImageState(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full container mx-auto px-4 md:px-8 lg:px-16 py-12 bg-gradient-to-b from-white to-rose-50/20 font-sans">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative"
      >
        {/* Header & Tab Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-8 border-b border-rose-100 gap-4">
          <div className="flex items-center gap-2 sm:gap-8 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {[
              { key: "FORYOU", label: "FOR YOU" },
              { key: "NEW", label: "NEW" },
              { key: "FEATURED", label: "FEATURED" },
              { key: "TOPSELLERS", label: "TOP SELLERS" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`text-xs md:text-sm font-extrabold tracking-wider uppercase pb-2 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === tab.key 
                    ? "border-[#D90452] text-neutral-900 scale-105" 
                    : "border-transparent text-neutral-400 hover:text-neutral-700"
                }`}
              >
                {activeTab === tab.key && <Sparkles className="w-3.5 h-3.5 text-[#D90452] animate-pulse" />}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <CarouselPrevious className="static translate-y-0 h-9 w-9 rounded-full border border-rose-200 bg-white hover:bg-[#D90452] hover:text-white hover:border-[#D90452] text-neutral-800 transition-all shadow-sm" />
            <CarouselNext className="static translate-y-0 h-9 w-9 rounded-full border border-rose-200 bg-white hover:bg-[#D90452] hover:text-white hover:border-[#D90452] text-neutral-800 transition-all shadow-sm" />
          </div>
        </div>

        {/* Carousel Content Container */}
        <CarouselContent className="-ml-3">
          {currentProducts.map((product) => {
            const isHoveredOrTapped = activeImageState[product.id];
            const hasHoverImage = Boolean(product.image_variants?.medium && product.image_variants.medium !== "null");
            const activeHoverImage = hasHoverImage ? product.image_variants.medium : product.image;

            return (
              <CarouselItem key={product.id} className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                <Card className="group/card relative bg-white rounded-2xl border border-neutral-100/85 shadow-sm hover:shadow-xl hover:border-pink-200 transition-all duration-300 flex flex-col justify-between p-3.5 h-full overflow-hidden">
                  <div>
                    {/* Badges Container */}
                    <div className="absolute top-3 left-3 z-20 flex flex-col gap-1 items-start">
                      {product.has_discount && product.discount && (
                        <span className="bg-gradient-to-r from-pink-600 to-rose-500 text-white text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-full shadow-md shadow-pink-500/20">
                          {product.discount}
                        </span>
                      )}
                      {product.isNew && (
                        <span className="bg-emerald-600 text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                          NEW
                        </span>
                      )}
                    </div>

                    {/* Quick Wishlist Icon */}
                    <button 
                      aria-label="Add to wishlist"
                      className="absolute top-2.5 right-2.5 z-20 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-neutral-500 hover:text-pink-600 hover:bg-white shadow-sm transition-all opacity-0 group-hover/card:opacity-100"
                    >
                      <Heart size={14} />
                    </button>

                    {/* Product Image Container */}
                    <div 
                      onClick={() => toggleMobileImage(product.id)}
                      className="relative w-full aspect-square bg-gradient-to-b from-neutral-50/80 to-neutral-100/50 rounded-xl overflow-hidden mb-3 cursor-pointer"
                    >
                      {/* Primary Image */}
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className={`w-full h-full object-cover transition-all duration-500 group-hover/card:scale-105 ${
                          isHoveredOrTapped || !hasHoverImage ? 'opacity-0' : 'opacity-100 group-hover/card:opacity-0'
                        }`}
                      />

                      {/* Hover Image */}
                      {hasHoverImage && (
                        <img 
                          src={activeHoverImage} 
                          alt={`${product.name} hover`}
                          className={`w-full h-full object-cover absolute inset-0 transition-all duration-500 group-hover/card:scale-105 ${
                            isHoveredOrTapped ? 'opacity-100' : 'opacity-0 group-hover/card:opacity-100'
                          }`}
                        />
                      )}

                      {/* Action Buttons */}
                      <div className={`absolute inset-x-0 bottom-3 flex items-center justify-center gap-2 transition-all duration-300 z-20 px-2 ${
                        isHoveredOrTapped 
                          ? 'opacity-100 translate-y-0 pointer-events-auto' 
                          : 'opacity-0 translate-y-2 pointer-events-none md:group-hover/card:opacity-100 md:group-hover/card:translate-y-0 md:group-hover/card:pointer-events-auto'
                      }`}>
                        <button 
                          onClick={(e) => { e.stopPropagation(); alert(`Added to cart: ${product.name}`); }}
                          aria-label="Add to cart" 
                          className="w-8 h-8 md:w-10 md:h-10 bg-white/95 backdrop-blur text-neutral-800 hover:bg-rose-600 hover:text-white rounded-full flex items-center justify-center shadow-md transition-all transform hover:scale-105"
                        >
                          <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); alert(`Quick view: ${product.name}`); }}
                          aria-label="Quick search view" 
                          className="w-8 h-8 md:w-10 md:h-10 bg-white/95 backdrop-blur text-neutral-800 hover:bg-rose-600 hover:text-white rounded-full flex items-center justify-center shadow-md transition-all transform hover:scale-105"
                        >
                          <Search className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-1.5 text-left px-1">
                      <p className="text-[10px] sm:text-[10px] md:text-xs text-pink-600 font-semibold tracking-wider uppercase truncate">
                        {product.brand} • {product.category.split(',')[0]}
                      </p>

                      <h3 className="text-xs sm:text-xs md:text-[17px] font-bold text-neutral-800 line-clamp-2 leading-relaxed hover:text-pink-600 transition-colors">
                        <a href={product.productUrl}>{product.name}</a>
                      </h3>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1 pt-0.5">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.review)
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-neutral-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-neutral-400 font-medium">({product.review})</span>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-xs sm:text-sm font-bold text-neutral-900">
                          {product.sale_price}
                        </span>
                        {product.retail_price && (
                          <span className="text-[11px] text-neutral-400 line-through font-normal">
                            {product.retail_price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
}