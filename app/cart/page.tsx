"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "../../components/context/CartContext";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();

  // Delivery location selection: "inside" (Dhaka) or "outside" (Dhaka)
  const [deliveryLocation, setDeliveryLocation] = useState<"inside" | "outside">("inside");

  // Delivery charge calculation based on updated location rates
  const deliveryCharge =
    cartItems.length === 0 ? 0 : deliveryLocation === "inside" ? 100 : 150;
  const grandTotal = totalPrice + deliveryCharge;

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans p-3 ">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="p-1.5 sm:p-2 rounded-full bg-background border border-ring/20 hover:bg-ring/10 transition text-ring"
              aria-label="Back to Shop"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <h1 className="text-lg sm:text-2xl font-bold text-primary">
              Shopping Cart ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
            </h1>
          </div>

          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-destructive/90 hover:text-destructive font-medium underline"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-background rounded-xl p-8 sm:p-12 text-center border border-ring/20 shadow-sm max-w-md mx-auto my-8 sm:my-12">
            <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-ring stroke-1" />
            <h2 className="text-base sm:text-lg font-bold text-text-primary mb-1">
              Your cart is empty
            </h2>
            <p className="text-xs text-ring mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href="/"
              className="inline-block bg-foreground text-text-secondary px-6 py-2.5 rounded-lg text-xs font-semibold hover:bg-gray-800 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          /* Cart Grid with Items & Summary */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Cart Items Column Container */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {/* Column Titles */}
              <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-2 bg-ring/10hover:bg-ring/10 rounded-lg text-xs font-bold text-ring uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Subtotal</div>
              </div>

              {/* Items List */}
              {cartItems.map((item, index) => {
                const itemKey = `${item.id}-${item.size || "default"}-${index}`;
                return (
                  <div
                    key={itemKey}
                    className="bg-background rounded-xl p-3 sm:p-4 border border-ring/20 shadow-sm flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-4 sm:items-center hover:shadow-md transition"
                  >
                    {/* Product Info */}
                    <div className="sm:col-span-6 flex items-center gap-3">
                      <div className="relative w-16 h-20 sm:w-20 sm:h-24 bg-background rounded-md overflow-hidden flex-shrink-0 border border-ring/20">
                        <img
                          src={item.image || "/placeholder.png"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        {item.brand && (
                          <span className="text-[10px] font-bold text-ring uppercase tracking-wider block truncate">
                            {item.brand}
                          </span>
                        )}
                        <h3 className="text-md sm:text-sm md:text-lg font-semibold text-text-primary truncate">
                          {item.name}
                        </h3>

                        {item.size && (
                          <div className="mt-1">
                            <span className="text-[10px] bg-ring/10hover:bg-ring/10 text-ring px-1.5 py-0.5 rounded font-medium">
                              Size: {item.size}
                            </span>
                          </div>
                        )}

                        <p className="text-xs sm:text-sm font-bold text-primary mt-1">
                          ৳{item.price}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls & Subtotal */}
                    <div className="flex items-center justify-between sm:contents pt-2 sm:pt-0 border-t sm:border-t-0 border-ring/20">
                      {/* Quantity Controls */}
                      <div className="sm:col-span-3 flex justify-start sm:justify-center">
                        <div className="flex items-center gap-1 sm:gap-2 border border-ring/20 rounded-lg p-1 bg-background">
                          <button
                            onClick={() => {
                              if (item.quantity > 1) {
                                decreaseQuantity(item.id, item.size);
                              }
                            }}
                            disabled={item.quantity <= 1}
                            className={`p-1 rounded transition ${
                              item.quantity <= 1
                                ? "text-ring cursor-not-allowed"
                                : "text-ring hover:bg-background"
                            }`}
                            aria-label="Decrease Quantity"
                          >
                            <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                          <span className="text-xs font-bold w-5 sm:w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.id, item.size)}
                            className="p-1 hover:bg-background rounded text-ring transition"
                            aria-label="Increase Quantity"
                          >
                            <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal & Remove Action */}
                      <div className="sm:col-span-3 flex items-center justify-end gap-2 sm:gap-3">
                        <span className="text-xs sm:text-sm font-bold text-primary">
                          ৳{item.price * item.quantity}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-ring hover:text-destructive transition p-1.5 rounded-md hover:bg-red-50"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary Sidebar */}
            <div className="bg-background rounded-xl p-4 sm:p-6 border border-ring/20 shadow-sm h-fit sticky top-20">
              <h2 className="text-sm sm:text-base font-bold text-text-primary mb-4 pb-3 border-b border-ring/20">
                Order Summary
              </h2>

              {/* Delivery Area Selector */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-ring mb-2">
                  Delivery Area
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-ring">
                    <input
                      type="radio"
                      name="deliveryLocation"
                      value="inside"
                      checked={deliveryLocation === "inside"}
                      onChange={() => setDeliveryLocation("inside")}
                      className="accent-black cursor-pointer"
                    />
                    <span>Inside Dhaka (৳100)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-ring">
                    <input
                      type="radio"
                      name="deliveryLocation"
                      value="outside"
                      checked={deliveryLocation === "outside"}
                      onChange={() => setDeliveryLocation("outside")}
                      className="accent-black cursor-pointer"
                    />
                    <span>Outside Dhaka (৳150)</span>
                  </label>
                </div>
              </div>

              <div className="space-y-3 text-xs text-ring mb-6 border-t border-ring/20 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-text-primary">
                    ৳{totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-semibold text-text-primary">
                    ৳{deliveryCharge.toFixed(2)}
                  </span>
                </div>
                <hr className="border-ring/20 my-2" />
                <div className="flex justify-between text-sm font-bold text-primary">
                  <span>Total Amount</span>
                  <span>৳{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="hidden sm:block w-full bg-primary text-text-secondary text-center py-3 rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-gray-800 transition shadow-sm active:scale-[0.98]"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile Bottom Bar */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-ring/20 p-3 sm:hidden z-40  flex items-center justify-between">
          <div>
            <span className="text-[10px] text-ring uppercase font-semibold block">Total</span>
            <span className="text-base font-bold text-text-primary">৳{grandTotal.toFixed(0)}</span>
          </div>
          <Link
            href="/checkout"
            className="bg-foreground text-text-secondary px-6 py-2.5 rounded-lg font-bold uppercase tracking-wider text-xs active:scale-[0.98] transition-all"
          >
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
}