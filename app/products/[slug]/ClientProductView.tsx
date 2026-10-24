"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Star, 
  ShieldCheck, 
  Zap, 
  ShoppingCart, 
  ChevronRight,
  Minus,
  Plus,
  Check,
  Truck,
  RefreshCw,
  Award,
  Sparkles
} from 'lucide-react';
import { ALL_PRODUCTS } from '@/lib/DataALLProducts';
import { useCart } from '@/components/context/CartContext';

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
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

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

// Handle Add to Cart action with active button state feedback set to 15 seconds
  const handleAddToCart = () => {
    if (!product.in_stock) return;

    addToCart({
      id: Number(product.id), // Fixed by converting id to a number
      name: product.name,
      image: activeImageSrc,
      price: saleNum,
      brand: product.brand || 'General',
      size: `${product.weight}g`,
      quantity: quantity,
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 15000); // 15 seconds timer
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = '/checkout';
  };

  // Filter related products safely
  const relatedProducts: Product[] = (ALL_PRODUCTS as Product[]).filter(
    (p) => p && p.slug !== product.slug && (p.category === product.category || p.brand === product.brand)
  ).slice(0, 4);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 pb-20">
      
      {/* Toast Notification Banner (Active for 15s) */}
      {isAdded && (
        <div className="fixed top-5 right-5 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-3 duration-300 border border-gray-800">
          <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white flex-shrink-0">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <div>
            <p className="text-xs font-bold">Successfully Added to Cart!</p>
            <p className="text-[11px] text-gray-400">({quantity}) {product.name} has been added.</p>
          </div>
          <Link 
            href="/cart" 
            className="ml-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition"
          >
            View Cart
          </Link>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-red-600 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
        <Link href="/shop" className="hover:text-red-600 transition">{product.category || 'Shop'}</Link>
        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
        <span className="text-gray-900 font-semibold truncate max-w-[220px] sm:max-w-none">{product.name}</span>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 bg-white p-5 sm:p-8 lg:p-10 rounded-3xl shadow-sm border border-gray-100">
        
        {/* Left Column: Product Image Gallery */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="relative aspect-square w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden border border-gray-200/80 flex items-center justify-center p-4 group">
            {product.has_discount && product.discount && (
              <span className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-lg tracking-wide uppercase">
                {product.discount} OFF
              </span>
            )}
            <img
              src={activeImageSrc} 
              alt={product.name}
              className="object-contain w-full h-full group-hover:scale-105 transition duration-500"
            />
          </div>

          {/* Value Propositions Grid */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <ShieldCheck className="w-5 h-5 text-red-600 mb-1" />
              <span className="text-[11px] font-bold text-gray-900">100% Authentic</span>
              <span className="text-[10px] text-gray-500">Directly Sourced</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <Truck className="w-5 h-5 text-red-600 mb-1" />
              <span className="text-[11px] font-bold text-gray-900">Fast Delivery</span>
              <span className="text-[10px] text-gray-500">24-48 Hours</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <RefreshCw className="w-5 h-5 text-red-600 mb-1" />
              <span className="text-[11px] font-bold text-gray-900">Easy Returns</span>
              <span className="text-[10px] text-gray-500">7-Day Guarantee</span>
            </div>
          </div>
        </div>

        {/* Right Column: Core Details & Purchase Options */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest text-red-600 uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100">
                {product.brand}
              </span>
              <span className="text-xs text-gray-400 font-mono">SKU: {product.sku}</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mt-2.5 leading-tight">{product.name}</h1>
          </div>

          {/* Rating & Sold Counter */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 text-amber-600 font-bold bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{product.review?.toFixed(1) || '4.8'}</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-gray-600 font-semibold bg-gray-100 px-3 py-1.5 rounded-xl">{product.sold_amount || 210}+ sold this month</span>
          </div>

          {/* Stock Urgency & Authenticity */}
          <div className="flex flex-col gap-2 bg-gradient-to-r from-red-50 to-orange-50/40 border border-red-100 p-3.5 rounded-2xl text-xs font-medium text-red-900">
            {product.stock_qty <= 15 && product.in_stock && (
              <div className="flex items-center gap-2 text-red-700 font-semibold">
                <Zap className="w-4 h-4 text-red-600 fill-red-600 animate-pulse flex-shrink-0" />
                <span>Hurry! Only {product.stock_qty} units left in stock at this promotional price.</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-emerald-800 font-medium">
              <Award className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Verified Authentic Brand Product with QC Passed Seal</span>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-gray-50/80 p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Special Price</p>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-2xl sm:text-3xl font-black text-gray-950">{product.discount_price || product.sale_price}</span>
                {product.has_discount && product.retail_price && (
                  <>
                    <span className="text-sm sm:text-base text-gray-400 line-through font-medium">{product.retail_price}</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-lg">Save ৳ {savings}</span>
                  </>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${product.in_stock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                {product.in_stock ? '● In Stock' : '✕ Out of Stock'}
              </span>
            </div>
          </div>

          <hr className="border-gray-100 my-0.5" />

          {/* Quantity Controls & Action Buttons */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center border border-gray-200 rounded-2xl overflow-hidden bg-gray-50 shadow-inner">
                <button 
                  onClick={decrementQty}
                  className="px-4 py-3.5 hover:bg-gray-200 text-gray-700 transition font-bold"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-sm text-gray-900">{quantity}</span>
                <button 
                  onClick={incrementQty}
                  className="px-4 py-3.5 hover:bg-gray-200 text-gray-700 transition font-bold"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Active Add to Cart Button with dynamic feedback */}
              <button 
                disabled={!product.in_stock}
                onClick={handleAddToCart}
                className={`flex-1 font-bold py-3.5 px-4 sm:px-6 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer ${
                  isAdded 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white scale-[1.02]' 
                    : 'bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed shadow-red-600/20'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5 stroke-[3] animate-bounce" />
                    <span> Added Successfully!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>{product.in_stock ? 'Add to Cart' : 'Out of Stock'}</span>
                  </>
                )}
              </button>
            </div>

            <button 
              disabled={!product.in_stock}
              onClick={handleBuyNow}
              className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-300 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md transition text-sm sm:text-base cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-red-500" />
              <span>Proceed to Checkout (Buy Now)</span>
            </button>

            {/* Quick Order Links */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <a 
                href="https://wa.me/8801812295539" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 py-3 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition text-center shadow-sm"
              >
                Order on WhatsApp
              </a>
              <a 
                href="https://m.me" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200/80 py-3 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition text-center shadow-sm"
              >
                Order on Messenger
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Extended Tabs Section */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="flex border-b border-gray-200 gap-6 sm:gap-10 overflow-x-auto scrollbar-none">
          <button 
            onClick={() => setActiveTab('description')}
            className={`pb-3.5 font-bold text-sm sm:text-base border-b-2 transition whitespace-nowrap cursor-pointer ${activeTab === 'description' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            Product Description
          </button>
          <button 
            onClick={() => setActiveTab('info')}
            className={`pb-3.5 font-bold text-sm sm:text-base border-b-2 transition whitespace-nowrap cursor-pointer ${activeTab === 'info' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            Additional Specifications
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`pb-3.5 font-bold text-sm sm:text-base border-b-2 transition whitespace-nowrap cursor-pointer ${activeTab === 'reviews' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            Customer Reviews ({product.review ? Math.round(product.review * 40) : 182})
          </button>
          <button 
            onClick={() => setActiveTab('shipping')}
            className={`pb-3.5 font-bold text-sm sm:text-base border-b-2 transition whitespace-nowrap cursor-pointer ${activeTab === 'shipping' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            Shipping & Return Policy
          </button>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-b-3xl shadow-sm border-x border-b border-gray-100 mt-0 text-sm sm:text-base leading-relaxed">
          {activeTab === 'description' && (
            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="font-extrabold text-gray-900 text-lg mb-2">About {product.name}</h3>
                <p className="text-gray-600">
                  Experience superior skin care with authentic products sourced directly from premium brands. Formulated by <strong>{product.brand}</strong> under category <span className="text-red-600 font-semibold">{product.category}</span>, this item guarantees maximum results for your daily cosmetic regimen without harsh chemicals.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-red-600" /> Key Highlights & Benefits
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-600 list-disc pl-4">
                    <li>Dermatologically tested and safe for sensitive skin types.</li>
                    <li>Lightweight, non-greasy formula with fast-absorbing properties.</li>
                    <li>Provides deep nourishment and long-lasting moisture protection.</li>
                    <li>Cruelty-free and formulated with skin-friendly botanical extracts.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-red-600" /> Recommended Usage
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Apply an appropriate amount evenly across cleansed skin as part of your morning and evening skincare routine. Gently pat until fully absorbed. Follow up with your favorite sunscreen during daytime application.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'info' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3.5 font-bold text-gray-500 w-1/3">Brand Name</td>
                    <td className="py-3.5 text-gray-900 font-semibold">{product.brand}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3.5 font-bold text-gray-500">Product Category</td>
                    <td className="py-3.5 text-gray-900">{product.category}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3.5 font-bold text-gray-500">Product SKU</td>
                    <td className="py-3.5 text-gray-900 font-mono">{product.sku}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3.5 font-bold text-gray-500">Net Weight / Volume</td>
                    <td className="py-3.5 text-gray-900">{product.weight}g</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3.5 font-bold text-gray-500">Country of Origin</td>
                    <td className="py-3.5 text-gray-900">South Korea</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3.5 font-bold text-gray-500">Suitable Skin Type</td>
                    <td className="py-3.5 text-gray-900">All Skin Types / Acne-Prone / Sensitive</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3.5 font-bold text-gray-500">Formulation</td>
                    <td className="py-3.5 text-gray-900">Cream / Gentle Lather Cleanser</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3.5 font-bold text-gray-500">Key Active Ingredients</td>
                    <td className="py-3.5 text-gray-900">Salicylic Acid (BHA), Tea Tree Leaf Oil</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3.5 font-bold text-gray-500">Shelf Life & Expiry</td>
                    <td className="py-3.5 text-gray-900">36 Months from Manufacturing Date (Fresh Batch)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3.5 font-bold text-gray-500">Authenticity Guarantee</td>
                    <td className="py-3.5 text-emerald-600 font-bold">100% Original Imported Product</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3.5 font-bold text-gray-500">Stock Availability</td>
                    <td className="py-3.5 text-gray-900">{product.in_stock ? 'In Stock & Ready to Ship' : 'Currently Unavailable'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="text-center px-4">
                  <span className="text-4xl font-black text-gray-900">{product.review || '4.8'}</span>
                  <div className="flex text-amber-400 justify-center mt-1.5 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block font-medium">Overall Rating</span>
                </div>
                <div className="border-t sm:border-t-0 sm:border-l border-gray-200 pt-4 sm:pt-0 sm:pl-6 text-xs sm:text-sm flex-1">
                  <h4 className="font-bold text-gray-900 text-base mb-1">Verified Customer Feedback</h4>
                  <p className="text-gray-600">98% of customers recommend this product based on quality, authentic packaging, and visible skincare results.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-gray-900">Nusrat Jahan</span>
                    <span className="text-[11px] text-gray-400">2 days ago</span>
                  </div>
                  <div className="flex text-amber-400 gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">"Amazing authentic product! Got delivery within 24 hours inside Dhaka. Saw visible changes within a week of regular use. Thank you Taskco!"</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-gray-900">Tanvir Ahmed</span>
                    <span className="text-[11px] text-gray-400">1 week ago</span>
                  </div>
                  <div className="flex text-amber-400 gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">"100% original product with proper seal. Will definitely order again!"</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
              <h4 className="font-extrabold text-gray-900 text-base mb-2">Delivery & Return Guidelines</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li><strong>Inside Dhaka:</strong> Fast home delivery within 24–48 hours. Flat shipping charge: ৳60.</li>
                <li><strong>Outside Dhaka:</strong> Secure courier delivery within 3–5 business days. Flat shipping charge: ৳120.</li>
                <li><strong>Return & Exchange Policy:</strong> 7-day hassle-free replacement or return window provided the product seal remains unopened and undamaged.</li>
                <li><strong>Inspection:</strong> Customers are encouraged to inspect products in front of the delivery personnel upon arrival.</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mt-16">
          <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-6">You May Also Like</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((item: Product) => (
              <div 
                key={item.id} 
                className="bg-white border border-gray-100 rounded-3xl p-4 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {item.has_discount && item.discount && (
                  <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md">
                    {item.discount}
                  </span>
                )}
                
                <Link href={`/products/${item.slug}`}>
                  <div className="aspect-square bg-gray-50 rounded-2xl mb-3.5 flex items-center justify-center overflow-hidden relative p-3">
                    <img 
                      src={item.image || item.image_variants?.medium} 
                      alt={item.name} 
                      className="object-contain w-full h-full group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-red-600 uppercase tracking-widest block">{item.brand}</span>
                  <h4 className="font-semibold text-xs sm:text-sm text-gray-800 group-hover:text-red-600 transition line-clamp-2 mt-1">
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
                    className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white p-2.5 rounded-xl transition shadow-sm"
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