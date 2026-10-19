'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Star, 
  ShieldCheck, 
  Zap, 
  ShoppingCart, 
  ChevronRight,
  Minus,
  Plus
} from 'lucide-react';
import { ALL_PRODUCTS } from '@/lib/DataALLProducts';

export interface ImageVariants {
  thumbnail?: string;
  medium?: string;
  large?: string;
}

export interface Product {
  id: number | string;
  name: string;
  category: string;
  brand: string;
  has_variants: boolean;
  slug: string;
  sku: string;
  image: string;
  image_variants: ImageVariants;
  sold_amount: number;
  review: number;
  retail_price: string;
  discount_price?: string;
  sale_price: string;
  has_discount: boolean;
  stock_qty: number;
  in_stock: boolean;
  stock_availability: boolean;
  weight: number;
  discount?: string;
}

export default function ClientProductView({ product }: { product: Product | undefined }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'info' | 'description' | 'reviews' | 'shipping'>('description');

  // Guard clause if product is undefined
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-4 text-center">
        <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
        <p className="text-gray-500 mb-6 text-sm">The product you are looking for doesn't exist.</p>
        <Link href="/" className="bg-red-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-red-700 transition shadow-sm">
          Back to Home
        </Link>
      </div>
    );
  }

  const incrementQty = () => setQuantity(q => q + 1);
  const decrementQty = () => setQuantity(q => Math.max(1, q - 1));

  const activeImageSrc = 
    product.image_variants?.medium || 
    product.image_variants?.thumbnail || 
    product.image || 
    '/placeholder.jpg';

  const parsePrice = (priceStr?: string) => {
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
  };

  const retailNum = parsePrice(product.retail_price);
  const saleNum = parsePrice(product.discount_price || product.sale_price);
  const savings = retailNum > saleNum ? retailNum - saleNum : 0;

  // Filter related products safely
  const relatedProducts: Product[] = (ALL_PRODUCTS as Product[]).filter(
    (p) => p && p.slug !== product.slug && (p.category === product.category || p.brand === product.brand)
  ).slice(0, 4);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 pb-16">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-red-500">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
        <Link href="/shop" className="hover:text-red-500">{product.category || 'Shop'}</Link>
        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="text-gray-800 font-medium truncate max-w-[200px] sm:max-w-none">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Left Column: Product Image Gallery */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="relative aspect-square w-full bg-gray-50 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center p-2">
            {product.has_discount && product.discount && (
              <span className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                {product.discount}
              </span>
            )}
            <img
              src={activeImageSrc} 
              alt={product.name}
              className="object-contain w-full h-full max-h-[450px]"
            />
          </div>
        </div>

        {/* Right Column: Product Core Details & Purchase Options */}
        <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-5">
          <div>
            <span className="text-xs font-semibold tracking-wider text-red-600 uppercase">{product.brand}</span>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1 leading-snug">{product.name}</h1>
          </div>

          {/* Rating & Sold Counter */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-1 text-amber-500 font-semibold bg-amber-50 px-2.5 py-1 rounded-md">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{product.review?.toFixed(1) || '0.0'}</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-gray-600 font-medium">{product.sold_amount || 0} sold</span>
          </div>

          {/* Stock & Authenticity Flags */}
          <div className="flex flex-col gap-2 bg-red-50/50 border border-red-100 p-3 rounded-lg text-xs font-medium text-red-700">
            {product.stock_qty <= 10 && product.in_stock && (
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-red-500 fill-red-500 animate-pulse flex-shrink-0" />
                <span>Very few units left at this price ({product.stock_qty} left)</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-emerald-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>100% Authenticity guaranteed</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-950">{product.discount_price || product.sale_price}</span>
            {product.has_discount && product.retail_price && (
              <>
                <span className="text-base sm:text-lg text-gray-400 line-through">{product.retail_price}</span>
                <span className="text-xs sm:text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Save ৳ {savings}</span>
              </>
            )}
          </div>

          <hr className="border-gray-100 my-1" />

          {/* Quantity Controls & Action Buttons */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm">
                <button 
                  onClick={decrementQty}
                  className="px-3.5 py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 transition"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 sm:w-12 text-center font-semibold text-sm">{quantity}</span>
                <button 
                  onClick={incrementQty}
                  className="px-3.5 py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 transition"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button 
                disabled={!product.in_stock}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-semibold py-3 px-4 sm:px-6 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" />
                {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>

            <button 
              disabled={!product.in_stock}
              className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-xl shadow-sm transition text-sm sm:text-base cursor-pointer"
            >
              Buy Now
            </button>

            {/* Quick Order Links */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2">
              <a 
                href="https://whatsapp.com" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium transition text-center"
              >
                Order on WhatsApp
              </a>
              <a 
                href="https://m.me" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium transition text-center"
              >
                Order on Messenger
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex border-b border-gray-200 gap-4 sm:gap-8 overflow-x-auto scrollbar-none">
          <button 
            onClick={() => setActiveTab('description')}
            className={`pb-3 font-semibold text-xs sm:text-base border-b-2 transition whitespace-nowrap cursor-pointer ${activeTab === 'description' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            Description
          </button>
          <button 
            onClick={() => setActiveTab('info')}
            className={`pb-3 font-semibold text-xs sm:text-base border-b-2 transition whitespace-nowrap cursor-pointer ${activeTab === 'info' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            Additional Info
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 font-semibold text-xs sm:text-base border-b-2 transition whitespace-nowrap cursor-pointer ${activeTab === 'reviews' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            Customer Reviews
          </button>
          <button 
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 font-semibold text-xs sm:text-base border-b-2 transition whitespace-nowrap cursor-pointer ${activeTab === 'shipping' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            Shipping & Return
          </button>
        </div>

        <div className="bg-white p-5 sm:p-8 rounded-b-2xl shadow-sm border-x border-b border-gray-100 mt-0 text-sm sm:text-base">
          {activeTab === 'description' && (
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h3 className="font-bold text-gray-900 text-base sm:text-lg">{product.name}</h3>
              <p>
                Experience superior skin care with authentic products sourced directly from premium brands. Formulated by <strong>{product.brand}</strong> under category <span className="text-red-600 font-medium">{product.category}</span>, this item guarantees maximum results for your daily cosmetic regimen.
              </p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mt-4 space-y-2">
                <h4 className="font-semibold text-gray-900 text-sm">Key Highlights:</h4>
                <ul className="list-disc pl-5 text-xs sm:text-sm space-y-1 text-gray-600">
                  <li>Dermatologically tested and safe for regular application.</li>
                  <li>Lightweight texture with fast-absorbing properties.</li>
                  <li>Long-lasting protection and deep nourishment.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'info' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-medium text-gray-500 w-1/3">Category</td>
                    <td className="py-3 text-gray-900">{product.category}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-medium text-gray-500">SKU</td>
                    <td className="py-3 text-gray-900">{product.sku}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-medium text-gray-500">Weight / Volume</td>
                    <td className="py-3 text-gray-900">{product.weight}g</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-medium text-gray-500">Brand</td>
                    <td className="py-3 text-gray-900 font-semibold">{product.brand}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-medium text-gray-500">Stock Status</td>
                    <td className="py-3 text-emerald-600 font-medium">{product.in_stock ? 'In Stock' : 'Out of Stock'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-center px-2">
                  <span className="text-3xl font-extrabold text-gray-900">{product.review || '5.0'}</span>
                  <div className="flex text-amber-400 justify-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="border-l border-gray-200 pl-4 text-xs sm:text-sm">
                  <p className="font-semibold text-gray-900">Verified Customer Score</p>
                  <p className="text-gray-500">Based on recent purchases and user ratings.</p>
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm italic">"Amazing authentic product! Saw visible changes within a week of regular use." — Verified Buyer</p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 text-xs sm:text-sm text-gray-700">
              <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">Delivery & Return Policy</h4>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                <li><strong>Inside Dhaka:</strong> Delivery within 24–48 hours. Flat shipping charge: ৳60.</li>
                <li><strong>Outside Dhaka:</strong> Delivery within 3–5 days via secure courier. Flat shipping charge: ৳120.</li>
                <li><strong>Returns:</strong> 7-day hassle-free replacement or return window if the product seal remains undamaged.</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mt-12">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Related Products</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {relatedProducts.map((item: Product) => (
              <div 
                key={item.id} 
                className="bg-white border border-gray-100 rounded-2xl p-3 sm:p-4 hover:shadow-md transition flex flex-col justify-between group relative overflow-hidden"
              >
                {item.has_discount && item.discount && (
                  <span className="absolute top-2.5 left-2.5 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {item.discount}
                  </span>
                )}
                
                <Link href={`/products/${item.slug}`}>
                  <div className="aspect-square bg-gray-50 rounded-xl mb-3 flex items-center justify-center overflow-hidden relative p-2">
                    <img 
                      src={item.image || item.image_variants?.medium} 
                      alt={item.name} 
                      className="object-contain w-full h-full group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-red-600 uppercase tracking-wide block">{item.brand}</span>
                  <h4 className="font-medium text-xs sm:text-sm text-gray-800 group-hover:text-red-600 transition line-clamp-2 mt-0.5">
                    {item.name}
                  </h4>
                </Link>

                <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-extrabold text-gray-900 text-xs sm:text-sm">
                      {item.discount_price || item.sale_price}
                    </span>
                    {item.has_discount && item.retail_price && (
                      <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                        {item.retail_price}
                      </span>
                    )}
                  </div>
                  
                  <Link 
                    href={`/products/${item.slug}`}
                    className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white p-2 rounded-xl transition shadow-sm"
                    aria-label="View product"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}