"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Search, ShoppingCart, Star, Heart, Sparkles } from 'lucide-react';

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

export const faceSkinCareProducts: Product[] = [
  {
    id: 1,
    name: 'Cosrx – Advanced Snail 96 Mucin Power Essence',
    category: 'Face Care, Essence & Serum',
    brand: 'Cosrx',
    has_variants: false,
    slug: 'cosrx-advanced-snail-96-mucin-power-essence',
    sku: 'COS-01',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60',
    image_variants: {
      medium: 'https://images.unsplash.com/photo-1608248597359-97e3a9f4fb8e?w=500&auto=format&fit=crop&q=60',
    },
    sold_amount: 410,
    review: 4.5,
    retail_price: '2,200 ৳',
    discount_price: '1,650 ৳',
    has_discount: true,
    sale_price: '1,650 ৳',
    stock_qty: 60,
    in_stock: true,
    stock_availability: true,
    weight: 100,
    discount: '-25%',
  },
  {
    id: 2,
    name: 'Beauty of Joseon – Relief Sun: Rice + Probiotics SPF50+',
    category: 'Face Care, Sunscreen',
    brand: 'Beauty of Joseon',
    has_variants: false,
    slug: 'beauty-of-joseon-relief-sun-rice-probiotics-spf50',
    sku: 'BOJ-02',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&auto=format&fit=crop&q=60',
    image_variants: {
      medium: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=60',
    },
    sold_amount: 530,
    review: 4.8,
    retail_price: '1,850 ৳',
    discount_price: '1,480 ৳',
    has_discount: true,
    sale_price: '1,480 ৳',
    stock_qty: 45,
    in_stock: true,
    stock_availability: true,
    weight: 50,
    discount: '-20%',
  },
  {
    id: 3,
    name: 'Anua – Heartleaf 77% Soothing Toner',
    category: 'Face Care, Toner',
    brand: 'Anua',
    has_variants: false,
    slug: 'anua-heartleaf-77-soothing-toner',
    sku: 'ANU-03',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=60',
    image_variants: {
      medium: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&auto=format&fit=crop&q=60',
    },
    sold_amount: 290,
    review: 4.6,
    retail_price: '2,400 ৳',
    discount_price: '1,890 ৳',
    has_discount: true,
    sale_price: '1,890 ৳',
    stock_qty: 30,
    in_stock: true,
    stock_availability: true,
    weight: 250,
    discount: '-21%',
  },
  {
    id: 4,
    name: 'Axis-Y – Dark Spot Correcting Glow Serum',
    category: 'Face Care, Serum',
    brand: 'Axis-Y',
    has_variants: false,
    slug: 'axis-y-dark-spot-correcting-glow-serum',
    sku: 'AXI-04',
    image: 'https://images.unsplash.com/photo-1608248597359-97e3a9f4fb8e?w=500&auto=format&fit=crop&q=60',
    image_variants: {
      medium: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60',
    },
    sold_amount: 480,
    review: 4.7,
    retail_price: '1,750 ৳',
    discount_price: '1,350 ৳',
    has_discount: true,
    sale_price: '1,350 ৳',
    stock_qty: 55,
    in_stock: true,
    stock_availability: true,
    weight: 50,
    discount: '-23%',
  },
  {
    id: 5,
    name: 'Cosrx – Advanced Snail 92 All In One Cream',
    category: 'Face Care, Moisturizer',
    brand: 'Cosrx',
    has_variants: false,
    slug: 'cosrx-advanced-snail-92-all-in-one-cream',
    sku: 'COS-05',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=60',
    image_variants: {
      medium: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&auto=format&fit=crop&q=60',
    },
    sold_amount: 310,
    review: 4.5,
    retail_price: '1,680 ৳',
    discount_price: '880 ৳',
    has_discount: true,
    sale_price: '880 ৳',
    stock_qty: 40,
    in_stock: true,
    stock_availability: true,
    weight: 100,
    discount: '-48%',
  },
  {
    id: 6,
    name: 'Haruharu Wonder – Black Rice Hyaluronic Toner',
    category: 'Face Care, Toner',
    brand: 'Haruharu Wonder',
    has_variants: false,
    slug: 'haruharu-wonder-black-rice-hyaluronic-toner',
    sku: 'HAR-06',
    image: 'https://images.unsplash.com/photo-1608248597359-97e3a9f4fb8e?w=500&auto=format&fit=crop&q=60',
    image_variants: {
      medium: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60',
    },
    sold_amount: 195,
    review: 4.5,
    retail_price: '2,100 ৳',
    discount_price: '1,780 ৳',
    has_discount: true,
    sale_price: '1,780 ৳',
    stock_qty: 25,
    in_stock: true,
    stock_availability: true,
    weight: 150,
    discount: '-15%',
  },
];

export default function FaceAutoCarousel() {
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
          setCurrentIndex((prev) => (prev + 1) % faceSkinCareProducts.length);
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
          return Math.min(faceSkinCareProducts.length - 1, prev + 1);
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
    <>
      <div className="container mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between mb-8 pb-4 border-b border-rose-100">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-rose-50 text-rose-600 rounded-xl shadow-inner">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </span>
          <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 to-rose-900 bg-clip-text text-transparent uppercase">
              FACE CARE COLLECTION
            </h2>
            <p className="text-xs text-neutral-500 font-medium">Elevate your everyday look with premium luxury shades</p>
          </div>
        </div>
        <a
          href="/shop"
          className="text-sm font-semibold text-rose-600 hover:text-rose-700 transition-colors flex items-center gap-1 group bg-rose-50/80 px-4 py-2 rounded-full border border-rose-100 hover:shadow-sm"
        >
          View All <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
        </a>
      </div>

      <div className="relative w-full h-[320px] md:h-[450px] lg:h-[500px] overflow-hidden bg-rose-50 mb-10 shadow-md">
        <img 
            src="https://plain-apac-prod-public.komododecks.com/202610/18/rolR8cdPZG4ubiGbOzfX/image.jpg" 
            alt="Skin Collection Banner" 
            className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent flex flex-col justify-end p-6 md:p-12 lg:p-16">
            {/* Banner text / content */}
        </div>
      </div>
  
      <section className="w-full container mx-auto px-4 md:px-8 lg:px-16 py-10 font-sans">
        <div 
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow */}
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
            {faceSkinCareProducts.map((product) => {
              const isHoveredOrTapped = activeImageState[product.id];
              const activeHoverImage = product.image_variants?.medium && product.image_variants.medium !== "null" 
                ? product.image_variants.medium 
                : product.image;

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
                        className="absolute top-2.5 right-2.5 z-20 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-neutral-500 hover:text-pink-600 hover:bg-white shadow-sm transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Heart size={14} />
                      </button>

                      {/* Main Image */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-all duration-500 group-hover/card:scale-105 ${
                          isHoveredOrTapped ? 'opacity-0' : 'opacity-100 group-hover/card:opacity-0'
                        }`}
                      />

                      {/* Hover/Tapped Variant Image */}
                      {product.image_variants?.medium && product.image_variants.medium !== "null" && (
                        <img
                          src={activeHoverImage}
                          alt={`${product.name} hover`}
                          className={`w-full h-full object-cover absolute inset-0 transition-all duration-500 group-hover/card:scale-105 ${
                            isHoveredOrTapped ? 'opacity-100' : 'opacity-0 group-hover/card:opacity-100'
                          }`}
                        />
                      )}

                      {/* Action Buttons */}
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

          {/* Right Arrow */}
          <button
            onClick={() => scrollManual('right')}
            className="hidden md:flex absolute -right-5 top-[42%] -translate-y-1/2 z-20 items-center justify-center w-11 h-11 bg-white/90 backdrop-blur-md border border-rose-100 rounded-full shadow-lg text-neutral-800 hover:bg-rose-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 duration-300"
            aria-label="Next card"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {faceSkinCareProducts.map((_, index) => (
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