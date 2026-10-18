"use client"
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Search, ShoppingCart, Star, Heart } from 'lucide-react';

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

const lipProducts: Product[] = [
  {
    id: 135,
    name: "Rare Beauty – Kind Words Matte Lip Liner",
    category: "Lip Liner",
    brand: "Rare Beauty",
    has_variants: true,
    slug: "rare-beauty-kind-words-matte-lip-liner",
    sku: "RB-135",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop",
    image_variants: {
      medium: "https://images.unsplash.com/photo-1625093742435-6fa8994da2bb?q=80&w=600&auto=format&fit=crop"
    },
    sold_amount: 120,
    review: 4.8,
    retail_price: "2,930 ৳",
    discount_price: "2,420 ৳",
    has_discount: true,
    sale_price: "2,420 ৳",
    stock_qty: 40,
    in_stock: true,
    stock_availability: true,
    weight: 15,
    discount: "-17%"
  },
  {
    id: 137,
    name: "Dior – Addict Lip Glow",
    category: "Lip Tints & Balms",
    brand: "Dior",
    has_variants: true,
    slug: "dior-addict-lip-glow",
    sku: "DIOR-137",
    image: "https://images.unsplash.com/photo-1599733589046-10c005739ef9?q=80&w=600&auto=format&fit=crop",
    image_variants: {
      medium: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop"
    },
    sold_amount: 310,
    review: 4.9,
    retail_price: "7,630 ৳",
    discount_price: "6,600 ৳",
    has_discount: true,
    sale_price: "6,600 ৳",
    stock_qty: 25,
    in_stock: true,
    stock_availability: true,
    weight: 20,
    discount: "-13%"
  },
  {
    id: 139,
    name: "Nyx – Lip I.v. Hydrating Lip Gloss Stain",
    category: "Lip Gloss",
    brand: "Nyx",
    has_variants: false,
    slug: "nyx-lip-iv-hydrating-lip-gloss-stain",
    sku: "NYX-139",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
    image_variants: {
      medium: "https://images.unsplash.com/photo-1599733589046-10c005739ef9?q=80&w=600&auto=format&fit=crop"
    },
    sold_amount: 85,
    review: 4.6,
    retail_price: "2,220 ৳",
    discount_price: "2,040 ৳",
    has_discount: true,
    sale_price: "2,040 ৳",
    stock_qty: 50,
    in_stock: true,
    stock_availability: true,
    weight: 25,
    discount: "-8%"
  },
  {
    id: 141,
    name: "Charlotte Tilbury – Lip Cheat",
    category: "Lip Liner",
    brand: "Charlotte Tilbury",
    has_variants: true,
    slug: "charlotte-tilbury-lip-cheat",
    sku: "CT-141",
    image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=600&auto=format&fit=crop",
    image_variants: {
      medium: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop"
    },
    sold_amount: 215,
    review: 4.7,
    retail_price: "4,450 ৳",
    discount_price: "4,150 ৳",
    has_discount: true,
    sale_price: "4,150 ৳",
    stock_qty: 35,
    in_stock: true,
    stock_availability: true,
    weight: 15,
    discount: "-15%"
  },
  {
    id: 142,
    name: "Laneige – S’More Kisses Set",
    category: "Lip Tints & Balms",
    brand: "Laneige",
    has_variants: true,
    slug: "laneige-smore-kisses-set",
    sku: "LAN-142",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop",
    image_variants: {
      medium: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=600&auto=format&fit=crop"
    },
    sold_amount: 98,
    review: 5.0,
    retail_price: "5,900 ৳",
    discount_price: "5,580 ৳",
    has_discount: true,
    sale_price: "5,580 ৳",
    stock_qty: 20,
    in_stock: true,
    stock_availability: true,
    weight: 60,
    discount: "-5%"
  },
  {
    id: 144,
    name: "Too Faced – Melted Matte Longwear Lipstick",
    category: "Lipstick",
    brand: "Too Faced",
    has_variants: false,
    slug: "too-faced-melted-matte-longwear-lipstick",
    sku: "TF-144",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop",
    image_variants: {
      medium: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop"
    },
    sold_amount: 142,
    review: 4.5,
    retail_price: "2,580 ৳",
    discount_price: "1,650 ৳",
    has_discount: true,
    sale_price: "1,650 ৳",
    stock_qty: 30,
    in_stock: true,
    stock_availability: true,
    weight: 30,
    discount: "-65%"
  }
];

export default function LIPAutoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeImageState, setActiveImageState] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const cardWidth = scrollRef.current.querySelector<HTMLElement>(':scope > div')?.offsetWidth || 240;
        const gap = 16;

        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          setCurrentIndex(0);
        } else {
          scrollRef.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
          setCurrentIndex((prev) => (prev + 1) % lipProducts.length);
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const scrollManual = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector<HTMLElement>(':scope > div')?.offsetWidth || 240;
      const gap = 16;
      const offset = direction === 'left' ? -(cardWidth + gap) : cardWidth + gap;
      
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      
      setCurrentIndex((prev) => {
        if (direction === 'left') {
          return Math.max(0, prev - 1);
        } else {
          return Math.min(lipProducts.length - 1, prev + 1);
        }
      });
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector<HTMLElement>(':scope > div')?.offsetWidth || 240;
      const gap = 16;
      scrollRef.current.scrollTo({ left: (cardWidth + gap) * index, behavior: 'smooth' });
      setCurrentIndex(index);
    }
  };

  const toggleMobileImage = (id: number) => {
    setActiveImageState(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full container mx-auto px-4 md:px-8 lg:px-16 py-10">
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
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-1 no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {lipProducts.map((product) => {
            const isHoveredOrTapped = activeImageState[product.id];
            const hasHoverImage = Boolean(product.image_variants?.medium && product.image_variants.medium !== "null");
            const activeHoverImage = hasHoverImage ? product.image_variants.medium : product.image;

            return (
              <div
                key={product.id}
                className="flex-shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] md:w-[calc(25%-12px)] lg:w-[calc(20%-13px)] bg-white border border-neutral-100/80 rounded-2xl shadow-sm hover:shadow-xl hover:border-pink-200 transition-all duration-300 flex flex-col justify-between snap-start group/card relative overflow-hidden p-3.5"
              >
                <div>
                  {/* Product Image Frame */}
                  <div 
                    onClick={() => toggleMobileImage(product.id)}
                    className="relative w-full aspect-square bg-gradient-to-b from-neutral-50/80 to-neutral-100/50 rounded-xl overflow-hidden mb-3 cursor-pointer"
                  >
                    {/* Discount Badge */}
                    {product.has_discount && product.discount && (
                      <span className="absolute top-2.5 left-2.5 z-20 bg-gradient-to-r from-pink-600 to-rose-500 text-white text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-full shadow-md shadow-pink-500/20">
                        {product.discount}
                      </span>
                    )}

                    {/* Quick Wishlist Icon */}
                    <button 
                      aria-label="Add to wishlist"
                      className="absolute top-2.5 right-2.5 z-20 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-neutral-500 hover:text-pink-600 hover:bg-white shadow-sm transition-all opacity-0 group-hover/card:opacity-100"
                    >
                      <Heart size={14} />
                    </button>

                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-cover transition-all duration-500 group-hover/card:scale-105 ${
                        isHoveredOrTapped || !hasHoverImage ? 'opacity-0' : 'opacity-100 group-hover/card:opacity-0'
                      }`}
                    />
                    {hasHoverImage && (
                      <img
                        src={activeHoverImage}
                        alt={`${product.name} hover`}
                        className={`w-full h-full object-cover absolute inset-0 transition-all duration-500 group-hover/card:scale-105 ${
                          isHoveredOrTapped ? 'opacity-100' : 'opacity-0 group-hover/card:opacity-100'
                        }`}
                      />
                    )}

                    {/* Action Buttons Hub */}
                    <div className={`absolute inset-x-0 bottom-3 flex items-center justify-center gap-2 transition-all duration-300 z-20 px-2 ${
                      isHoveredOrTapped 
                        ? 'opacity-100 translate-y-0 pointer-events-auto' 
                        : 'opacity-0 translate-y-2 pointer-events-none md:group-hover/card:opacity-100 md:group-hover/card:translate-y-0 md:group-hover/card:pointer-events-auto'
                    }`}>
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
                        <Search className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Product Information */}
                  <div className="space-y-1.5 text-left px-1">
                    <p className="text-[10px] sm:text-[10px] md:text-xs text-pink-600 font-semibold tracking-wider uppercase truncate">
                      {product.brand} • {product.category.split(',')[0]}
                    </p>
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
              </div>
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
          {lipProducts.map((_, index) => (
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
  );
}