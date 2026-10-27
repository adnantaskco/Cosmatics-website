"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import {
  Star,
  ShoppingCart,
  Search,
  X,
  CheckCircle,
} from "lucide-react"
import { useCart } from "@/components/context/CartContext"
import Link from "next/link"

interface ImageVariants {
  thumbnail?: string
  medium?: string
  large?: string
}

export interface Product {
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

interface ProductCardProps {
  product: Product
}

function parsePrice(value: string | undefined): number {
  if (!value) return Number.NaN

  const normalized = value
    .replace(/,/g, "")
    .replace(/[^\d.-]/g, "")

  return normalized ? Number(normalized) : Number.NaN
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const [isTouched, setIsTouched] = useState(false)
  
  // Modal States
  const [showQuickView, setShowQuickView] = useState(false)
  const [showSuccessCard, setShowSuccessCard] = useState(false)

  const { addToCart } = useCart()

  const hasHoverImage = Boolean(
    product.image_variants?.medium &&
      product.image_variants.medium !== "null" &&
      product.image_variants.medium.trim() !== ""
  )

  const addProductToCart = () => {
    const priceCandidates = [
      product.sale_price,
      product.discount_price,
      product.retail_price,
    ]

    const price = priceCandidates
      .map(parsePrice)
      .find(Number.isFinite)

    if (price === undefined) {
      console.error(
        `Could not determine a valid price for ${product.name}`
      )
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

    // Show success modal/card
    setShowSuccessCard(true)
    setTimeout(() => {
      setShowSuccessCard(false)
    }, 2500) // Auto-hide after 2.5 seconds
  }

  return (
    <>
      <Card
        onClick={() =>
          setIsTouched((previous) => !previous)
        }
        className="group relative bg-background rounded-2xl border-0.5 border-ring/20 hover:border-primary/50 flex flex-col justify-between p-2.5 md:p-3.5 transition-all duration-300 overflow-hidden cursor-pointer"
      >
        <div>
          {/* Product Image */}
          <div className="relative w-full aspect-square bg-gradient-to-b from-ring/80 to-ring/50 rounded-xl overflow-hidden mb-2">
            {/* Discount Badge */}
            {product.has_discount && product.discount && (
              <span className="absolute top-2 left-2 z-20 bg-gradient-to-r from-primary to-primary text-text-secondary text-[9px] md:text-[10px] font-extrabold tracking-wider px-1.5 py-0.5 rounded-full shadow-md shadow-pink-500/25">
                {product.discount}
              </span>
            )}

            {/* Quick View Button */}
            <button
              type="button"
              aria-label={`Quick view ${product.name}`}
              onClick={(event) => {
                event.stopPropagation()
                setShowQuickView(true)
              }}
              className={`absolute top-2 right-2 z-20 w-7 h-7 bg-background/80 backdrop-blur-md rounded-full flex items-center justify-center text-neutral-500 hover:text-primary hover:bg-background shadow-sm transition-all ${
                isTouched
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <Search size={12} />
            </button>

            {/* Main Image */}
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
                alt={`${product.name} alternate view`}
                className={`w-full h-full object-cover absolute inset-0 transition-all duration-500 group-hover:scale-105 pointer-events-none ${
                  isTouched
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              />
            )}


          {/* Responsive Add to Cart Button */}
          <div
            className={`absolute inset-x-1.5 bottom-1.5 z-20 transition-all duration-300 min-[360px]:inset-x-2 min-[360px]:bottom-2 sm:inset-x-3 sm:bottom-3 ${
              isTouched
                ? "translate-y-0 opacity-100"
                : "translate-y-0 opacity-100 sm:translate-y-2 sm:opacity-0 sm:group-hover/card:translate-y-0 sm:group-hover/card:opacity-100"
            }`}
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                addProductToCart();
              }}
              aria-label={`Add ${product.name} to cart`}
              className="group/cart relative flex w-full min-w-0 items-center justify-center gap-1 overflow-hidden rounded-lg bg-gradient-to-r from-primary to-primary/80 px-1.5 py-2 text-[9px] font-bold tracking-wide text-white shadow-md shadow-primary/20 transition-all duration-300 active:scale-[0.97] min-[360px]:gap-1.5 min-[360px]:px-2 min-[360px]:text-[10px] sm:gap-2 sm:rounded-xl sm:px-3 sm:py-2.5 sm:text-xs sm:hover:-translate-y-0.5 sm:hover:shadow-xl"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/cart:translate-x-full" />

              <ShoppingCart
                size={14}
                strokeWidth={2.5}
                className="relative shrink-0 min-[360px]:h-4 min-[360px]:w-4"
              />

              <span className="relative truncate">
                ADD TO CART
              </span>

              <span className="relative hidden min-[400px]:inline-flex sm:hidden">
                +
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative ml-auto hidden shrink-0 sm:block"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>

          </div>

          {/* Product Information */}
          <div className="space-y-0.5 md:space-y-1.5 text-left px-0.5">
            <p className="text-[8px] md:text-[10px] text-primary font-medium tracking-wider uppercase truncate">
              {/* {product.brand} • {product.category.split(",")[0]} */}
              {product.brand}
            </p>

            {/* Product Name */}
            <h3 className="text-xs md:text-sm font-bold text-neutral-600 line-clamp-2 leading-snug hover:text-primary transition-colors">
              <Link
                href={`/products/${product.slug}`}
                prefetch={true}
                onClick={(event) => event.stopPropagation()}
              >
                {product.name}
              </Link>
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 pt-1.5">
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

            {/* Price */}
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

      {/* --- QUICK VIEW MODAL --- */}
      {showQuickView && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setShowQuickView(false)}
        >
          <div 
            className="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowQuickView(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 p-1 rounded-full bg-neutral-100"
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-xl"
              />
              <div className="space-y-3">
                <span className="text-xs font-semibold text-primary uppercase">
                  {product.brand}
                </span>
                <h2 className="text-lg font-bold text-neutral-900 leading-snug">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-neutral-900">
                    {product.sale_price}
                  </span>
                  {product.retail_price && (
                    <span className="text-xs text-neutral-400 line-through">
                      {product.retail_price}
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-500">
                  Category: {product.category}
                </p>
                <p className="text-xs text-neutral-500">
                  Stock: {product.in_stock ? `${product.stock_qty} available` : "Out of Stock"}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    addProductToCart()
                    setShowQuickView(false)
                  }}
                  className="w-full py-2.5 bg-primary text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-opacity"
                >
                  <ShoppingCart size={14} /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- ADD TO CART SUCCESS CARD / NOTIFICATION --- */}
      {showSuccessCard && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
          <div className="bg-neutral-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-neutral-700">
            <CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold">Successfully added to cart!</p>
              <p className="text-[10px] text-neutral-300 truncate max-w-[200px]">
                {product.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}