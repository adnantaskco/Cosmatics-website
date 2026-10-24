"use client"
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
import { useCart } from './context/CartContext';

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

function parsePrice(value: string | undefined): number {
  if (!value) return Number.NaN

  // Handles values such as "৳ 1,200", "$12.50", or "1200".
  const normalized = value.replace(/,/g, "").replace(/[^\d.-]/g, "")
  return normalized ? Number(normalized) : Number.NaN
}

export default function ForYouTabCarouselSection() {
  const [activeTab, setActiveTab] = useState<string>("FORYOU");
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const currentProducts = forYouTabsData[activeTab] || forYouTabsData["FORYOU"];
    const { addToCart } = useCart();

  return (
    <section className="w-full container mx-auto px-4 md:px-8 lg:px-16 py-12 bg-gradient-to-b from-background to-black/20 ">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative"
      >
        {/* Header & X-Axis Scrollable Tab Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-8 border-b border-primary/20 gap-4">
          <div className="flex items-center gap-2 sm:gap-8 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              { key: "FORYOU", label: "FOR YOU" },
              { key: "NEW", label: "NEW" },
              { key: "FEATURED", label: "FEATURED" },
              { key: "TOPSELLERS", label: "TOP SELLERS" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`text-xs md:text-sm font-extrabold tracking-wider uppercase pb-2 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                  activeTab === tab.key 
                    ? "border-primary text-neutral-900 scale-105" 
                    : "border-transparent text-neutral-400 hover:text-neutral-700"
                }`}
              >
                {activeTab === tab.key && <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <CarouselPrevious className="static translate-y-0 h-9 w-9 rounded-full border border-primary/20 bg-background hover:bg-primary hover:text-text-secondary hover:border-primary text-neutral-800 transition-all shadow-sm" />
            <CarouselNext className="static translate-y-0 h-9 w-9 rounded-full border border-primary/20 bg-background hover:bg-primary hover:text-text-secondary hover:border-primary text-neutral-800 transition-all shadow-sm" />
          </div>
        </div>

        {/* Carousel Content Container */}
        <CarouselContent className="-ml-3">
          {currentProducts.map((product) => {
            const hasHoverImage = product.image_variants?.medium && 
                                  product.image_variants.medium !== "null" && 
                                  product.image_variants.medium.trim() !== "";

            const isTouched = activeCardId === product.id;

            const addProductToCart = () => {
            const priceCandidates = [
              product.sale_price,
              product.discount_price,
              product.retail_price,
            ]
            const price = priceCandidates
              .map(parsePrice)
              .find((candidate) => Number.isFinite(candidate))

            if (price === undefined) {
              console.error(`Could not determine a valid price for ${product.name}`)
              return
            }

            addToCart({
              id: product.id,
              name: product.name,
              image: product.image,
              price,
              brand: product.brand,
              quantity: 1,
            })
          }



            return (
              <CarouselItem key={product.id} className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                <Card
                  onClick={() => setActiveCardId(isTouched ? null : product.id)}
                  className="group relative bg-background rounded-2xl border border-ring/50 shadow-sm hover:shadow-xl hover:border-primary/40 flex flex-col justify-between p-2.5 md:p-3.5 transition-all duration-300 overflow-hidden cursor-pointer h-full"
                >
                  <div>
                    {/* Product Image & Floating Action Hub */}
                    <div className="relative w-full aspect-square bg-gradient-to-b from-ring/10 to-ring/80 rounded-xl overflow-hidden mb-2">
                      
                      {/* Badges Container */}
                      <div className="absolute top-2 left-2 z-20 flex flex-col gap-1 items-start">
                        {product.has_discount && product.discount && (
                          <span className="bg-gradient-to-r from-primary to-primary/80 text-text-secondary text-[9px] md:text-[10px] font-extrabold tracking-wider px-1.5 py-0.5 rounded-full  shadow-primary/20">
                            {product.discount}
                          </span>
                        )}
                        {product.isNew && (
                          <span className="bg-emerald-600 text-text-secondary text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                            NEW
                          </span>
                        )}
                      </div>

                      {/* Quick Wishlist Icon */}
                      <button 
                        aria-label="Add to wishlist"
                        className={`absolute top-2 right-2 z-20 w-7 h-7 bg-background/80 backdrop-blur-md rounded-full flex items-center justify-center text-neutral-500 hover:text-primary hover:bg-background shadow-sm transition-all ${
                          isTouched ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        <Heart size={12} />
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
                      onClick={(event) => {
                        event.stopPropagation()
                        addProductToCart()
                      }}
                      aria-label={`Add ${product.name} to cart`}
                      className="w-7 h-7 md:w-9 md:h-9 bg-background/95 backdrop-blur text-neutral-800 hover:bg-primary hover:text-text-secondary rounded-full flex items-center justify-center  transition-all transform hover:scale-105"
                    >
                      <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); alert(`Quick view: ${product.name}`); }}
                          aria-label="Quick search view" 
                          className="w-7 h-7 md:w-9 md:h-9 bg-background/95 backdrop-blur text-neutral-800 hover:bg-primary hover:text-text-secondary rounded-full flex items-center justify-center  transition-all transform hover:scale-105"
                        >
                          <Search className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-0.5 md:space-y-1 text-left px-0.5">
                      <p className="text-[9px] md:text-xs text-primary font-semibold tracking-wider uppercase truncate">
                        {product.brand} • {product.category.split(',')[0]}
                      </p>

                      <h3 className="text-xs md:text-sm font-bold text-neutral-800 line-clamp-2 leading-snug hover:text-primary transition-colors">
                        <a href={product.productUrl || `/products/${product.slug}`}>{product.name}</a>
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
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
}