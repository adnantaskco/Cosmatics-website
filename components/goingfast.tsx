import React from 'react';
import { Star } from 'lucide-react';

const products = [
  {
    id: 78,
    name: "Medicube – Fresh That Lasts Deodorant with Vanilla & Pistachio",
    category: "K-Beauty, Body",
    discount: "-7%",
    priceText: "780 ৳ – 2,280 ৳",
    primaryImage: "https://lavishta.com/product/medicube-fresh-that-lasts-deodorant-with-vanilla-pistachio-83g/",
    hoverImage: "https://lavishta.com/", 
    hasButton: true,
    buttonText: "SELECT OPTIONS",
  },
  {
    id: 80,
    name: "Ordinary – Soothing & Barrier Support Serum",
    category: "Skin Care, Face Serum",
    discount: "-14%",
    priceText: "2,480 ৳ – 2,940 ৳",
    primaryImage: "https://lavishta.com/product/ordinary-soothing-barrier-support-serum-30ml/",
    hoverImage: "https://lavishta.com/",
    hasButton: false,
    rating: 4.57,
  },
  {
    id: 81,
    name: "Absolute New york – Master Lift Lash & Brow Mascara – Memb06",
    category: "Eyes, Brow",
    discount: null,
    priceText: "550 ৳",
    primaryImage: "https://lavishta.com/product/absolute-new-york-master-lift-lash-brow-mascara-memb06/",
    hoverImage: "https://lavishta.com/",
    hasButton: false,
  },
  {
    id: 84,
    name: "L’Oreal Paris – Elvive Dream Lengths Air Volume Dry Shampoo – 200ml",
    category: "Hair, Hair Care",
    discount: "-9%",
    originalPrice: "1,400 ৳",
    currentPrice: "1,280 ৳",
    primaryImage: "url?id=84",
    hoverImage: "https://lavishta.com/",
    hasButton: false,
  },
];

export default function GoingFastSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 font-sans">
      {/* Section Header */}
      <div className="border-b border-gray-200 pb-3 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 inline-block relative pb-2 after:content-[''] after:absolute after:bottom-[-13px] after:left-0 after:w-full after:h-[2px] after:bg-pink-600">
          Going Fast
        </h2>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="group relative flex flex-col bg-white border border-gray-100 rounded-lg p-4 transition-shadow hover:shadow-lg"
          >
            {/* Discount Badge */}
            {product.discount && (
              <span className="absolute top-4 left-4 z-20 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded">
                {product.discount}
              </span>
            )}

            {/* Product Image Container with Hover Effects & Action Button */}
            <div className="relative w-full h-64 mb-4 overflow-hidden bg-gray-50 flex items-center justify-center rounded cursor-pointer">
              {/* Primary Image */}
              <img 
                src={product.primaryImage} 
                alt={product.name}
                className="absolute inset-0 object-contain h-full w-full transition-opacity duration-300 group-hover:opacity-0"
              />
              
              {/* Secondary/Hover Image */}
              <img 
                src={product.hoverImage} 
                alt={`${product.name} alternate view`}
                className="absolute inset-0 object-contain h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 scale-105"
              />
              
              {/* Action Button: Visible on Hover for products requiring options */}
              {product.hasButton && (
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2.5 px-4 rounded text-xs tracking-wider uppercase transition-colors shadow-lg">
                    {product.buttonText}
                  </button>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col flex-grow text-center">
              <span className="text-xs text-gray-400 mb-1">
                {product.category}
              </span>

              <h3 className="text-sm font-medium text-gray-800 hover:text-pink-600 cursor-pointer mb-2 line-clamp-2">
                {product.name}
              </h3>

              {product.rating && (
                <div className="flex items-center justify-center gap-1 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">Rated {product.rating} out of 5</span>
                </div>
              )}

              <div className="mt-auto pt-2">
                {product.currentPrice ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-gray-400 line-through text-sm">{product.originalPrice}</span>
                    <span className="text-pink-600 font-bold text-base">{product.currentPrice}</span>
                  </div>
                ) : (
                  <span className="text-pink-600 font-bold text-base">
                    {product.priceText}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}