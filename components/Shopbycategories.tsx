import React from "react"
import Image from "next/image"

interface Category {
  id: string
  name: string
  productCount: string
  imageUrl: string
  categoryUrl: string
}

const categories: Category[] = [
  {
    id: "1",
    name: "LIPS",
    productCount: "229 products",
    imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=400&auto=format&fit=crop",
    categoryUrl: "/",
  },
  {
    id: "2",
    name: "K-BEAUTY",
    productCount: "578 products",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=400&auto=format&fit=crop",
    categoryUrl: "/",
  },
  {
    id: "3",
    name: "EYES",
    productCount: "326 products",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_n5A6NYuJAH8LBckQRj1mUyw4_zxZShFAvzIzsmcpXQ&s=10",
    categoryUrl: "/",
  },
  {
    id: "4",
    name: "FACE",
    productCount: "477 products",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vPgYNwqjdggfJf1uqAIsyNQK6LJ-yTxior0BMA4X3A&s=10",
    categoryUrl: "/",
  },
  {
    id: "5",
    name: "HAIR TOOL",
    productCount: "39 products",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCRIjc76Ti_ml7K7extqkOD69RgPfad_0FBe7i4spQWw&s=10",
    categoryUrl: "/",
  },
  {
    id: "6",
    name: "TOOL",
    productCount: "162 products",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxqTH3FH8bxoEvZC5PKHbKbCWJqkETEsCRZ3TphSzqCKp_tVPsDtpyCvZ3&s=10",
    categoryUrl: "/",
  },
  {
    id: "7",
    name: "HAIR",
    productCount: "115 products",
    imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=400&auto=format&fit=crop",
    categoryUrl: "/",
  },
  {
    id: "8",
    name: "SKIN CARE",
    productCount: "941 products",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoSR1ggFVyJpceWG0p2ycg-IodBkm_bwhf6YE-w-CkLw&s=10",
    categoryUrl: "/",
  },
]

export function ShopByCategory() {
  return (
    <section className="w-full container mx-auto px-4 md:px-8 lg:px-16 py-12 bg-gradient-to-b from-neutral-50/50 to-white font-sans">
      {/* Section Header with Accent Bar */}
      <div className="flex flex-col items-center mb-10 text-center">
        <span className="text-xs font-bold tracking-widest text-[#D90452] uppercase mb-1">
          Curated Collections
        </span>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 to-rose-900 bg-clip-text text-transparent uppercase">
          Shop By Category
        </h2>
        <div className="w-12 h-1 bg-[#D90452] rounded-full mt-3"></div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 text-center">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={cat.categoryUrl}
            className="group flex flex-col items-center space-y-3.5 p-3 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-1.5 focus:outline-none"
          >
            {/* Circular Image Container */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center  group-hover:scale-105 transition-all duration-300 relative overflow-hidden ring-4 ring-white bg-neutral-100">
              <img
                src={cat.imageUrl}
                alt={cat.name}
                
                
                className=" group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Category Details */}
            <div className="space-y-1">
              <h3 className="text-xs sm:text-sm font-extrabold tracking-wider text-neutral-900 group-hover:text-[#D90452] transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] font-medium text-neutral-400 group-hover:text-neutral-600 transition-colors">
                {cat.productCount}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}