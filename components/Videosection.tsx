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
        <div className="container mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between mb-8 pb-4 border-b border-rose-100">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-rose-50 text-rose-600 rounded-xl shadow-inner">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 to-rose-900 bg-clip-text text-transparent">
                LIPS CARE COLLECTION
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

        <section className="relative w-full h-[500px] md:h-[400px] overflow-hidden bg-neutral-900">
          {/* Background Video */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          >
            <source src="https://cdn.shopify.com/videos/c/o/v/651918d657ae477e97cc37cccf705bc4.mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Dark Overlay for better contrast */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Interactive Center Play/Pause Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlayPause}
              className="group relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white transition-all duration-300 hover:bg-white/30 hover:scale-105 shadow-lg"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <span className="text-sm font-medium tracking-wider uppercase transition-opacity">
                  Pause
                </span>
              ) : (
                <Play className="w-8 h-8 fill-current ml-1" />
              )}
            </button>
          </div>
        </section>
        <LIPAutoCarousel />
      </div>
    </>
  );
}