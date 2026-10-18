"use client";
import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from "@/components/ui/card";

interface NeedThisProduct {
  id: string;
  name: string;
  originalPriceText: string;
  priceText: string;
  imageUrl: string;
  productUrl: string;
}

interface HotDealProduct {
  id: string;
  name: string;
  category: string;
  brand: string;
  originalPriceText: string;
  priceText: string;
  discount: string;
  isNew?: boolean;
  imageUrl: string;
  productUrl: string;
  timer: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

const needThisProducts: NeedThisProduct[] = [
  {
    id: "94",
    name: "Real Technique – Eye-Conic Essentials 5 Piece Brush Set",
    originalPriceText: "3,990 ৳",
    priceText: "3,250 ৳",
    imageUrl: "https://lavishta.com/product/real-technique-eye-conic-essentials-5-piece-brush-set/",
    productUrl: "https://lavishta.com/product/real-technique-eye-conic-essentials-5-piece-brush-set/",
  },
  {
    id: "95",
    name: "Sacheu – Peel Off Lip Liner STAY-N",
    originalPriceText: "1,980 ৳",
    priceText: "1,550 ৳",
    imageUrl: "https://lavishta.com/product/sacheu-peel-off-lip-liner-stay-n/",
    productUrl: "url?id=95",
  },
  {
    id: "96",
    name: "Nyx – Makeup Highlight & Contour Pro Palette",
    originalPriceText: "4,880 ৳",
    priceText: "4,280 ৳",
    imageUrl: "https://lavishta.com/product/nyx-makeup-highlight-contour-pro-palette/",
    productUrl: "https://lavishta.com/product/nyx-makeup-highlight-contour-pro-palette/",
  },
  {
    id: "97",
    name: "Maybelline – Lifter Glaze Lip Balm",
    originalPriceText: "1,850 ৳",
    priceText: "1,420 ৳",
    imageUrl: "https://lavishta.com/product/maybelline-lifter-glaze-lip-balm/",
    productUrl: "https://lavishta.com/shop/skin-care/sleeping-mask/7",
  },
];

const hotDealsProducts: HotDealProduct[] = [
  {
    id: "99",
    name: "Aveeno – Kids Continuous Protection® Lotion Sunscreen with Broad Spectrum, SPF 50 – 88ml",
    category: "Skin Care, Sunscreen",
    brand: "Aveeno",
    originalPriceText: "2,280 ৳",
    priceText: "2,080 ৳",
    discount: "-9%",
    imageUrl: "https://lavishta.com/#main-content00",
    productUrl: "https://lavishta.com/product/aveeno-kids-continuous-protection-lotion-sunscreen-with-broad-spectrum-spf-50-88ml/",
    timer: { days: 0, hours: 0, minutes: 0, seconds: 0 }
  },
  {
    id: "96",
    name: "Nyx – Makeup Highlight & Contour Pro Palette",
    category: "Face, Concealer",
    brand: "Nyx",
    originalPriceText: "4,880 ৳",
    priceText: "4,280 ৳",
    discount: "-12%",
    isNew: true,
    imageUrl: "https://lavishta.com/product/nyx-makeup-highlight-contour-pro-palette/",
    productUrl: "https://lavishta.com/product/nyx-makeup-highlight-contour-pro-palette/",
    timer: { days: 0, hours: 0, minutes: 0, seconds: 0 }
  },
  {
    id: "98",
    name: "BH Cosmetics – Rounded Shader Brush",
    category: "Tool, Brush",
    brand: "Bh Cosmetics",
    originalPriceText: "1,180 ৳",
    priceText: "980 ৳",
    discount: "-17%",
    imageUrl: "https://lavishta.com/shop/skin-care/sleeping-mask/8",
    productUrl: "https://lavishta.com/product/bh-cosmetics-rounded-shader-brush/",
    timer: { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
];

export default function NeedThisAndHotDealsLayout() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Auto-slide effect for HOT DEALS
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % hotDealsProducts.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? hotDealsProducts.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % hotDealsProducts.length);
  };

  const currentDeal = hotDealsProducts[currentIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans">
      
      {/* LEFT COLUMN: You may Need this! Section */}
      <section className="lg:col-span-6 w-full bg-white border border-neutral-200 p-6 flex flex-col">
        <div className="border-b border-neutral-200 pb-3 mb-6">
          <h2 className="text-base font-black tracking-tight text-neutral-900 uppercase">
            You may Need this!
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-neutral-100">
          {needThisProducts.map((item) => (
            <div key={item.id} className="py-3.5 flex items-center gap-4 group">
              <div className="w-16 h-16 bg-neutral-50 flex-shrink-0 flex items-center justify-center overflow-hidden rounded border border-neutral-100">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="object-contain h-full w-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col flex-grow">
                <h3 className="text-xs font-medium text-neutral-800 hover:text-[#D90452] transition-colors line-clamp-2">
                  <a href={item.productUrl}>{item.name}</a>
                </h3>

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-neutral-400 line-through">{item.originalPriceText}</span>
                  <span className="text-xs font-bold text-[#D90452]">{item.priceText}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RIGHT COLUMN: HOT DEALS Section with Auto Carousel */}
      <section className="lg:col-span-6 w-full bg-white border border-neutral-200 p-6 flex flex-col group">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-neutral-200">
          <h2 className="text-base font-black tracking-tight text-neutral-900 uppercase">
            HOT DEALS
          </h2>
          <div className="flex items-center gap-1 text-neutral-600">
            <button 
              onClick={handlePrev}
              aria-label="Previous slide" 
              className="p-1 hover:text-[#D90452] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={handleNext}
              aria-label="Next slide" 
              className="p-1 hover:text-[#D90452] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <Card className="relative bg-white rounded-none border-0 shadow-none flex flex-col justify-between p-0 h-full">
          <div className="relative">
            <div className="absolute top-2 left-2 z-20 flex flex-col gap-1 items-start">
              <span className="bg-[#D90452] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm">
                {currentDeal.discount}
              </span>
              {currentDeal.isNew && (
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                  NEW
                </span>
              )}
            </div>

            <div className="relative w-full aspect-[4/3] bg-neutral-50 overflow-hidden mb-4 flex items-center justify-center rounded">
              <img
                src={currentDeal.imageUrl}
                alt={currentDeal.name}
                className="object-contain h-full w-full transition-transform duration-500 hover:scale-105"
              />

              <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/40 via-black/10 to-transparent flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <button aria-label="Add to cart" className="w-8 h-8 bg-white text-neutral-800 hover:bg-[#D90452] hover:text-white rounded-full flex items-center justify-center shadow-md transition-colors">
                  <ShoppingCart className="w-3.5 h-3.5" />
                </button>
                <button aria-label="Quick search view" className="w-8 h-8 bg-white text-neutral-800 hover:bg-[#D90452] hover:text-white rounded-full flex items-center justify-center shadow-md transition-colors">
                  <Search className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-1 text-center">
              <p className="text-[11px] text-neutral-400 font-light truncate">{currentDeal.category}</p>
              
              <h3 className="text-xs font-medium text-neutral-800 line-clamp-2 leading-snug hover:text-[#D90452] transition-colors">
                <a href={currentDeal.productUrl}>{currentDeal.name}</a>
              </h3>

              <p className="text-[11px] text-neutral-500 font-light truncate">{currentDeal.brand}</p>

              <div className="flex items-center justify-center gap-2 pt-1">
                <span className="text-xs text-neutral-400 line-through">{currentDeal.originalPriceText}</span>
                <span className="text-sm font-bold text-[#D90452]">{currentDeal.priceText}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-center gap-1.5 text-center text-xs font-bold text-neutral-800">
            <div className="flex items-center gap-0.5">
              <span className="font-extrabold text-neutral-900">{currentDeal.timer.days}</span>
              <span className="text-[10px] text-neutral-500 font-normal">Days</span>
            </div>
            <span>:</span>
            <div className="flex items-center gap-0.5">
              <span className="font-extrabold text-neutral-900">{String(currentDeal.timer.hours).padStart(2, '0')}</span>
              <span className="text-[10px] text-neutral-500 font-normal">Hr</span>
            </div>
            <span>:</span>
            <div className="flex items-center gap-0.5">
              <span className="font-extrabold text-neutral-900">{String(currentDeal.timer.minutes).padStart(2, '0')}</span>
              <span className="text-[10px] text-neutral-500 font-normal">Min</span>
            </div>
            <span>:</span>
            <div className="flex items-center gap-0.5">
              <span className="font-extrabold text-neutral-900">{String(currentDeal.timer.seconds).padStart(2, '0')}</span>
              <span className="text-[10px] text-neutral-500 font-normal">Sc</span>
            </div>
          </div>
        </Card>
      </section>

    </div>
  );
}
