"use client";

import { Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  compact = false,
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
      <div className="inline-flex items-center gap-1 rounded-xl border border-primary/40 bg-secondary/90 p-0.5 sm:gap-1.5 sm:p-1 shadow-sm">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => decreaseQuantity(item.id)}
          aria-label={`Giảm số lượng ${item.name}`}
          className="size-6 rounded-lg text-foreground hover:bg-primary/20 hover:text-primary sm:size-7"
        >
          <Minus className="size-3 sm:size-3.5" />
        </Button>
        <span
          data-testid={`item-qty-${item.id}`}
          className="min-w-[1.1rem] text-center text-[11px] font-bold text-primary sm:min-w-[1.5rem] sm:text-xs"
        >
          {quantity}
        </span>
        <Button
          type="button"
          variant="default"
          size="icon"
          onClick={() => increaseQuantity(item.id)}
          aria-label={`Tăng số lượng ${item.name}`}
          className="size-6 rounded-lg sm:size-7"
        >
          <Plus className="size-3 sm:size-3.5" />
        </Button>
      </div>
    );
  }

  if (compact) {
    return (
      <Button
        type="button"
        size="icon"
        onClick={() => addItem(item, restaurantName)}
        aria-label={`Thêm ${item.name} vào giỏ hàng`}
        className="size-8 rounded-full border border-primary/50 bg-primary/15 text-primary hover:bg-primary hover:text-primary-foreground shadow-none sm:size-9"
      >
        <Plus className="size-4" />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      size="sm"
      onClick={() => addItem(item, restaurantName)}
      className="h-7 rounded-lg px-2.5 text-[11px] font-semibold sm:h-8 sm:rounded-xl sm:px-3.5 sm:text-xs"
    >
      <Plus className="size-3.5 sm:hidden" />
      <ShoppingBag className="hidden size-3.5 sm:inline-block" />
      <span className="sm:hidden">Thêm</span>
      <span className="hidden sm:inline">Thêm món</span>
    </Button>
  );
}
