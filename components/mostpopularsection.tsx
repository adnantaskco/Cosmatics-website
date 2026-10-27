"use client"

import React, { useState } from "react"
import { DataMostPopularProducts } from "@/lib/DataMostPopular"
import { useCart } from "@/components/context/CartContext"
import ProductCard from "./Products/ProductCard"
import { Sparkles } from "lucide-react"


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



export function MostPopularSectionExact() {


  return (
    <section className="container mx-auto px-4 md:px-8 lg:px-16 bg-background font-sans py-6">
      {/* Section Header */}
      <div className="flex items-end justify-between border-b border-neutral-100 pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-0.5">
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
       {DataMostPopularProducts.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      </div>
    </section>
  )
}