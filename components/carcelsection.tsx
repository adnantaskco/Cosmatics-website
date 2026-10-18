"use client"

import React, { useState } from "react"

interface ShowcaseSlide {
  id: string
  modelImageUrl: string
  productName: string
  price: string
  productImageUrl: string
  productUrl: string
  tag?: string
}

const showcaseSlides: ShowcaseSlide[] = [
  {
    id: "1",
    modelImageUrl: "https://primposh-theme.myshopify.com/cdn/shop/files/team-2.jpg?v=1709186753&width=2000",
    productName: "Face Wash Cream",
    price: "৳ 435.00",
    productImageUrl: "https://primposh-theme.myshopify.com/cdn/shop/files/Product_Hover_22.jpg?v=1718362557&width=360",
    productUrl: "/",
    tag: "BEST SELLER",
  },
  {
    id: "2",
    modelImageUrl: "https://primposh-theme.myshopify.com/cdn/shop/files/slider-img.jpg?v=1708082885&width=2000",
    productName: "Sunshine Face Cream",
    price: "৳ 750.00",
    productImageUrl: "https://primposh-theme.myshopify.com/cdn/shop/files/Product_Hover_30.jpg?v=1718363242&width=360",
    productUrl: "/",
    tag: "ORGANIC",
  },
  {
    id: "3",
    modelImageUrl: "https://primposh-theme.myshopify.com/cdn/shop/files/team-1.jpg?v=1709186753&width=2000",
    productName: "Anti-Wrinkle Serum",
    price: "৳ 250.00",
    productImageUrl: "https://primposh-theme.myshopify.com/cdn/shop/files/Product_Hover_21.jpg?v=1718362501&width=360",
    productUrl: "/",
    tag: "SPECIAL",
  },
]

export function SynchronizedProductShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % showcaseSlides.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + showcaseSlides.length) % showcaseSlides.length)
  }

  const currentSlide = showcaseSlides[currentIndex]

  const handleQuickCart = (slide: ShowcaseSlide, e: React.MouseEvent) => {
    e.preventDefault()
    alert(`Successfully added ${slide.productName} to your cart!`)
  }

  const handleQuickView = (slide: ShowcaseSlide, e: React.MouseEvent) => {
    e.preventDefault()
    window.open(slide.productUrl, "_blank")
  }

  return (
    <section className="container mx-auto px-4 md:px-8 lg:px-16 py-16 font-sans bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-neutral-100 rounded-[2.5rem] p-6 sm:p-12 shadow-xl shadow-neutral-100 bg-gradient-to-br from-neutral-50/80 via-white to-pink-50/20">
        
        {/* Left Side: Synchronized Editorial Image */}
        <div className="lg:col-span-6 relative w-full h-[400px] sm:h-[500px] md:h-[700px] overflow-hidden rounded-t-[160px] rounded-b-3xl bg-neutral-200  group">
          <img
            key={`model-${currentSlide.id}`}
            src={currentSlide.modelImageUrl}
            alt={currentSlide.productName}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
           */}
          {/* Floating Tag */}
          {/* {currentSlide.tag && (
            <span className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-neutral-900 text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full shadow-sm">
              {currentSlide.tag}
            </span>
          )} */}
        </div>

        {/* Right Side: Synchronized Product Info & Hover Action Controls */}
        <div className="lg:col-span-6 flex flex-col justify-between items-center text-center lg:items-start lg:text-left px-2 sm:px-6">
          
          <div className="w-full">
            {/* Product Image Container with Dual Hover Action Buttons */}
            <div className="relative w-fit h-fit sm:w-104 sm:h-120 mx-auto lg:mx-0 mb-6 bg-white rounded-3xl p-6 shadow-md border border-neutral-100 flex items-center justify-center group overflow-hidden">
              
              <img
                key={`product-${currentSlide.id}`}
                src={currentSlide.productImageUrl}
                alt={currentSlide.productName}
                className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
              />

              {/* Gorgeous Hover Overlay with Action Buttons */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2.5 p-4">
                
                {/* Quick Cart Button */}
                <button 
                  onClick={(e) => handleQuickCart(currentSlide, e)}
                  className="w-full max-w-[170px] bg-[#D90452] hover:bg-neutral-900 text-white text-xs font-bold tracking-wider uppercase py-2.5 px-4 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out cursor-pointer"
                >
                  Quick Cart
                </button>

                {/* Quick View Button */}
                <button 
                  onClick={(e) => handleQuickView(currentSlide, e)}
                  className="w-full max-w-[170px] bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-bold tracking-wider uppercase py-2.5 px-4 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 ease-out cursor-pointer"
                >
                  Quick View
                </button>

              </div>
            </div>

            {/* Synchronized Product Details */}
            <div className="space-y-2 mb-8">
              <a 
                href={currentSlide.productUrl}
                className="text-xl sm:text-2xl font-black text-neutral-900 hover:text-[#D90452] transition-colors"
              >
                {currentSlide.productName}
              </a>
              <p className="text-sm font-medium text-neutral-500">
                Regular price <span className="text-neutral-900 font-bold">{currentSlide.price}</span>
              </p>
            </div>
          </div>

          {/* Unified Carousel Navigation Bar */}
          <div className="w-full flex items-center justify-between pt-6 border-t border-neutral-200">
            <div className="flex gap-2">
              {showcaseSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === index ? "w-10 bg-[#D90452]" : "w-2.5 bg-neutral-300 hover:bg-neutral-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all shadow-sm cursor-pointer"
                aria-label="Previous item"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all shadow-sm cursor-pointer"
                aria-label="Next item"
              >
                →
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}