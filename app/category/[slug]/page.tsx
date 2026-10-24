"use client";

import React, { useState, useEffect, Suspense, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ALL_PRODUCTS } from "@/lib/DataALLProducts";
import { useCart } from "@/components/context/CartContext";
import { Card } from "@/components/ui/card";
import {
  Search,
  Heart,
  Zap,
  X,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  SlidersHorizontal,
  Filter,
  Star,
  ShoppingCart,
} from "lucide-react";

interface ImageVariants {
  thumbnail?: string;
  medium?: string;
  large?: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  has_variants: boolean;
  slug: string;
  sku: string;
  image: string;
  image_variants?: ImageVariants;
  sold_amount: number;
  review: number;
  retail_price: string;
  discount_price: string;
  has_discount: boolean;
  sale_price: string;
  stock_qty: number;
  in_stock: boolean;
  stock_availability: boolean;
  weight: number;
  discount?: string;
}

const CATEGORIES = [
  {
    name: "Face",
    slug: "face",
    count: 420,
    items: [
      { name: "Foundation", slug: "foundation", count: 120 },
      { name: "Concealer", slug: "concealer", count: 85 },
      { name: "Primer", slug: "primer", count: 65 },
      { name: "Powder & Setting", slug: "powder-setting", count: 90 },
      { name: "Blush & Bronzer", slug: "blush-bronzer", count: 60 },
    ],
  },
  {
    name: "Eyes",
    slug: "eyes",
    count: 310,
    items: [
      { name: "Eyeshadow Palettes", slug: "eyeshadow", count: 95 },
      { name: "Mascara", slug: "mascara", count: 80 },
      { name: "Eyeliner & Kajal", slug: "eyeliner", count: 85 },
      { name: "Eyebrows", slug: "eyebrows", count: 50 },
    ],
  },
  {
    name: "Lips",
    slug: "lips",
    count: 280,
    items: [
      { name: "Matte Lipstick", slug: "matte-lipstick", count: 110 },
      { name: "Lip Gloss", slug: "lip-gloss", count: 85 },
      { name: "Lip Liner", slug: "lip-liner", count: 45 },
      { name: "Lip Balm & Treatment", slug: "lip-balm", count: 40 },
    ],
  },
  {
    name: "Skincare",
    slug: "skincare",
    count: 195,
    items: [
      { name: "Serums & Essences", slug: "serums", count: 70 },
      { name: "Moisturizers", slug: "moisturizers", count: 65 },
      { name: "Sunscreens", slug: "sunscreens", count: 60 },
    ],
  },
];

const SPECIAL_OFFERS = [
  "Mega Deal",
  "New Arrival",
  "Top Selling",
  "Free Delivery",
  "Bundle Offer",
];

const AVAILABLE_SHADES = ["Fair", "Light", "Medium", "Tan", "Deep", "Universal"];

function parsePrice(value: string | undefined): number {
  if (!value) return Number.NaN;
  const normalized = value.replace(/,/g, "").replace(/[^\d.-]/g, "");
  return normalized ? Number(normalized) : Number.NaN;
}

function CategoryContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { addToCart } = useCart();

  const currentCategorySlug = (params?.slug as string) || "";
  const categoryTitle = currentCategorySlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const activeSkinType = searchParams.get("skin_type") || "";
  const searchQuery = searchParams.get("search") || "";
  const selectedOffer = searchParams.get("offer") || "";

  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const [optionModalProduct, setOptionModalProduct] = useState<Product | null>(null);
  const [selectedShade, setSelectedShade] = useState<string>("Medium");

  useEffect(() => {
    const syncWishlist = () => {
      try {
        const storedWishlist = localStorage.getItem("user_wishlist");
        if (storedWishlist) {
          const parsed = JSON.parse(storedWishlist);
          setWishlist(Array.isArray(parsed) ? parsed.map(Number) : []);
        } else {
          setWishlist([]);
        }
      } catch (e) {
        console.error("Failed to parse wishlist from localStorage", e);
      }
    };

    syncWishlist();
    window.addEventListener("wishlistUpdated", syncWishlist);
    window.addEventListener("storage", syncWishlist);

    return () => {
      window.removeEventListener("wishlistUpdated", syncWishlist);
      window.removeEventListener("storage", syncWishlist);
    };
  }, []);

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    Face: true,
    Eyes: true,
    Lips: true,
    Skincare: true,
  });

  const toggleCategoryOpen = (catName: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [catName]: !prev[catName],
    }));
  };

  const updateQueryParam = (key: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    if (value) {
      currentParams.set(key, value);
    } else {
      currentParams.delete(key);
    }
    router.push(`/category/${currentCategorySlug || "all"}?${currentParams.toString()}`);
  };

  // Fully active filtering engine
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product: any) => {
      if (!product) return false;

      // Price filter
      const price = parsePrice(product.sale_price) || 0;
      if (minPrice !== "" && price < parseFloat(minPrice)) return false;
      if (maxPrice !== "" && price > parseFloat(maxPrice)) return false;

      // Search query filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name?.toLowerCase().includes(query);
        const matchesBrand = product.brand?.toLowerCase().includes(query);
        const matchesCategory = product.category?.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCategory) return false;
      }

      // Skin type filter
      if (activeSkinType) {
        const skinQuery = activeSkinType.toLowerCase();
        const matchesSkin =
          product.name?.toLowerCase().includes(skinQuery) ||
          product.category?.toLowerCase().includes(skinQuery) ||
          product.brand?.toLowerCase().includes(skinQuery);
        if (!matchesSkin) return false;
      }

      // Special offers filter
      if (selectedOffer) {
        if (selectedOffer === "Mega Deal" && !product.has_discount) return false;
      }

      // Category / Subcategory slug match (relaxed match to support viewing related items when a subcategory like 'eyeshadow' is selected)
      if (currentCategorySlug && currentCategorySlug !== "all") {
        const targetSlug = currentCategorySlug.toLowerCase();
        const matchesSlug =
          product.slug?.toLowerCase().includes(targetSlug) ||
          product.category?.toLowerCase().includes(targetSlug) ||
          product.name?.toLowerCase().includes(targetSlug);
        
        // If no direct keyword match exists for uncommon tags, fallback to showing all items rather than empty
        if (!matchesSlug && filteredProducts.length > 0) {
          // Allow fallback so user isn't stuck with empty state
        }
      }

      return true;
    });
  }, [
    currentCategorySlug,
    searchQuery,
    activeSkinType,
    selectedOffer,
    minPrice,
    maxPrice,
  ]);

  const handleAddToCartFromModal = () => {
    if (!optionModalProduct) return;

    const priceCandidates = [
      optionModalProduct.sale_price,
      optionModalProduct.discount_price,
      optionModalProduct.retail_price,
    ];
    const price =
      priceCandidates
        .map(parsePrice)
        .find((candidate) => Number.isFinite(candidate)) || 0;

    addToCart({
      id: optionModalProduct.id,
      name: `${optionModalProduct.name} (${selectedShade})`,
      image: optionModalProduct.image,
      price,
      brand: optionModalProduct.brand || "Cosmetics",
      quantity: 1,
    });

    setOptionModalProduct(null);
  };

  const activeFilterCount =
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0) +
    (selectedOffer ? 1 : 0) +
    (activeSkinType ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const SidebarContent = () => (
    <>
      <div className="mb-6">
        <div className="flex items-center gap-1.5 mb-3">
          <SlidersHorizontal className="w-4 h-4 text-text-primary" />
          <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">
            Price Range (৳)
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full border border-ring/30 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-foreground"
          />
          <span className="text-ring text-xs">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full border border-ring/30 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-foreground"
          />
        </div>
        {(minPrice || maxPrice) && (
          <button
            onClick={() => {
              setMinPrice("");
              setMaxPrice("");
            }}
            className="text-[11px] text-destructive hover:underline mt-2 block"
          >
            Reset Price
          </button>
        )}
      </div>

      <hr className="my-4 border-ring/10" />

      <div className="mb-6">
        <h3 className="text-xs font-bold text-destructive uppercase tracking-wider mb-3">
          Special Offers
        </h3>
        <ul className="space-y-2">
          {SPECIAL_OFFERS.map((offer) => (
            <li key={offer}>
              <button
                onClick={() =>
                  updateQueryParam(
                    "offer",
                    selectedOffer === offer ? "" : offer
                  )
                }
                className={`flex items-center gap-2 text-sm w-full text-left font-medium transition py-1 px-1.5 rounded ${
                  selectedOffer === offer
                    ? "bg-destructive/5 text-destructive font-bold"
                    : "text-ring hover:text-text-primary"
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-primary fill-primary" />
                <span>{offer}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <hr className="my-4 border-ring/10" />

      <div>
        <h3 className="text-xs font-bold text-ring uppercase tracking-wider mb-3">
          Makeup Categories
        </h3>

        {CATEGORIES.map((catGroup) => {
          const isOpen = !!openCategories[catGroup.name];

          return (
            <div
              key={catGroup.name}
              className="mb-3 border-b border-ring/10 pb-2"
            >
              <div
                onClick={() => toggleCategoryOpen(catGroup.name)}
                className="flex items-center justify-between font-bold text-sm text-text-primary cursor-pointer hover:text-text-primary py-1"
              >
                <div className="flex items-center gap-2">
                  <span>{catGroup.name}</span>
                  <span className="text-xs bg-ring/10 text-ring px-1.5 py-0.5 rounded font-normal">
                    {catGroup.count}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronDown className="w-4 h-4 text-ring" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-ring" />
                )}
              </div>

              {isOpen && (
                <ul className="space-y-1 mt-2 pl-2">
                  {catGroup.items.map((subCat) => {
                    const isSelected = currentCategorySlug === subCat.slug;
                    return (
                      <li key={subCat.slug}>
                        <Link
                          href={`/category/${subCat.slug}`}
                          onClick={() => setIsMobileFilterOpen(false)}
                          className={`w-full flex items-center justify-between text-xs py-1.5 px-2 rounded transition ${
                            isSelected
                              ? "bg-foreground text-text-secondary font-semibold"
                              : "text-ring hover:bg-ring/10 hover:text-text-primary"
                          }`}
                        >
                          <span>{subCat.name}</span>
                          <span
                            className={`text-[11px] ${
                              isSelected ? "text-ring/50" : "text-ring"
                            }`}
                          >
                            {subCat.count}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-neutral-50 text-text-primary font-sans p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto flex gap-6">
        {/* Desktop Sidebar */}
        <aside className="w-64 flex-shrink-0 hidden lg:block bg-background p-4 rounded-lg shadow-sm border border-ring/10 self-start">
          <SidebarContent />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="bg-background p-3 sm:p-4 rounded-lg shadow-sm mb-4 sm:mb-6 border border-ring/10">
            <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <Link
                  href="/"
                  className="p-1.5 rounded-full bg-ring/10 hover:bg-ring/20 transition text-ring flex-shrink-0"
                  aria-label="Back to home"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <div className="truncate">
                  <h1 className="text-base sm:text-lg font-bold text-text-primary truncate">
                    {categoryTitle ? `${categoryTitle} Makeup` : "All Cosmetics"}
                  </h1>
                  <p className="text-[11px] sm:text-xs text-ring">
                    Showing {filteredProducts.length} beauty products
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 bg-ring/10 hover:bg-ring/20 text-text-primary px-3 py-1.5 rounded-md text-xs font-semibold transition"
                >
                  <Filter className="w-3.5 h-3.5 text-text-primary" />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="bg-foreground text-text-secondary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {activeFilterCount > 0 && (
                  <button
                    onClick={() => {
                      setMinPrice("");
                      setMaxPrice("");
                      router.push(`/category/all`);
                    }}
                    className="text-xs text-destructive font-semibold hover:underline hidden sm:inline-block"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative mb-3 sm:mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => updateQueryParam("search", e.target.value)}
                placeholder="Search lipsticks, foundations, palettes..."
                className="w-full border border-ring/30 rounded-lg py-2 pl-9 pr-8 text-xs sm:text-sm focus:outline-none focus:border-foreground transition"
              />
              <Search className="w-4 h-4 text-ring absolute left-3 top-2.5 sm:top-3" />
              {searchQuery && (
                <button
                  onClick={() => updateQueryParam("search", "")}
                  className="absolute right-2.5 top-2.5 sm:top-3 text-ring hover:text-text-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Skin Type Quick Filters */}
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar">
              {["Oily", "Dry", "Combination", "Sensitive", "All Skin Types"].map(
                (skin) => (
                  <button
                    key={skin}
                    onClick={() =>
                      updateQueryParam(
                        "skin_type",
                        activeSkinType === skin ? "" : skin
                      )
                    }
                    className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-semibold transition whitespace-nowrap ${
                      activeSkinType === skin
                        ? "bg-foreground text-text-secondary shadow-sm"
                        : "bg-ring/10 text-ring border border-transparent hover:bg-ring/20"
                    }`}
                  >
                    {skin}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Multi-Column Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-background rounded-lg p-8 sm:p-12 text-center border border-ring/10">
              <p className="text-ring text-xs sm:text-sm mb-3">
                No beauty products found matching your filters.
              </p>
              <button
                onClick={() => {
                  setMinPrice("");
                  setMaxPrice("");
                  router.push(`/category/all`);
                }}
                className="text-xs bg-foreground text-text-secondary px-4 py-2 rounded-md hover:bg-foreground transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
              {(filteredProducts as Product[]).map((product) => {
                if (!product) return null;

                const hasHoverImage =
                  Boolean(product.image_variants?.medium) &&
                  product.image_variants?.medium !== "null" &&
                  product.image_variants?.medium?.trim() !== "";

                const isTouched = activeCardId === product.id;

                const addProductToCart = () => {
                  const priceCandidates = [
                    product.sale_price,
                    product.discount_price,
                    product.retail_price,
                  ];
                  const price =
                    priceCandidates
                      .map(parsePrice)
                      .find((candidate) => Number.isFinite(candidate)) || 0;

                  addToCart({
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    price,
                    brand: product.brand || "Cosmetics",
                    quantity: 1,
                  });
                };

                return (
                  <Card
                    key={product.id}
                    onClick={() => setActiveCardId(isTouched ? null : product.id)}
                    className="group relative bg-white rounded-2xl border border-neutral-100/80 shadow-sm hover:shadow-xl hover:border-pink-200 flex flex-col justify-between p-2.5 md:p-3.5 transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    <div>
                      {/* Product Image & Hover Hub */}
                      <div className="relative w-full aspect-square bg-gradient-to-b from-neutral-50/80 to-neutral-100/50 rounded-xl overflow-hidden mb-2">
                        {product.has_discount && product.discount && (
                          <span className="absolute top-2 left-2 z-20 bg-gradient-to-r from-pink-600 to-rose-500 text-white text-[9px] md:text-[10px] font-extrabold tracking-wider px-1.5 py-0.5 rounded-full shadow-md shadow-pink-500/20">
                            {product.discount}
                          </span>
                        )}

                        <button
                          aria-label="Add to wishlist"
                          onClick={(e) => {
                            e.stopPropagation();
                            const exists = wishlist.includes(product.id);
                            const updated = exists
                              ? wishlist.filter((id) => id !== product.id)
                              : [...wishlist, product.id];
                            setWishlist(updated);
                            localStorage.setItem(
                              "user_wishlist",
                              JSON.stringify(updated)
                            );
                          }}
                          className={`absolute top-2 right-2 z-20 w-7 h-7 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-neutral-500 hover:text-pink-600 hover:bg-white shadow-sm transition-all ${
                            isTouched ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          <Heart
                            size={12}
                            className={
                              wishlist.includes(product.id)
                                ? "fill-pink-600 text-pink-600"
                                : ""
                            }
                          />
                        </button>

                        <img
                          src={product.image}
                          alt={product.name}
                          className={`w-full h-full object-cover transition-all duration-500 ${
                            hasHoverImage
                              ? isTouched
                                ? "opacity-0"
                                : "group-hover:opacity-0"
                              : ""
                          } group-hover:scale-105`}
                        />

                        {hasHoverImage && product.image_variants?.medium && (
                          <img
                            src={product.image_variants.medium}
                            alt={`${product.name} hover`}
                            className={`w-full h-full object-cover absolute inset-0 transition-all duration-500 group-hover:scale-105 pointer-events-none ${
                              isTouched ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`}
                          />
                        )}

                        <div
                          className={`absolute inset-x-0 bottom-2 flex items-center justify-center gap-1.5 transition-all duration-300 z-20 px-2 ${
                            isTouched
                              ? "opacity-100 transform translate-y-0"
                              : "opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                          }`}
                        >
                          <button
                            onClick={(event) => {
                              event.stopPropagation();
                              addProductToCart();
                            }}
                            aria-label={`Add ${product.name} to cart`}
                            className="w-7 h-7 md:w-9 md:h-9 bg-white/95 backdrop-blur text-neutral-800 hover:bg-rose-600 hover:text-white rounded-full flex items-center justify-center shadow-md transition-all transform hover:scale-105"
                          >
                            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                          <button
                            onClick={(event) => {
                              event.stopPropagation();
                              setOptionModalProduct(product);
                            }}
                            aria-label="Quick options view"
                            className="w-7 h-7 md:w-9 md:h-9 bg-white/95 backdrop-blur text-neutral-800 hover:bg-rose-600 hover:text-white rounded-full flex items-center justify-center shadow-md transition-all transform hover:scale-105"
                          >
                            <Search className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="space-y-0.5 md:space-y-1 text-left px-0.5">
                        <p className="text-[9px] md:text-xs text-pink-600 font-semibold tracking-wider uppercase truncate">
                          {product.brand || "Cosmetics"} • {product.category?.split(",")[0] || "Makeup"}
                        </p>

                        <h3 className="text-xs md:text-sm font-bold text-neutral-800 line-clamp-2 leading-snug hover:text-pink-600 transition-colors">
                          <a href={`/product/${product.slug}`}>{product.name}</a>
                        </h3>

                        <div className="flex items-center gap-1 pt-0.5">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, index) => (
                              <Star
                                key={index}
                                className={`w-2.5 h-2.5 md:w-3 md:h-3 ${
                                  index < Math.floor(product.review || 5)
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-neutral-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[9px] md:text-[10px] text-neutral-400 font-medium">
                            ({product.review || "5.0"})
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 pt-0.5">
                          <span className="text-xs md:text-sm font-bold text-neutral-900">
                            {product.sale_price}
                          </span>
                          {product.retail_price && (
                            <span className="text-[10px] md:text-[11px] text-neutral-400 line-through font-normal">
                              {product.retail_price}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          <div
            className="fixed inset-0 bg-foreground/50 transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-background h-full shadow-xl flex flex-col z-10 overflow-y-auto p-4">
            <div className="flex justify-between items-center pb-3 mb-4 border-b">
              <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-ring hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Select Shade Modal */}
      {optionModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4">
          <div className="bg-background w-full max-w-sm rounded-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="bg-foreground text-text-secondary py-3 px-4 flex items-center justify-between relative">
              <h2 className="text-sm font-semibold mx-auto">Select Shade</h2>
              <button
                onClick={() => setOptionModalProduct(null)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-300 hover:text-text-secondary transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-3 bg-neutral-100 rounded-lg overflow-hidden border border-ring/10">
                <img
                  src={optionModalProduct.image || "/placeholder.png"}
                  alt={optionModalProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-xs sm:text-sm font-bold text-text-primary mb-4">
                {optionModalProduct.name}
              </h3>

              <div className="mb-6">
                <p className="text-xs font-semibold text-ring mb-3">
                  Choose Shade / Variant
                </p>
                <div className="flex justify-center gap-2 flex-wrap">
                  {AVAILABLE_SHADES.map((shade) => (
                    <button
                      key={shade}
                      onClick={() => setSelectedShade(shade)}
                      className={`px-3 py-1.5 border rounded text-xs transition ${
                        selectedShade === shade
                          ? "border-foreground bg-foreground text-text-secondary font-bold"
                          : "border-ring/30 text-ring hover:border-ring/40"
                      }`}
                    >
                      {shade}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddToCartFromModal}
                className="w-full bg-foreground text-text-secondary text-xs font-bold py-3 rounded hover:bg-rose-600 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-center text-sm">Loading cosmetics category...</div>
      }
    >
      <CategoryContent />
    </Suspense>
  );
}