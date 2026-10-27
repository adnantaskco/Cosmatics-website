"use client"


import { DataMostPopularProducts } from "@/lib/DataMostPopular"

import ProductCard from "@/components/Products/ProductCard"

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

  return (
    <>
    <section>

        {/* Gorgeous & Attractive Section Header */}
         <div className="relative w-full h-[350px] sm:h-[200px] md:h-[350px]  overflow-hidden bg-rose-50 ">
        <img 
            src="https://plain-apac-prod-public.komododecks.com/202610/24/Hn5RMKn1RSllzIimI7V7/image.png" 
            alt="K-Beauty Glass Skin Collection Banner" 
            className="absolute inset-0 w-full h-full  "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent flex flex-col justify-end p-6 md:p-12 lg:p-16">
            {/* Banner text / content */}
        </div>
        </div>

    </section>
        <section className="container mx-auto px-4 md:px-8 lg:px-16 bg-background font-sans py-6">

      {/* Grid container */}
   {/* Grid container */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-5">
       {DataMostPopularProducts.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      </div>
    </section>
    
    </>
  )
}