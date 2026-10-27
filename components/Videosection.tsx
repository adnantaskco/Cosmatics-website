"use client";
import React, { useState, useRef } from 'react';
import { Play, Pause, Sparkles } from 'lucide-react';
import LIPAutoCarousel from './Libssection';

export default function VideoHero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <div>
        {/* Glorious Header Banner */}
        {/* <div className="container mx-auto px-4 md:px-8 lg:px-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8 pb-3 md:pb-4 border-b border-rose-100">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-rose-50 text-rose-600 rounded-xl shadow-inner shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <h2 className="text-lg md:text-2xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 to-rose-900 bg-clip-text text-transparent">
                LIPS CARE COLLECTION
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
        </div> */}

        <section className="relative w-full h-[150px] sm:h-[150px] md:h-[350px] overflow-hidden bg-neutral-900">
          {/* Background Video */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full  object-cover opacity-90"
          >
            <source src="https://cdn.shopify.com/videos/c/o/v/651918d657ae477e97cc37cccf705bc4.mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Dark Overlay for better contrast */}
          <div className="absolute inset-0 bg-foreground/10" />

          {/* Interactive Center Play/Pause Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlayPause}
              className="group relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-D
              /20 backdrop-blur-md border border-background/40 text-text-secondary transition-all duration-300 hover:bg-background/30 hover:scale-105 shadow-lg"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <span className="text-xs sm:text-sm font-medium tracking-wider uppercase transition-opacity">
                  Pause
                </span>
              ) : (
                <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
              )}
            </button>
          </div>
        </section>
        <LIPAutoCarousel />
      </div>
    </>
  );
}