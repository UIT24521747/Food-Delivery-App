"use client";

import { Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import type { MenuItem } from "@/data/restaurants";

interface AddToCartButtonProps {
  item: MenuItem;
  restaurantName?: string;
  compact?: boolean;
}

export function AddToCartButton({
  item,
  restaurantName,
}: AddToCartButtonProps) {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const addItem = useCartStore((state) => state.addItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const cartItem = hasHydrated
    ? items.find((i) => i.id === item.id)
    : undefined;
  const quantity = cartItem?.quantity ?? 0;

  if (quantity > 0) {
    return (
      <div className="inline-flex items-center border border-primary/50 bg-[#0c0b09]">
        <button
          type="button"
          onClick={() => decreaseQuantity(item.id)}
          aria-label={`Giảm số lượng ${item.name}`}
          className="flex size-7 items-center justify-center text-muted-foreground transition-colors hover:text-primary cursor-pointer"
        >
          <Minus className="size-3" />
        </button>
        <span
          data-testid={`item-qty-${item.id}`}
          className="min-w-[1.5rem] text-center font-serif-display text-xs font-semibold text-primary"
        >
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => increaseQuantity(item.id)}
          aria-label={`Tăng số lượng ${item.name}`}
          className="flex size-7 items-center justify-center text-primary transition-colors hover:bg-primary hover:text-primary-foreground cursor-pointer"
        >
          <Plus className="size-3" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => addItem(item, restaurantName)}
      aria-label={`Thêm ${item.name}`}
      className="inline-flex h-7 items-center gap-1.5 border border-primary/45 bg-transparent px-2.5 text-[9px] uppercase tracking-[0.2em] text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground cursor-pointer sm:h-8 sm:px-3.5 sm:text-[10px]"
    >
      <Plus className="size-3" />
      <span>Chọn</span>
    </button>
  );
}
