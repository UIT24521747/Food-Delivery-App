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
    <div className="fixed right-3 bottom-16 z-40 sm:right-6 sm:bottom-6">
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        aria-label="Mở giỏ hàng xem trước đơn hàng"
        data-testid="floating-cart-badge"
        className="group flex items-center gap-2.5 rounded-2xl border border-primary/50 bg-[#1c1814]/95 px-3 py-2 text-left shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary gold-glow cursor-pointer sm:gap-3 sm:px-4 sm:py-3"
      >
        <div className="relative flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105 sm:size-11">
          <ShoppingBag className="size-4 sm:size-5" />
          <span
            data-testid="floating-cart-count"
            className="absolute -top-1.5 -right-1.5 flex min-w-[20px] items-center justify-center rounded-full border-2 border-[#12100e] bg-[#faf7f2] px-1 py-0.5 text-[10px] font-extrabold text-[#12100e] shadow-sm sm:-top-2 sm:-right-2 sm:min-w-[22px] sm:px-1.5 sm:text-[11px]"
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
