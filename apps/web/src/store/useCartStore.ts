"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";
import type { MenuItem } from "@/data/restaurants";

export interface CartItem extends MenuItem {
  quantity: number;
  restaurantName?: string;
}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  setDrawerOpen: (open: boolean) => void;
  addItem: (item: MenuItem, restaurantName?: string) => void;
  removeItem: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

export const selectTotalItems = (state: CartState): number =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectTotalPrice = (state: CartState): number =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      hasHydrated: false,

      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),

      setDrawerOpen: (open: boolean) => set({ isDrawerOpen: open }),

      addItem: (item: MenuItem, restaurantName?: string) => {
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((i) => i.id === item.id);

        if (existingIndex > -1) {
          const updated = [...currentItems];
          const newQty = updated[existingIndex].quantity + 1;
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: newQty,
          };
          set({ items: updated });
          toast.success(`Đã tăng số lượng "${item.name}" (x${newQty})`, {
            description: restaurantName
              ? `Nhà hàng: ${restaurantName}`
              : "Giỏ hàng đã được cập nhật.",
          });
        } else {
          set({
            items: [
              ...currentItems,
              { ...item, quantity: 1, restaurantName },
            ],
          });
          toast.success(`Đã thêm "${item.name}" vào giỏ hàng`, {
            description: restaurantName
              ? `Nhà hàng: ${restaurantName}`
              : "Mở giỏ hàng để xem trước đơn hàng.",
          });
        }
      },

      removeItem: (itemId: string) => {
        const target = get().items.find((i) => i.id === itemId);
        set({
          items: get().items.filter((i) => i.id !== itemId),
        });
        if (target) {
          toast.info(`Đã xóa "${target.name}" khỏi giỏ hàng`);
        }
      },

      increaseQuantity: (itemId: string) => {
        const target = get().items.find((i) => i.id === itemId);
        if (!target) return;
        const newQty = target.quantity + 1;
        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, quantity: newQty } : item
          ),
        });
        toast.success(`Đã thêm 1 phần "${target.name}" (x${newQty})`);
      },

      decreaseQuantity: (itemId: string) => {
        const target = get().items.find((i) => i.id === itemId);
        if (!target) return;

        if (target.quantity <= 1) {
          set({
            items: get().items.filter((item) => item.id !== itemId),
          });
          toast.info(`Đã xóa "${target.name}" khỏi giỏ hàng`);
        } else {
          const newQty = target.quantity - 1;
          set({
            items: get().items.map((item) =>
              item.id === itemId ? { ...item, quantity: newQty } : item
            ),
          });
          toast.info(`Đã giảm số lượng "${target.name}" còn x${newQty}`);
        }
      },

      updateQuantity: (itemId: string, quantity: number) => {
        const target = get().items.find((i) => i.id === itemId);
        if (!target) return;

        if (quantity <= 0) {
          set({
            items: get().items.filter((item) => item.id !== itemId),
          });
          toast.info(`Đã xóa "${target.name}" khỏi giỏ hàng`);
        } else {
          set({
            items: get().items.map((item) =>
              item.id === itemId ? { ...item, quantity } : item
            ),
          });
          toast.success(`Đã cập nhật "${target.name}" (x${quantity})`);
        }
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "storia-food-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
