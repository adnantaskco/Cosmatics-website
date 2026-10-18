import React from "react"
import { Card } from "@/components/ui/card"
import { ShoppingCart, Search } from "lucide-react"
import Image from "next/image"

interface Product {
  id: string
  name: string
  category: string
  brand: string
  priceText: string
  originalPriceText?: string
  discount?: string
  isNew?: boolean
  imageUrl: string
  hoverImageUrl?: string
  productUrl: string
}

const trendingProducts: Product[] = [
  {
    id: "1",
    name: "Medicube – Fresh That Lasts Deodorant with Vanilla & Pistachio – 83g",
    category: "K-Beauty, Body",
    brand: "Medicube",
    priceText: "780 ৳ – 2,280 ৳",
    discount: "-7%",
    imageUrl: "/images/products/medicube-deodorant.jpg",
    hoverImageUrl: "/images/products/medicube-deodorant-hover.jpg",
    productUrl: "https://lavishta.com/",
  },
  {
    id: "2",
    name: "Inglot – Duraline Makeup Mixing Liquid – 9ml",
    category: "Face, Face Primer",
    brand: "Inglot",
    priceText: "1,480 ৳",
    originalPriceText: "1,550 ৳",
    discount: "-5%",
    imageUrl: "/images/products/inglot-duraline.jpg",
    productUrl: "https://lavishta.com/",
  },
  {
    id: "3",
    name: "Rimmel – Stay Matte Pressed Powder",
    category: "Face, Face Powder",
    brand: "Rimmel",
    priceText: "600 ৳",
    originalPriceText: "720 ৳",
    discount: "-17%",
    imageUrl: "/images/products/rimmel-powder.jpg",
    productUrl: "https://lavishta.com/",
  },
  {
    id: "4",
    name: "Lady Speed – Stick Invisible Dry Shower Fresh Deodorant",
    category: "Skin Care, Body",
    brand: "Lady Speed",
    priceText: "490 ৳ – 640 ৳",
    discount: "-19%",
    imageUrl: "/images/products/ladyspeed-deo.jpg",
    productUrl: "https://lavishta.com/",
  },
  {
    id: "5",
    name: "Mac – Ximal Silky Matte Lipstick Mini",
    category: "Lips, Lipstick",
    brand: "Mac",
    priceText: "1,980 ৳",
    originalPriceText: "2,350 ৳",
    discount: "-16%",
    isNew: true,
    imageUrl: "/images/products/mac-lipstick.jpg",
    productUrl: "https://lavishta.com/",
  },
  {
    id: "6",
    name: "Absolute New York – Gloss Slick Peptide Tinted Balm",
    category: "Lips, Lip Tints & Balms",
    brand: "Absolute New York",
    priceText: "780 ৳ – 790 ৳",
    discount: "-38%",
    imageUrl: "/images/products/absolutenewyork-balm.jpg",
    productUrl: "https://lavishta.com/",
  },
  {
    id: "7",
    name: "Real Technique – Spot Concealer Brush",
    category: "Tool, Face Tool",
    brand: "Real Technique",
    priceText: "1,480 ৳",
    originalPriceText: "1,670 ৳",
    discount: "-11%",
    isNew: true,
    imageUrl: "/images/products/rt-concealer-brush.jpg",
    productUrl: "https://lavishta.com/",
  },
  {
    id: "8",
    name: "Olaplex – N°.3plus Complete Repair Treatment",
    category: "Hair, Hair Care",
    brand: "Olaplex",
    priceText: "5,880 ৳ – 11,500 ৳",
    discount: "-11%",
    isNew: true,
    imageUrl: "/images/products/olaplex-treatment.jpg",
    productUrl: "https://lavishta.com/",
  },
  {
    id: "9",
    name: "Victoria’s Secret – Bombshell Eau de Parfum",
    category: "Accessories, Perfume",
    brand: "Victoria's Secret",
    priceText: "10,800 ৳ – 14,800 ৳",
    discount: "-12%",
    isNew: true,
    imageUrl: "/images/products/vs-bombshell.jpg",
    productUrl: "https://lavishta.com/",
  },
  {
    id: "10",
    name: "Color Wow – Pop & Lock High Gloss Finish – 55ml",
    category: "Hair, Hair Care",
    brand: "Color Wow",
    priceText: "2,980 ৳",
    originalPriceText: "3,580 ৳",
    discount: "-17%",
    isNew: true,
    imageUrl: "/images/products/colorwow-gloss.jpg",
    productUrl: "https://lavishta.com/",
  },
]

export function TrendingSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 bg-white font-sans">
      {/* Section Header */}
      <div className="border-b border-neutral-200 pb-2 mb-6">
        <h2 className="text-xl md:text-2xl font-black tracking-tight text-neutral-900 uppercase">
          Trending
        </h2>
      </div>

      {/* 5-Column Grid on Desktop, 2-Column on Mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-neutral-200 border border-neutral-200">
        {trendingProducts.map((product) => {
          const activeHoverImage = product.hoverImageUrl || product.imageUrl

          return (
            <Card
              key={product.id}
              className="group relative bg-white rounded-none border-0 shadow-none flex flex-col justify-between p-3 hover:z-10 transition-all"
            >
              <div>
                {/* Product Image & Badges Container */}
                <div className="relative w-full aspect-square bg-neutral-50 overflow-hidden mb-3">
                  
                  {/* Top-left Badges (Discount & New) */}
                  <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start">
                    {product.discount && (
                      <span className="bg-[#D90452] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm">
                        {product.discount}
                      </span>
                    )}
                    {product.isNew && (
                      <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                        NEW
                      </span>
                    )}
                  </div>
                  
                  {/* Default Image */}
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className={`object-cover transition-opacity duration-300 ${
                      product.hoverImageUrl ? "group-hover:opacity-0" : ""
                    }`}
                  />

                  {/* Hover Image (Shown only if hoverImageUrl is provided) */}
                  {product.hoverImageUrl && (
                    <Image
                      src={activeHoverImage}
                      alt={`${product.name} hover`}
                      fill
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

                  {/* Pricing */}
                  <div className="flex items-center justify-center gap-2 pt-2">
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