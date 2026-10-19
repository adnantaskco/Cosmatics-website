"use client"
import React, { useState } from 'react';

// 1. Define the interface for your props
interface BeforeAfterSectionProps {
  beforeImage: string;
  afterImage: string;
}

// 2. Apply the interface to the component parameters
export default function BeforeAfterSection({ beforeImage, afterImage }: BeforeAfterSectionProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section className="w-full container mx-auto px-4 md:px-8 lg:px-16 py-6 sm:py-5 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      
      {/* Left: Interactive Image Slider */}
      <div className="relative w-full h-[350px] sm:h-[450px] lg:h-[500px] overflow-hidden rounded-2xl shadow-xl select-none">
        
        {/* After Image (Base / Background) */}
        <img 
          src={afterImage} 
          alt="After skincare treatment" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <span className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-black/60 text-white text-[10px] sm:text-xs tracking-widest uppercase px-2.5 py-1 sm:px-3 sm:py-1.5 rounded backdrop-blur-sm z-10">
          After
        </span>

        {/* Before Image (Clipped Foreground) */}
        <div 
          className="absolute inset-y-0 left-0 overflow-hidden z-20"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={beforeImage} 
            alt="Before skincare treatment" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <span className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-black/60 text-white text-[10px] sm:text-xs tracking-widest uppercase px-2.5 py-1 sm:px-3 sm:py-1.5 rounded backdrop-blur-sm">
            Before
          </span>
        </div>

        {/* Invisible Range Input for Dragging/Sliding */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          aria-label="Percent of before photo shown"
          className="absolute inset-0 w-full h-full opacity-0 z-40 cursor-ew-resize m-0"
        />

        {/* Custom Divider Line & Handle Button */}
        <div 
          className="absolute inset-y-0 w-1 bg-white z-30 pointer-events-none -translate-x-1/2 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white text-neutral-800 rounded-full flex items-center justify-center font-bold shadow-md text-xs sm:text-sm">
            ↔
          </div>
        </div>

      </div>

      {/* Right: Text and Content */}
      <div className="flex flex-col items-start text-left">
        <span className="text-xs sm:text-sm md:text-base font-extrabold tracking-widest bg-gradient-to-r from-neutral-900 to-rose-900 bg-clip-text text-transparent uppercase mb-2">
          Smart Comparison
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-neutral-900 tracking-tight leading-tight mb-4 sm:mb-6">
          See The Difference In Ingredients And Results
        </h2>
        <p className="text-neutral-600 text-xs sm:text-sm lg:text-base leading-relaxed mb-6 sm:mb-8">
          See how our formulas stand out through a clear, side-by-side comparison of ingredients, benefits, and performance you can trust.
        </p>
        <a 
          href="#shop" 
          className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-medium uppercase tracking-wider px-6 py-3 sm:px-8 sm:py-4 rounded-md transition-colors"
        >
          Shop Now &rarr;
        </a>
      </div>

    </section>
  );
}