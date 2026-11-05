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
    <div className="fixed right-3 bottom-16 z-40 sm:right-8 sm:bottom-8">
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        aria-label="Mở giỏ hàng"
        data-testid="floating-cart-badge"
        className="group flex items-center gap-3 border border-primary/60 bg-[#0c0b09]/95 px-3.5 py-2.5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:bg-primary hover:text-primary-foreground cursor-pointer sm:px-5 sm:py-3"
      >
        <div className="relative flex items-center gap-2">
          <ShoppingBag className="size-4 text-primary transition-colors group-hover:text-primary-foreground" />
          <span
            data-testid="floating-cart-count"
            className="font-serif-display text-sm font-semibold text-primary transition-colors group-hover:text-primary-foreground"
          >
            {displayCount}
          </span>
        </div>

        {displayCount > 0 && (
          <span className="hidden border-l border-primary/30 pl-3 font-serif-display text-sm text-foreground transition-colors group-hover:border-primary-foreground/30 group-hover:text-primary-foreground sm:inline">
            {formatCurrency(displayPrice)}
          </span>
        )}
      </button>
    </div>
  );
}
