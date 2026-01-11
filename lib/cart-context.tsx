"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  courseDateId: string;
  courseTitle: string;
  courseSlug: string;
  startDate: string;
  endDate: string;
  location: string;
  quantity: number;
  pricePerPerson: number;
  vatRate: number; // DPH sazba (např. 21 pro 21%)
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (courseDateId: string) => void;
  updateQuantity: (courseDateId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  totalPriceWithoutVat: number;
  totalVat: number;
  totalPriceWithVat: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Načíst košík z LocalStorage při mount
  useEffect(() => {
    setMounted(true);
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error loading cart:", e);
      }
    }
  }, []);

  // Uložit košík do LocalStorage při změně
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, mounted]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      // Pokud už položka existuje, aktualizuj quantity
      const existingIndex = prev.findIndex((i) => i.courseDateId === item.courseDateId);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      // Jinak přidej novou položku
      return [...prev, item];
    });
  };

  const removeItem = (courseDateId: string) => {
    setItems((prev) => prev.filter((i) => i.courseDateId !== courseDateId));
  };

  const updateQuantity = (courseDateId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(courseDateId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.courseDateId === courseDateId ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Cena bez DPH (pricePerPerson je už bez DPH)
  const totalPriceWithoutVat = items.reduce(
    (sum, item) => sum + item.pricePerPerson * item.quantity,
    0
  );

  // Celková DPH
  const totalVat = items.reduce(
    (sum, item) => sum + (item.pricePerPerson * item.quantity * item.vatRate) / 100,
    0
  );

  // Celková cena s DPH
  const totalPriceWithVat = totalPriceWithoutVat + totalVat;

  // Zpětná kompatibilita
  const totalPrice = totalPriceWithoutVat;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        totalPriceWithoutVat,
        totalVat,
        totalPriceWithVat,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
