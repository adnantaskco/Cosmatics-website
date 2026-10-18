"use client";
import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Minus } from 'lucide-react';

export default function CustomerTestimonials() {
 const testimonials = [
  {
    quote: "After using these products consistently, my skin feels noticeably smoother and more balanced. The formulas are lightweight, absorb quickly, and leave my skin hydrated without any heaviness or irritation.",
    name: "Charlesetta R. York",
    location: "From Florida",
    image: "https://binova-vinovatheme.myshopify.com/cdn/shop/files/avatar-1.jpg?v=1776669532&width=380",
  },
  {
    quote: "What impressed me most is how gentle the products are, yet still incredibly effective. My skin looks calmer, healthier, and more radiant over time, even without adding extra steps to my routine.",
    name: "Laura Parker",
    location: "From Ohio",
    image: "https://binova-vinovatheme.myshopify.com/cdn/shop/files/avatar-2.jpg?v=1776669532&width=380",
  },
  {
    quote: "I love how lightweight and soothing the products feel on my skin while still delivering visible results. My complexion feels more balanced, refreshed, and naturally glowing with consistent use.",
    name: "Emily Johnson",
    location: "From Canada",
    image: "https://binova-vinovatheme.myshopify.com/cdn/shop/files/avatar-3.jpg?v=1776669532&width=380",
  },
  {
    quote: "The biggest difference I noticed is how effortlessly the products fit into my routine while improving my skin day after day. My face feels smoother, calmer, and visibly healthier without any irritation.",
    name: "Olivia Smith",
    location: "From USA",
    image: "https://binova-vinovatheme.myshopify.com/cdn/shop/files/avatar-3.jpg?v=1776669532&width=380",
  },
  {
    quote: "What stands out to me most is the perfect balance between gentleness and performance. My skin feels deeply nourished, looks brighter, and maintains a healthy glow without needing complicated skincare steps.",
    name: "Alina M. Foster",
    location: "From California",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
  },
  {
    quote: "I’m amazed at how effective the products are despite feeling so soft and calming on the skin. Over time, my complexion has become clearer, more even, and naturally radiant with very little effort.",
    name: "Camila S. Brooks",
    location: "From Texas",
    image: "https://binova-vinovatheme.myshopify.com/cdn/shop/files/avatar-5.jpg?v=1776669532&width=380",
  },
];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-neutral-50 py-20  ">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
        {/* Main Title */}
        <h2 className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 to-rose-900 bg-clip-text text-transparent uppercase">
          What Our Customers Say
        </h2>
        
        {/* Subtitle */}
        <p className="text-sm text-neutral-500 mb-12">
          Real feedback from customers who trust our beauty essentials.
        </p>

        {/* Carousel Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8   items-stretch">
          {testimonials.map((item, index) => {
            // Simple logic to showcase a dual-card view on desktop like the design
            const isVisible = index === currentIndex || index === (currentIndex + 1) % testimonials.length;
            if (!isVisible) return null;

            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row bg-white rounded-xl shadow-sm border border-neutral-100 p-6 sm:p-8 text-left transition-all duration-300"
              >
                {/* Customer Image */}
                <div className="w-full sm:w-36 h-48 sm:h-auto flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    {/* Stars */}
                    <div className="flex space-x-1 text-neutral-900 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-neutral-900" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 font-normal">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author Details */}
                  <div>
                    <h4 className="font-serif font-medium text-neutral-900 text-sm">
                      {item.name}
                    </h4>
                    <span className="text-xs text-neutral-400">
                      {item.location}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center space-x-4 mt-10">
          <button
            onClick={prevSlide}
            className="text-neutral-400 hover:text-neutral-900 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index
                    ? 'w-6 h-1.5 bg-neutral-900'
                    : 'w-1.5 h-1.5 bg-neutral-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="text-neutral-400 hover:text-neutral-900 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}