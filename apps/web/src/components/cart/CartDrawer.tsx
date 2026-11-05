"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  useCartStore,
  selectTotalItems,
  selectTotalPrice,
} from "@/store/useCartStore";
import { formatCurrency } from "@/lib/utils";

export function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
  const setDrawerOpen = useCartStore((state) => state.setDrawerOpen);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalItems = useCartStore(selectTotalItems);
  const totalPrice = useCartStore(selectTotalPrice);

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col rounded-none border-l border-primary/25 bg-[#0c0b09] p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-primary/20 bg-[#13110e] px-6 py-6">
          <p className="text-[9px] uppercase tracking-[0.32em] text-primary">
            Votre Sélection
          </p>
          <SheetTitle className="font-serif-display text-2xl font-normal text-foreground">
            Thực Đơn Đã Chọn
          </SheetTitle>
          <SheetDescription className="sr-only">
            Danh sách các món ăn trong giỏ hàng
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <p className="font-serif-display text-xl italic text-muted-foreground">
              “Bàn tiệc của quý khách hiện đang trống.”
            </p>
            <Button
              variant="outline"
              onClick={() => setDrawerOpen(false)}
            >
              Khám Phá Thực Đơn
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-primary/15 px-6 py-2.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <span>{totalItems} món</span>
              <button
                type="button"
                onClick={clearCart}
                className="transition-colors hover:text-primary cursor-pointer"
              >
                Làm mới
              </button>
            </div>

            <div className="flex-1 divide-y divide-primary/15 overflow-y-auto px-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4">
                  <div className="relative size-16 shrink-0 overflow-hidden border border-primary/25">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-serif-display text-base font-medium text-foreground line-clamp-1">
                          {item.name}
                        </h4>
                        {item.restaurantName && (
                          <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                            {item.restaurantName}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Xóa ${item.name}`}
                        className="text-muted-foreground transition-colors hover:text-destructive cursor-pointer"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-serif-display text-sm font-medium text-primary">
                        {formatCurrency(item.price * item.quantity)}
                      </span>

                      <div className="inline-flex items-center border border-primary/35">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label={`Giảm ${item.name}`}
                          className="flex size-6 items-center justify-center text-muted-foreground hover:text-primary cursor-pointer"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="min-w-[1.25rem] text-center font-serif-display text-xs text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          aria-label={`Tăng ${item.name}`}
                          className="flex size-6 items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="border-t border-primary/20 bg-[#13110e] p-6">
              <div className="w-full space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    Tạm tính
                  </span>
                  <span className="font-serif-display text-2xl text-primary">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
                <Separator className="bg-primary/15" />
              </div>

              <Button
                asChild
                size="lg"
                onClick={() => setDrawerOpen(false)}
                className="w-full justify-between"
              >
                <Link href="/checkout">
                  <span>Tiến Hành Đặt Hàng</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
