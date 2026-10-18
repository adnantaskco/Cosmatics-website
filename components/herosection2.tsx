"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSection2() {
  // Dynamic banner data array
  const mainBanners = [
    {
      id: 1,
      image: "https://lavishta.com/wp-content/uploads/2024/12/61IjVMs5NMS._SL1000_-700x700.jpg",
      title: "Sheer-Mineral-Sunscreen-Face-Drops",
      link: "/sales/Sheer-Mineral-Sunscreen-Face-Drops"
    },
    {
      id: 2,
      image: "https://lavishta.com/wp-content/uploads/2023/10/Dear-Darling-Water-Tint-Cherry-Ade-RedOrange-Ade-OrangeStrawberry-Ade-Pink.jpg",
      title: "Daily Dear-Darling-Water-Tint-Cherry",
      link: "/categories/Dear-Darling-Water-Tint-Cherry"
    },
    {
      id: 3,
      image: "https://lavishta.com/wp-content/uploads/2026/03/ETUDE_WATER_TINT_COLLECTION.webp",
      title: "Organic Fruits Discount",
      link: "/categories/ETUDE_WATER_TINT_COLLECTION"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? mainBanners.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === mainBanners.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className=" mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4">

        {/* Left Side Banner */}
        <div className="md:col-span-2 lg:col-span-3 rounded-2xl hidden md:block overflow-hidden shadow-sm hover:shadow-md transition">
          <a href="#">
            <img 
              src="https://plain-apac-prod-public.komododecks.com/202610/17/X7tRuRNna7PDGl6iOTam/image.jpg" 
              alt="App Banner" 
              className="w-full h-full  min-h-[30px] max-h-[420px]"
            />
          </a>
        </div>

        {/* Center Dynamic Carousel Banner */}
        <div className="md:col-span-2 lg:col-span-6 rounded-2xl overflow-hidden shadow-sm relative group min-h-[30px] max-h-[420px] bg-gray-100">
          <a href={mainBanners[currentIndex].link} className="block w-full h-full">
            <img 
              src={mainBanners[currentIndex].image} 
              alt={mainBanners[currentIndex].title} 
              className="w-full h-full  transition-all duration-500 ease-in-out"
            />
          </a>

          {/* Navigation Controls */}
          <button 
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Pagination Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {mainBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'w-6 bg-emerald-600' : 'w-2.5 bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

{/* Right Side Stacked Banners */}
<div className="md:col-span-4 lg:col-span-3 flex flex-row sm:flex-row lg:flex-col gap-2 sm:gap-3 lg:gap-4">
  <div className="w-1/2 sm:w-1/2 lg:w-full flex-1 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
    <a href="#" className="block">
      <img
        src="https://lavishta.com/wp-content/uploads/2025/09/fe13a82MAYBE00000380_6.avif"
        alt="Summer Flavors"
        className="w-full h-32 sm:h-40 md:h-48 lg:h-[198px] "
      />
    </a>
  </div>

  <div className="w-1/2 sm:w-1/2 lg:w-full flex-1 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
    <a href="#" className="block">
      <img
        src="https://lavishta.com/wp-content/uploads/2026/03/Lip-Oil-Nourishing-Gloss-GLC728-infographic-01.webp"
        alt="Fresh Veggies"
        className="w-full h-32 sm:h-40 md:h-48 lg:h-[198px] "
      />
    </a>
  </div>
</div>

      </div>
    </section>
  );
}