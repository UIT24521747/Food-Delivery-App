"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react";
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
        className="flex w-full flex-col border-l border-border bg-[#161310] p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border/80 bg-[#1c1814] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <ShoppingBag className="size-5" />
            </div>
            <div>
              <SheetTitle className="font-serif-display text-xl text-foreground">
                Giỏ Hàng Của Bạn
              </SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground">
                {totalItems > 0
                  ? `Đang có ${totalItems} món ăn thượng hạng trong thực đơn`
                  : "Chưa có món ăn nào được chọn"}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex size-20 items-center justify-center rounded-full border border-primary/20 bg-secondary/60 text-primary/70">
              <UtensilsCrossed className="size-9" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif-display text-lg font-semibold text-foreground">
                Giỏ hàng đang trống
              </h3>
              <p className="max-w-xs text-sm text-muted-foreground">
                Hãy khám phá các nhà hàng Fine Dining và thêm những món ăn đặc
                trưng vào bàn tiệc của bạn.
              </p>
            </div>
            <Button
              variant="default"
              onClick={() => setDrawerOpen(false)}
              className="mt-2"
            >
              Khám phá thực đơn ngay
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between bg-secondary/40 px-6 py-2.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5 text-primary">
                <Sparkles className="size-3.5" />
                Đóng gói giữ nhiệt chuẩn Fine Dining
              </span>
              <button
                type="button"
                onClick={clearCart}
                className="font-medium text-muted-foreground transition-colors hover:text-destructive cursor-pointer"
              >
                Xóa tất cả
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-6 py-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 rounded-2xl border border-border/80 bg-[#1c1814] p-3 transition-colors hover:border-primary/30"
                >
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-border/60">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="line-clamp-1 font-serif-display text-sm font-semibold text-foreground">
                          {item.name}
                        </h4>
                        {item.restaurantName && (
                          <p className="text-[11px] text-muted-foreground">
                            {item.restaurantName}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Xóa ${item.name}`}
                        className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive cursor-pointer"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-bold text-primary">
                        {formatCurrency(item.price * item.quantity)}
                      </span>

                      <div className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/80 p-0.5">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label={`Giảm ${item.name}`}
                          className="flex size-6 items-center justify-center rounded-md text-foreground transition-colors hover:bg-primary/20 hover:text-primary cursor-pointer"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="min-w-[1.25rem] text-center text-xs font-bold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          aria-label={`Tăng ${item.name}`}
                          className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-amber-400 cursor-pointer"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="border-t border-border bg-[#1c1814] p-6">
              <div className="w-full space-y-2.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Tạm tính ({totalItems} món)</span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Phí & thời gian giao hàng</span>
                  <span className="italic text-muted-foreground">
                    Tính sau khi nhập địa chỉ
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between text-base font-bold">
                  <span className="font-serif-display text-foreground">
                    Tạm tính đơn hàng
                  </span>
                  <span className="text-lg text-primary">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>

              <Button
                asChild
                size="lg"
                onClick={() => setDrawerOpen(false)}
                className="mt-3 w-full justify-between px-6 text-base font-bold"
              >
                <Link href="/checkout">
                  <span>Tiến hành đặt hàng</span>
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
