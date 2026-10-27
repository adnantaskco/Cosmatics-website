"use client";
import React, { useState, useRef, useEffect } from 'react';
import { 
  FiMenu, FiX, FiChevronDown, FiSearch, FiShoppingBag, 
  FiPhoneCall, FiUser, FiArrowRight 
} from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import Link from 'next/link';
import { Mail, MessageCircle, ShoppingCart } from 'lucide-react';
import { ALL_PRODUCTS } from '@/lib/DataALLProducts';
import { useCart } from './context/CartContext';

export default function Navbar() {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Skin Care');
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
   const { cartItems } = useCart();
  
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Safely consume context properties with fallbacks for TypeScript
  const cartContext = useCart() as any;
  const cartList = cartItems.length || [];

  const categorySubMenus: Record<string, string[]> = {
    "Skin Care": ["Face Serum", "Cleanser", "Moisturizer", "Sunscreen", "Face Cream", "Eye Cream", "Lip Care", "Face Toner", "Exfoliators & Scrubs", "Sheet Masks", "Sleeping Masks"],
    "Face": ["Liquid Foundation", "Cushion Foundation", "Concealer", "Color Correcting", "Pressed Powder", "Loose Setting Powder", "Cream Blush", "Powder Blush", "Contour & Bronzer", "Highlighter", "Face Primer", "Setting Spray"],
    "K-Beauty": ["Glass Skin Serums", "Heartleaf Cleansing Oils", "Snail Mucin Creams", "Rice Toners", "Acne Pimple Patches", "Sun Cushions", "Sheet Mask Multipacks", "Lip Tints", "Eye Creams", "Sleeping Packs"],
    "Eyes": ["Lengthening Mascara", "Volumizing Mascara", "Liquid Eyeliner", "Gel Eyeliner", "Eyeshadow Palettes", "Glitter Toppers", "Eyebrow Pencils", "Brow Gels", "Lash Serums", "False Eyelashes"],
    "Lips": ["Matte Lipstick", "Glossy Lip Tint", "Plumping Lip Gloss", "Hydrating Lip Balms", "Peptide Lip Treatments", "Lip Liners", "Lip Oils", "Exfoliating Lip Scrubs"],
    "Tools & Brushes": ["Foundation Brushes", "Blush & Contour Brushes", "Eyeshadow Brush Sets", "Beauty Sponges & Blenders", "Eyelash Curlers", "Face Cleansing Brushes", "Hair Styling Tools", "Makeup Pouches"]
  };

  const brandColumns = {
    col1: ["Axis-Y", "Anua", "Beauty Of Joseon", "Cosrx", "Medicube", "Laneige", "I'm From", "Some By Mi", "Skin1004"],
    col2: ["Huda Beauty", "Rare Beauty", "Charlotte Tilbury", "Mac", "Maybelline", "Nyx", "Ordinary", "Cerave", "Cetaphil"],
    col3: ["Essence", "Catrice", "Wet N Wild", "L.a Girl", "Rimmel", "Peripera", "Rom&nd", "Clio", "Holika Holika"]
  };

  const filteredProducts = searchQuery.trim() === '' 
    ? [] 
    : ALL_PRODUCTS?.filter((product: any) => 
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sale_price?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5) || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchFocused(false);
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

 

  return (
    <header className="w-full bg-background relative z-50">
      
      {/* 1st Section: Promotional Announcement Bar */}
      <div className="w-full bg-gradient-to-r from-primary via-primary/80 to-primary text-[11px] font-semibold tracking-wider text-text-secondary text-center py-2 px-3 uppercase shadow-sm">
        ✨ Free Shipping on Orders Over ৳1,500 + Code: <span className="font-bold underline">GLOW20</span> ✨
      </div>

      {/* 2nd Section: Top Utility Bar */}
      <div className="w-full bg-ring/5 border-b border-ring/20 text-[11px] text-ring py-1.5 hidden md:block">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <FiPhoneCall size={12} className="text-primary" /> +88 01896 263647
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-ring">
              <a href="#facebook" className="hover:text-primary transition"><FaFacebookF size={11} /></a>
              <a href="#instagram" className="hover:text-primary transition"><FaInstagram size={11} /></a>
              <a href="#tiktok" className="hover:text-primary transition"><FaTiktok size={11} /></a>
            </div>
            <span className="text-ring">|</span>
            <Link href="/login" className="hover:text-primary transition font-semibold flex items-center gap-1.5 tracking-wider">
              <FiUser size={12} /> ACCOUNT / REGISTER
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="w-full bg-background relative">
        
        {/* 3rd Section: Main Brand Row & Active Search */}
        <div className="w-full py-3.5 sm:py-4 border-b border-ring/10 bg-background">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between gap-3 sm:gap-6">
            
            {/* Mobile Menu Trigger & Logo */}
            <div className="flex items-center gap-3">
              <button 
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-text-primary hover:text-primary transition focus:outline-none"
                aria-label="Open Mobile Menu"
              >
                <FiMenu size={24} />
              </button>

              <div className="text-2xl sm:text-3xl font-extrabold tracking-widest text-text-primary cursor-pointer flex items-center gap-1">
               <Link href="/">TASKCO</Link> <span className="text-primary text-xl sm:text-2xl">.</span>
              </div>
            </div>

            {/* Desktop Active Search Form with Live Results */}
            <div className="w-full flex-1 max-w-xl relative hidden md:block" ref={searchRef}>
              <form onSubmit={handleSearch} className="relative flex items-center">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search for luxury cosmetics, skincare, brands..." 
                  className="w-full bg-ring/5 border border-gray-200 rounded-full px-5 py-2.5 text-xs text-text-primary focus:outline-none focus:border-primary/50 focus:bg-background transition shadow-inner"
                />
                <button 
                  type="submit"
                  aria-label="Search"
                  className="absolute right-3.5 text-ring hover:text-primary transition p-1.5"
                >
                  <FiSearch size={16} />
                </button>
              </form>

              {/* Live Search Product Dropdown */}
              {isSearchFocused && searchQuery.trim() !== '' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background rounded-2xl shadow-2xl border border-ring/20 overflow-hidden z-50">
                  <div className="p-3 bg-ring/5 border-b border-ring/20 flex justify-between items-center">
                    <span className="text-[11px] font-bold text-ring uppercase tracking-wider">Search Results</span>
                    <span className="text-[11px] text-primary font-semibold">{filteredProducts.length} items found</span>
                  </div>
                  {filteredProducts.length > 0 ? (
                    <div className="divide-y divide-ring/10 max-h-80 overflow-y-auto">
                      {filteredProducts.map((product: any, idx: number) => (
                        <Link 
                          key={idx} 
                          href={`/products/${product.slug}`}
                          onClick={() => setIsSearchFocused(false)}
                          className="flex items-center gap-3 p-3 hover:bg-primary/5 transition"
                        >
                          {product.image && (
                            <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-lg border border-ring/10" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-text-primary truncate">{product.name}</p>
                            <p className="text-[11px] text-primary font-semibold"> {product.sale_price}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-xs text-ring">
                      No products found matching "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Icons: Cart & Hover Menu */}
            <div className="flex items-center gap-3 sm:gap-4">
              
              {/* Cart Button with Dynamic Badge */}
              <Link 
                href="/cart" 
                className="relative p-2 rounded-full hover:bg-primary/5 text-text-primary transition flex items-center justify-center"
                aria-label="View Cart"
              >
                <ShoppingCart size={20} className="text-primary" />
                
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-extrabold shadow-md animate-pulse">
                    {cartList}
                  </span>
              
              </Link>

            {/* Menu Dropdown Container (Hover-Controlled & Click Fallback) */}
            <div
              className="relative"
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={() => setIsMoreOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsMoreOpen((prev) => !prev)}
                className="flex items-center gap-1.5 text-text-secondary sm:gap-2 bg-gradient-to-r from-primary to-primary px-2.5 py-1.5 sm:px-3.5 sm:py-2 md:px-4 rounded-full hover:shadow-lg hover:from-pink-700 hover:to-rose-600 transition-all cursor-pointer focus:outline-none"
              >
                <span className="text-[10px] sm:text-xs font-bold text-text-secondary tracking-wide">
                  Menu
                </span>

                <FiChevronDown
                  size={14}
                  className={`transform transition-transform ${
                    isMoreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isMoreOpen && (
                <div className="absolute right-0 top-full pt-1.5 w-56 z-[9999]">
                  <div className="overflow-hidden rounded-2xl border border-ring/20 bg-background p-1.5 shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150">
                    <Link
                      href="/flash-sales"
                      onClick={() => setIsMoreOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-text-primary hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <FiShoppingBag className="h-4 w-4 text-primary" />
                      <span>Flash Sales</span>
                    </Link>

                    <Link
                      href="/special-offers"
                      onClick={() => setIsMoreOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-text-primary hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <ShoppingCart className="h-4 w-4 text-primary" />
                      <span>Special Offers</span>
                    </Link>

                    <a
                      href="https://wa.me/8801812295539"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMoreOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-text-primary hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <MessageCircle className="h-4 w-4 text-primary" />
                      <span>WhatsApp</span>
                    </a>

                    <Link
                      href="/contactus"
                      onClick={() => setIsMoreOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-text-primary hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <Mail className="h-4 w-4 text-primary" />
                      <span>Contact Us</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            </div>

          </div>

        
         
          {/* Mobile Responsive Search Row */}
          <div className="w-full px-3 pt-3 pb-2 sm:px-4 sm:pt-4 md:hidden">
            <form
              onSubmit={handleSearch}
              className="relative flex w-full items-center"
              role="search"
            >
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cosmetics, skincare, brands..."
                aria-label="Search products, skincare and brands"
                className="h-10 w-full min-w-0 rounded-full border border-gray-200 bg-gray-50/80 pl-4 pr-11 text-xs text-text-primary outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-primary/60 focus:bg-white focus:ring-2 focus:ring-primary/10 min-[375px]:text-sm sm:h-11 sm:pl-5 sm:pr-12"
              />

              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-gray-500 transition-all duration-200 hover:bg-primary/10 hover:text-primary active:scale-95 sm:right-1.5 sm:h-9 sm:w-9"
              >
                <FiSearch className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
              </button>
            </form>
          </div>

        </div>

        {/* 4th Section: Sticky Navigation Links & Browse Categories Dropdown Bar (Desktop) */}
        <div className="w-full bg-background/95 backdrop-blur-md py-2.5 hidden lg:block border-b border-ring/15 sticky top-0 z-40 shadow-sm">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between gap-4">
            
            {/* Browse Categories Flyout */}
            <div
              className="relative w-64 xl:w-72 flex-shrink-0 z-40"
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsCategoriesOpen((prev) => !prev)}
                aria-expanded={isCategoriesOpen}
                className="group relative flex w-full items-center justify-between overflow-hidden rounded-xl bg-gradient-to-r from-gray-950 via-gray-900 to-pink-950 px-4 xl:px-5 py-3 text-text-secondary shadow-lg shadow-pink-950/15 ring-1 ring-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-rose-600/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <span className="relative flex min-w-0 items-center gap-2.5">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-background/10 ring-1 ring-white/10 transition-all duration-300 group-hover:rotate-90 group-hover:bg-primary">
                    <FiMenu size={15} className="text-white group-hover:text-text-secondary" />
                  </span>

                  <span className="truncate bg-gradient-to-r from-white to-pink-200 bg-clip-text text-xs font-extrabold uppercase tracking-wider text-transparent">
                    Browse Categories
                  </span>
                </span>

                <FiChevronDown
                  size={16}
                  className={`relative flex-shrink-0 text-pink-300 transition-transform duration-300 ${
                    isCategoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isCategoriesOpen && (
                <div className="absolute left-0 top-full z-[100] w-[min(560px,calc(100vw-24px))] pt-2">
                  <div className="relative flex min-h-[300px] overflow-visible rounded-2xl border border-primary/10 bg-background shadow-2xl shadow-gray-950/15">
                    <div className="w-[46%] flex-shrink-0 rounded-l-2xl border-r border-ring/20 bg-gradient-to-b from-white to-rose-50/40 py-3">
                      <div className="mb-2 px-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Explore</p>
                        <p className="mt-1 text-sm font-extrabold text-text-primary">Shop by Category</p>
                      </div>

                      <ul className="space-y-1 px-2">
                        {Object.keys(categorySubMenus).map((cat) => {
                          const isActive = activeCategory === cat;
                          return (
                            <li key={cat}>
                              <div
                                onMouseEnter={() => setActiveCategory(cat)}
                                className={`group/item relative flex items-center justify-between rounded-lg transition-all duration-200 ${
                                  isActive
                                    ? "bg-gradient-to-r from-primary/5 to-rose-100/70 text-primary shadow-sm"
                                    : "text-text-primary hover:bg-primary/5 hover:text-primary"
                                }`}
                              >
                                <Link
                                  href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                                  className="flex min-w-0 flex-1 items-center gap-2.5 py-2.5 pl-3 pr-1 text-xs font-semibold"
                                >
                                  <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full transition-all duration-200 ${isActive ? "scale-125 bg-primary ring-4 ring-pink-100" : "bg-gray-300 group-hover/item:bg-pink-400"}`} />
                                  <span className="truncate">{cat}</span>
                                </Link>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <div className="min-w-0 flex-1 rounded-r-2xl bg-background p-4 sm:p-5">
                      {activeCategory && categorySubMenus[activeCategory] && (
                        <ul className="space-y-1">
                          {categorySubMenus[activeCategory].map((sub) => (
                            <li key={sub}>
                              <Link
                                href={`/category/${activeCategory.toLowerCase().replace(/\s+/g, "-")}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                                className="group/sub flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-xs font-medium text-ring transition-all duration-200 hover:translate-x-1 hover:bg-primary/5 hover:text-primary"
                              >
                                <span className="truncate">{sub}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Primary Navbar Links */}
            <nav className="flex items-center gap-6 xl:gap-8 font-semibold text-xs tracking-widest text-text-primary py-1">
              <Link href="/" className="hover:text-primary transition py-1 ">HOME</Link>
              

            {/* SHOP Mega Menu */}
            <div
              className="relative py-1"
              onMouseEnter={() => setIsShopOpen(true)}
              onMouseLeave={() => setIsShopOpen(false)}
            >
              <Link
                href="/shop"
                aria-haspopup="true"
                aria-expanded={isShopOpen}
                className={`group flex items-center gap-1.5 py-2 font-semibold text-xs tracking-widest transition-colors duration-200 ${
                  isShopOpen ? "text-primary" : "text-gray-800 hover:text-primary"
                }`}
              >
                SHOP

                <FiChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    isShopOpen ? "rotate-180" : ""
                  }`}
                />
              </Link>

              {isShopOpen && (
                <div className="absolute left-1/2 top-full z-50 w-[min(1100px,calc(100vw-32px))] -translate-x-1/2 pt-3">
                  <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.16)]">

                    {/* Menu Content */}
                    <div className="grid grid-cols-5 gap-6 p-7">

                      {/* Skin Care */}
                      <div className="min-w-0">
                        <div className="mb-4 flex items-center gap-2">
                          <span className="h-5 w-1 rounded-full bg-primary" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                            Skin Care
                          </h4>
                        </div>

                        <ul className="space-y-3">
                          {categorySubMenus["Skin Care"].slice(0, 6).map((item, idx) => (
                            <li key={idx}>
                              <Link
                                href={`/shop/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                className="group/link block break-words text-xs leading-5 text-gray-500 transition-colors duration-200 hover:text-primary"
                              >
                                <span className="transition-all duration-200 group-hover/link:pl-1">
                                  {item}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Face Makeup */}
                      <div className="min-w-0">
                        <div className="mb-4 flex items-center gap-2">
                          <span className="h-5 w-1 rounded-full bg-rose-400" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                            Face Makeup
                          </h4>
                        </div>

                        <ul className="space-y-3">
                          {categorySubMenus["Face"].slice(0, 6).map((item, idx) => (
                            <li key={idx}>
                              <Link
                                href={`/shop/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                className="group/link block break-words text-xs leading-5 text-gray-500 transition-colors duration-200 hover:text-primary"
                              >
                                <span className="transition-all duration-200 group-hover/link:pl-1">
                                  {item}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* K-Beauty */}
                      <div className="min-w-0">
                        <div className="mb-4 flex items-center gap-2">
                          <span className="h-5 w-1 rounded-full bg-pink-400" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                            K-Beauty
                          </h4>
                        </div>

                        <ul className="space-y-3">
                          {categorySubMenus["K-Beauty"].slice(0, 6).map((item, idx) => (
                            <li key={idx}>
                              <Link
                                href={`/shop/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                className="group/link block break-words text-xs leading-5 text-gray-500 transition-colors duration-200 hover:text-primary"
                              >
                                <span className="transition-all duration-200 group-hover/link:pl-1">
                                  {item}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Eyes & Lips */}
                      <div className="min-w-0">
                        <div className="mb-4 flex items-center gap-2">
                          <span className="h-5 w-1 rounded-full bg-amber-400" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                            Eyes & Lips
                          </h4>
                        </div>

                        <ul className="space-y-3">
                          {categorySubMenus["Eyes"].slice(0, 6).map((item, idx) => (
                            <li key={idx}>
                              <Link
                                href={`/shop/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                className="group/link block break-words text-xs leading-5 text-gray-500 transition-colors duration-200 hover:text-primary"
                              >
                                <span className="transition-all duration-200 group-hover/link:pl-1">
                                  {item}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Special Sale */}
                      <div className="relative flex min-h-[260px] min-w-0 flex-col justify-between overflow-hidden rounded-xl border border-pink-100 bg-gradient-to-br from-rose-50 via-pink-50 to-white p-4">
                        <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-pink-200/30 blur-2xl" />

                        <div className="relative">
                          <span className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-primary shadow-sm">
                            Special Offer
                          </span>

                          <h4 className="mt-4 text-lg font-extrabold leading-6 tracking-tight text-gray-900">
                            Beauty
                            <br />
                            Deals
                          </h4>

                          <p className="mt-3 text-[11px] leading-5 text-gray-600">
                            Discover your favorites and explore curated K-Beauty routines.
                          </p>
                        </div>

                        <Link
                          href="/sale"
                          className="group/sale relative mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-xs font-bold text-white shadow-md shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                        >
                          Shop Deals
                          <FiArrowRight
                            size={13}
                            className="transition-transform duration-200 group-hover/sale:translate-x-1"
                          />
                        </Link>
                      </div>

                    </div>

                    {/* Bottom Strip */}
                    <div className="flex items-center justify-center gap-2 border-t border-gray-100 bg-gray-50/70 px-5 py-3 text-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <p className="text-[10px] font-medium tracking-wide text-gray-500 sm:text-xs">
                        Discover skincare essentials, makeup favorites & Korean beauty trends
                      </p>
                    </div>

                  </div>
                </div>
              )}
            </div>



          {/* BRANDS Mega Menu */}
          <div
            className="relative py-1"
            onMouseEnter={() => setIsBrandsOpen(true)}
            onMouseLeave={() => setIsBrandsOpen(false)}
          >
            <a
              href="#brands"
              aria-haspopup="true"
              aria-expanded={isBrandsOpen}
              className={`flex items-center gap-1.5 py-2 font-semibold text-xs tracking-widest transition-colors duration-200 ${
                isBrandsOpen ? "text-primary" : "text-gray-800 hover:text-primary"
              }`}
            >
              BRANDS

              <FiChevronDown
                size={14}
                className={`transition-transform duration-300 ${
                  isBrandsOpen ? "rotate-180" : ""
                }`}
              />
            </a>

                          {isBrandsOpen && (
                            <div className="absolute left-1/2 top-full z-50 w-[min(750px,calc(100vw-32px))] -translate-x-1/2 pt-3">
                              <div className="grid grid-cols-3 gap-5 overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.16)] sm:gap-7 sm:p-7">

                                {/* K-Beauty Icons */}
                                <div className="min-w-0">
                                  <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                                    <span className="h-5 w-1 flex-shrink-0 rounded-full bg-primary" />
                                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-900 sm:text-xs">
                                      K-Beauty Icons
                                    </h4>
                                  </div>

                                  <ul className="space-y-3">
                                    {brandColumns.col1.map((brand, idx) => (
                                      <li key={idx}>
                                        <a
                                          href={`/${brand.toLowerCase()}`}
                                          className="group/brand block break-words text-[11px] font-medium leading-5 text-gray-500 transition-colors duration-200 hover:text-primary sm:text-xs"
                                        >
                                          <span className="inline-flex items-center gap-1.5 transition-transform duration-200 group-hover/brand:translate-x-1">
                                            {brand}
                                          </span>
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Luxury & Skincare */}
                                <div className="min-w-0">
                                  <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                                    <span className="h-5 w-1 flex-shrink-0 rounded-full bg-rose-400" />
                                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-900 sm:text-xs">
                                      Luxury & Skincare
                                    </h4>
                                  </div>

                                  <ul className="space-y-3">
                                    {brandColumns.col2.map((brand, idx) => (
                                      <li key={idx}>
                                        <a
                                          href={`/${brand.toLowerCase()}`}
                                          className="group/brand block break-words text-[11px] font-medium leading-5 text-gray-500 transition-colors duration-200 hover:text-primary sm:text-xs"
                                        >
                                          <span className="inline-flex items-center gap-1.5 transition-transform duration-200 group-hover/brand:translate-x-1">
                                            {brand}
                                          </span>
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Trendy Makeup */}
                                <div className="min-w-0">
                                  <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                                    <span className="h-5 w-1 flex-shrink-0 rounded-full bg-amber-400" />
                                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-900 sm:text-xs">
                                      Trendy Makeup
                                    </h4>
                                  </div>

                                  <ul className="space-y-3">
                                    {brandColumns.col3.map((brand, idx) => (
                                      <li key={idx}>
                                        <a
                                          href={`/${brand.toLowerCase()}`}
                                          className="group/brand block break-words text-[11px] font-medium leading-5 text-gray-500 transition-colors duration-200 hover:text-primary sm:text-xs"
                                        >
                                          <span className="inline-flex items-center gap-1.5 transition-transform duration-200 group-hover/brand:translate-x-1">
                                            {brand}
                                          </span>
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                              </div>
                            </div>
                          )}
                        </div>


              <Link href="/k-beauty" className="hover:text-primary transition py-1 text-primary font-bold">K-BEAUTY ✨</Link>
              <Link href="/contactus" className="hover:text-primary transition py-1">CONTACT US</Link>
            </nav>

            <div className="flex items-center gap-2 font-semibold text-sm tracking-widest text-ring">
              <img
                src="https://i.pinimg.com/474x/e7/b5/72/e7b572bfce4096bae0fc40883effedb4.jpg"
                alt="Authentic"
                className="h-12 w-12 shrink-0 object-contain"
              />
              <span>100% Authentic Store</span>
            </div>

          </div>
        </div>

      </div>

      {/* Mobile Navigation Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-foreground/50 z-[200] lg:hidden flex">
          <div className="w-[85%] max-w-sm bg-background h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-ring/20 mb-6">
                <span className="text-xl font-extrabold tracking-widest text-text-primary">TASKCO<span className="text-primary">.</span></span>
                <button 
                  type="button" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="p-2 text-ring hover:text-primary transition"
                  aria-label="Close Menu"
                >
                  <FiX size={22} />
                </button>
              </div>

              <nav className="space-y-4 text-sm font-bold text-text-primary">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-primary">HOME</Link>
                <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-primary">SHOP</Link>
                <Link href="/brands" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-primary">BRANDS</Link>
                <Link href="/k-beauty" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-primary">K-BEAUTY ✨</Link>
                <Link href="/contactus" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-primary">CONTACT US</Link>
              </nav>

              <div className="mt-8 pt-6 border-t border-ring/10">
                <h4 className="font-bold text-xs uppercase tracking-wider text-ring mb-3">Categories</h4>
                <ul className="space-y-2.5 text-xs text-ring">
                  {Object.keys(categorySubMenus).map((cat, idx) => (
                    <li key={idx}>
                      <Link 
                        href={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="hover:text-primary font-medium block py-1"
                      >
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-ring/20 text-xs text-ring">
              <p className="font-semibold text-text-primary mb-2">Need Help? +88 01896 263647</p>
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-primary font-bold flex items-center gap-1.5"><FiUser size={13}/> Account / Register</Link>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)}></div>
        </div>
      )}

    </header>
  );
}