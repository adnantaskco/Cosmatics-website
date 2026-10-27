"use client"

import React, { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Star, ShoppingCart, Search, Heart, Sparkles, Clock } from "lucide-react"
import { DataMostPopularProducts } from "@/lib/DataMostPopular"
import { useCart } from "@/components/context/CartContext"
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

export default function MostPopularSectionExact() {
  const [activeCardId, setActiveCardId] = useState<number | null>(null)
  const { addToCart } = useCart()

 
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Persistent countdown timer set for 7 Days using localStorage
  useEffect(() => {
    let storedTarget = localStorage.getItem("special_offer_end_time");
    let targetTime: number;

    const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;

    if (storedTarget) {
      targetTime = parseInt(storedTarget, 10);
    } else {
      targetTime = new Date().getTime() + SEVEN_DAYS_IN_MS;
      localStorage.setItem("special_offer_end_time", targetTime.toString());
    }

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section>
        {/* Gorgeous & Attractive Section Header */}
        <div className="relative bg-foreground text-text-secondary py-12 px-4 text-center overflow-hidden mb-8 ">
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://plain-apac-prod-public.komododecks.com/202610/23/FBSy4Ml3wWtI8o9lYXmp/image.jpg')`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-wide uppercase">
            Flash Sale! 7 Days Only
          </h1>

          <div className="flex items-center justify-center gap-2 text-destructive font-semibold text-sm sm:text-base uppercase tracking-wider">
            <Clock className="w-5 h-5 animate-pulse" />
            <span>Offer Ends In:</span>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex justify-center items-center gap-2 sm:gap-4 pt-1">
            <div className="flex flex-col items-center bg-foreground/60 backdrop-blur-md px-3 sm:px-4 py-2 rounded-lg border border-white/20 min-w-[60px] sm:min-w-[70px]">
              <span className="text-xl sm:text-3xl font-extrabold text-text-secondary">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs text-ring uppercase font-medium">
                Days
              </span>
            </div>
            <span className="text-xl sm:text-3xl font-bold text-text-secondary/80">:</span>

            <div className="flex flex-col items-center bg-foreground/60 backdrop-blur-md px-3 sm:px-4 py-2 rounded-lg border border-white/20 min-w-[60px] sm:min-w-[70px]">
              <span className="text-xl sm:text-3xl font-extrabold text-text-secondary">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs text-ring uppercase font-medium">
                Hours
              </span>
            </div>
            <span className="text-xl sm:text-3xl font-bold text-text-secondary/80">:</span>

            <div className="flex flex-col items-center bg-foreground/60 backdrop-blur-md px-3 sm:px-4 py-2 rounded-lg border border-white/20 min-w-[60px] sm:min-w-[70px]">
              <span className="text-xl sm:text-3xl font-extrabold text-text-secondary">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs text-ring uppercase font-medium">
                Mins
              </span>
            </div>
            <span className="text-xl sm:text-3xl font-bold text-text-secondary/80">:</span>

            <div className="flex flex-col items-center bg-foreground/60 backdrop-blur-md px-3 sm:px-4 py-2 rounded-lg border border-white/20 min-w-[60px] sm:min-w-[70px]">
              <span className="text-xl sm:text-3xl font-extrabold text-destructive">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs text-ring uppercase font-medium">
                Secs
              </span>
            </div>
          </div>
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