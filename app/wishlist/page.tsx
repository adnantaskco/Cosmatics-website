"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ALL_PRODUCTS } from "@/lib/DataALLProducts";
import { useCart } from "@/components/context/CartContext";
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowLeft,
  LayoutGrid,
  List,
  CheckSquare,
  Square,
  Star,
  Check,
} from "lucide-react";

// 1. Define a clear Product interface to fix typing issues
interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  has_variants: boolean;
  slug: string;
  sku: string;
  image: string;
  image_variants?: {
    thumbnail: string;
    medium?: string;
  };
  sold_amount?: number;
  review?: number;
  retail_price: string;
  discount_price?: string;
  has_discount: boolean;
  sale_price: string;
  stock_qty: number;
  in_stock: boolean;
  stock_availability: boolean;
  weight: number;
  discount?: string;
}

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { addToCart } = useCart();

  // Sync Wishlist with localStorage
  useEffect(() => {
    const loadWishlist = () => {
      try {
        const stored = localStorage.getItem("user_wishlist");
        if (stored) {
          const parsed = JSON.parse(stored);
          setWishlistIds(Array.isArray(parsed) ? parsed.map(Number) : []);
        } else {
          setWishlistIds([]);
        }
      } catch (e) {
        console.error("Failed to load wishlist", e);
      }
    };

    loadWishlist();

    window.addEventListener("wishlistUpdated", loadWishlist);
    window.addEventListener("storage", loadWishlist);

    return () => {
      window.removeEventListener("wishlistUpdated", loadWishlist);
      window.removeEventListener("storage", loadWishlist);
    };
  }, []);

  // Filter products matching saved wishlist IDs
  const wishlistedProducts: Product[] = useMemo(() => {
    return (ALL_PRODUCTS as Product[]).filter((product) =>
      wishlistIds.includes(Number(product.id))
    );
  }, [wishlistIds]);

  // Remove single item
  const removeFromWishlist = (id: number) => {
    const updated = wishlistIds.filter((item) => item !== Number(id));
    setWishlistIds(updated);
    setSelectedIds((prev) => prev.filter((item) => item !== Number(id)));
    localStorage.setItem("user_wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  // Clear entire wishlist
  const clearWishlist = () => {
    setWishlistIds([]);
    setSelectedIds([]);
    localStorage.setItem("user_wishlist", JSON.stringify([]));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  // Toggle selection for bulk actions
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectedIds.length === wishlistedProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(wishlistedProducts.map((p) => Number(p.id)));
    }
  };

  // Move selected items to bag
  const handleAddSelectedToCart = () => {
    const itemsToAdd = wishlistedProducts.filter((p) =>
      selectedIds.includes(Number(p.id))
    );

    itemsToAdd.forEach((product) => {
      addToCart({
        id: product.id,
        name: product.name,
        image: product.image || "/placeholder.png",
        price: parseFloat(product.sale_price) || 0,
        brand: product.slug || "General",
        size: "M",
        quantity: 1,
      });
    });
  };

  return (
    <div className="min-h-screen bg-ring/10 text-text-primary p-3 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        
        {/* Top Header Card */}
        <div className="bg-background rounded-xl shadow-sm border border-ring/50 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <Link
              href="/"
              className="p-2.5 rounded-full bg-ring/5 hover:bg-ring/5 transition text-ring"
              aria-label="Back to store"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                  My Saved Wishlist
                </h1>
                <span className="bg-destructive/5 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full border border-primary/5">
                  {wishlistedProducts.length} Items
                </span>
              </div>
              <p className="text-xs sm:text-sm text-ring mt-0.5">
                Save items now, purchase anytime. Items stay synced across devices.
              </p>
            </div>
          </div>

          {/* Header Quick Controls */}
          {wishlistedProducts.length > 0 && (
            <div className="flex items-center gap-2 self-end sm:self-center">
              <div className="flex items-center bg-ring/5 p-1 rounded-lg border border-ring/5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md text-xs font-semibold transition ${
                    viewMode === "grid"
                      ? "bg-background text-text-primary shadow-sm"
                      : "text-ring hover:text-text-primary"
                  }`}
                  aria-label="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md text-xs font-semibold transition ${
                    viewMode === "list"
                      ? "bg-background text-text-primary shadow-sm"
                      : "text-ring hover:text-text-primary"
                  }`}
                  aria-label="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={clearWishlist}
                className="text-xs text-destructive font-semibold hover:bg-primary/10 px-3 py-2 rounded-lg transition border border-transparent hover:border-rose-100"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Wishlist Items & Action Toolbar */}
        {wishlistedProducts.length === 0 ? (
          <div className="bg-background rounded-xl border border-ring/5/80 shadow-sm p-12 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 text-destructive">
              <Heart className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h2 className="text-xl font-bold text-text-primary mb-2">
              Your wishlist is completely empty
            </h2>
            <p className="text-xs sm:text-sm text-ring mb-6 leading-relaxed">
              Explore your favorite collections and click the heart icon on any product to save items for later.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-foreground text-text-secondary text-xs font-bold px-6 py-3 rounded-lg hover:bg-foreground transition shadow-sm"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Batch Actions Bar */}
            <div className="bg-background rounded-xl shadow-sm border border-ring/5/80 p-3 sm:px-4 flex items-center justify-between">
              <button
                onClick={toggleSelectAll}
                className="flex items-center gap-2 text-xs font-semibold text-ring hover:text-text-primary"
              >
                {selectedIds.length === wishlistedProducts.length && wishlistedProducts.length > 0 ? (
                  <CheckSquare className="w-4 h-4 text-text-primary" />
                ) : (
                  <Square className="w-4 h-4 text-ring" />
                )}
                <span>
                  Select All ({selectedIds.length}/{wishlistedProducts.length})
                </span>
              </button>

              {selectedIds.length > 0 && (
                <button
                  onClick={handleAddSelectedToCart}
                  className="bg-foreground hover:bg-foreground text-text-secondary text-xs font-semibold px-4 py-2 rounded-lg transition flex items-center gap-2 shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Move Selected to Cart
                </button>
              )}
            </div>

            {/* Grid View Mode */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {wishlistedProducts.map((product: Product) => {
                  const isSelected = selectedIds.includes(Number(product.id));
                  const discountPercent =
                    product.has_discount && product.retail_price
                      ? Math.round(
                          ((parseFloat(product.retail_price) -
                            parseFloat(product.sale_price)) /
                            parseFloat(product.retail_price)) *
                            100
                        )
                      : 0;

                  return (
                    <div
                      key={product.id}
                      className={`bg-background rounded-xl border transition duration-200 shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden relative group ${
                        isSelected ? "border-foreground ring-1 ring-foreground/80" : "border-ring/5/80"
                      }`}
                    >
                      {/* Checkbox Select Overlay */}
                      <button
                        onClick={() => toggleSelect(Number(product.id))}
                        className="absolute top-2.5 left-2.5 z-20 bg-background/90 p-1 rounded-md shadow-sm border border-ring/5 hover:bg-background transition"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-text-primary" />
                        ) : (
                          <Square className="w-4 h-4 text-ring" />
                        )}
                      </button>

                      {/* Remove Button Overlay */}
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="absolute top-2.5 right-2.5 z-20 bg-background/90 text-destructive p-1.5 rounded-full shadow-sm hover:bg-primary/5 border border-ring/5 transition"
                        title="Remove from Wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Image Thumbnail & Badges */}
                      <div className="relative aspect-[3/4] bg-ring/5 overflow-hidden">
                        <img
                          src={product.image || "/placeholder.png"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        {product.has_discount && (
                          <span className="absolute bottom-2 left-2 bg-destructive text-text-secondary text-[10px] font-bold px-1.5 py-0.5 rounded">
                            -{discountPercent}%
                          </span>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-3 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1 text-amber-500 mb-1">
                            <Star className="w-3 h-3 fill-amber-500" />
                            <span className="text-[11px] font-bold text-ring">4.8</span>
                            <span className="text-[10px] text-ring">(24)</span>
                          </div>

                          <Link href={`/product/${product.slug}`}>
                            <h3 className="text-xs font-semibold text-ring line-clamp-2 leading-snug hover:text-text-primary mb-2">
                              {product.name}
                            </h3>
                          </Link>
                        </div>

                        <div>
                          <div className="flex items-baseline gap-1.5 mb-2">
                            <span className="text-sm font-bold text-text-primary">
                              ৳{product.sale_price}
                            </span>
                            {product.has_discount && product.retail_price && (
                              <span className="text-[11px] text-ring line-through">
                                ৳{product.retail_price}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() =>
                              addToCart({
                                id: product.id,
                                name: product.name,
                                image: product.image || "/placeholder.png",
                                price: parseFloat(product.sale_price) || 0,
                                brand: product.slug || "General",
                                size: "M",
                                quantity: 1,
                              })
                            }
                            className="w-full bg-foreground hover:bg-foreground text-text-secondary py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" /> Move to Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* List View Mode */
              <div className="space-y-3">
                {wishlistedProducts.map((product: Product) => {
                  const isSelected = selectedIds.includes(Number(product.id));

                  return (
                    <div
                      key={product.id}
                      className={`bg-background rounded-xl border p-3 sm:p-4 transition duration-200 shadow-sm flex items-center gap-4 ${
                        isSelected ? "border-foreground ring-1 ring-foreground" : "border-ring/5/80"
                      }`}
                    >
                      <button
                        onClick={() => toggleSelect(Number(product.id))}
                        className="text-ring hover:text-text-primary"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-5 h-5 text-text-primary" />
                        ) : (
                          <Square className="w-5 h-5" />
                        )}
                      </button>

                      <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-lg bg-ring/5 overflow-hidden flex-shrink-0 relative">
                        <img
                          src={product.image || "/placeholder.png"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mb-1">
                            <Check className="w-3 h-3" /> In Stock
                          </span>
                          <Link href={`/product/${product.slug}`}>
                            <h3 className="text-sm font-semibold text-text-primary truncate hover:underline">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-xs text-ring mt-0.5">
                            Category: {product.slug || "General"}
                          </p>
                          <div className="flex items-center gap-1 text-amber-500 mt-1">
                            <Star className="w-3 h-3 fill-amber-500" />
                            <span className="text-xs font-bold text-ring">4.8</span>
                          </div>
                        </div>

                        <div className="flex items-center sm:flex-col sm:items-end justify-between gap-3 flex-shrink-0">
                          <div className="text-left sm:text-right">
                            <span className="text-base font-bold text-text-primary">
                              ৳{product.sale_price}
                            </span>
                            {product.has_discount && product.retail_price && (
                              <p className="text-xs text-ring line-through">
                                ৳{product.retail_price}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                addToCart({
                                  id: product.id,
                                  name: product.name,
                                  image: product.image || "/placeholder.png",
                                  price: parseFloat(product.sale_price) || 0,
                                  brand: product.slug || "General",
                                  size: "M",
                                  quantity: 1,
                                })
                              }
                              className="bg-foreground hover:bg-foreground text-text-secondary text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition shadow-sm"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" /> Move to Cart
                            </button>

                            <button
                              onClick={() => removeFromWishlist(product.id)}
                              className="p-2 text-destructive hover:bg-primary/5 rounded-lg transition"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}