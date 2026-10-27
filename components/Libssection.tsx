
"use client"

import React, { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DataLipProducts } from "@/lib/DataLibsection"
import ProductCarouselCard from "@/components/Products/ProductCarouselCard"
import type { CarouselProduct } from "@/components/Products/ProductCarouselCard"

export default function LIPAutoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const products = DataLipProducts as CarouselProduct[]

  useEffect(() => {
    if (isPaused || products.length <= 1) return

    const interval = setInterval(() => {
      const container = scrollRef.current
      if (!container) return

      const card = container.querySelector<HTMLElement>(
        ":scope > div"
      )

      const cardWidth = card?.offsetWidth || 200
      const gap = windowGap()

      const maxScroll =
        container.scrollWidth - container.clientWidth

      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        })
        setCurrentIndex(0)
      } else {
        container.scrollBy({
          left: cardWidth + gap,
          behavior: "smooth",
        })

        setCurrentIndex((previous) =>
          (previous + 1) % products.length
        )
      }
    }, 3500)

    return () => clearInterval(interval)
  }, [isPaused, products.length])

  const scrollManual = (direction: "left" | "right") => {
    const container = scrollRef.current
    if (!container) return

    const card = container.querySelector<HTMLElement>(
      ":scope > div"
    )

    const cardWidth = card?.offsetWidth || 200
    const gap = windowGap()
    const offset = cardWidth + gap

    container.scrollBy({
      left: direction === "left" ? -offset : offset,
      behavior: "smooth",
    })

    setCurrentIndex((previous) => {
      if (direction === "left") {
        return Math.max(0, previous - 1)
      }

      return Math.min(products.length - 1, previous + 1)
    })
  }

  const scrollToCard = (index: number) => {
    const container = scrollRef.current
    if (!container) return

    const card = container.querySelector<HTMLElement>(
      ":scope > div"
    )

    const cardWidth = card?.offsetWidth || 200
    const gap = windowGap()

    container.scrollTo({
      left: (cardWidth + gap) * index,
      behavior: "smooth",
    })

    setCurrentIndex(index)
  }

  return (
    <section className="w-full container mx-auto px-4 md:px-8 lg:px-16 py-10">
      <div
        className="relative group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Previous Arrow */}
        <button
          type="button"
          onClick={() => scrollManual("left")}
          className="hidden md:flex absolute -left-5 top-[42%] -translate-y-1/2 z-20 items-center justify-center w-11 h-11 bg-white/90 backdrop-blur-md border border-rose-100 rounded-full shadow-lg text-neutral-800 hover:bg-rose-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 duration-300"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Reusable Carousel Cards */}
        <div
          ref={scrollRef}
          className="flex gap-2 md:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-1 no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {products.map((product) => (
            <ProductCarouselCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {/* Next Arrow */}
        <button
          type="button"
          onClick={() => scrollManual("right")}
          className="hidden md:flex absolute -right-5 top-[42%] -translate-y-1/2 z-20 items-center justify-center w-11 h-11 bg-white/90 backdrop-blur-md border border-rose-100 rounded-full shadow-lg text-neutral-800 hover:bg-rose-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 duration-300"
          aria-label="Next card"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {products.map((product, index) => (
            <button
              key={product.id}
              type="button"
              onClick={() => scrollToCard(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-8 bg-rose-600 shadow-sm"
                  : "w-2 bg-neutral-200 hover:bg-neutral-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function windowGap() {
  return typeof window !== "undefined" &&
    window.matchMedia("(min-width: 768px)").matches
    ? 16
    : 8
}
