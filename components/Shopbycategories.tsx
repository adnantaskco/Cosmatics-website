import React from "react"
import Image from "next/image"

interface Category {
  id: string
  name: string
  productCount: string
  iconUrl: string
  categoryUrl: string
  bgAccent: string // Background color for the circular badge
}

const categories: Category[] = [
  {
    id: "1",
    name: "LIPS",
    productCount: "229 products",
    iconUrl: "/images/categories/lips-icon.svg",
    categoryUrl: "https://lavishta.com/shop/lips/",
    bgAccent: "bg-[#D90452]", // Brand Magenta
  },
  {
    id: "2",
    name: "K-BEAUTY",
    productCount: "578 products",
    iconUrl: "/images/categories/kbeauty-icon.svg",
    categoryUrl: "https://lavishta.com/shop/k-beauty/",
    bgAccent: "bg-[#E6005C]",
  },
  {
    id: "3",
    name: "EYES",
    productCount: "326 products",
    iconUrl: "/images/categories/eyes-icon.svg",
    categoryUrl: "https://lavishta.com/shop/eyes/",
    bgAccent: "bg-[#C2185B]",
  },
  {
    id: "4",
    name: "FACE",
    productCount: "477 products",
    iconUrl: "/images/categories/face-icon.svg",
    categoryUrl: "https://lavishta.com/shop/face/",
    bgAccent: "bg-[#FF7043]", // Coral accent
  },
  {
    id: "5",
    name: "HAIR TOOL",
    productCount: "39 products",
    iconUrl: "/images/categories/hairtool-icon.svg",
    categoryUrl: "https://lavishta.com/shop/tool/hair-tool/",
    bgAccent: "bg-[#00ACC1]", // Teal accent
  },
  {
    id: "6",
    name: "TOOL",
    productCount: "162 products",
    iconUrl: "/images/categories/tool-icon.svg",
    categoryUrl: "https://lavishta.com/shop/tool/",
    bgAccent: "bg-[#26C6DA]",
  },
  {
    id: "7",
    name: "HAIR",
    productCount: "115 products",
    iconUrl: "/images/categories/hair-icon.svg",
    categoryUrl: "https://lavishta.com/shop/hair/",
    bgAccent: "bg-[#AB47BC]", // Purple accent
  },
  {
    id: "8",
    name: "SKIN CARE",
    productCount: "941 products",
    iconUrl: "/images/categories/skincare-icon.svg",
    categoryUrl: "url?id=29",
    bgAccent: "bg-[#66BB6A]", // Green accent
  },
]

export function ShopByCategory() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 bg-white font-sans">
      {/* Section Header */}
      <div className="border-b border-neutral-200 pb-2 mb-8">
        <h2 className="text-xl md:text-2xl font-black tracking-tight text-neutral-900 uppercase">
          SHOP BY CATEGORY
        </h2>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 text-center">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={cat.categoryUrl}
            className="group flex flex-col items-center space-y-3 focus:outline-none"
          >
            {/* Circular Icon Container */}
            <div
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full ${cat.bgAccent} flex items-center justify-center p-5 shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all duration-300 relative overflow-hidden`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={cat.iconUrl}
                  alt={cat.name}
                  fill
                  className="object-contain filter brightness-0 invert" // Makes vector icons solid white matching the style
                />
              </div>
            </div>

            {/* Category Details */}
            <div className="space-y-0.5">
              <h3 className="text-xs sm:text-sm font-bold tracking-wider text-neutral-800 group-hover:text-[#D90452] transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] text-neutral-500 font-normal">
                {cat.productCount}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}