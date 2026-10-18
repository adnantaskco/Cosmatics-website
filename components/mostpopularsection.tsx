import React from "react"
import { Card } from "@/components/ui/card"
import { Star, ShoppingCart, Search } from "lucide-react"
import Image from "next/image"

interface Product {
  id: string
  name: string
  category: string
  brand: string
  priceText: string
  originalPriceText?: string
  discount?: string
  rating: number
  imageUrl: string
  hoverImageUrl?: string // Optional: falls back to primary image if not provided
  productUrl: string
}

const mostPopularProducts: Product[] = [
  {
    id: "1",
    name: "AXIS-Y – Dark Spot Correcting Glow Serum",
    category: "K-Beauty, Face Serum",
    brand: "AXIS-Y",
    priceText: "210 ৳ – 1,180 ৳",
    discount: "-20%",
    rating: 4.59,
    imageUrl: "/images/products/axis-y-serum.jpg",
    hoverImageUrl: "/images/products/axis-y-serum-hover.jpg", // Example with hover image
    productUrl: "https://lavishta.com/",
  },
  {
    id: "2",
    name: "Cosrx – Acne Pimple Master Patch",
    category: "Sleeping Mask, K-Beauty, Viral Picks",
    brand: "Cosrx",
    priceText: "290 ৳",
    originalPriceText: "420 ৳",
    discount: "-31%",
    rating: 4.54,
    imageUrl: "/images/products/cosrx-patch.jpg",
    hoverImageUrl:"null",
    // No hoverImageUrl provided -> will show the primary image without changing
    productUrl: "https://lavishta.com/",
  },
  {
    id: "3",
    name: "Cosrx – Salicylic Acid Daily Gentle Cleanser",
    category: "K-Beauty, Cleanser",
    brand: "Cosrx",
    priceText: "550 ৳ – 1,080 ৳",
    discount: "-20%",
    rating: 4.54,
    imageUrl: "/images/products/cosrx-cleanser.jpg",
    productUrl: "https://lavishta.com/",
  },
  {
    id: "4",
    name: "Beauty Of Joseon – Relief Sun: Rice + Probiotics Spf50+pa++++",
    category: "K-Beauty, Sunscreen",
    brand: "Beauty Of Joseon",
    priceText: "350 ৳ – 1,480 ৳",
    discount: "-27%",
    rating: 4.8,
    imageUrl: "/images/products/boj-sunscreen.jpg",
    productUrl: "https://lavishta.com/",
  },
  {
    id: "5",
    name: "Aplb – Glutathione Niacinamide Beauty Tablet 500mg X 30 Tablets",
    category: "Supplement, K-Beauty, Viral Picks",
    brand: "Aplb",
    priceText: "880 ৳",
    originalPriceText: "1,100 ৳",
    discount: "-20%",
    rating: 4.0,
    imageUrl: "/images/products/aplb-tablet.jpg",
    productUrl: "https://lavishta.com/",
  },
  {
    id: "6",
    name: "Anua – Heartleaf Pore Control Cleansing Oil",
    category: "K-Beauty, Cleanser",
    brand: "Anua",
    priceText: "540 ৳ – 2,140 ৳",
    discount: "-19%",
    rating: 4.45,
    imageUrl: "/images/products/anua-oil.jpg",
    productUrl: "https://lavishta.com/",
  },
  {
    id: "7",
    name: "Cosrx – Advanced Snail 92 All In One Cream",
    category: "K-Beauty, Moisturizer",
    brand: "Cosrx",
    priceText: "880 ৳ – 1,680 ৳",
    discount: "-25%",
    rating: 4.5,
    imageUrl: "/images/products/cosrx-snail.jpg",
    productUrl: "https://lavishta.com/",
  },
  {
    id: "8",
    name: "Essence – I Love Extreme Crazy Volume Mascara",
    category: "Eyes, Mascara",
    brand: "Essence",
    priceText: "550 ৳",
    originalPriceText: "1,060 ৳",
    discount: "-48%",
    rating: 4.4,
    imageUrl: "/images/products/essence-mascara.jpg",
    productUrl: "https://lavishta.com/",
  },
  {
    id: "9",
    name: "Ordinary – Niacinamide 10% + Zinc 1% – 30ml",
    category: "Skin Care, Face Serum",
    brand: "Ordinary",
    priceText: "1,220 ৳",
    originalPriceText: "1,530 ৳",
    discount: "-20%",
    rating: 4.6,
    imageUrl: "/images/products/ordinary-niacinamide.jpg",
    productUrl: "https://lavishta.com/",
  },
  {
    id: "10",
    name: "I’m From – Rice Toner",
    category: "K-Beauty, Face Toner",
    brand: "I'm From",
    priceText: "680 ৳ – 2,180 ৳",
    discount: "-20%",
    rating: 4.7,
    imageUrl: "/images/products/imfrom-toner.jpg",
    productUrl: "https://lavishta.com/",
  },
]

export function MostPopularSectionExact() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 bg-white font-sans">
      {/* Section Header */}
      <div className="border-b border-neutral-200 pb-2 mb-6">
        <h2 className="text-xl md:text-2xl font-black tracking-tight text-neutral-900 uppercase">
          MOST POPULAR
        </h2>
      </div>

      {/* 5-Column Grid on Desktop, 2-Column on Mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-neutral-200 border border-neutral-200">
        {mostPopularProducts.map((product) => {
          const activeHoverImage = product.hoverImageUrl || product.imageUrl

          return (
            <Card
              key={product.id}
              className="group relative bg-white rounded-none border-0 shadow-none flex flex-col justify-between p-3 hover:z-10 transition-all"
            >
              <div>
                {/* Product Image & Hover Action Buttons Container */}
                <div className="relative w-full aspect-square bg-neutral-50 overflow-hidden mb-3">
                  {product.discount && (
                    <span className="absolute top-2 left-2 z-10 bg-[#D90452] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm">
                      {product.discount}
                    </span>
                  )}
                  
                  {/* Default Image */}
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    
                    className={`object-cover transition-opacity duration-300 ${
                      product.hoverImageUrl ? "group-hover:opacity-0" : ""
                    }`}
                  />

                  {/* Hover Image (Shown only if hoverImageUrl is provided) */}
                  {product.hoverImageUrl && (
                    <img
                      src={activeHoverImage}
                      alt={`${product.name} hover`}
                      
                      className="object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:scale-105"
                    />
                  )}

                  {/* Hover Action Buttons at the bottom of the image */}
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/40 via-black/10 to-transparent flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <button
                      aria-label="Add to cart"
                      className="w-9 h-9 bg-white text-neutral-800 hover:bg-[#D90452] hover:text-white rounded-full flex items-center justify-center shadow-md transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                    <button
                      aria-label="Quick view search"
                      className="w-9 h-9 bg-white text-neutral-800 hover:bg-[#D90452] hover:text-white rounded-full flex items-center justify-center shadow-md transition-colors"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-1 text-center">
                  {/* Title */}
                  <h3 className="text-xs sm:text-sm font-normal text-neutral-800 line-clamp-2 leading-snug hover:text-[#D90452] transition-colors">
                    <a href={product.productUrl}>{product.name}</a>
                  </h3>

                  {/* Categories & Brand text */}
                  <p className="text-[11px] text-neutral-500 font-light truncate">
                    {product.category}, {product.brand}
                  </p>

                  {/* Star Rating */}
                  <div className="flex items-center justify-center gap-0.5 pt-1">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-neutral-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-center gap-2 pt-1">
                    {product.originalPriceText && (
                      <span className="text-xs text-neutral-400 line-through">
                        {product.originalPriceText}
                      </span>
                    )}
                    <span className="text-sm font-bold text-[#D90452]">
                      {product.priceText}
                    </span>
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