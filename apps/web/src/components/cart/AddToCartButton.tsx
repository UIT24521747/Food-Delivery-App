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
      <div className="inline-flex items-center gap-1.5 rounded-xl border border-primary/40 bg-secondary/90 p-1 shadow-sm">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => decreaseQuantity(item.id)}
          aria-label={`Giảm số lượng ${item.name}`}
          className="size-7 rounded-lg text-foreground hover:bg-primary/20 hover:text-primary"
        >
          <Minus className="size-3.5" />
        </Button>
        <span
          data-testid={`item-qty-${item.id}`}
          className="min-w-[1.5rem] text-center text-xs font-bold text-primary"
        >
          {quantity}
        </span>
        <Button
          type="button"
          variant="default"
          size="icon"
          onClick={() => increaseQuantity(item.id)}
          aria-label={`Tăng số lượng ${item.name}`}
          className="size-7 rounded-lg"
        >
          <Plus className="size-3.5" />
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
        className="size-9 rounded-full border border-primary/50 bg-primary/15 text-primary hover:bg-primary hover:text-primary-foreground shadow-none"
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
      className="rounded-xl px-3.5 font-semibold"
    >
      <ShoppingBag className="size-3.5" />
      <span>Thêm món</span>
    </Button>
  );
}
