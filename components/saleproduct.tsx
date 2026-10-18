import React from "react"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { ShoppingCart, Search, SlidersHorizontal } from "lucide-react"
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
  isVariable?: boolean
}

const saleProducts: Product[] = [
  {
    id: "72",
    name: "Eos – Shea Better 24HR Moisture Body Lotion",
    category: "Skin Care, Body",
    brand: "Eos",
    priceText: "3,950 ৳",
    originalPriceText: "4,380 ৳",
    discount: "-10%",
    isNew: true,
    imageUrl: "/images/products/eos-lotion.jpg",
    productUrl: "https://lavishta.com/brand/axis-y/2",
  },
  {
    id: "71",
    name: "Victoria’s Secret – Bare Vanilla Fragrance Mist – 250ml",
    category: "Accessories, Perfume",
    brand: "Victoria's Secret",
    priceText: "2,780 ৳",
    originalPriceText: "3,880 ৳",
    discount: "-28%",
    isNew: true,
    imageUrl: "/images/products/vs-bare-vanilla.jpg",
    hoverImageUrl: "/images/products/vs-bare-vanilla-hover.jpg",
    productUrl: "https://lavishta.com/brand/axis-y/1",
  },
  {
    id: "74",
    name: "Maybelline – Tattoo Dip In Eyeliner – Black",
    category: "Eyes, Eyeliner",
    brand: "Maybelline",
    priceText: "980 ৳",
    originalPriceText: "1,300 ৳",
    discount: "-25%",
    imageUrl: "/images/products/maybelline-eyeliner.jpg",
    productUrl: "https://lavishta.com/product/maybelline-tattoo-dip-in-eyeliner-black/",
  },
  {
    id: "77",
    name: "Real Technique – Tapered Cheek Makeup Brush",
    category: "Tool, Face Tool",
    brand: "Real Technique",
    priceText: "1,480 ৳",
    originalPriceText: "1,510 ৳",
    discount: "-2%",
    isNew: true,
    imageUrl: "/images/products/rt-tapered-brush.jpg",
    productUrl: "https://lavishta.com/product/real-technique-tapered-cheek-makeup-brush/",
  },
  {
    id: "78",
    name: "La Roche-Posay – Anthelios Melt-in Milk Sunscreen Spf 60 – 150ml",
    category: "Skin Care, Sunscreen",
    brand: "La Roche-Posay",
    priceText: "3,980 ৳",
    originalPriceText: "4,480 ৳",
    discount: "-11%",
    imageUrl: "/images/products/laroche-sunscreen.jpg",
    productUrl: "url?id=78",
    isVariable: true, // Example showing 'Select Options' button
  },
]

export function SaleProductsSectionComplete() {
  return (
    <section className="w-full max-w-sm mx-auto p-4 bg-white font-sans">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative border border-[#D90452] p-4 rounded-none"
      >
        {/* Section Header with Carousel Navigation Arrows */}
        <div className="flex items-center justify-between pb-3 mb-2">
          <h2 className="text-sm md:text-base font-black tracking-tight text-neutral-900 uppercase">
            SALE PRODUCTS
          </h2>
          <div className="flex items-center gap-1">
            <CarouselPrevious className="static translate-y-0 h-6 w-6 rounded-none border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800" />
            <CarouselNext className="static translate-y-0 h-6 w-6 rounded-none border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800" />
          </div>
        </div>

        {/* Carousel Content */}
        <CarouselContent className="ml-0">
          {saleProducts.map((product) => {
            const activeHoverImage = product.hoverImageUrl || product.imageUrl

            return (
              <CarouselItem key={product.id} className="pl-0">
                <Card className="group relative bg-white rounded-none border-0 shadow-none flex flex-col justify-between p-0">
                  <div>
                    {/* Product Image & Badges Container */}
                    <div className="relative w-full aspect-square bg-neutral-100 overflow-hidden mb-3">
                      {/* Top-left Badges */}
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

                      {/* Hover Image */}
                      {product.hoverImageUrl && (
                        <Image
                          src={activeHoverImage}
                          alt={`${product.name} hover`}
                          fill
                          className="object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:scale-105"
                        />
                      )}

                      {/* Hover Action Buttons */}
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/40 via-black/10 to-transparent flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        {product.isVariable ? (
                          <button
                            aria-label="Select options"
                            title="Select Options"
                            className="w-8 h-8 bg-white text-neutral-800 hover:bg-[#D90452] hover:text-white rounded-full flex items-center justify-center shadow-md transition-colors"
                          >
                            <SlidersHorizontal className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            aria-label="Add to cart"
                            title="Add to Cart"
                            className="w-8 h-8 bg-white text-neutral-800 hover:bg-[#D90452] hover:text-white rounded-full flex items-center justify-center shadow-md transition-colors"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          aria-label="Quick view search"
                          title="Quick View"
                          className="w-8 h-8 bg-white text-neutral-800 hover:bg-[#D90452] hover:text-white rounded-full flex items-center justify-center shadow-md transition-colors"
                        >
                          <Search className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-1 text-center">
                      <h3 className="text-xs font-normal text-neutral-800 line-clamp-1 leading-snug hover:text-[#D90452] transition-colors">
                        <a href={product.productUrl}>{product.name}</a>
                      </h3>
                      <p className="text-[11px] text-neutral-400 font-light truncate">
                        {product.category}
                      </p>
                      <p className="text-[11px] text-neutral-500 font-light truncate">
                        {product.brand}
                      </p>

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

                {/* Countdown Timer Displayed Below the Product Card */}
                <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-center gap-1.5 text-center text-xs font-bold text-neutral-800">
                  <div className="flex items-center gap-0.5">
                    <span className="font-extrabold text-neutral-900">0</span>
                    <span className="text-[10px] text-neutral-500 font-normal">Days</span>
                  </div>
                  <span>:</span>
                  <div className="flex items-center gap-0.5">
                    <span className="font-extrabold text-neutral-900">00</span>
                    <span className="text-[10px] text-neutral-500 font-normal">Hr</span>
                  </div>
                  <span>:</span>
                  <div className="flex items-center gap-0.5">
                    <span className="font-extrabold text-neutral-900">00</span>
                    <span className="text-[10px] text-neutral-500 font-normal">Min</span>
                  </div>
                  <span>:</span>
                  <div className="flex items-center gap-0.5">
                    <span className="font-extrabold text-neutral-900">00</span>
                    <span className="text-[10px] text-neutral-500 font-normal">Sc</span>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </section>
  )
}