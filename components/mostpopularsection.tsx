"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { Star, ShoppingCart, Search, Heart, Sparkles } from "lucide-react"

interface ImageVariants {
  thumbnail?: string;
  medium?: string;
  large?: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  has_variants: boolean;
  slug: string;
  sku: string;
  image: string;
  image_variants: ImageVariants;
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
  discount?: string; // Added discount percentage property
}

const mostPopularProducts: Product[] = [
  {
    id: 1,
    name: "AXIS-Y – Dark Spot Correcting Glow Serum",
    category: "K-Beauty, Face Serum",
    brand: "AXIS-Y",
    has_variants: true,
    slug: "axis-y-dark-spot-correcting-glow-serum",
    sku: "AXIS-01",
    image: "https://lavishta.com/wp-content/uploads/2025/09/Axis-Y-Dark-Spot-Correcting-Glow-Serum-50ml-2.jpg",
    image_variants: {
      thumbnail: "https://lavishta.com/wp-content/uploads/2025/09/Axis-Y-Dark-Spot-Correcting-Glow-Serum-50ml-2.jpg",
      medium: "https://lavishta.com/wp-content/uploads/2025/09/sXDyM5116y6Ph1FJIHPQ6rSoWf5wi3Tuz0YJ6DUc.jpg",
    },
    sold_amount: 150,
    review: 4.59,
    retail_price: "1,180 ৳",
    discount_price: "210 ৳",
    has_discount: true,
    sale_price: "210 ৳",
    stock_qty: 45,
    in_stock: true,
    stock_availability: true,
    weight: 50,
    discount: "-20%",
  },
  {
    id: 2,
    name: "Cosrx – Acne Pimple Master Patch",
    category: "Sleeping Mask, K-Beauty, Viral",
    brand: "Cosrx",
    has_variants: false,
    slug: "cosrx-acne-pimple-master-patch",
    sku: "COSRX-02",
    image: "https://lavishta.com/wp-content/uploads/2024/12/acne-pimple-master-patch-cosrx-official-2_900x-600x800.webp",
    image_variants: {
      thumbnail: "https://lavishta.com/wp-content/uploads/2024/12/acne-pimple-master-patch-cosrx-official-2_900x-600x800.webp",
      medium: "https://lavishta.com/wp-content/uploads/2024/12/acne-pimple-master-patch-cosrx-official-5_900x.jpg",
    },
    sold_amount: 320,
    review: 4.54,
    retail_price: "420 ৳",
    discount_price: "290 ৳",
    has_discount: true,
    sale_price: "290 ৳",
    stock_qty: 120,
    in_stock: true,
    stock_availability: true,
    weight: 20,
    discount: "-31%",
  },
  {
    id: 3,
    name: "Cosrx – Salicylic Acid Daily Gentle Cleanser",
    category: "K-Beauty, Cleanser",
    brand: "Cosrx",
    has_variants: true,
    slug: "cosrx-salicylic-acid-daily-gentle-cleanser",
    sku: "COSRX-03",
    image: "https://lavishta.com/wp-content/uploads/2025/09/9ba7a3bc5cc4a31210f34b3cfc7bcfe2.jpg_720x720q80.jpg",
    image_variants: {
      thumbnail: "https://lavishta.com/wp-content/uploads/2025/09/9ba7a3bc5cc4a31210f34b3cfc7bcfe2.jpg_720x720q80.jpg",
    },
    sold_amount: 210,
    review: 4.54,
    retail_price: "1,080 ৳",
    discount_price: "550 ৳",
    has_discount: true,
    sale_price: "550 ৳",
    stock_qty: 60,
    in_stock: true,
    stock_availability: true,
    weight: 150,
    discount: "-20%",
  },
  {
    id: 4,
    name: "Beauty Of Joseon – Relief Sun: Rice + Probiotics Spf50+",
    category: "K-Beauty, Sunscreen",
    brand: "Beauty Of Joseon",
    has_variants: true,
    slug: "beauty-of-joseon-relief-sun-rice-probiotics-spf50",
    sku: "BOJ-04",
    image: "https://lavishta.com/wp-content/uploads/2025/09/9702d4a79db6192453e7046be84ad50d-hi.jpg",
    image_variants: {
      thumbnail: "https://lavishta.com/wp-content/uploads/2025/09/9702d4a79db6192453e7046be84ad50d-hi.jpg",
      medium: "https://lavishta.com/wp-content/uploads/2025/02/L_g0198606757-700x700.webp",
    },
    sold_amount: 410,
    review: 4.8,
    retail_price: "1,480 ৳",
    discount_price: "350 ৳",
    has_discount: true,
    sale_price: "350 ৳",
    stock_qty: 85,
    in_stock: true,
    stock_availability: true,
    weight: 50,
    discount: "-27%",
  },
  {
    id: 5,
    name: "Aplb – Glutathione Niacinamide Beauty Tablet 500mg",
    category: "Supplement, K-Beauty",
    brand: "Aplb",
    has_variants: false,
    slug: "aplb-glutathione-niacinamide-beauty-tablet-500mg",
    sku: "APLB-05",
    image: "https://lavishta.com/wp-content/uploads/2025/02/L_g0198606760.webp",
    image_variants: {
      thumbnail: "https://lavishta.com/wp-content/uploads/2025/02/L_g0198606760.webp",
    },
    sold_amount: 90,
    review: 4.0,
    retail_price: "1,100 ৳",
    discount_price: "880 ৳",
    has_discount: true,
    sale_price: "880 ৳",
    stock_qty: 30,
    in_stock: true,
    stock_availability: true,
    weight: 100,
    discount: "-20%",
  },
  {
    id: 6,
    name: "Anua – Heartleaf Pore Control Cleansing Oil",
    category: "K-Beauty, Cleanser",
    brand: "Anua",
    has_variants: true,
    slug: "anua-heartleaf-pore-control-cleansing-oil",
    sku: "ANUA-06",
    image: "https://lavishta.com/wp-content/uploads/2024/12/anua-us-cleanser-200ml-heartleaf-pore-control-cleansing-oil-1161173150.webp",
    image_variants: {
      thumbnail: "https://lavishta.com/wp-content/uploads/2024/12/anua-us-cleanser-200ml-heartleaf-pore-control-cleansing-oil-1161173150.webp",
    },
    sold_amount: 280,
    review: 4.45,
    retail_price: "2,140 ৳",
    discount_price: "540 ৳",
    has_discount: true,
    sale_price: "540 ৳",
    stock_qty: 50,
    in_stock: true,
    stock_availability: true,
    weight: 200,
    discount: "-19%",
  },
  {
    id: 7,
    name: "Cosrx – Advanced Snail 92 All In One Cream",
    category: "K-Beauty, Moisturizer",
    brand: "Cosrx",
    has_variants: true,
    slug: "cosrx-advanced-snail-92-all-in-one-cream",
    sku: "COSRX-07",
    image: "https://lavishta.com/wp-content/uploads/2024/12/KnaLrsJFVItSOlmYfKz8v8auB18tYwTz06WSof5O-700x700.jpg",
    image_variants: {
      thumbnail: "https://lavishta.com/wp-content/uploads/2024/12/KnaLrsJFVItSOlmYfKz8v8auB18tYwTz06WSof5O-700x700.jpg",
    },
    sold_amount: 190,
    review: 4.5,
    retail_price: "1,680 ৳",
    discount_price: "880 ৳",
    has_discount: true,
    sale_price: "880 ৳",
    stock_qty: 40,
    in_stock: true,
    stock_availability: true,
    weight: 100,
    discount: "-25%",
  },
  {
    id: 8,
    name: "Essence – I Love Extreme Crazy Volume Mascara",
    category: "Eyes, Mascara",
    brand: "Essence",
    has_variants: false,
    slug: "essence-i-love-extreme-crazy-volume-mascara",
    sku: "ESS-08",
    image: "https://lavishta.com/wp-content/uploads/2024/12/3-700x700.webp",
    image_variants: {
      thumbnail: "https://lavishta.com/wp-content/uploads/2024/12/3-700x700.webp",
    },
    sold_amount: 340,
    review: 4.4,
    retail_price: "1,060 ৳",
    discount_price: "550 ৳",
    has_discount: true,
    sale_price: "550 ৳",
    stock_qty: 70,
    in_stock: true,
    stock_availability: true,
    weight: 30,
    discount: "-48%",
  },
  {
    id: 9,
    name: "Ordinary – Niacinamide 10% + Zinc 1% – 30ml",
    category: "Skin Care, Face Serum",
    brand: "Ordinary",
    has_variants: false,
    slug: "ordinary-niacinamide-10-zinc-1-30ml",
    sku: "ORD-09",
    image: "https://lavishta.com/wp-content/uploads/2024/12/Screenshot-2026-02-16-221724-700x709.png",
    image_variants: {
      thumbnail: "https://lavishta.com/wp-content/uploads/2024/12/Screenshot-2026-02-16-221724-700x709.png",
    },
    sold_amount: 500,
    review: 4.6,
    retail_price: "1,530 ৳",
    discount_price: "1,220 ৳",
    has_discount: true,
    sale_price: "1,220 ৳",
    stock_qty: 110,
    in_stock: true,
    stock_availability: true,
    weight: 30,
    discount: "-20%",
  },
  {
    id: 10,
    name: "I’m From – Rice Toner",
    category: "K-Beauty, Face Toner",
    brand: "I'm From",
    has_variants: true,
    slug: "im-from-rice-toner",
    sku: "IMF-10",
    image: "https://lavishta.com/wp-content/uploads/2024/12/25b9a8583fc7b7e55fe0d2f51470c335-700x700.jpg",
    image_variants: {
      thumbnail: "https://lavishta.com/wp-content/uploads/2024/12/25b9a8583fc7b7e55fe0d2f51470c335-700x700.jpg",
    },
    sold_amount: 230,
    review: 4.7,
    retail_price: "2,180 ৳",
    discount_price: "680 ৳",
    has_discount: true,
    sale_price: "680 ৳",
    stock_qty: 65,
    in_stock: true,
    stock_availability: true,
    weight: 150,
    discount: "-20%",
  },
]

export function MostPopularSectionExact() {
  return (
    <section className="container mx-auto px-4 md:px-8 lg:px-16 bg-white font-sans py-10">
      
      {/* Section Header with Gorgeous Accent Line */}
      <div className="flex items-end justify-between border-b border-neutral-100 pb-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-pink-600 text-xs font-bold uppercase tracking-widest mb-1">
            <Sparkles size={14} className="animate-pulse" />
            <span>Customer Favorites</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-neutral-900 uppercase">
            Most Popular
          </h2>
        </div>
        <span className="text-xs font-semibold text-neutral-400 hidden sm:inline-block">
          Discover our top-rated cosmetic essentials ✨
        </span>
      </div>

      {/* Grid container with clean modern spacing */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
        {mostPopularProducts.map((product) => {
          const activeHoverImage = product.image_variants?.medium && product.image_variants.medium !== "null" 
            ? product.image_variants.medium 
            : product.image

          return (
            <Card
              key={product.id}
              className="group relative bg-white rounded-2xl border border-neutral-100/80 shadow-sm hover:shadow-xl hover:border-pink-200 flex flex-col justify-between p-3.5 transition-all duration-300 overflow-hidden"
            >
              <div>
                {/* Product Image & Floating Hover Action Hub */}
                <div className="relative w-full aspect-square bg-gradient-to-b from-neutral-50/80 to-neutral-100/50 rounded-xl overflow-hidden mb-3">
                  
                  {/* Discount Badge */}
                  {product.has_discount && product.discount && (
                    <span className="absolute top-2.5 left-2.5 z-20 bg-gradient-to-r from-pink-600 to-rose-500 text-white text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-full shadow-md shadow-pink-500/20">
                      {product.discount}
                    </span>
                  )}

                  {/* Quick Wishlist Icon */}
                  <button 
                    aria-label="Add to wishlist"
                    className="absolute top-2.5 right-2.5 z-20 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-neutral-500 hover:text-pink-600 hover:bg-white shadow-sm transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Search size={14} />
                  </button>
                  
                  {/* Default Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                      product.image_variants?.medium && product.image_variants.medium !== "null" ? "group-hover:opacity-0" : ""
                    }`}
                  />

                  {/* Hover Image */}
                  {product.image_variants?.medium && product.image_variants.medium !== "null" && (
                    <img
                      src={activeHoverImage}
                      alt={`${product.name} hover`}
                      className="w-full h-full object-cover absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                    />
                  )}

                  {/* Floating Action Buttons Hub */}
                  <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2 md:opacity-0 md:group-hover/card:opacity-100 transition-all duration-300 md:transform md:translate-y-2 md:group-hover/card:translate-y-0 z-20 px-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); alert(`Added to cart: ${product.name}`); }}
                      aria-label="Add to cart" 
                      className="w-8 h-8 md:w-10 md:h-10 bg-white/95 backdrop-blur text-neutral-800 hover:bg-rose-600 hover:text-white rounded-full flex items-center justify-center shadow-md transition-all transform hover:scale-105"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); alert(`Quick view: ${product.name}`); }}
                      aria-label="Quick search view" 
                      className="w-8 h-8 md:w-10 md:h-10 bg-white/95 backdrop-blur text-neutral-800 hover:bg-rose-600 hover:text-white rounded-full flex items-center justify-center shadow-md transition-all transform hover:scale-105"
                    >
                      <Heart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-1.5 text-left px-1">
                  
                  {/* Categories & Brand text */}
                  <p className="text-[10px] sm:text-[10px] md:text-xs  text-pink-600 font-semibold tracking-wider uppercase truncate">
                    {product.brand} • {product.category.split(',')[0]}
                  </p>

                  {/* Title */}
                  <h3 className="text-xs sm:text-xs md:text-[17px] font-bold text-neutral-800 line-clamp-2 leading-relaxed hover:text-pink-600 transition-colors">
                    <a href={`/product/${product.slug}`}>{product.name}</a>
                  </h3>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 pt-0.5">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.review)
                              ? "fill-amber-400 text-amber-400"
                              : "text-neutral-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-neutral-400 font-medium">({product.review})</span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs sm:text-sm font-bold text-neutral-900">
                      {product.sale_price}
                    </span>
                    {product.retail_price && (
                      <span className="text-[11px] text-neutral-400 line-through font-normal">
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
  )
}