"use client"
import React, { useState } from 'react';
import { 
  FiMenu, FiX, FiChevronDown, FiSearch, FiShoppingBag, 
  FiPhoneCall, FiHeart, FiUser, FiArrowRight
} from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function Navbar() {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Skin Care');

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

  return (
    <header className="w-full bg-white font-sans relative">
      
      {/* 1st Section: Promotional Announcement Bar */}
      <div className="w-full bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 text-[10px] sm:text-[11px] font-medium tracking-wider sm:tracking-widest text-white text-center py-2 px-3 uppercase">
        ✨ Free Shipping on Orders Over ৳1,500 + Code: <span className="font-bold underline">GLOW20</span> ✨
      </div>

      {/* 2nd Section: Top Utility Bar */}
      <div className="w-full bg-gray-50 border-b border-gray-100 text-[11px] text-gray-500 py-1.5 hidden md:block">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 flex justify-between items-center">
          <div className="flex items-center gap-4 text-gray-600">
            <span className="flex items-center gap-1.5 font-medium">
              <FiPhoneCall size={12} className="text-pink-600" /> +880 1601 212-340
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-gray-600">
              <a href="#facebook" className="hover:text-pink-600 transition"><FaFacebookF size={11} /></a>
              <a href="#instagram" className="hover:text-pink-600 transition"><FaInstagram size={11} /></a>
              <a href="#tiktok" className="hover:text-pink-600 transition"><FaTiktok size={11} /></a>
            </div>
            <span className="text-gray-300">|</span>
            <a href="#login" className="hover:text-pink-600 transition font-semibold flex items-center gap-1.5 tracking-wider">
              <FiUser size={12} /> ACCOUNT / REGISTER
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Main Header Container */}
      <div className="sticky top-0 z-[100] bg-white shadow-sm w-full">
        
        {/* 3rd Section: Main Brand Row & Search */}
        <div className="w-full py-3.5 sm:py-4 border-b border-gray-100/60 bg-white">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between gap-3 sm:gap-6">
            
            {/* Mobile Menu Trigger & Logo */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-pink-600 transition"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>

              <div className="text-2xl sm:text-3xl font-extrabold tracking-widest text-gray-900 cursor-pointer flex items-center gap-1">
                TASKCO<span className="text-pink-600 text-xl sm:text-2xl">.</span>
              </div>
            </div>

            {/* Desktop Search Bar */}
            <div className="w-full flex-1 max-w-xl relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search for luxury cosmetics, skincare, brands..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-full px-5 py-2.5 text-xs focus:outline-none focus:border-pink-500 focus:bg-white transition shadow-inner"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-600 transition">
                <FiSearch size={16} />
              </button>
            </div>

            {/* Right Icons: Wishlist & Cart Button */}
            <div className="flex items-center gap-2.5 sm:gap-4">
              <a href="#wishlist" className="relative p-2 rounded-full hover:bg-pink-50 text-gray-700 transition hidden sm:flex items-center justify-center">
                <FiHeart size={20} />
                <span className="absolute top-0 right-0 bg-pink-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
              </a>

              <a 
                href="#cart" 
                className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-500 text-white px-3.5 sm:px-4 py-2 rounded-full shadow-md shadow-pink-600/20 hover:shadow-lg hover:from-pink-700 hover:to-rose-600 transition-all cursor-pointer"
              >
                <div className="relative">
                  <FiShoppingBag className="text-white" size={17} />
                  <span className="absolute -top-1.5 -right-2 bg-neutral-900 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white">0</span>
                </div>
                {/* <span className="text-xs font-bold tracking-wide inline">
                  0 <span className="hidden sm:inline font-medium opacity-90">items</span>
                </span> */}
              </a>
            </div>

          </div>

          {/* Mobile Search Bar Row */}
          <div className="container mx-auto px-4 pt-3 md:hidden">
            <div className="w-full relative">
              <input 
                type="text" 
                placeholder="Search cosmetics, skincare, brands..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-pink-500 transition"
              />
              <button className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <FiSearch size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* 4th Section: Navigation Links & Responsive Categories Dropdown Bar (Desktop) */}
        <div className="w-full bg-white py-2 hidden lg:block border-b border-gray-100">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between gap-4">
            
            {/* Fully Responsive Browse Categories Flyout Button */}
            <div 
              className="relative w-64 xl:w-72 flex-shrink-0"
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <button className="w-full bg-gradient-to-r from-gray-900 via-gray-900 to-pink-950 text-white font-bold text-xs uppercase px-4 xl:px-5 py-3.5 flex items-center justify-between rounded-xl shadow-lg shadow-pink-950/10 hover:shadow-pink-600/20 hover:from-pink-600 hover:to-rose-600 transition-all duration-300 ring-1 ring-pink-500/20 cursor-pointer group">
                <div className="flex items-center gap-2.5 tracking-wider truncate">
                  <div className="w-6 h-6 xl:w-7 xl:h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:rotate-90 transition-transform duration-300">
                    <FiMenu size={14} className="text-pink-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="bg-gradient-to-r from-white via-gray-100 to-pink-200 bg-clip-text text-transparent font-extrabold truncate">BROWSE CATEGORIES</span>
                </div>
                <FiChevronDown size={14} className={`transform transition-transform duration-300 text-pink-300 flex-shrink-0 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoriesOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-2xl border border-gray-100 z-50 flex rounded-b-xl overflow-hidden mt-1">
                  <ul className="w-full py-2 text-xs font-medium text-gray-800">
                    {Object.keys(categorySubMenus).map((cat, idx) => (
                      <li 
                        key={idx}
                        onMouseEnter={() => setActiveCategory(cat)}
                        className={`px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-pink-50 hover:text-pink-600 transition ${activeCategory === cat ? 'bg-pink-50 text-pink-600 font-semibold' : ''}`}
                      >
                        <span className="truncate">{cat}</span>
                        <span className="text-gray-400 text-[10px]">&gt;</span>
                      </li>
                    ))}
                  </ul>

                  {categorySubMenus[activeCategory] && (
                    <div className="absolute left-full top-0 w-64 bg-white shadow-2xl border border-gray-100 p-5 h-full min-h-[400px] z-50">
                      <h5 className="font-bold text-xs text-gray-900 mb-3 border-b border-gray-100 pb-2 uppercase tracking-wider text-pink-600">{activeCategory}</h5>
                      <ul className="space-y-2.5 text-xs text-gray-600">
                        {categorySubMenus[activeCategory].map((sub, sIdx) => (
                          <li key={sIdx}>
                            <a href={`#${sub.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-pink-600 hover:translate-x-1 transition-all block py-0.5">• {sub}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Primary Navbar Links */}
            <nav className="flex items-center gap-6 xl:gap-8 font-semibold text-xs tracking-widest text-gray-800 py-2">
              <a href="#home" className="hover:text-pink-600 transition py-1 border-b-2 border-pink-600">HOME</a>
              
              {/* SHOP Mega Menu */}
              <div 
                className="relative py-1"
                onMouseEnter={() => setIsShopOpen(true)}
                onMouseLeave={() => setIsShopOpen(false)}
              >
                <a href="#shop" className="flex items-center gap-1.5 hover:text-pink-600 transition cursor-pointer">
                  SHOP <FiChevronDown size={14} className={`transform transition-transform ${isShopOpen ? 'rotate-180' : ''}`} />
                </a>

                {isShopOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1000px] bg-white shadow-2xl border border-gray-100 p-8 grid grid-cols-5 gap-6 z-50 rounded-lg">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase border-b border-gray-100 pb-2 text-pink-600">Skin Care</h4>
                      <ul className="space-y-2 text-xs text-gray-600">
                        {categorySubMenus["Skin Care"].slice(0, 6).map((item, idx) => (
                          <li key={idx}><a href={`#${item}`} className="hover:text-pink-600 transition block">{item}</a></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase border-b border-gray-100 pb-2 text-pink-600">Face Makeup</h4>
                      <ul className="space-y-2 text-xs text-gray-600">
                        {categorySubMenus["Face"].slice(0, 6).map((item, idx) => (
                          <li key={idx}><a href={`#${item}`} className="hover:text-pink-600 transition block">{item}</a></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase border-b border-gray-100 pb-2 text-pink-600">K-Beauty</h4>
                      <ul className="space-y-2 text-xs text-gray-600">
                        {categorySubMenus["K-Beauty"].slice(0, 6).map((item, idx) => (
                          <li key={idx}><a href={`#${item}`} className="hover:text-pink-600 transition block">{item}</a></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase border-b border-gray-100 pb-2 text-pink-600">Eyes & Lips</h4>
                      <ul className="space-y-2 text-xs text-gray-600">
                        {categorySubMenus["Eyes"].slice(0, 3).map((item, idx) => (
                          <li key={idx}><a href={`#${item}`} className="hover:text-pink-600 transition block">{item}</a></li>
                        ))}
                        {categorySubMenus["Lips"].slice(0, 3).map((item, idx) => (
                          <li key={idx}><a href={`#${item}`} className="hover:text-pink-600 transition block">{item}</a></li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-pink-50/50 p-4 rounded-md flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase border-b border-pink-100 pb-2 text-pink-700">Special Sale</h4>
                        <p className="text-[11px] text-gray-600 mb-3">Explore curated K-Beauty routines and viral cosmetic sets with special discounts.</p>
                      </div>
                      <a href="#sale" className="text-xs font-bold text-pink-600 hover:underline flex items-center gap-1">Shop Deals <FiArrowRight size={12}/></a>
                    </div>
                  </div>
                )}
              </div>

              {/* BRANDS Dropdown Menu */}
              <div 
                className="relative py-1"
                onMouseEnter={() => setIsBrandsOpen(true)}
                onMouseLeave={() => setIsBrandsOpen(false)}
              >
                <a href="#brands" className="flex items-center gap-1.5 hover:text-pink-600 transition cursor-pointer">
                  BRANDS <FiChevronDown size={14} className={`transform transition-transform ${isBrandsOpen ? 'rotate-180' : ''}`} />
                </a>

                {isBrandsOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[750px] bg-white shadow-2xl border border-gray-100 p-8 grid grid-cols-3 gap-6 z-50 rounded-lg">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase border-b border-gray-100 pb-2 text-pink-600">K-Beauty Icons</h4>
                      <ul className="space-y-2 text-xs text-gray-600">
                        {brandColumns.col1.map((brand, idx) => (
                          <li key={idx}><a href={`#${brand.toLowerCase()}`} className="hover:text-pink-600 transition block font-medium">{brand}</a></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase border-b border-gray-100 pb-2 text-pink-600">Luxury & Skincare</h4>
                      <ul className="space-y-2 text-xs text-gray-600">
                        {brandColumns.col2.map((brand, idx) => (
                          <li key={idx}><a href={`#${brand.toLowerCase()}`} className="hover:text-pink-600 transition block font-medium">{brand}</a></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase border-b border-gray-100 pb-2 text-pink-600">Trendy Makeup</h4>
                      <ul className="space-y-2 text-xs text-gray-600">
                        {brandColumns.col3.map((brand, idx) => (
                          <li key={idx}><a href={`#${brand.toLowerCase()}`} className="hover:text-pink-600 transition block font-medium">{brand}</a></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <a href="#k-beauty" className="hover:text-pink-600 transition py-1 text-pink-600 font-bold">K-BEAUTY ✨</a>
              <a href="#contact" className="hover:text-pink-600 transition py-1">CONTACT US</a>
            </nav>

            <div className="text-xs text-gray-500 font-medium hidden xl:block">
              <span>🔥 100% Authentic Store</span>
            </div>

          </div>
        </div>

      </div>

      {/* Mobile Navigation Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-[150] lg:hidden flex">
          <div className="w-[85%] max-w-sm bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <span className="text-xl font-extrabold tracking-widest text-gray-900">LAVISHTA<span className="text-pink-600">.</span></span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500">
                  <FiX size={20} />
                </button>
              </div>

              <nav className="space-y-4 text-sm font-bold text-gray-800">
                <a href="#home" className="block py-2 hover:text-pink-600">HOME</a>
                <a href="#shop" className="block py-2 hover:text-pink-600">SHOP</a>
                <a href="#brands" className="block py-2 hover:text-pink-600">BRANDS</a>
                <a href="#k-beauty" className="block py-2 text-pink-600">K-BEAUTY ✨</a>
                <a href="#contact" className="block py-2 hover:text-pink-600">CONTACT US</a>
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">Categories</h4>
                <ul className="space-y-2.5 text-xs text-gray-600">
                  {Object.keys(categorySubMenus).map((cat, idx) => (
                    <li key={idx}><a href={`#${cat}`} className="hover:text-pink-600 font-medium block">{cat}</a></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-500">
              <p className="font-semibold text-gray-700 mb-2">Need Help? +880 1601 212-340</p>
              <a href="#account" className="text-pink-600 font-bold flex items-center gap-1.5"><FiUser size={13}/> Account / Register</a>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)}></div>
        </div>
      )}

    </header>
  );
}