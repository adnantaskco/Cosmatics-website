"use client"
import React, { useState } from "react";
import { 
  Star, 
  ShoppingCart, 
  Zap, 
  PhoneCall, 
  MessageSquare, 
  CheckCircle, 
  Truck, 
  ShieldCheck, 
  Plus, 
  Minus 
} from "lucide-react";
import ProductCard from "@/components/Products/ProductCard";
import { useCart } from "@/components/context/CartContext";
import { FaTruck } from "react-icons/fa";

// --- TypeScript Interfaces based on your Data Structure ---
interface SpecialPrice {
  amount: string | null;
  start_date: string | null;
  end_date: string | null;
}

interface PriceInfo {
  product_variant_id?: number;
  retail_price: string;
  sale_price: string;
  is_discounted?: boolean;
  type?: string;
  value?: string;
  wholesale_price?: string;
  is_special_price?: boolean;
  special_price?: SpecialPrice;
  is_bundle?: boolean;
  bundle_price?: any[];
  is_bogo?: boolean;
  bogo_buy_quantity?: number | null;
  bogo_get_quantity?: number | null;
}

interface StockInfo {
  quantity: number;
  in_stock: boolean;
}

interface RelatedProduct {
  id: number;
  name: string;
  slug: string;
  image: string;
  retail_price: string;
  sale_price: string;
  has_discount: boolean;
  category?: string;
  brand?: string | null;
  sku?: string;
  has_variants?: boolean;
}

interface CategoryPathItem {
  id: number;
  name: string;
  slug: string;
}

interface ProductData {
  id: number;
  uid?: string;
  name: string;
  slug: string;
  sku: string;
  brand: string | null;
  category: string;
  category_path?: CategoryPathItem[];
  short_description: string;
  description: string;
  image: string;
  gallery: string[];
  review?: number;
  sold_amount?: string;
  origin?: string;
  price?: PriceInfo | string | number;
  stock?: StockInfo;
  specification_groups?: {
    group: string;
    items: { label: string; value: string }[];
  }[];
  specifications?: Record<string, string>;
  related_products?: RelatedProduct[];
  better_suggestions?: RelatedProduct[];
}

interface ClientProductViewProps {
  product?: ProductData;
  onAddToCart?: (quantity: number) => void;
  onBuyNow?: (quantity: number) => void;
  onWhatsAppOrder?: (quantity: number) => void;
}

// Robust helper to parse prices coming from objects, strings, or numbers (handles commas like "1,180.00")
const parsePrice = (priceInput: any): number => {
  if (priceInput === undefined || priceInput === null) return 0;

  if (typeof priceInput === "object") {
    const target = priceInput.sale_price ?? priceInput.retail_price ?? 0;
    const clean = target.toString().replace(/,/g, "");
    const val = parseFloat(clean);
    return isNaN(val) ? 0 : val;
  }

  const clean = priceInput.toString().replace(/,/g, "");
  const val = parseFloat(clean);
  return isNaN(val) ? 0 : val;
};

// Helper specifically to get retail price
const parseRetailPrice = (priceInput: any): number => {
  if (priceInput && typeof priceInput === "object" && priceInput.retail_price) {
    const clean = priceInput.retail_price.toString().replace(/,/g, "");
    const val = parseFloat(clean);
    return isNaN(val) ? 0 : val;
  }
  return 0;
};

export const ClientProductView: React.FC<ClientProductViewProps> = ({ 
  product,
  onAddToCart,
  onBuyNow,
  onWhatsAppOrder
}) => {
  // Call useCart hook inside the component
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6 text-gray-500">
        Loading product details...
      </div>
    );
  }

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>(product.image || product.gallery?.[0] || "");
  const [activeTab, setActiveTab] = useState<"description" | "specifications" | "reviews">("description");
  const [showSuccessCard, setShowSuccessCard] = useState<boolean>(false);

  const maxStock = product.stock?.quantity ?? 99;

  const handleIncrement = () => {
    if (quantity < maxStock) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const unitPrice = parsePrice(product.price);
  const retailPrice = parseRetailPrice(product.price);
  const totalPrice = (unitPrice * quantity).toFixed(2);
  const ratingValue = product.review ?? 4.5;
  
  const isDiscounted = typeof product.price === "object" && product.price?.is_discounted;
  const discountValue = typeof product.price === "object" ? product.price?.value : null;

  const addProductToCart = () => {
    const price = unitPrice;

    if (price === undefined || isNaN(price)) {
      console.error(`Could not determine a valid price for ${product.name}`);
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price,
      brand: product.brand || "",
      quantity,
    });

    if (onAddToCart) {
      onAddToCart(quantity);
    }

    setShowSuccessCard(true);
    setTimeout(() => {
      setShowSuccessCard(false);
    }, 2500);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-4 sm:py-6 lg:py-10 text-gray-800">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 space-y-6 sm:space-y-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="text-xs sm:text-sm text-gray-500 overflow-x-auto whitespace-nowrap pb-1">
          <ol className="flex items-center space-x-2">
            <li><a href="/" className="hover:text-primary">Home</a></li>
            <span>/</span>
            {product.category_path?.[0] && (
              <>
                <li><a href="#" className="hover:text-primary">{product.category_path[0].name}</a></li>
                <span>/</span>
              </>
            )}
            <li className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-xs">{product.name}</li>
          </ol>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 ">
          
          {/* Left: Product Images (Gallery) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative bg-amber-50/40 rounded-xl overflow-hidden  aspect-square flex items-center justify-center">
              {isDiscounted && discountValue && (
                <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-primary text-white text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
                  {discountValue}% OFF
                </span>
              )}
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Gallery Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg border-2 overflow-hidden flex-shrink-0 bg-gray-50 transition-all ${
                      selectedImage === img ? "border-primary ring-2 ring-blue-100" : "border-gray-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Center: Product Information & Actions */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            <div>
              {product.brand && (
                <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded-md">
                  {product.brand}
                </span>
              )}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary/80 mt-2">
                {product.name}
              </h1>

              {/* Rating block */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-600">{ratingValue.toFixed(2)}</span>
                {product.sold_amount && (
                  <span className="text-xs text-gray-400 ml-2">({product.sold_amount} sold)</span>
                )}
              </div>
            </div>

            {/* Short Description */}
            <p className="text-sm text-ring leading-relaxed">
              {product.short_description}
            </p>
           
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm">
              <span className="inline-flex items-center gap-1.5 text-gray-500">
                <span className="font-semibold text-gray-700">SKU:</span>
                <span className="text-gray-600">{product.sku}</span>
              </span>

              <span className="hidden sm:block h-4 w-px bg-gray-300" />

              <span className="inline-flex items-center gap-1.5 text-gray-500">
                <span className="font-semibold text-gray-700">Category:</span>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {product.category}
                </span>
              </span>
            </div>


            {/* Price Tag */}
           <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-2xl sm:text-3xl font-extrabold text-primary">
            ৳ {unitPrice.toFixed(2)}
          </span>

          {isDiscounted && retailPrice > unitPrice && (
            <>
              <span className="text-base sm:text-lg text-ring line-through">
                ৳ {retailPrice.toFixed(2)}
              </span>

              <span className="text-xs sm:text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                Save ৳ {(retailPrice - unitPrice).toFixed(2)}
              </span>
            </>
          )}
        </div>

            {/* Quantity Selector & Add to Cart Controls */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-text-primary">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                  <button 
                    onClick={handleDecrement}
                    className="p-2.5 text-ring hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-semibold text-gray-900 text-sm">{quantity}</span>
                  <button 
                    onClick={handleIncrement}
                    className="p-2.5 text-ring hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

          

              {/* Action Buttons */}
              <div className="space-y-3">

                {/* Add to Cart & Buy Now */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                  {/* Add to Cart */}
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      addProductToCart();
                    }}
                    aria-label={`Add ${product.name} to cart`}
                    className="group/cart relative flex min-h-10 w-full min-w-0 items-center justify-center gap-1 overflow-hidden rounded-lg bg-gradient-to-r from-primary to-primary/80 px-1.5 py-2 text-[9px] font-bold tracking-wide text-white  transition-all duration-300 active:scale-[0.97] min-[360px]:gap-1.5 min-[360px]:px-2 min-[360px]:text-[10px] sm:min-h-11 sm:gap-2 sm:rounded-xl sm:px-3 sm:py-2.5 sm:text-xs sm:hover:-translate-y-0.5 sm:hover:shadow-xl"
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/cart:translate-x-full" />

                    <ShoppingCart
                      size={14}
                      strokeWidth={2.5}
                      className="relative shrink-0 min-[360px]:h-4 min-[360px]:w-4"
                    />

                    <span className="relative truncate">ADD TO CART</span>

                    <span className="relative hidden min-[400px]:inline-flex sm:hidden">
                      +
                    </span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="relative ml-auto hidden shrink-0 sm:block"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>

                  {/* Buy Now */}
                  <button
                    type="button"
                    onClick={() => onBuyNow && onBuyNow(quantity)}
                    className="flex min-h-10 w-full min-w-0 items-center justify-center gap-1 overflow-hidden rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-1.5 py-2 text-[9px] font-bold tracking-wide text-white  transition-all duration-300 active:scale-[0.97] min-[360px]:gap-1.5 min-[360px]:px-2 min-[360px]:text-[10px] sm:min-h-11 sm:gap-2 sm:rounded-xl sm:px-3 sm:py-2.5 sm:text-xs sm:hover:-translate-y-0.5 sm:hover:shadow-xl"
                  >
                    <Zap
                      size={14}
                      strokeWidth={2.5}
                      className="shrink-0 min-[360px]:h-4 min-[360px]:w-4"
                    />

                    <span className="truncate">BUY NOW</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-auto hidden shrink-0 sm:block"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* WhatsApp & Call */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                  {/* WhatsApp Order */}
                  <button
                    type="button"
                    onClick={() => onWhatsAppOrder && onWhatsAppOrder(quantity)}
                    className="flex min-h-10 w-full min-w-0 items-center justify-center gap-1 overflow-hidden rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 px-1.5 py-2 text-[9px] font-bold tracking-wide text-white transition-all duration-300 active:scale-[0.97] min-[360px]:gap-1.5 min-[360px]:px-2 min-[360px]:text-[10px] sm:min-h-11 sm:gap-2 sm:rounded-xl sm:px-3 sm:py-2.5 sm:text-xs sm:hover:-translate-y-0.5 sm:hover:shadow-xl"
                  >
     

                <span className="truncate">ORDER ON WHATSAPP</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-auto hidden shrink-0 sm:block"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>

              {/* Call for Order */}
              <a
                href="tel:01939000500"
                className="flex min-h-10 w-full min-w-0 items-center justify-center gap-1 overflow-hidden rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 px-1.5 py-2 text-[9px] font-bold tracking-wide text-white shadow-md shadow-gray-800/20 transition-all duration-300 active:scale-[0.97] min-[360px]:gap-1.5 min-[360px]:px-2 min-[360px]:text-[10px] sm:min-h-11 sm:gap-2 sm:rounded-xl sm:px-3 sm:py-2.5 sm:text-xs sm:hover:-translate-y-0.5 sm:hover:shadow-xl"
              >
                <PhoneCall
                  size={14}
                  strokeWidth={2.5}
                  className="shrink-0 min-[360px]:h-4 min-[360px]:w-4"
                />

                <span className="truncate">CALL FOR ORDER</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-auto hidden shrink-0 sm:block"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

            </div>

            {/* Perks / Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 text-xs text-gray-600 text-center">
              <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded-lg">
                <FaTruck className="w-5 h-5 text-primary" />
                <span className="font-medium">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="font-medium">Cash on Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <span className="font-medium">100% Protected</span>
              </div>
            </div>
          </div>

          {/* Right: Selected Items Summary Card */}
        

<div className="lg:col-span-3 min-w-0 h-fit overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-24 lg:self-start">

  {/* Card Header */}
  <div className="flex items-center justify-between gap-3 border-b border-gray-100 bg-gray-50/80 px-3 py-3 sm:px-5 sm:py-4">
    <div className="min-w-0">
      <h3 className="text-sm sm:text-base font-bold text-gray-900">
        Order Summary
      </h3>
      <p className="mt-1 text-[11px] sm:text-xs text-gray-500">
        Review your selected item
      </p>
    </div>

    <span className="flex-shrink-0 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1.5 text-[11px] sm:text-xs font-semibold text-primary">
      {quantity} {quantity === 1 ? "Item" : "Items"}
    </span>
  </div>

  <div className="space-y-4 p-3 sm:space-y-5 sm:p-5">

    {/* Product Details */}
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg sm:rounded-xl border border-gray-100 bg-gray-50 p-1.5 sm:p-2">
        <img
          src={selectedImage}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-xs sm:text-sm font-semibold leading-5 text-gray-900">
          {product.name}
        </p>

        <p className="mt-1.5 break-words text-[10px] sm:text-xs text-gray-500">
          SKU: {product.sku}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-sm sm:text-base font-bold text-primary">
            ৳ {unitPrice.toFixed(2)}
          </span>

          <span className="rounded-md bg-gray-100 px-2 py-1 text-[10px] sm:text-xs font-medium text-gray-600">
            Per Qty
          </span>
        </div>
      </div>
    </div>

    {/* Price Breakdown */}
    <div className="space-y-3 border-t border-dashed border-gray-200 pt-3 sm:pt-4">
      <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
        <span className="text-gray-500">Price per item</span>
        <span className="font-medium tabular-nums text-gray-800">
          ৳ {unitPrice.toFixed(2)}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
        <span className="text-gray-500">Quantity</span>
        <span className="font-medium tabular-nums text-gray-800">
          × {quantity}
        </span>
      </div>
    </div>

    {/* Total Price */}
    <div className="rounded-lg sm:rounded-xl bg-primary/5 p-3 sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
        <div className="min-w-0">
          <p className="text-sm sm:text-base font-bold text-gray-900">
            Total Price
          </p>
          <p className="mt-1 text-[10px] sm:text-xs text-gray-500">
            {quantity} {quantity === 1 ? "item" : "items"} selected
          </p>
        </div>

        <span className="max-w-full break-words text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-primary tabular-nums">
          ৳ {Number(totalPrice).toFixed(2)}
        </span>
      </div>
    </div>

  </div>
</div>



        </div>

        {/* Detailed Tabs Section (Descriptions, Specifications, Reviews) */}
        <div className="bg-white rounded-2xl  border border-gray-100 p-4 sm:p-6 lg:p-8">
          <div className="flex border-b border-gray-200 space-x-6 sm:space-x-8 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-3 font-semibold text-sm transition-colors border-b-2 whitespace-nowrap ${
                activeTab === "description" ? "border-blue-600 text-primary" : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              Descriptions
            </button>
            <button
              onClick={() => setActiveTab("specifications")}
              className={`pb-3 font-semibold text-sm transition-colors border-b-2 whitespace-nowrap ${
                activeTab === "specifications" ? "border-blue-600 text-primary" : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 font-semibold text-sm transition-colors border-b-2 whitespace-nowrap ${
                activeTab === "reviews" ? "border-blue-600 text-primary" : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              Reviews ({ratingValue > 0 ? "1" : "0"})
            </button>
          </div>

          <div className="py-6 text-sm text-gray-600 leading-relaxed">
            {activeTab === "description" && (
              <div className="space-y-4">
                <p className="text-base text-gray-800 leading-relaxed">{product.description}</p>
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <p>SKU: <span className="font-mono text-gray-900">{product.sku}</span></p>
                  {product.origin && <p>Origin: <span className="font-medium text-gray-900">{product.origin}</span></p>}
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="space-y-6">
                {product.specification_groups && product.specification_groups.length > 0 ? (
                  product.specification_groups.map((group, gIdx) => (
                    <div key={gIdx} className="space-y-2">
                      <h4 className="font-semibold text-gray-900">{group.group}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {group.items.map((item, iIdx) => (
                          <div key={iIdx} className="flex justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                            <span className="text-gray-500">{item.label}</span>
                            <span className="font-medium text-gray-900">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : product.specifications ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Object.entries(product.specifications).map(([key, value], idx) => (
                      <div key={idx} className="flex justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                        <span className="text-gray-500">{key}</span>
                        <span className="font-medium text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No specifications available for this product.</p>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-3xl font-extrabold text-gray-900">{ratingValue.toFixed(1)}</div>
                  <div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Based on store reviews</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">Customer feedback for this item is verified and authentic.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products / Suggestions Section */}
        {product.better_suggestions && product.better_suggestions.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Related Products & Suggestions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {product.better_suggestions.map((item) => (
                <ProductCard 
                  key={item.id} 
                  product={{
                    ...item,
                    sku: item.sku || "",
                    brand: item.brand || null,
                    category: item.category || product.category,
                    short_description: "",
                    description: "",
                    gallery: [item.image],
                    stock: { quantity: 10, in_stock: true },
                    price: {
                      retail_price: item.retail_price,
                      sale_price: item.sale_price,
                      is_discounted: item.has_discount,
                      is_special_price: false,
                      special_price: { amount: null, start_date: null, end_date: null },
                      is_bundle: false
                    }
                  } as any} 
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ClientProductView;