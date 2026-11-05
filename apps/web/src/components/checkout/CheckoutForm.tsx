"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Plus, Minus, Trash2, ArrowLeft } from "lucide-react";
import {
  checkoutSchema,
  type CheckoutFormValues,
} from "@/lib/validations/checkout.schema";
import {
  useCartStore,
  selectTotalItems,
  selectTotalPrice,
  type CartItem,
} from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

interface OrderSuccessData {
  orderCode: string;
  createdAt: string;
  estimatedDelivery: string;
  deliveryFee: number;
  customer: CheckoutFormValues;
  orderedItems: CartItem[];
  totalAmount: number;
}

function calculateDeliveryByAddress(address: string): {
  hasValidAddress: boolean;
  deliveryFee: number;
  estimatedTime: string;
} {
  const trimmed = address.trim();
  if (trimmed.length < 10) {
    return {
      hasValidAddress: false,
      deliveryFee: 0,
      estimatedTime: "",
    };
  }

  const normalized = trimmed.toLowerCase();
  const isCentralDistrict =
    normalized.includes("quận 1") ||
    normalized.includes("quan 1") ||
    normalized.includes("q1") ||
    normalized.includes("quận 3") ||
    normalized.includes("quan 3") ||
    normalized.includes("q3") ||
    normalized.includes("đồng khởi") ||
    normalized.includes("bến nghé");

  if (isCentralDistrict) {
    return {
      hasValidAddress: true,
      deliveryFee: 20000,
      estimatedTime: "20 - 30 phút",
    };
  }

  return {
    hasValidAddress: true,
    deliveryFee: 30000,
    estimatedTime: "30 - 45 phút",
  };
}

export function CheckoutForm() {
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore(selectTotalItems);
  const totalPrice = useCartStore(selectTotalPrice);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const [confirmedOrder, setConfirmedOrder] =
    useState<OrderSuccessData | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      note: "",
    },
    mode: "onTouched",
  });

  const watchedAddress = watch("address") || "";
  const { hasValidAddress, deliveryFee, estimatedTime } =
    calculateDeliveryByAddress(watchedAddress);

  const finalTotal =
    items.length > 0 ? totalPrice + (hasValidAddress ? deliveryFee : 0) : 0;

  const onSubmit = async (values: CheckoutFormValues) => {
    if (items.length === 0) {
      toast.error("Vui lòng chọn món trước khi đặt hàng.");
      return;
    }

    const deliveryInfo = calculateDeliveryByAddress(values.address);
    const snapshotItems = [...items];
    const snapshotTotal = totalPrice + deliveryInfo.deliveryFee;

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          items: snapshotItems,
          deliveryFee: deliveryInfo.deliveryFee,
          estimatedDelivery: deliveryInfo.estimatedTime,
          totalAmount: snapshotTotal,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result.message || "Không thể đặt hàng.");
        return;
      }

      setConfirmedOrder({
        orderCode: result.orderCode,
        createdAt: result.createdAt,
        estimatedDelivery:
          deliveryInfo.estimatedTime || result.estimatedDelivery,
        deliveryFee: deliveryInfo.deliveryFee,
        customer: values,
        orderedItems: snapshotItems,
        totalAmount: snapshotTotal,
      });

      clearCart();
      reset();
      toast.success(`Mã đơn: ${result.orderCode}`);
    } catch {
      toast.error("Có lỗi kết nối máy chủ.");
    }
  };

  if (confirmedOrder) {
    return (
      <Card
        data-testid="order-confirmation"
        className="french-double-border mx-auto max-w-xl bg-[#13110e] p-8 sm:p-12"
      >
        <div className="space-y-4 text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-primary">
            Confirmation de Commande
          </p>
          <h2 className="font-serif-display text-3xl font-normal text-foreground sm:text-4xl">
            Merci, {confirmedOrder.customer.fullName}
          </h2>

          <div className="my-6 border-y border-primary/20 py-5">
            <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
              Mã Đơn Hàng
            </p>
            <p
              data-testid="order-code"
              className="mt-1 font-serif-display text-3xl tracking-widest text-primary"
            >
              {confirmedOrder.orderCode}
            </p>
            <p className="mt-2 font-serif-display text-sm italic text-muted-foreground">
              {confirmedOrder.estimatedDelivery}
            </p>
          </div>
        </div>

        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex justify-between py-1">
            <span className="uppercase tracking-widest">Điện thoại</span>
            <span className="text-foreground">
              {confirmedOrder.customer.phone}
            </span>
          </div>
          <div className="flex justify-between gap-4 py-1">
            <span className="shrink-0 uppercase tracking-widest">Địa chỉ</span>
            <span className="text-right text-foreground">
              {confirmedOrder.customer.address}
            </span>
          </div>
        </div>

        <Separator className="my-6 bg-primary/15" />

        <div className="space-y-2.5">
          {confirmedOrder.orderedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-baseline justify-between font-serif-display text-base"
            >
              <span className="text-foreground">
                {item.name} <span className="text-primary">×{item.quantity}</span>
              </span>
              <span className="text-foreground">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          ))}
          <div className="flex items-baseline justify-between pt-2 text-xs text-muted-foreground">
            <span className="uppercase tracking-widest">Phí giao hàng</span>
            <span>{formatCurrency(confirmedOrder.deliveryFee)}</span>
          </div>
          <div className="flex items-baseline justify-between border-t border-primary/20 pt-4 font-serif-display text-xl">
            <span>Tổng cộng</span>
            <span className="text-primary">
              {formatCurrency(confirmedOrder.totalAmount)}
            </span>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <ArrowLeft className="size-3.5" />
              <span>La Maison</span>
            </Link>
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
      {/* Left: Minimalist Form */}
      <div className="lg:col-span-7">
        <Card className="border-primary/20 bg-[#13110e] p-2 sm:p-4">
          <CardHeader className="border-b border-primary/15 pb-4">
            <p className="text-[9px] uppercase tracking-[0.32em] text-primary">
              Informations
            </p>
            <CardTitle className="font-serif-display text-2xl font-normal">
              Thông Tin Quý Khách
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-6"
              data-testid="checkout-form"
            >
              <div className="space-y-1.5">
                <Label
                  htmlFor="fullName"
                  className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
                >
                  Họ và tên
                </Label>
                <Input
                  id="fullName"
                  placeholder="Lê Như Thực"
                  aria-invalid={!!errors.fullName}
                  {...register("fullName")}
                />
                {errors.fullName?.message && (
                  <p
                    role="alert"
                    data-testid="error-fullName"
                    className="pt-1 text-xs text-destructive"
                  >
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="phone"
                  className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
                >
                  Số điện thoại
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="0901234567"
                  aria-invalid={!!errors.phone}
                  {...register("phone")}
                />
                {errors.phone?.message && (
                  <p
                    role="alert"
                    data-testid="error-phone"
                    className="pt-1 text-xs text-destructive"
                  >
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="address"
                  className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
                >
                  Địa chỉ giao hàng
                </Label>
                <Input
                  id="address"
                  placeholder="88 Đồng Khởi, Quận 1, TP. Hồ Chí Minh"
                  aria-invalid={!!errors.address}
                  {...register("address")}
                />
                {errors.address?.message && (
                  <p
                    role="alert"
                    data-testid="error-address"
                    className="pt-1 text-xs text-destructive"
                  >
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="note"
                  className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
                >
                  Ghi chú
                </Label>
                <Textarea
                  id="note"
                  placeholder="Yêu cầu riêng cho Bếp trưởng"
                  aria-invalid={!!errors.note}
                  {...register("note")}
                />
                {errors.note?.message && (
                  <p
                    role="alert"
                    data-testid="error-note"
                    className="pt-1 text-xs text-destructive"
                  >
                    {errors.note.message}
                  </p>
                )}
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  data-testid="submit-order-button"
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Đang xử lý...</span>
                    </>
                  ) : (
                    <span>Xác Nhận Đặt Hàng</span>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Right: Minimalist Order Receipt */}
      <div className="lg:col-span-5">
        <Card className="sticky top-24 border-primary/20 bg-[#13110e] p-2 sm:p-4">
          <CardHeader className="border-b border-primary/15 pb-4">
            <p className="text-[9px] uppercase tracking-[0.32em] text-primary">
              Votre Table
            </p>
            <CardTitle className="flex items-baseline justify-between font-serif-display text-2xl font-normal">
              <span>Thực Đơn</span>
              <span className="text-sm italic text-muted-foreground">
                {totalItems} món
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5 pt-5">
            {items.length === 0 ? (
              <div className="py-10 text-center">
                <p className="font-serif-display text-lg italic text-muted-foreground">
                  Chưa có món ăn được chọn.
                </p>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <Link href="/">Chọn Món</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="max-h-80 divide-y divide-primary/15 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 py-3 first:pt-0"
                    >
                      <div className="relative size-12 shrink-0 overflow-hidden border border-primary/20">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-serif-display text-base text-foreground">
                          {item.name}
                        </h4>
                        <p className="font-serif-display text-xs text-primary">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <div className="inline-flex items-center border border-primary/30">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.id)}
                            aria-label={`Giảm ${item.name}`}
                            className="flex size-6 items-center justify-center text-muted-foreground hover:text-primary cursor-pointer"
                          >
                            <Minus className="size-2.5" />
                          </button>
                          <span className="w-5 text-center font-serif-display text-xs">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.id)}
                            aria-label={`Tăng ${item.name}`}
                            className="flex size-6 items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
                          >
                            <Plus className="size-2.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Xóa ${item.name}`}
                          className="p-1 text-muted-foreground hover:text-destructive cursor-pointer"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="bg-primary/15" />

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span className="uppercase tracking-[0.2em]">Tạm tính</span>
                    <span className="font-serif-display text-sm text-foreground">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>

                  {hasValidAddress && (
                    <>
                      <div className="flex justify-between text-muted-foreground">
                        <span className="uppercase tracking-[0.2em]">
                          Phí giao hàng
                        </span>
                        <span className="font-serif-display text-sm text-foreground">
                          {formatCurrency(deliveryFee)}
                        </span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span className="uppercase tracking-[0.2em]">
                          Thời gian dự kiến
                        </span>
                        <span className="font-serif-display text-sm italic text-primary">
                          {estimatedTime}
                        </span>
                      </div>
                    </>
                  )}

                  <div className="flex items-baseline justify-between border-t border-primary/20 pt-3">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-foreground">
                      Tổng cộng
                    </span>
                    <span className="font-serif-display text-2xl text-primary">
                      {formatCurrency(finalTotal)}
                    </span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
