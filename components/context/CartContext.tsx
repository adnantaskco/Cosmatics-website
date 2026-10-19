"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  brand: string;
  size?: string;
  quantity: number;
}

export interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  address: string;
  district?: string;
  thana?: string;
}

export interface OrderData {
  invoiceNo: string;
  orderId?: string;
  id?: string;
  orderDate: string;
  customer?: CustomerDetails;
  items?: OrderItem[];
  paymentMethod?: string;
  notes?: string;
  subtotal?: number;
  deliveryCharge?: number;
  grandTotal: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, size?: string) => void;
  increaseQuantity: (id: number, size?: string) => void;
  decreaseQuantity: (id: number, size?: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  lastOrder: OrderData | null;
  setLastOrder: (order: OrderData | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [lastOrder, setLastOrderState] = useState<OrderData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // 1. Read cart & last order from localStorage on mount (client-only)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }

      const savedOrder = localStorage.getItem("lastOrder");
      if (savedOrder) {
        setLastOrderState(JSON.parse(savedOrder));
      }
    } catch (error) {
      console.error("Failed to load state from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 2. Persist cart to localStorage whenever cartItems change
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cartItems, isLoaded]);

  // Setter wrapper for lastOrder to keep localStorage synchronized
  const setLastOrder = (order: OrderData | null) => {
    setLastOrderState(order);
    try {
      if (order) {
        localStorage.setItem("lastOrder", JSON.stringify(order));
      } else {
        localStorage.removeItem("lastOrder");
      }
    } catch (error) {
      console.error("Failed to save order to localStorage:", error);
    }
  };

  const addToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + newItem.quantity,
        };
        return updated;
      }

      return [...prevItems, newItem];
    });

    setIsCartOpen(true);
  };

  const increaseQuantity = (id: number, size?: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id: number, size?: string) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number, size?: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.size === size))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalPrice,
        totalItems,
        isCartOpen,
        setIsCartOpen,
        lastOrder,
        setLastOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}