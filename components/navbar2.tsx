"use client";
import React, { useState, useRef, useEffect } from 'react';
import { 
  FiMenu, FiX, FiChevronDown, FiSearch, FiShoppingBag, 
  FiPhoneCall, FiHeart, FiUser, FiArrowRight,
  FiChevronRight,
  FiArrowUpRight
} from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import Link from 'next/link';
import { Mail, MessageCircle, ShoppingCart } from 'lucide-react';
import { ALL_PRODUCTS } from '@/lib/DataALLProducts';

export default function Navbar() {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Skin Care');
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);

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

  // Filter products based on search query
  const filteredProducts = searchQuery.trim() === '' 
    ? [] 
    : ALL_PRODUCTS?.filter((product: any) => 
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5) || [];

  // Close search dropdown when clicking outside
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
    <header className="w-full bg-background relative">
      
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
      <div className="w-full bg-background  relative z-50">
        
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
                            <p className="text-[11px] text-primary font-semibold">৳ {product.price}</p>
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

            {/* Right Icons */}
            <div className="flex items-center gap-2.5 sm:gap-4">
              <a href="/wishlist" className="relative p-2 rounded-full hover:bg-primary/5 text-text-primary transition hidden sm:flex items-center justify-center">
                <FiHeart size={20} />
                <span className="absolute top-0 right-0 bg-primary text-text-secondary text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
              </a>

              {/* Menu Dropdown Container */}
              <div 
                className="relative"
                onMouseEnter={() => setIsMoreOpen(true)}
                onMouseLeave={() => setIsMoreOpen(false)}
              >
                <div className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary text-text-secondary px-3.5 sm:px-4 py-2 rounded-full shadow-md shadow-primary/20 hover:shadow-lg hover:from-pink-700 hover:to-rose-600 transition-all cursor-pointer">
                  <span className="text-xs font-bold tracking-wide">Menu</span>
                  <FiChevronDown size={14} className={`transform transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
                </div>

                {isMoreOpen && (
                  <div className="absolute top-full right-0 z-[9999] pt-1.5 w-56">
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

          {/* Mobile Active Search Row */}
          <div className="container mx-auto px-4 pt-3 md:hidden">
            <form onSubmit={handleSearch} className="w-full relative flex items-center">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cosmetics, skincare, brands..." 
                className="w-full bg-ring/5 border border-gray-200 rounded-full px-4 py-2 text-xs text-text-primary focus:outline-none focus:border-primary/50 transition"
              />
              <button type="submit" aria-label="Search" className="absolute right-3.5 text-ring p-1">
                <FiSearch size={15} />
              </button>
            </form>
          </div>
        </div>

        {/* 4th Section: Navigation Links & Browse Categories Dropdown Bar (Desktop) */}
        <div className="w-full bg-background py-2 hidden lg:block border-b border-ring/10">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between gap-4">
            
            {/* Browse Categories Flyout */}
            <div
              className="relative w-64 xl:w-72 flex-shrink-0 z-50"
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsCategoriesOpen((prev) => !prev)}
                aria-expanded={isCategoriesOpen}
                className="group relative flex w-full items-center justify-between overflow-hidden rounded-xl bg-gradient-to-r from-gray-950 via-gray-900 to-pink-950 px-4 xl:px-5 py-3.5 text-text-secondary shadow-lg shadow-pink-950/15 ring-1 ring-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-rose-600/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <span className="relative flex min-w-0 items-center gap-2.5">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-background/10 ring-1 ring-white/10 transition-all duration-300 group-hover:rotate-90 group-hover:bg-primary">
                    <FiMenu size={15} className="text-primary/20 group-hover:text-text-secondary" />
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
                                  className="flex min-w-0 flex-1 items-center gap-2.5 py-3 pl-3 pr-1 text-xs font-semibold"
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
                                className="group/sub flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-xs font-medium text-ring transition-all duration-200 hover:translate-x-1 hover:bg-primary/5 hover:text-primary"
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
            <nav className="flex items-center gap-6 xl:gap-8 font-semibold text-xs tracking-widest text-text-primary py-2">
              <Link href="/" className="hover:text-primary transition py-1 border-b-2 border-primary">HOME</Link>
              
              {/* SHOP Mega Menu */}
              <div 
                className="relative py-1"
                onMouseEnter={() => setIsShopOpen(true)}
                onMouseLeave={() => setIsShopOpen(false)}
              >
                <Link href="/shop" className="flex items-center gap-1.5 hover:text-primary transition cursor-pointer">
                  SHOP <FiChevronDown size={14} className={`transform transition-transform ${isShopOpen ? 'rotate-180' : ''}`} />
                </Link>

                {isShopOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1000px] bg-white shadow-2xl border border-ring/10 p-8 grid grid-cols-5 gap-6 z-50 rounded-lg">
                    <div>
                      <h4 className="font-bold  mb-3 text-xs tracking-wider uppercase border-b border-ring/10 pb-2 text-primary">Skin Care</h4>
                      <ul className="space-y-2 text-xs text-gray-600">
                        {categorySubMenus["Skin Care"].slice(0, 6).map((item, idx) => (
                          <li key={idx}><Link href={`/shop/${item.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-primary transition block">{item}</Link></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold  mb-3 text-xs tracking-wider uppercase border-b border-ring/10 pb-2 text-primary">Face Makeup</h4>
                      <ul className="space-y-2 text-xs text-gray-600">
                        {categorySubMenus["Face"].slice(0, 6).map((item, idx) => (
                          <li key={idx}><Link href={`/shop/${item.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-primary transition block">{item}</Link></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold  mb-3 text-xs tracking-wider uppercase border-b border-ring/10 pb-2 text-primary">K-Beauty</h4>
                      <ul className="space-y-2 text-xs text-gray-600">
                        {categorySubMenus["K-Beauty"].slice(0, 6).map((item, idx) => (
                          <li key={idx}><Link href={`/shop/${item.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-primary transition block">{item}</Link></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold  mb-3 text-xs tracking-wider uppercase border-b border-primary/10 pb-2 ">Eyes & Lips</h4>
                      <ul className="space-y-2 text-xs text-gray-600">
                        {categorySubMenus["Eyes"].slice(0, 3).map((item, idx) => (
                          <li key={idx}><Link href={`/shop/${item.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-primary transition block">{item}</Link></li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-pink-50/50 p-4 rounded-md flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold  mb-3 text-xs tracking-wider uppercase border-b border-primary/10 pb-2 text-primary">Special Sale</h4>
                        <p className="text-[11px] text-ring mb-3">Explore curated K-Beauty routines and viral cosmetic sets.</p>
                      </div>
                      <Link href="/sale" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">Shop Deals <FiArrowRight size={12}/></Link>
                    </div>
                  </div>
                )}
              </div>
              <div 
                className="relative py-1"
                onMouseEnter={() => setIsBrandsOpen(true)}
                onMouseLeave={() => setIsBrandsOpen(false)}
              >
                <a href="#brands" className="flex items-center gap-1.5 hover:text-primary transition cursor-pointer">
                  BRANDS <FiChevronDown size={14} className={`transform transition-transform ${isBrandsOpen ? 'rotate-180' : ''}`} />
                </a>

                {isBrandsOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[750px] bg-background shadow-2xl border border-ring/10 p-8 grid grid-cols-3 gap-6 z-50 rounded-lg">
                    <div>
                      <h4 className="font-bold  mb-3 text-xs tracking-wider uppercase border-b border-ring/10 pb-2 text-primary">K-Beauty Icons</h4>
                      <ul className="space-y-2 text-xs text-gray-600">
                        {brandColumns.col1.map((brand, idx) => (
                          <li key={idx}><a href={`#${brand.toLowerCase()}`} className="hover:text-primary transition block font-medium">{brand}</a></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold  mb-3 text-xs tracking-wider uppercase border-b border-ring/10 pb-2 text-primary">Luxury & Skincare</h4>
                      <ul className="space-y-2 text-xs text-ring">
                        {brandColumns.col2.map((brand, idx) => (
                          <li key={idx}><a href={`#${brand.toLowerCase()}`} className="hover:text-primary transition block font-medium">{brand}</a></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold  mb-3 text-xs tracking-wider uppercase border-b border-ring/10 pb-2 text-primary">Trendy Makeup</h4>
                      <ul className="space-y-2 text-xs text-ring">
                        {brandColumns.col3.map((brand, idx) => (
                          <li key={idx}><a href={`#${brand.toLowerCase()}`} className="hover:text-primary transition block font-medium">{brand}</a></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              <Link href="/k-beauty" className="hover:text-primary transition py-1 text-primary font-bold">K-BEAUTY ✨</Link>
              <Link href="/contactus" className="hover:text-primary transition py-1">CONTACT US</Link>
            </nav>

            <div className="text-xs text-ring font-medium hidden xl:block">
              <span>🔥 100% Authentic Store</span>
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