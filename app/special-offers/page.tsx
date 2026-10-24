"use client"

import React, { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Star, ShoppingCart, Search, Heart, Sparkles, Clock } from "lucide-react"
import { DataMostPopularProducts } from "@/lib/DataMostPopular"
import { useCart } from "@/components/context/CartContext"

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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-5">
        {DataMostPopularProducts.map((product: Product) => {
          const hasHoverImage =
            Boolean(product.image_variants?.medium) &&
            product.image_variants?.medium !== "null" &&
            product.image_variants?.medium?.trim() !== ""

          const isTouched = activeCardId === product.id

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
              className="group relative bg-background rounded-2xl border border-ring/20 shadow-sm hover:shadow-xl hover:border-primary/50 flex flex-col justify-between p-2.5 md:p-3.5 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div>
                {/* Product Image & Floating Action Hub */}
                <div className="relative w-full aspect-square bg-gradient-to-b from-ring/80 to-ring/50 rounded-xl overflow-hidden mb-2">
                  {/* Discount Badge */}
                  {product.has_discount && product.discount && (
                    <span className="absolute top-2 left-2 z-20 bg-gradient-to-r from-primary to-primary text-text-secondary text-[9px] md:text-[10px] font-extrabold tracking-wider px-1.5 py-0.5 rounded-full shadow-md shadow-pink-500/20">
                      {product.discount}
                    </span>
                  )}

                  {/* Quick Wishlist Icon */}
                  <button
                    aria-label="Add to wishlist"
                    className={`absolute top-2 right-2 z-20 w-7 h-7 bg-background/80 backdrop-blur-md rounded-full flex items-center justify-center text-neutral-500 hover:text-primary hover:bg-background shadow-sm transition-all ${
                      isTouched ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <Search size={12} />
                  </button>

                  {/* Default Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      hasHoverImage
                        ? isTouched
                          ? "opacity-0"
                          : "group-hover:opacity-0"
                        : ""
                    } group-hover:scale-105`}
                  />

                  {/* Hover Image */}
                  {hasHoverImage && product.image_variants?.medium && (
                    <img
                      src={product.image_variants.medium}
                      alt={`${product.name} hover`}
                      className={`w-full h-full object-cover absolute inset-0 transition-all duration-500 group-hover:scale-105 pointer-events-none ${
                        isTouched ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  )}

                  {/* Floating Action Buttons Hub */}
                  <div
                    className={`absolute inset-x-0 bottom-2 flex items-center justify-center gap-1.5 transition-all duration-300 z-20 px-2 ${
                      isTouched
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                    }`}
                  >
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
                      onClick={(event) => {
                        event.stopPropagation()
                        alert(`Quick view: ${product.name}`)
                      }}
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
                    {product.brand} • {product.category.split(",")[0]}
                  </p>

                  <h3 className="text-xs md:text-sm font-bold text-neutral-800 line-clamp-2 leading-snug hover:text-primary transition-colors">
                    <a href={`/products/${product.slug}`}>{product.name}</a>
                  </h3>

                  <div className="flex items-center gap-1 pt-0.5">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-2.5 h-2.5 md:w-3 md:h-3 ${
                            index < Math.floor(product.review)
                              ? "fill-amber-400 text-amber-400"
                              : "text-neutral-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[9px] md:text-[10px] text-neutral-400 font-medium">
                      ({product.review})
                    </span>
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
          )
        })}
      </div>
      </section>
    </>
  )
}