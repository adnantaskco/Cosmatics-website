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
    <section className="container mx-auto px-4 md:px-8 lg:px-16 py-6 sm:py-5 md:py-8  bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center border border-neutral-100 rounded-3xl lg:rounded-[2.5rem] p-4 sm:p-8 lg:p-12 shadow-xl shadow-neutral-100 bg-gradient-to-br from-neutral-50/80 via-background to-pink-50/20">
        
        {/* Left Side: Synchronized Editorial Image */}
        <div className="lg:col-span-6 relative w-full h-[350px] sm:h-[350px] lg:h-[600px] overflow-hidden rounded-t-[100px] sm:rounded-t-[140px] lg:rounded-t-[160px] rounded-b-3xl bg-neutral-200 group">
          <img
            key={`model-${currentSlide.id}`}
            src={currentSlide.modelImageUrl}
            alt={currentSlide.productName}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Right Side: Synchronized Product Info & Hover Action Controls */}
        <div className="lg:col-span-6 flex flex-col justify-between items-center text-center lg:items-start lg:text-left px-2 sm:px-6">
          
          <div className="w-full">
            {/* Product Image Container with Dual Hover Action Buttons */}
            <div className="relative w-full h-[260px] sm:w-80 sm:h-96 lg:w-104 lg:h-120 mx-auto lg:mx-0  bg-background rounded-3xl p-2 border border-neutral-100 flex items-center justify-center group overflow-hidden">
              
              <img
                key={`product-${currentSlide.id}`}
                src={currentSlide.productImageUrl}
                alt={currentSlide.productName}
                className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
              />

              {/* Gorgeous Hover Overlay with Action Buttons */}
              <div className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2.5 p-4">
                
                {/* Quick Cart Button */}
                <button 
                  onClick={(e) => handleQuickCart(currentSlide, e)}
                  className="w-full max-w-[170px] bg-primary hover:bg-neutral-900 text-text-secondary text-xs font-bold tracking-wider uppercase py-2.5 px-4 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out cursor-pointer"
                >
                  Quick Cart
                </button>

                {/* Quick View Button */}
                <button 
                  onClick={(e) => handleQuickView(currentSlide, e)}
                  className="w-full max-w-[170px] bg-background hover:bg-neutral-100 text-neutral-900 text-xs font-bold tracking-wider uppercase py-2.5 px-4 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 ease-out cursor-pointer"
                >
                  Quick View
                </button>

              </div>
            </div>

            {/* Synchronized Product Details */}
            <div className="space-y-1.5 lg:space-y-2 mb-6 lg:mb-8">
              <a 
                href={currentSlide.productUrl}
                className="text-lg sm:text-xl lg:text-2xl font-black text-neutral-900 hover:text-primary transition-colors"
              >
                {currentSlide.productName}
              </a>
              <p className="text-xs sm:text-sm font-medium text-neutral-500">
                Regular price <span className="text-neutral-900 font-bold">{currentSlide.price}</span>
              </p>
            </div>
          </div>

          {/* Unified Carousel Navigation Bar */}
          <div className="w-full flex items-center justify-between pt-4 lg:pt-6 border-t border-neutral-200">
            <div className="flex gap-2">
              {showcaseSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === index ? "w-8 sm:w-10 bg-primary" : "w-2 sm:w-2.5 bg-neutral-300 hover:bg-neutral-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2.5 sm:gap-3">
              <button
                onClick={handlePrev}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-900 hover:text-text-secondary hover:border-neutral-900 transition-all shadow-sm cursor-pointer"
                aria-label="Previous item"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-900 hover:text-text-secondary hover:border-neutral-900 transition-all shadow-sm cursor-pointer"
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