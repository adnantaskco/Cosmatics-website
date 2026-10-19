"use client"
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Search, ShoppingCart, Sparkles, Star, Heart } from 'lucide-react';
import { Card } from "@/components/ui/card";

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
  discount?: string;
}

const kbeautyProducts: Product[] = [
  {
    id: 201,
    name: "Beauty of Joseon – Relief Sun: Rice + Probiotics SPF50+",
    category: "Sunscreen",
    brand: "Beauty of Joseon",
    has_variants: true,
    slug: "beauty-of-joseon-relief-sun",
    sku: "BOJ-201",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcgTRhThT3T1ck8ZWzpZPYLnyfhxUP7FW3ET839NgsZQ&s=10",
    image_variants: {
      medium: "https://cdn.klassy.com.bd/uploads/products/products/8HiZqCGJ6kkcssVlgypa3lE8gmIin2nAWUCPe4yT.webp"
    },
    sold_amount: 410,
    review: 4.8,
    retail_price: "1,850 ৳",
    discount_price: "1,480 ৳",
    has_discount: true,
    sale_price: "1,480 ৳",
    stock_qty: 85,
    in_stock: true,
    stock_availability: true,
    weight: 50,
    discount: "-20%"
  },
  {
    id: 202,
    name: "Cosrx – Advanced Snail 96 Mucin Power Essence",
    category: "Essence & Serum",
    brand: "Cosrx",
    has_variants: true,
    slug: "cosrx-advanced-snail-96-mucin",
    sku: "COSRX-202",
    image: "https://api.glossit.com.bd/uploads/products/Advanced-Snail-96-Mucin-Power-Essence_34ffbfc2-6740-4ed8-8964-cd106a084f43_1772876269.webp",
    image_variants: {
      medium: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTkTUEpBugdmdtEYXXT6DNyi6GmeV8HKRH16-snvMglw&s=10"
    },
    sold_amount: 320,
    review: 4.5,
    retail_price: "2,200 ৳",
    discount_price: "1,650 ৳",
    has_discount: true,
    sale_price: "1,650 ৳",
    stock_qty: 60,
    in_stock: true,
    stock_availability: true,
    weight: 100,
    discount: "-25%"
  },
  {
    id: 203,
    name: "Anua – Heartleaf 77% Soothing Toner",
    category: "Toner",
    brand: "Anua",
    has_variants: true,
    slug: "anua-heartleaf-77-soothing-toner",
    sku: "ANUA-203",
    image: "https://skincarebd.com/wp-content/uploads/2023/11/anua-heartleaf-77-soothing-toner-mini-size-40ml-bjzqyt.webp",
    image_variants: {
      medium: "https://liraimportltd.com/wp-content/uploads/2025/01/23332-Anua-Heartleaf-77-Percent-Soothing-Toner-40-Ml_1.jpg"
    },
    sold_amount: 280,
    review: 4.6,
    retail_price: "2,400 ৳",
    discount_price: "1,890 ৳",
    has_discount: true,
    sale_price: "1,890 ৳",
    stock_qty: 50,
    in_stock: true,
    stock_availability: true,
    weight: 150,
    discount: "-21%"
  },
  {
    id: 204,
    name: "Axis-Y – Dark Spot Correcting Glow Serum",
    category: "Serum",
    brand: "Axis-Y",
    has_variants: false,
    slug: "axis-y-dark-spot-correcting-glow-serum",
    sku: "AXIS-204",
    image: "https://bk.shajgoj.com/storage/2023/09/AXIS-Y_Dark_Spot_Correcting_Glow_Serum_aa3016a8-b55b-4300-9c6f-0e268d4d09dd_1000x.jpg",
    image_variants: {
      medium: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9et_o2gQRzJoDHNraz87PfX7CY5sWWjpv0hKQqzZhmD3oB6v0cj_bzVY&s=10"
    },
    sold_amount: 150,
    review: 4.7,
    retail_price: "1,750 ৳",
    discount_price: "1,350 ৳",
    has_discount: true,
    sale_price: "1,350 ৳",
    stock_qty: 45,
    in_stock: true,
    stock_availability: true,
    weight: 50,
    discount: "-23%"
  },
  {
    id: 205,
    name: "Laneige – Lip Sleeping Mask (Berry)",
    category: "Lip Care",
    brand: "Laneige",
    has_variants: true,
    slug: "laneige-lip-sleeping-mask",
    sku: "LAN-205",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7d1H7zr20dU2XzUu7zqL2EePRCNzbR1-vZrJnjaeyPFIJPqA80tAXa20&s=10",
    image_variants: {
      medium: "https://us.laneige.com/cdn/shop/files/LSM_Infographic_2000x2000_Ingredient.jpg?v=1783523891&width=1080"
    },
    sold_amount: 310,
    review: 4.9,
    retail_price: "2,600 ৳",
    discount_price: "2,150 ৳",
    has_discount: true,
    sale_price: "2,150 ৳",
    stock_qty: 70,
    in_stock: true,
    stock_availability: true,
    weight: 20,
    discount: "-17%"
  },
  {
    id: 206,
    name: "Haruharu Wonder – Black Rice Hyaluronic Toner",
    category: "Toner",
    brand: "Haruharu Wonder",
    has_variants: true,
    slug: "haruharu-wonder-black-rice-toner",
    sku: "HAR-206",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSUqXkUvBMmdVg1JLL8tKI_dlNTxtxOotR-WOBU7u4uw&s=10",
    image_variants: {
      medium: "https://m.media-amazon.com/images/I/61QyMqTbk7L._AC_UF1000,1000_QL80_.jpg"
    },
    sold_amount: 190,
    review: 4.5,
    retail_price: "2,100 ৳",
    discount_price: "1,780 ৳",
    has_discount: true,
    sale_price: "1,780 ৳",
    stock_qty: 40,
    in_stock: true,
    stock_availability: true,
    weight: 150,
    discount: "-15%"
  }
];

export default function KBeautyAutoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

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
          setCurrentIndex((prev) => (prev + 1) % kbeautyProducts.length);
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
          return Math.min(kbeautyProducts.length - 1, prev + 1);
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
          <span className="p-2 bg-rose-50 text-rose-600 rounded-xl shadow-inner shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </span>
          <div>
            <h2 className="text-lg md:text-2xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 to-rose-900 bg-clip-text text-transparent">
              FACE CARE WITH K-BEAUTY
            </h2>
            <p className="text-xs md:text-sm text-neutral-500 font-medium">Elevate your everyday look with premium luxury shades</p>
          </div>
        </div>
        <a
          href="/shop"
          className="self-start sm:self-auto text-xs md:text-sm font-semibold text-rose-600 hover:text-rose-700 transition-colors flex items-center gap-1 group bg-rose-50/80 px-3.5 py-1.5 md:px-4 md:py-2 rounded-full border border-rose-100 hover:shadow-sm"
        >
          View All <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
        </a>
      </div>

      <div className="relative w-full h-[350px] sm:h-[200px] md:h-[350px] overflow-hidden bg-rose-50 ">
        <img 
            src="https://cdn.lifepharmacy.com/images/09-26/zdkVY81hjRxNBGBnybia4yeGnQj3RyoCECGs4LB3.jpg" 
            alt="K-Beauty Glass Skin Collection Banner" 
            className="absolute inset-0 w-full h-full object-cover object-center"
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
          {/* Left Navigation Arrow */}
          <button
            onClick={() => scrollManual('left')}
            className="hidden md:flex absolute -left-5 top-[42%] -translate-y-1/2 z-20 items-center justify-center w-11 h-11 bg-white/90 backdrop-blur-md border border-rose-100 rounded-full shadow-lg text-neutral-800 hover:bg-rose-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 duration-300"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards Row Container */}
          <div
            ref={scrollRef}
            className="flex gap-2 md:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-1 no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {kbeautyProducts.map((product) => {
              const hasHoverImage = product.image_variants?.medium && 
                                    product.image_variants.medium !== "null" && 
                                    product.image_variants.medium.trim() !== "";

              const isTouched = activeCardId === product.id;

              return (
                <Card
                  key={product.id}
                  onClick={() => setActiveCardId(isTouched ? null : product.id)}
                  className="flex-shrink-0 w-[calc(50%-4px)] sm:w-[calc(33.333%-11px)] md:w-[calc(25%-12px)] lg:w-[calc(20%-13px)] group/card relative bg-white rounded-2xl border border-neutral-100/80 shadow-sm hover:shadow-xl hover:border-pink-200 flex flex-col justify-between p-2.5 md:p-3.5 transition-all duration-300 overflow-hidden cursor-pointer snap-start"
                >
                  <div>
                    {/* Product Image & Floating Action Hub */}
                    <div className="relative w-full aspect-square bg-gradient-to-b from-neutral-50/80 to-neutral-100/50 rounded-xl overflow-hidden mb-2">
                      
                      {/* Discount Badge */}
                      {product.has_discount && product.discount && (
                        <span className="absolute top-2 left-2 z-20 bg-gradient-to-r from-pink-600 to-rose-500 text-white text-[9px] md:text-[10px] font-extrabold tracking-wider px-1.5 py-0.5 rounded-full shadow-md shadow-pink-500/20">
                          {product.discount}
                        </span>
                      )}

                      {/* Quick Wishlist Icon */}
                      <button 
                        aria-label="Add to wishlist"
                        className={`absolute top-2 right-2 z-20 w-7 h-7 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-neutral-500 hover:text-pink-600 hover:bg-white shadow-sm transition-all ${
                          isTouched ? "opacity-100" : "opacity-0 group-hover/card:opacity-100"
                        }`}
                      >
                        <Search size={12} />
                      </button>
                      
                      {/* Default Image */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          hasHoverImage ? (isTouched ? "opacity-0" : "group-hover/card:opacity-0") : ""
                        } group-hover/card:scale-105`}
                      />

                      {/* Hover Image */}
                      {hasHoverImage && product.image_variants?.medium && (
                        <img
                          src={product.image_variants.medium}
                          alt={`${product.name} hover`}
                          className={`w-full h-full object-cover absolute inset-0 transition-all duration-500 group-hover/card:scale-105 pointer-events-none ${
                            isTouched ? "opacity-100" : "opacity-0 group-hover/card:opacity-100"
                          }`}
                        />
                      )}

                      {/* Floating Action Buttons Hub */}
                      <div className={`absolute inset-x-0 bottom-2 flex items-center justify-center gap-1.5 transition-all duration-300 z-20 px-2 ${
                        isTouched ? "opacity-100 transform translate-y-0" : "opacity-0 group-hover/card:opacity-100 transform translate-y-2 group-hover/card:translate-y-0"
                      }`}>
                        <button 
                          onClick={(e) => { e.stopPropagation(); alert(`Added to cart: ${product.name}`); }}
                          aria-label="Add to cart" 
                          className="w-7 h-7 md:w-9 md:h-9 bg-white/95 backdrop-blur text-neutral-800 hover:bg-rose-600 hover:text-white rounded-full flex items-center justify-center shadow-md transition-all transform hover:scale-105"
                        >
                          <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); alert(`Quick view: ${product.name}`); }}
                          aria-label="Quick search view" 
                          className="w-7 h-7 md:w-9 md:h-9 bg-white/95 backdrop-blur text-neutral-800 hover:bg-rose-600 hover:text-white rounded-full flex items-center justify-center shadow-md transition-all transform hover:scale-105"
                        >
                          <Heart className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-0.5 md:space-y-1 text-left px-0.5">
                      <p className="text-[9px] md:text-xs text-pink-600 font-semibold tracking-wider uppercase truncate">
                        {product.brand} • {product.category.split(',')[0]}
                      </p>

                      <h3 className="text-xs md:text-sm font-bold text-neutral-800 line-clamp-2 leading-snug hover:text-pink-600 transition-colors">
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

          {/* Right Navigation Arrow */}
          <button
            onClick={() => scrollManual('right')}
            className="hidden md:flex absolute -right-5 top-[42%] -translate-y-1/2 z-20 items-center justify-center w-11 h-11 bg-white/90 backdrop-blur-md border border-rose-100 rounded-full shadow-lg text-neutral-800 hover:bg-rose-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 duration-300"
            aria-label="Next card"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {kbeautyProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'w-8 bg-rose-600 shadow-sm' 
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