"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Star, ShoppingCart, Search, Heart, Sparkles } from "lucide-react"
import { DataMostPopularProducts } from "@/lib/DataMostPopular"
import { useCart } from "@/components/context/CartContext"

interface ImageVariants {
  thumbnail?: string
  medium?: string
  large?: string
}

interface Product {
  id: number
  name: string
  category: string
  brand: string
  has_variants: boolean
  slug: string
  sku: string
  image: string
  image_variants?: ImageVariants
  sold_amount: number
  review: number
  retail_price: string
  discount_price: string
  has_discount: boolean
  sale_price: string
  stock_qty: number
  in_stock: boolean
  stock_availability: boolean
  weight: number
  discount?: string
}

function parsePrice(value: string | undefined): number {
  if (!value) return Number.NaN

  const normalized = value.replace(/,/g, "").replace(/[^\d.-]/g, "")
  return normalized ? Number(normalized) : Number.NaN
}

// Named export er poriborte ekhane 'export default function' kora holo
export default function MostPopularSectionExact() {
  const [activeCardId, setActiveCardId] = useState<number | null>(null)
  const { addToCart } = useCart()

  return (
    <>
    <section>

        {/* Gorgeous & Attractive Section Header */}
      <div className="relative bg-gradient-to-r from-primary via-rose-950 to-neutral-950 text-text-secondary py-8 sm:py-10 text-center overflow-hidden mb-10  mx-4 md:mx-0 border border-pink-500/20">
        
        {/* Background Image with Rich Opacity & Smooth Scale Effect */}
        <div
          className="absolute inset-0 opacity-35 bg-cover bg-center mix-blend-overlay transform hover:scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRnFkhn8w46KJzPzpqem8e77n04-HchNkvycgQ--pGhjU7DQ8Ke5jrCoj3&s=10')`,
          }}
        />

        {/* Decorative Radial Gradient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 space-y-4">
          
          {/* Top Small Glowing Tag */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-pink-300/30 px-4 py-1.5 rounded-full text-pink-200 text-xs font-semibold tracking-widest uppercase shadow-inner animate-pulse">
            <Sparkles size={14} className="text-primary" />
            <span>Taskco Exclusive Glow</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-wider uppercase bg-gradient-to-r from-white via-pink-100 to-pink-300 bg-clip-text text-transparent drop-shadow-md">
            Our K-Beauty Products
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-pink-100/80 font-medium tracking-wide max-w-xl mx-auto leading-relaxed">
            Elevate your skincare ritual with 100% authentic Korean formulas designed for glass skin perfection.
          </p>

          {/* Decorative Bottom Line */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="w-8 h-[2px] bg-gradient-to-r from-transparent to-primary/80" />
            <span className="w-2 h-2 rounded-full bg-primary  " />
            <span className="w-8 h-[2px] bg-gradient-to-l from-transparent to-primary/80" />
          </div>

        </div>
      </div>

    </section>
        <section className="container mx-auto px-4 md:px-8 lg:px-16 bg-background font-sans py-6">

      {/* Grid container */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-5">
        {DataMostPopularProducts.map((product: Product) => {
          const hasHoverImage =
            Boolean(product.image_variants?.medium) &&
            product.image_variants?.medium !== "null" &&
            product.image_variants?.medium?.trim() !== ""

          const isTouched = activeCardId === product.id

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
            <Card
              key={product.id}
              onClick={() => setActiveCardId(isTouched ? null : product.id)}
              className="group relative bg-background rounded-2xl border border-ring/20 shadow-sm hover:shadow-xl hover:border-primary/50 flex flex-col justify-between p-2.5 md:p-3.5 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div>
                {/* Product Image & Floating Action Hub */}
                <div className="relative w-full aspect-square bg-gradient-to-b from-ring/80 to-ring/50 rounded-xl overflow-hidden mb-2">
                  {/* Discount Badge */}
                  {product.has_discount && product.discount && (
                    <span className="absolute top-2 left-2 z-20 bg-gradient-to-r from-primary to-primary text-text-secondary text-[9px] md:text-[10px] font-extrabold tracking-wider px-1.5 py-0.5 rounded-full shadow-md shadow-pink-500/20">
                      {product.discount}
                    </span>
                  )}

                  {/* Quick Wishlist Icon */}
                  <button
                    aria-label="Add to wishlist"
                    className={`absolute top-2 right-2 z-20 w-7 h-7 bg-background/80 backdrop-blur-md rounded-full flex items-center justify-center text-neutral-500 hover:text-primary hover:bg-background shadow-sm transition-all ${
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
                      hasHoverImage
                        ? isTouched
                          ? "opacity-0"
                          : "group-hover:opacity-0"
                        : ""
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
                  <div
                    className={`absolute inset-x-0 bottom-2 flex items-center justify-center gap-1.5 transition-all duration-300 z-20 px-2 ${
                      isTouched
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                    }`}
                  >
                    <button
                      onClick={(event) => {
                        event.stopPropagation()
                        addProductToCart()
                      }}
                      aria-label={`Add ${product.name} to cart`}
                      className="w-7 h-7 md:w-9 md:h-9 bg-background/95 backdrop-blur text-neutral-800 hover:bg-primary hover:text-text-secondary rounded-full flex items-center justify-center shadow-md transition-all transform hover:scale-105"
                    >
                      <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                    <button
                      onClick={(event) => {
                        event.stopPropagation()
                        alert(`Quick view: ${product.name}`)
                      }}
                      aria-label="Quick search view"
                      className="w-7 h-7 md:w-9 md:h-9 bg-background/95 backdrop-blur text-neutral-800 hover:bg-primary hover:text-text-secondary rounded-full flex items-center justify-center shadow-md transition-all transform hover:scale-105"
                    >
                      <Heart className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-0.5 md:space-y-1 text-left px-0.5">
                  <p className="text-[9px] md:text-xs text-primary font-semibold tracking-wider uppercase truncate">
                    {product.brand} • {product.category.split(",")[0]}
                  </p>

                  <h3 className="text-xs md:text-sm font-bold text-neutral-800 line-clamp-2 leading-snug hover:text-primary transition-colors">
                    <a href={`/products/${product.slug}`}>{product.name}</a>
                  </h3>

                  <div className="flex items-center gap-1 pt-0.5">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-2.5 h-2.5 md:w-3 md:h-3 ${
                            index < Math.floor(product.review)
                              ? "fill-amber-400 text-amber-400"
                              : "text-neutral-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[9px] md:text-[10px] text-neutral-400 font-medium">
                      ({product.review})
                    </span>
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
    
    </>
  )
}