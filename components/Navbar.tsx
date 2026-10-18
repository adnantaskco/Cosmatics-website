"use client"
import React, { useState } from 'react';
import { 
  FiMenu, FiChevronDown, FiSearch, FiShoppingBag, 
  FiPhoneCall 
} from 'react-icons/fi';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

export default function Navbar() {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Skin Care');

  // Added Record<string, string[]> type definition here
  const categorySubMenus: Record<string, string[]> = {
    "Skin Care": ["Face Serum", "Cleanser", "Moisturizer", "Sunscreen", "Cream", "Face Care", "Body", "Face Toner", "Treatment", "Eye Care", "Lip Care"],
    "Face": ["Bb & Cc Creams", "Blush", "Bronzer", "Color Correcting", "Concealer", "Contour", "Face Palette", "Face Powder", "Face Primer", "Foundation", "Highlighter", "Setting Spray"],
    "K-Beauty": ["Face Serum", "Cleanser", "Face Care", "Face Toner", "Moisturizer", "Sunscreen", "Body Cream", "Ampoule", "Hair Care", "Treatment"],
    "Eyes": ["Eyeshadow", "Mascara", "Eyeliner", "Brow", "Eye Pencil", "Glitter Eyeshadow", "Eyelashes", "Eye Care", "Lash Primer"],
    "Lips": ["Lipstick", "Lip Liner", "Lip Gloss", "Lip Tints & Balms", "Lip Oil", "Lip Stain", "Lip Plumpers", "Lip Care"],
    "Tool": ["Brush", "Hair tool", "Face Tool", "Brush Sets", "Sponges & Applicators", "Hair Remover Tool"]
  };

  const brandListColumn1 = ["Sheglam", "Absolute New York", "Essence", "Huda Beauty", "Cerave", "Ordinary", "Maybelline", "Aplb", "Colourpop"];
  const brandListColumn2 = ["Mac", "L.a Girl", "Neutrogena", "Nyx", "The Inkey List", "Loreal Paris", "Cetaphil", "Cosrx", "Wet N Wild"];

  return (
    <header className="w-full bg-white shadow-sm relative font-sans">
      
      {/* Top Bar */}
      <div className="w-full bg-white border-b border-gray-100 text-xs text-gray-500 px-4 md:px-12 py-1.5 flex justify-end items-center gap-6">
        <a href="#login" className="hover:text-pink-600 transition font-medium">LOGIN / REGISTER</a>
      </div>

      {/* Main Row: Logo, Nav Links, Support, and Cart */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-6">
        
        {/* Brand Logo */}
        <div className="text-2xl font-black tracking-wider text-gray-900 cursor-pointer">
          LAVISHTA
        </div>

        {/* Center Navigation Links (Home, Shop, Contact Us) */}
        <nav className="hidden md:flex items-center gap-8 font-semibold text-xs tracking-wider text-gray-800">
          <a href="#home" className="hover:text-pink-600 transition">HOME</a>
          
          {/* SHOP Dropdown Wrapper */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setIsShopOpen(true)}
            onMouseLeave={() => setIsShopOpen(false)}
          >
            <a href="#shop" className="flex items-center gap-1 hover:text-pink-600 transition cursor-pointer">
              SHOP <FiChevronDown size={14} className={`transform transition-transform ${isShopOpen ? 'rotate-180' : ''}`} />
            </a>

            {/* Shop Mega Menu Flyout */}
            {isShopOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1200px] bg-white shadow-xl border border-gray-100 p-8 grid grid-cols-6 gap-6 z-50">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase border-b pb-1 flex justify-between items-center">
                    K-Beauty <span className="text-gray-400">&gt;</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-600">
                    {categorySubMenus["K-Beauty"].map((item, idx) => (
                      <li key={idx}><a href={`#${item}`} className="hover:text-pink-600 transition">{item}</a></li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase border-b pb-1 flex justify-between items-center">
                    Skin Care <span className="text-gray-400">&gt;</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-600">
                    {categorySubMenus["Skin Care"].map((item, idx) => (
                      <li key={idx}><a href={`#${item}`} className="hover:text-pink-600 transition">{item}</a></li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase border-b pb-1 flex justify-between items-center">
                    Face <span className="text-gray-400">&gt;</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-600">
                    {categorySubMenus["Face"].map((item, idx) => (
                      <li key={idx}><a href={`#${item}`} className="hover:text-pink-600 transition">{item}</a></li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase border-b pb-1 flex justify-between items-center">
                      Eyes <span className="text-gray-400">&gt;</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-600">
                      {categorySubMenus["Eyes"].slice(0, 6).map((item, idx) => (
                        <li key={idx}><a href={`#${item}`} className="hover:text-pink-600 transition">{item}</a></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase border-b pb-1 flex justify-between items-center">
                      Lips <span className="text-gray-400">&gt;</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-600">
                      {categorySubMenus["Lips"].slice(0, 5).map((item, idx) => (
                        <li key={idx}><a href={`#${item}`} className="hover:text-pink-600 transition">{item}</a></li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase border-b pb-1 flex justify-between items-center">
                    Tool <span className="text-gray-400">&gt;</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-600 mb-4">
                    {categorySubMenus["Tool"].map((item, idx) => (
                      <li key={idx}><a href={`#${item}`} className="hover:text-pink-600 transition">{item}</a></li>
                    ))}
                  </ul>
                  <a href="#all-categories" className="text-xs font-bold text-pink-600 hover:underline">All Categories &gt;</a>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase border-b pb-1">
                    BRANDS
                  </h4>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs text-gray-600">
                    <ul className="space-y-2">
                      {brandListColumn1.map((brand, idx) => (
                        <li key={idx}><a href={`#${brand}`} className="hover:text-pink-600 transition">{brand}</a></li>
                      ))}
                    </ul>
                    <ul className="space-y-2">
                      {brandListColumn2.map((brand, idx) => (
                        <li key={idx}><a href={`#${brand}`} className="hover:text-pink-600 transition">{brand}</a></li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <a href="#all-brands" className="text-xs font-bold text-pink-600 hover:underline">All Brands &gt;</a>
                  </div>
                </div>
              </div>
            )}
          </div>

          <a href="#contact" className="hover:text-pink-600 transition">CONTACT US</a>
        </nav>

        {/* Right Elements (Social Icons) */}
        <div className="flex items-center gap-3">
          <a href="#facebook" className="hover:text-pink-600 transition"><FaFacebookF size={12} /></a>
          <a href="#instagram" className="hover:text-pink-600 transition"><FaInstagram size={12} /></a>
        </div>

      </div>

      {/* Sub-Header Row: Browse Categories Button & Search Bar */}
      <div className="border-t border-gray-100 px-4 md:px-8 py-3 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Browse Categories Dropdown Button */}
          <div 
            className="relative w-full md:w-72"
            onMouseEnter={() => setIsCategoriesOpen(true)}
            onMouseLeave={() => setIsCategoriesOpen(false)}
          >
            <button className="w-full bg-[#E60052] text-white font-bold text-xs uppercase px-4 py-3 flex items-center justify-between rounded shadow-sm hover:bg-[#cc004a] transition cursor-pointer">
              <div className="flex items-center gap-3">
                <FiMenu size={16} />
                <span>BROWSE CATEGORIES</span>
              </div>
              <FiChevronDown size={14} className={`transform transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Browse Categories Flyout Menu */}
            {isCategoriesOpen && (
              <div className="absolute top-full left-0 w-full bg-white shadow-xl border border-gray-100 z-50 flex">
                <ul className="w-full py-2 text-xs font-medium text-gray-800">
                  {Object.keys(categorySubMenus).concat(["Flash Sale", "Accessories", "Hair", "Viral Picks", "J-Beauty", "Viral Makeups", "Makeup Set"]).map((cat, idx) => (
                    <li 
                      key={idx}
                      onMouseEnter={() => setActiveCategory(cat)}
                      className={`px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-pink-50 hover:text-pink-600 transition ${activeCategory === cat ? 'bg-pink-50 text-pink-600' : ''}`}
                    >
                      <span>{cat}</span>
                      <span className="text-gray-400">&gt;</span>
                    </li>
                  ))}
                </ul>

                {categorySubMenus[activeCategory] && (
                  <div className="absolute left-full top-0 w-64 bg-white shadow-xl border border-gray-100 p-4 h-full min-h-[420px] z-50">
                    <h5 className="font-bold text-xs text-gray-900 mb-3 border-b pb-1 uppercase">{activeCategory} Subcategories</h5>
                    <ul className="space-y-2 text-xs text-gray-600">
                      {categorySubMenus[activeCategory].map((sub, sIdx) => (
                        <li key={sIdx}>
                          <a href={`#${sub}`} className="hover:text-pink-600 transition block py-0.5">{sub}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="w-full flex-1 max-w-2xl relative">
            <input 
              type="text" 
              placeholder="Search for products..." 
              className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-xs focus:outline-none focus:border-pink-500 focus:bg-white transition"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-600 transition">
              <FiSearch size={16} />
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-600">
                <FiPhoneCall size={18} />
              </div>
              <div>
                <p className="text-[10px] tracking-wider font-bold text-gray-400 uppercase">24/7 SUPPORT</p>
                <p className="text-xs font-bold text-gray-800">+880 1601 212-340</p>
              </div>
            </div>

            <div className="flex items-center gap-2 cursor-pointer border border-gray-100 px-4 py-2 rounded-full hover:border-pink-200 transition">
              <FiShoppingBag className="text-gray-700" size={18} />
              <span className="text-xs font-medium text-gray-700">0 items <span className="font-bold">0 ৳</span></span>
            </div>
          </div>

        </div>
      </div>

    </header>
  );
}