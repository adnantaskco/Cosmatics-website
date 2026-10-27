"use client"
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSection2() {
  const mainBanners = [
    {
      id: 1,
      image: "https://i.pinimg.com/736x/07/14/a8/0714a85f99b9c89ca44564c57468ab0a.jpg",
      title: "Sheer-Mineral-Sunscreen-Face-Drops"
    },
    {
      id: 2,
      image: "https://i.pinimg.com/1200x/63/8d/9e/638d9e0a72c865c558344d179651835d.jpg",
      title: "Daily Dear-Darling-Water-Tint-Cherry"
    },
    {
      id: 3,
      image: "https://i.pinimg.com/736x/98/a5/35/98a535bf77b49a828c1a8390500eace9.jpg",
      title: "Organic Fruits Discount"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

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

  // Drag / Swipe handlers
  const handlePointerDown = (clientX: number) => {
    dragStartX.current = clientX;
    isDragging.current = true;
  };

  const handlePointerUp = (clientX: number) => {
    if (!isDragging.current) return;
    const diff = dragStartX.current - clientX;
    
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    isDragging.current = false;
  };

  return (
    <section className="w-full mx-auto px-4 py-2">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-1.5">

        {/* Left Side Banner */}
        <div className="md:col-span-2 lg:col-span-3 rounded-2xl hidden md:block overflow-hidden  bg-background">
          <img 
            src="https://i.pinimg.com/1200x/7a/23/e6/7a23e61ef01cd3b32e119919eae87535.jpg" 
            alt="App Banner" 
            className="w-full h-full min-h-[30px] max-h-[420px] rounded-2xl "
          />
        </div>

        {/* Center Dynamic Carousel Banner */}
        <div 
          className="md:col-span-2 lg:col-span-6 rounded-2xl overflow-hidden shadow-sm relative group min-h-[30px] max-h-[420px] bg-background cursor-grab active:cursor-grabbing select-none"
          onMouseDown={(e) => handlePointerDown(e.clientX)}
          onMouseUp={(e) => handlePointerUp(e.clientX)}
          onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
          onTouchEnd={(e) => handlePointerUp(e.changedTouches[0].clientX)}
        >
          <div className="w-full h-full">
            <img 
              src={mainBanners[currentIndex].image} 
              alt={mainBanners[currentIndex].title} 
              className="w-full h-full  transition-all duration-500 ease-in-out pointer-events-none rounded-2xl"
            />
          </div>

          {/* Navigation Controls */}
          {/* <button 
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            aria-label="Previous Slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition duration-200 z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            aria-label="Next Slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition duration-200 z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button> */}

          {/* Pagination Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {mainBanners.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'w-6 bg-emerald-600' : 'w-2.5 bg-background/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side Stacked Banners */}
        <div className="md:col-span-4 lg:col-span-3 flex flex-row sm:flex-row lg:flex-col gap-1.5 justify-between">
          <div className="w-1/2 sm:w-1/2 lg:w-full rounded-2xl overflow-hidden shadow-sm bg-background">
            <img
              src="https://i.pinimg.com/736x/f9/6b/3a/f96b3a1b4e1c70342fe50701da3bf7c5.jpg"
              alt="Summer Flavors"
              className="w-full h-32 sm:h-40 md:h-48 lg:h-[208px] object-cover rounded-2xl block"
            />
          </div>

          <div className="w-1/2 sm:w-1/2 lg:w-full rounded-2xl overflow-hidden shadow-sm bg-background">
            <img
              src="https://i.pinimg.com/736x/7e/73/a7/7e73a78478b4dc526453e66411fe6dc5.jpg"
              alt="Fresh Veggies"
              className="w-full h-32 sm:h-40 md:h-48 lg:h-[208px]  rounded-2xl block "
            />
          </div>
        </div>

      </div>
    </section>
  );
}