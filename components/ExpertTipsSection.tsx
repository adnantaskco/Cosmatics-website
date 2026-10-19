"use client"
import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define the interface for an article item
interface Article {
  id: string;
  title: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  link: string;
}

interface ExpertTipsSectionProps {
  articles?: Article[];
}

// Default sample data mimicking the layout
const defaultArticles: Article[] = [
  {
    id: '1',
    title: 'Everyday Glow Up',
    date: 'Oct 13, 2026',
    author: 'Sarah Johnson',
    image:
      'https://binova-vinovatheme.myshopify.com/cdn/shop/articles/Blog12.jpg?v=1776065525&width=580',
    excerpt:
      'Discover simple beauty routines and everyday makeup tips to enhance your natural glow and boost your confidence.',
    link: '#read-more',
  },
  {
    id: '2',
    title: 'The Ultimate Skincare Routine',
    date: 'Oct 14, 2026',
    author: 'Emily Carter',
    image:
      'https://binova-vinovatheme.myshopify.com/cdn/shop/articles/Blog11.jpg?v=1776909329&width=580',
    excerpt:
      'Learn how to build an effective skincare routine with cleansing, moisturizing, and sun protection for healthy-looking skin.',
    link: '#read-more',
  },
  {
    id: '3',
    title: 'Your Guide to Clean Beauty',
    date: 'Oct 15, 2026',
    author: 'Olivia Bennett',
    image:
      'https://binova-vinovatheme.myshopify.com/cdn/shop/articles/Blog10.jpg?v=1776909393&width=1080',
    excerpt:
      'Explore mindful beauty choices, understand product ingredients, and discover how to choose products that suit your skin.',
    link: '#read-more',
  },
  {
    id: '4',
    title: 'Makeup Essentials for Beginners',
    date: 'Oct 16, 2026',
    author: 'Sophia Williams',
    image:
      'https://binova-vinovatheme.myshopify.com/cdn/shop/articles/Blog09.jpg?v=1776065354&width=580',
    excerpt:
      'Discover essential makeup products and beginner-friendly techniques for creating a flawless everyday look.',
    link: '#read-more',
  },
  {
    id: '5',
    title: 'Beauty Trends You Should Know',
    date: 'Oct 17, 2026',
    author: 'Isabella Martin',
    image:
      'https://binova-vinovatheme.myshopify.com/cdn/shop/articles/Blog08.jpg?v=1776065327&width=580',
    excerpt:
      'Stay inspired with fresh beauty ideas, modern makeup looks, and practical tips to refresh your personal style.',
    link: '#read-more',
  },
  {
    id: '6',
    title: 'Self-Care Starts with You',
    date: 'Oct 18, 2026',
    author: 'Ava Thompson',
    image:
      'https://binova-vinovatheme.myshopify.com/cdn/shop/articles/Blog07.jpg?v=1776065307&width=580',
    excerpt:
      'Make time for yourself with simple self-care habits, relaxing beauty rituals, and everyday practices that help you feel refreshed.',
    link: '#read-more',
  },
];

export default function ExpertTipsSection({ articles = defaultArticles }: ExpertTipsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const scrollManual = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector<HTMLElement>(':scope > article')?.offsetWidth || 350;
      const gap = 32; // corresponds to gap-8 (32px)
      const offset = direction === 'left' ? -(cardWidth + gap) : cardWidth + gap;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (scrollRef.current) {
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeftState(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll-fast multiplier
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  // Mouse Wheel Horizontal Scroll Handler
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      if (e.deltaY !== 0) {
        scrollRef.current.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }
  };

  return (
    <section className="container mx-auto px-4 md:px-8 lg:px-16 py-16 text-center relative">
      {/* Section Header */}
      <div className="mb-12 flex items-end justify-between">
        <div className="text-left">
          <span className="text-xs uppercase text-neutral-500 font-medium block mb-2">
            Latest News
          </span>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 to-rose-900 bg-clip-text text-transparent uppercase">
            Expert Tips To Try
          </h2>
        </div>

        {/* Navigation Arrows */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scrollManual('left')}
            className="w-10 h-10 border border-neutral-200 rounded-full flex items-center justify-center text-neutral-800 hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollManual('right')}
            className="w-10 h-10 border border-neutral-200 rounded-full flex items-center justify-center text-neutral-800 hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal X-Axis Scrollable Container with Mouse Drag & Wheel Support */}
      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
        className={`flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 pt-1 no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] ${
          isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
        }`}
      >
        {articles.map((article) => (
          <article 
            key={article.id} 
            className="flex-shrink-0 w-[85%] sm:w-[50%] lg:w-[calc(33.333%-21.33px)] flex flex-col group text-left snap-start pointer-events-auto"
          >
            {/* Image Card Container */}
            <div className="relative overflow-hidden rounded-xl mb-5 aspect-[4/3] bg-neutral-100">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
              />
              {/* Author Badge */}
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-neutral-800 text-[11px] font-medium px-2.5 py-1 rounded shadow-sm">
                {article.author}
              </span>
            </div>

            {/* Metadata (Date) */}
            <div className="text-xs text-neutral-400 mb-2">
              {article.date}
            </div>

            {/* Article Title */}
            <h3 className="text-xl font-normal text-neutral-900 mb-3 group-hover:text-neutral-600 transition-colors">
              <a href={article.link}>
                {article.title}
              </a>
            </h3>

            {/* Excerpt */}
            <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {article.excerpt}
            </p>

            {/* Read More Link */}
            <div>
              <a 
                href={article.link} 
                className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-neutral-900 hover:text-neutral-600 transition-colors"
              >
                Read More ;
              </a>
            </div>

          </article>
        ))}
      </div>
    </section>
  );
}