"use client"
import React, { useState } from 'react';
import { ShoppingCart, Search, Sparkles, Star, Heart, Flame, Zap, Award } from 'lucide-react';
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { useCart } from './context/CartContext';
import ProductCard from './Products/ProductCard';
import { ForYouTabsData } from '@/lib/forYouTabsData';
import TabProductCard from './Products/Tabproductcard';

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
  isNew?: boolean;
  productUrl: string;
}

export default function ForYouTabCarouselSection() {
  // 1. Typed the state using keyof to safely index ForYouTabsData
  const [activeTab, setActiveTab] = useState<keyof typeof ForYouTabsData>("FORYOU");
  
  // 2. Used the correct capitalized variable name matching the import
  const currentProducts = ForYouTabsData[activeTab] || ForYouTabsData["FORYOU"];
  const { addToCart } = useCart();

  const tabs = [
    { key: "FORYOU" as const, label: "For You", icon: Sparkles },
    { key: "NEW" as const, label: "New Arrival", icon: Zap },
    { key: "FEATURED" as const, label: "Featured", icon: Star },
    { key: "TOPSELLERS" as const, label: "Top Sellers", icon: Flame },
  ];

  return (
    <section className="w-full container mx-auto px-4 md:px-8 lg:px-16 py-12 bg-gradient-to-b from-background via-neutral-50/50 to-background">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative"
      >
        {/* Modern Pill-Style Tab Navigation Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 mb-8 border-b border-neutral-200/60 gap-4">
          
          {/* Section Title & Subtitle */}
          <div>
            <div className="flex items-center gap-2 text-primary text-xs font-bold tracking-widest uppercase mb-1">
              <Award className="w-4 h-4" /> Curated Collection
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight">
              Trending Products
            </h2>
          </div>

          {/* Modern Animated Pill Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-100/80 backdrop-blur-md rounded-2xl overflow-x-auto w-full md:w-auto shadow-inner [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 flex items-center gap-2 shrink-0 ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/25 scale-[1.02]"
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/50"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white animate-pulse" : "text-neutral-400"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <CarouselPrevious className="static translate-y-0 h-10 w-10 rounded-full border border-neutral-200 bg-white hover:bg-primary hover:text-white hover:border-primary text-neutral-700 transition-all shadow-sm" />
            <CarouselNext className="static translate-y-0 h-10 w-10 rounded-full border border-neutral-200 bg-white hover:bg-primary hover:text-white hover:border-primary text-neutral-700 transition-all shadow-sm" />
          </div>
        </div>

        {/* Carousel Content Container */}
        <CarouselContent className="-ml-3">
          {currentProducts?.map((product) => (
            <CarouselItem
              key={`${activeTab}-${product.id}`}
              className="basis-1/2 pl-3 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <TabProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}