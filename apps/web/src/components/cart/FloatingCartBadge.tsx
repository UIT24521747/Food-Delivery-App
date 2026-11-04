"use client";

import { ShoppingBag } from "lucide-react";
import {
  useCartStore,
  selectTotalItems,
  selectTotalPrice,
} from "@/store/useCartStore";
import { formatCurrency } from "@/lib/utils";

export function FloatingCartBadge() {
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const totalItems = useCartStore(selectTotalItems);
  const totalPrice = useCartStore(selectTotalPrice);
  const setDrawerOpen = useCartStore((state) => state.setDrawerOpen);

  const displayCount = hasHydrated ? totalItems : 0;
  const displayPrice = hasHydrated ? totalPrice : 0;

  return (
    <div className="fixed right-4 bottom-5 z-40 sm:right-6 sm:bottom-6">
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        aria-label="Mở giỏ hàng xem trước đơn hàng"
        data-testid="floating-cart-badge"
        className="group flex items-center gap-3 rounded-2xl border border-primary/50 bg-[#1c1814]/95 px-4 py-3 text-left shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary gold-glow cursor-pointer"
      >
        <div className="relative flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105">
          <ShoppingBag className="size-5" />
          <span
            data-testid="floating-cart-count"
            className="absolute -top-2 -right-2 flex min-w-[22px] items-center justify-center rounded-full border-2 border-[#12100e] bg-[#faf7f2] px-1.5 py-0.5 text-[11px] font-extrabold text-[#12100e] shadow-sm"
          >
            {displayCount}
          </span>
        </div>

        <div className="hidden pr-1 sm:block">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Giỏ hàng ({displayCount} món)
          </p>
          <p className="font-serif-display text-sm font-bold text-primary">
            {displayCount > 0 ? formatCurrency(displayPrice) : "Xem giỏ hàng"}
          </p>
        </div>
      </button>
    </div>
  );
}
