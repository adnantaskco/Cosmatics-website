"use client";

import React, { useState } from "react";
import { 
  Star, ShoppingBag, ShieldCheck, Truck, RefreshCw, 
  Check, ChevronRight, Plus, Minus, Sparkles, MapPin, Package 
} from "lucide-react";
import { useCart } from "@/components/context/CartContext";
import Link from "next/link";

interface ClientProductViewProps {
  product: any;
}

function parsePrice(value: any): number {
  if (!value) return 0;
  const stringVal = String(value).replace(/,/g, "").replace(/[^\d.-]/g, "");
  const num = Number(stringVal);
  return isNaN(num) ? 0 : num;
}

export default function ClientProductView({ product }: ClientProductViewProps) {
  // Support both direct object passing and API wrapper formatting ({ status, data })
  const rawData = product?.data || product;
  
  // Extract gallery and image variants safely
  const galleryImages = rawData.gallery?.length ? rawData.gallery : [];
  const variantImages = rawData.image_variants?.length ? rawData.image_variants : [];
  const allImages = Array.from(new Set([rawData.image, ...galleryImages, ...variantImages])).filter(Boolean);

  const [selectedImage, setSelectedImage] = useState<string>(rawData.image || allImages[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"description" | "specifications" | "branches">("description");
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const { addToCart } = useCart();

  // Price calculations
  const rawSalePrice = rawData.price?.sale_price || rawData.sale_price || rawData.retail_price || 0;
  const price = parsePrice(rawSalePrice);
  const retailPrice = parsePrice(rawData.price?.retail_price || rawData.retail_price);
  const wholesalePrice = parsePrice(rawData.price?.wholesale_price);
  const discountPercent = rawData.price?.value || rawData.discount;

  const handleAddToCart = () => {
    if (isNaN(price)) return;

    addToCart({
      id: rawData.id,
      name: rawData.name,
      image: rawData.image || selectedImage,
      price,
      brand: rawData.brand,
      quantity,
    });

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const inStock = rawData.stock?.in_stock ?? rawData.in_stock ?? true;
  const stockQuantity = rawData.stock?.quantity ?? rawData.stock_qty ?? 0;
  const relatedProducts = rawData.related_products || [];
  const betterSuggestions = rawData.better_suggestions || [];
  const branches = rawData.branches || [];
  const specGroups = rawData.specification_groups || [];

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 space-y-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-neutral-400 font-medium overflow-x-auto py-1">
          <Link href="/" className="hover:text-pink-600 transition whitespace-nowrap">Home</Link>
          <ChevronRight size={12} />
          {rawData.category_path?.map((cat: any, idx: number) => (
            <React.Fragment key={cat.id || idx}>
              <span className="hover:text-pink-600 transition whitespace-nowrap">{cat.name}</span>
              <ChevronRight size={12} />
            </React.Fragment>
          ))}
          {rawData.category && !rawData.category_path && (
            <>
              <span className="hover:text-pink-600 transition whitespace-nowrap">{rawData.category}</span>
              <ChevronRight size={12} />
            </>
          )}
          <span className="text-neutral-800 font-semibold truncate max-w-[220px]">{rawData.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-neutral-100">
          
          {/* Left: Gallery & Image Previews */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            <div className="w-full aspect-square bg-neutral-50 rounded-2xl border border-neutral-100 overflow-hidden shadow-sm relative group">
              <img
                src={selectedImage}
                alt={rawData.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {discountPercent && (
                <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md tracking-wider">
                  -{discountPercent}% OFF
                </span>
              )}
            </div>

            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {allImages.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === img ? "border-pink-500 shadow-md scale-105" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details, Pricing & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold tracking-widest text-pink-600 uppercase bg-pink-50 px-3 py-1.5 rounded-full flex items-center gap-1">
                <Sparkles size={12} /> {rawData.brand || "Cosmetics"}
              </span>
              <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
                <span>SKU: {rawData.sku}</span>
                {rawData.shipping?.weight && <span>• Weight: {rawData.shipping.weight}kg</span>}
                {rawData.origin && <span>• Origin: {rawData.origin}</span>}
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight leading-snug">
              {rawData.name}
            </h1>

            <div className="flex items-center gap-4 text-xs">
              {rawData.review ? (
                <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-lg font-bold border border-amber-200/50">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span>{rawData.review}</span>
                </div>
              ) : (
                <span className="text-neutral-400 italic">No reviews yet</span>
              )}
              <span className="text-neutral-300">•</span>
              <span className="text-neutral-500 font-medium">{rawData.sold_amount || 0}+ sold this month</span>
            </div>

            {/* Pricing Box */}
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-baseline gap-4 flex-wrap">
              <span className="text-3xl font-black text-neutral-900">
                ৳{price.toLocaleString()}
              </span>
              {retailPrice > price && (
                <span className="text-base text-neutral-400 line-through font-normal">
                  ৳{retailPrice.toLocaleString()}
                </span>
              )}
              {wholesalePrice > 0 && (
                <span className="text-xs text-neutral-500 font-medium bg-neutral-200/60 px-2.5 py-1 rounded-lg">
                  Wholesale: ৳{wholesalePrice.toLocaleString()}
                </span>
              )}
              <span className={`ml-auto text-xs font-bold px-3 py-1 rounded-full ${
                inStock ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-rose-50 text-rose-600 border border-rose-100"
              }`}>
                {inStock ? `• In Stock (${stockQuantity} left)` : "• Out of Stock"}
              </span>
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              {rawData.short_description || rawData.description}
            </p>

            {/* Quantity Selector & Add to Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <div className="flex items-center justify-between border border-neutral-200 rounded-xl bg-neutral-50 px-3 py-2.5 w-full sm:w-36">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="text-neutral-500 hover:text-neutral-900 transition p-1"
                >
                  <Minus size={15} />
                </button>
                <span className="font-bold text-sm text-neutral-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="text-neutral-500 hover:text-neutral-900 transition p-1"
                >
                  <Plus size={15} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                  inStock
                    ? "bg-pink-600 text-white shadow-pink-600/25 hover:bg-pink-700 active:scale-[0.98]"
                    : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check size={18} className="text-white" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-100 text-center">
              <div className="flex flex-col items-center p-3 bg-pink-50/40 rounded-xl border border-pink-100/40">
                <ShieldCheck size={20} className="text-pink-600 mb-1.5" />
                <span className="text-[11px] font-bold text-neutral-800">100% Authentic</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-pink-50/40 rounded-xl border border-pink-100/40">
                <Truck size={20} className="text-pink-600 mb-1.5" />
                <span className="text-[11px] font-bold text-neutral-800">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-pink-50/40 rounded-xl border border-pink-100/40">
                <RefreshCw size={20} className="text-pink-600 mb-1.5" />
                <span className="text-[11px] font-bold text-neutral-800">Easy Returns</span>
              </div>
            </div>

          </div>
        </div>

        {/* Tabs for Description, Specifications & Branches */}
        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-neutral-100">
          <div className="flex items-center gap-6 border-b border-neutral-100 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("description")}
              className={`pb-3 text-sm font-bold tracking-wide border-b-2 transition-all whitespace-nowrap ${
                activeTab === "description" ? "border-pink-600 text-neutral-900" : "border-transparent text-neutral-400 hover:text-neutral-700"
              }`}
            >
              Description
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("specifications")}
              className={`pb-3 text-sm font-bold tracking-wide border-b-2 transition-all whitespace-nowrap ${
                activeTab === "specifications" ? "border-pink-600 text-neutral-900" : "border-transparent text-neutral-400 hover:text-neutral-700"
              }`}
            >
              Specifications
            </button>
            {branches.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab("branches")}
                className={`pb-3 text-sm font-bold tracking-wide border-b-2 transition-all whitespace-nowrap ${
                  activeTab === "branches" ? "border-pink-600 text-neutral-900" : "border-transparent text-neutral-400 hover:text-neutral-700"
                }`}
              >
                Branch Availability
              </button>
            )}
          </div>

          <div className="py-6">
            {activeTab === "description" && (
              <p className="text-sm text-neutral-600 leading-relaxed max-w-3xl">
                {rawData.description || rawData.short_description || "No description provided."}
              </p>
            )}

            {activeTab === "specifications" && (
              <div className="space-y-6 max-w-3xl">
                {specGroups.length > 0 ? (
                  specGroups.map((group: any, gIdx: number) => (
                    <div key={gIdx} className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-pink-600">{group.group}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {group.items.map((item: any, iIdx: number) => (
                          <div key={iIdx} className="flex justify-between p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-xs">
                            <span className="font-semibold text-neutral-500">{item.label}</span>
                            <span className="font-bold text-neutral-800">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-neutral-400">No specifications available.</p>
                )}
              </div>
            )}

            {activeTab === "branches" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
                {branches.map((branch: any) => (
                  <div key={branch.branch_id} className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                        <MapPin size={13} className="text-pink-600" /> {branch.branch_title}
                      </span>
                      {branch.is_default && (
                        <span className="text-[10px] bg-pink-50 text-pink-600 font-bold px-2 py-0.5 rounded-md">Main</span>
                      )}
                    </div>
                    <div className="text-xs text-neutral-500 flex justify-between pt-2 border-t border-neutral-200/60">
                      <span>Available Stock:</span>
                      <span className="font-bold text-neutral-800">{branch.stock?.current_qty ?? 0} units</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-4">
            <h3 className="text-xl font-black text-neutral-900 tracking-tight">Related Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item: any) => (
                <Link 
                  key={item.id} 
                  href={`/products/${item.slug}`}
                  className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-full aspect-square bg-neutral-50 rounded-xl overflow-hidden relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <h4 className="text-xs font-bold text-neutral-800 line-clamp-2 group-hover:text-pink-600 transition">
                      {item.name}
                    </h4>
                  </div>
                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-sm font-black text-neutral-900">৳{item.sale_price || item.retail_price}</span>
                    <span className="text-[11px] font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-lg">View</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Better Suggestions Section */}
        {betterSuggestions.length > 0 && (
          <div className="space-y-6 pt-4">
            <h3 className="text-xl font-black text-neutral-900 tracking-tight">You Might Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {betterSuggestions.map((item: any) => (
                <Link 
                  key={item.id} 
                  href={`/products/${item.slug}`}
                  className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-full aspect-square bg-neutral-50 rounded-xl overflow-hidden relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <h4 className="text-xs font-bold text-neutral-800 line-clamp-2 group-hover:text-pink-600 transition">
                      {item.name}
                    </h4>
                  </div>
                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-sm font-black text-neutral-900">৳{item.sale_price || item.retail_price}</span>
                    <span className="text-[11px] font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-lg">View</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}