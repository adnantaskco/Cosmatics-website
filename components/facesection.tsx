"use client";
import React, { useState, useEffect, useRef } from 'react';
import { DatafaceSkinCareProducts } from '@/lib/dataface';
import { ChevronLeft, ChevronRight, Search, ShoppingCart, Star, Heart, Sparkles } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { useCart } from './context/CartContext';

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
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const { addToCart } = useCart();

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
      <div className="container mx-auto px-4 md:px-8 lg:px-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8 pb-3 md:pb-4 border-b border-rose-100">
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
      </div>

      <div className="relative w-full h-[150px] sm:h-[150px] md:h-[350px] overflow-hidden bg-background">
        <img 
            src="https://plain-apac-prod-public.komododecks.com/202610/25/aATg33K6tkZEyqpocv4a/image.jpg" 
            alt="Skin Collection Banner" 
            className="absolute inset-0 w-full h-full "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-transparent to-transparent flex flex-col justify-end p-6 md:p-12 lg:p-16">
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
            {DatafaceSkinCareProducts.map((product) => {
              const hasHoverImage = product.image_variants?.medium && 
                                    product.image_variants.medium !== "null" && 
                                    product.image_variants.medium.trim() !== "";

              const isTouched = activeCardId === product.id;
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
                  className="flex-shrink-0 w-[calc(50%-4px)] sm:w-[calc(33.333%-11px)] md:w-[calc(25%-12px)] lg:w-[calc(20%-13px)] group/card relative bg-background rounded-2xl border border-neutral-100/80 shadow-sm hover:shadow-xl hover:border-pink-200 flex flex-col justify-between p-2.5 md:p-3.5 transition-all duration-300 overflow-hidden cursor-pointer snap-start"
                >
                  <div>
                    {/* Product Image & Floating Action Hub */}
                    <div className="relative w-full aspect-square bg-gradient-to-b from-neutral-50/80 to-ring rounded-xl overflow-hidden mb-2">
                      
                      {/* Discount Badge */}
                      {product.has_discount && product.discount && (
                        <span className="absolute top-2 left-2 z-20 bg-gradient-to-r from-primary to-primary/60 text-text-secondary text-[9px] md:text-[10px] font-extrabold tracking-wider px-1.5 py-0.5 rounded-full shadow-md shadow-pink-500/20">
                          {product.discount}
                        </span>
                      )}

                      {/* Quick Wishlist Icon */}
                      <button 
                        aria-label="Add to wishlist"
                        className={`absolute top-2 right-2 z-20 w-7 h-7 bg-background/80 backdrop-blur-md rounded-full flex items-center justify-center text-neutral-500 hover:text-primary hover:bg-background shadow-sm transition-all ${
                          isTouched ? "opacity-100" : "opacity-0 group-hover/card:opacity-100"
                        }`}
                      >
                        <Search size={12} />
                      </button>
                      
                      {/* Default Image */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full  transition-all duration-500 ${
                          hasHoverImage ? (isTouched ? "opacity-0" : "group-hover/card:opacity-0") : ""
                        } group-hover/card:scale-105`}
                      />

                      {/* Hover Image */}
                      {hasHoverImage && product.image_variants?.medium && (
                        <img
                          src={product.image_variants.medium}
                          alt={`${product.name} hover`}
                          className={`w-full h-full  absolute inset-0 transition-all duration-500 group-hover/card:scale-105 pointer-events-none ${
                            isTouched ? "opacity-100" : "opacity-0 group-hover/card:opacity-100"
                          }`}
                        />
                      )}

                      {/* Floating Action Buttons Hub */}
                      <div className={`absolute inset-x-0 bottom-2 flex items-center justify-center gap-1.5 transition-all duration-300 z-20 px-2 ${
                        isTouched ? "opacity-100 transform translate-y-0" : "opacity-0 group-hover/card:opacity-100 transform translate-y-2 group-hover/card:translate-y-0"
                      }`}>
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
                          onClick={(e) => { e.stopPropagation(); alert(`Quick view: ${product.name}`); }}
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
                        {product.brand} • {product.category.split(',')[0]}
                      </p>

                      <h3 className="text-xs md:text-sm font-bold text-neutral-800 line-clamp-2 leading-snug hover:text-primary transition-colors">
                        <a href={`/products/${product.slug}`}>{product.name}</a>
                      </h3>

                      <div className="flex items-center gap-1 pt-0.5">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-2.5 h-2.5 md:w-3 md:h-3 ${
                                i < Math.floor(product.review)
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-neutral-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[9px] md:text-[10px] text-neutral-400 font-medium">({product.review})</span>
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
              );
            })}
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