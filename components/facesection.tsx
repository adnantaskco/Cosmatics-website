"use client";
import React, { useState, useEffect, useRef } from 'react';
import { DatafaceSkinCareProducts } from '@/lib/dataface';
import { ChevronLeft, ChevronRight, Search, ShoppingCart, Star, Heart, Sparkles } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { useCart } from './context/CartContext';
import ProductCarouselCard, { CarouselProduct } from './Products/ProductCarouselCard';

interface ImageVariants {
  thumbnail?: string;
  medium?: string;
  large?: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  has_variants: boolean;
  slug: string;
  sku: string;
  image: string;
  image_variants: {
    medium: string;
  };
  sold_amount: number;
  review: number;
  retail_price: string;
  discount_price: string;
  has_discount: boolean;
  sale_price: string;
  stock_qty: number;
  in_stock: boolean;
  stock_availability: boolean;
  weight: number;
  discount: string;
}

function parsePrice(value: string | undefined): number {
  if (!value) return Number.NaN

  // Handles values such as "৳ 1,200", "$12.50", or "1200".
  const normalized = value.replace(/,/g, "").replace(/[^\d.-]/g, "")
  return normalized ? Number(normalized) : Number.NaN
}

export default function FaceAutoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
 

  const products = DatafaceSkinCareProducts as CarouselProduct[]

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const cardWidth = scrollRef.current.querySelector<HTMLElement>(':scope > div')?.offsetWidth || 200;
        const gap = 8;

        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          setCurrentIndex(0);
        } else {
          scrollRef.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
          setCurrentIndex((prev) => (prev + 1) % DatafaceSkinCareProducts.length);
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const scrollManual = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector<HTMLElement>(':scope > div')?.offsetWidth || 200;
      const gap = 8;
      const offset = direction === 'left' ? -(cardWidth + gap) : cardWidth + gap;
      
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      
      setCurrentIndex((prev) => {
        if (direction === 'left') {
          return Math.max(0, prev - 1);
        } else {
          return Math.min(DatafaceSkinCareProducts.length - 1, prev + 1);
        }
      });
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector<HTMLElement>(':scope > div')?.offsetWidth || 200;
      const gap = 8;
      scrollRef.current.scrollTo({ left: (cardWidth + gap) * index, behavior: 'smooth' });
      setCurrentIndex(index);
    }
  };

  return (
    <>
      {/* <div className="container mx-auto px-4 md:px-8 lg:px-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8 pb-3 md:pb-4 border-b border-rose-100">
        <div className="flex items-center gap-2.5">
          <span className="p-2 bg-background text-primary rounded-xl shadow-inner shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </span>
          <div>
            <h2 className="text-lg md:text-2xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 to-primary bg-clip-text text-transparent">
              FACE CARE COLLECTION
            </h2>
            <p className="text-xs md:text-sm text-neutral-500 font-medium">Elevate your everyday look with premium luxury shades</p>
          </div>
        </div>
        <a
          href="/shop"
          className="self-start sm:self-auto text-xs md:text-sm font-semibold text-rose-600 hover:text-rose-700 transition-colors flex items-center gap-1 group bg-rose-50/80 px-3.5 py-1.5 md:px-4 md:py-2 rounded-full border border-rose-100"
        >
          View All <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
        </a>
      </div> */}

      <div className="relative w-full h-[150px] sm:h-[150px] md:h-[350px] overflow-hidden bg-background">
        <img 
            src="https://plain-apac-prod-public.komododecks.com/202610/25/d7aQqHSe6DoP39EU8OQx/image.jpg" 
            alt="Skin Collection Banner" 
            className="absolute inset-0 w-full h-full "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent flex flex-col justify-end p-6 md:p-12 lg:p-16">
            {/* Banner text / content */}
        </div>
      </div>
  
      <section className="w-full container mx-auto px-4 md:px-8 lg:px-16 py-5 sm:py-5 md:py-10 font-sans">
        <div 
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow */}
          <button
            onClick={() => scrollManual('left')}
            className="hidden md:flex absolute -left-5 top-[42%] -translate-y-1/2 z-20 items-center justify-center w-11 h-11 bg-background/90 backdrop-blur-md border border-rose-100 rounded-full shadow-lg text-neutral-800 hover:bg-primary hover:text-text-secondary transition-all opacity-0 group-hover:opacity-100 duration-300"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards Row Container */}
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

          {/* Right Arrow */}
          <button
            onClick={() => scrollManual('right')}
            className="hidden md:flex absolute -right-5 top-[42%] -translate-y-1/2 z-20 items-center justify-center w-11 h-11 bg-background/90 backdrop-blur-md border border-rose-100 rounded-full shadow-lg text-neutral-800 hover:bg-primary hover:text-text-secondary transition-all opacity-0 group-hover:opacity-100 duration-300"
            aria-label="Next card"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {DatafaceSkinCareProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'w-8 bg-primary shadow-sm' 
                    : 'w-2 bg-neutral-200 hover:bg-neutral-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}