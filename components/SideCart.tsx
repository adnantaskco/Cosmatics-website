"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useCart, CartItem } from "@/components/context/CartContext";
import { X, Trash2, ShoppingBag, Plus, Minus } from "lucide-react";

export default function SideCart() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, isCartOpen, setIsCartOpen, totalPrice } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <>
      {/* Right Side Middle Floating Trigger Button with Premium Pink Theme */}
      {!isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-pink-600 text-white shadow-2xl rounded-l-2xl px-3.5 py-5 flex flex-col items-center gap-2 hover:bg-pink-700 transition-all duration-300 group border-l border-y border-pink-400/30 backdrop-blur-md"
          aria-label="Open Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2.5 -right-3.5 bg-rose-900 text-pink-100 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md border border-pink-200">
                {cartItems.length}
              </span>
            )}
          </div>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-pink-100 [writing-mode:vertical-rl] rotate-180">
            Cart
          </span>
        </button>
      )}

      {/* Main Side Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-pink-950/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsCartOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Container with Premium Pink Touch */}
          <div className="relative w-full sm:max-w-md bg-pink-50/95 backdrop-blur-xl h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 border-l border-pink-200/60">
            
            {/* Header */}
            <div className="p-4 sm:px-6 border-b border-pink-200/60 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-pink-100 text-pink-700">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  Your Cart <span className="text-pink-600 font-semibold">({cartItems.length})</span>
                </h2>
              </div>
              
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 -mr-2 text-gray-500 hover:text-pink-700 rounded-full hover:bg-pink-100/60 transition-colors focus:outline-none"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 shadow-inner">
                    <ShoppingBag className="w-9 h-9" />
                  </div>
                  <p className="text-gray-600 text-sm font-medium">Your cart is currently empty.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 text-xs font-bold uppercase tracking-wider text-pink-700 bg-pink-100/80 hover:bg-pink-200 py-2.5 px-5 rounded-xl transition-all shadow-sm"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item: CartItem, index: number) => (
                  <div
                    key={`${item.id}-${item.size}-${index}`}
                    className="flex items-center gap-3 sm:gap-4 bg-white/80 p-3 rounded-2xl border border-pink-100 shadow-sm transition-all hover:shadow-md"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded-xl bg-pink-50 flex-shrink-0 border border-pink-100"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-xs sm:text-sm text-gray-900 truncate pr-2">
                        {item.name}
                      </h4>
                      {item.size && (
                        <p className="text-xs text-gray-500 mt-0.5">Size: <span className="font-medium text-pink-700">{item.size}</span></p>
                      )}
                      
                      <p className="text-sm font-bold text-pink-800 mt-1">৳ {item.price}</p>

                      {/* Quantity Increment / Decrement Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-pink-200 rounded-lg bg-pink-50/50">
                          <button
                            onClick={() => {
                              if (item.quantity > 1) {
                                // Apnar context function er structure onujayi ekhane call hobe
                                decreaseQuantity(item.id, item.size);
                              } else {
                                removeFromCart(item.id, item.size);
                              }
                            }}
                            className="p-1 text-pink-700 hover:bg-pink-200/60 rounded-l-lg transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          
                          <span className="px-2.5 text-xs font-bold text-gray-800">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => {
                              increaseQuantity(item.id, item.size);
                            }}
                            className="p-1 text-pink-700 hover:bg-pink-200/60 rounded-r-lg transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="p-2 text-gray-400 hover:text-rose-600 transition-colors rounded-xl hover:bg-rose-50 flex-shrink-0 self-start"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 sm:p-6 border-t border-pink-200/60 space-y-3 bg-white/90 backdrop-blur-md sticky bottom-0 shadow-lg">
                <div className="flex justify-between items-center text-sm sm:text-base font-bold text-gray-900">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="text-pink-700 sm:text-lg">৳ {totalPrice.toFixed(0)}</span>
                </div>
                
                <p className="text-xs text-gray-500 text-center">Shipping and taxes calculated at checkout.</p>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full bg-pink-100 text-pink-800 hover:bg-pink-200 text-center py-3 px-2 rounded-xl border border-pink-200 font-bold uppercase tracking-wider text-xs sm:text-sm active:scale-[0.98] transition-all flex items-center justify-center shadow-sm"
                  >
                    View Cart
                  </Link>
                  
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full bg-pink-600 text-white hover:bg-pink-700 text-center py-3 px-2 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm active:scale-[0.98] transition-all flex items-center justify-center shadow-md shadow-pink-600/20"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}