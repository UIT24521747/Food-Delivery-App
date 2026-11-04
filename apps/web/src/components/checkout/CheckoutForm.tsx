"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Loader2,
  CheckCircle2,
  ShoppingBag,
  MapPin,
  Phone,
  User,
  FileText,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
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
  customer: CheckoutFormValues;
  orderedItems: CartItem[];
  totalAmount: number;
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

  const deliveryFee = items.length > 0 ? 25000 : 0;
  const finalTotal = totalPrice + deliveryFee;

  const {
    register,
    handleSubmit,
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

  const onSubmit = async (values: CheckoutFormValues) => {
    if (items.length === 0) {
      toast.error(
        "Giỏ hàng của bạn đang trống. Vui lòng chọn ít nhất 1 món ăn trước khi đặt hàng!"
      );
      return;
    }

    const snapshotItems = [...items];
    const snapshotTotal = finalTotal;

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          items: snapshotItems,
          totalAmount: snapshotTotal,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result.message || "Không thể đặt hàng. Vui lòng thử lại.");
        return;
      }

      // Lưu trạng thái xác nhận đơn hàng & XÓA SẠCH GIỎ HÀNG
      setConfirmedOrder({
        orderCode: result.orderCode,
        createdAt: result.createdAt,
        estimatedDelivery: result.estimatedDelivery,
        customer: values,
        orderedItems: snapshotItems,
        totalAmount: snapshotTotal,
      });

      clearCart();
      reset();
      toast.success(`Đặt hàng thành công! Mã đơn: ${result.orderCode}`);
    } catch {
      toast.error("Có lỗi kết nối tới máy chủ. Vui lòng thử lại.");
    }
  };

  // MÀN HÌNH XÁC NHẬN ĐƠN HÀNG THÀNH CÔNG
  if (confirmedOrder) {
    return (
      <Card
        data-testid="order-confirmation"
        className="mx-auto max-w-2xl border-primary/50 bg-[#1c1814] p-6 shadow-2xl gold-glow sm:p-10"
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex size-20 items-center justify-center rounded-full border-2 border-primary bg-primary/15 text-primary shadow-lg">
            <CheckCircle2 className="size-10" />
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" />
            <span>Đặt Bàn Tiệc & Giao Hàng Thành Công</span>
          </span>

          <h2 className="mt-3 font-serif-display text-3xl font-bold text-foreground sm:text-4xl">
            Cảm ơn, {confirmedOrder.customer.fullName}!
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Đơn hàng Fine Dining của bạn đã được chuyển tới bếp trưởng. Giỏ hàng
            hiện tại đã được làm mới.
          </p>

          {/* Simulated Order Code */}
          <div className="mt-6 w-full rounded-2xl border border-primary/40 bg-[#12100e] p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Mã Đơn Hàng Giả Lập
            </p>
            <p
              data-testid="order-code"
              className="mt-1 font-serif-display text-2xl font-extrabold tracking-wider text-primary sm:text-3xl"
            >
              {confirmedOrder.orderCode}
            </p>
            <p className="mt-1 text-xs text-emerald-400">
              Dự kiến giao trong {confirmedOrder.estimatedDelivery}
            </p>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Thông tin người nhận */}
        <div className="space-y-4 text-sm">
          <h3 className="font-serif-display text-base font-bold text-foreground">
            Thông Tin Giao Hàng
          </h3>
          <div className="grid grid-cols-1 gap-3 rounded-2xl border border-border/80 bg-secondary/40 p-4 sm:grid-cols-2">
            <div>
              <span className="text-xs text-muted-foreground">Người nhận:</span>
              <p className="font-semibold text-foreground">
                {confirmedOrder.customer.fullName}
              </p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">
                Số điện thoại:
              </span>
              <p className="font-semibold text-foreground">
                {confirmedOrder.customer.phone}
              </p>
            </div>
            <div className="sm:col-span-2">
              <span className="text-xs text-muted-foreground">
                Địa chỉ nhận món:
              </span>
              <p className="font-semibold text-foreground">
                {confirmedOrder.customer.address}
              </p>
            </div>
            {confirmedOrder.customer.note && (
              <div className="sm:col-span-2">
                <span className="text-xs text-muted-foreground">Ghi chú:</span>
                <p className="italic text-foreground/90">
                  “{confirmedOrder.customer.note}”
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Danh sách món đã đặt */}
        <div className="mt-6 space-y-3">
          <h3 className="font-serif-display text-base font-bold text-foreground">
            Chi Tiết Thực Đơn Đã Đặt ({confirmedOrder.orderedItems.length} món)
          </h3>
          <div className="space-y-2 rounded-2xl border border-border/80 bg-secondary/30 p-4">
            {confirmedOrder.orderedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-foreground/90">
                  {item.name}{" "}
                  <strong className="text-primary">x{item.quantity}</strong>
                </span>
                <span className="font-semibold text-foreground">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
            <Separator className="my-2" />
            <div className="flex items-center justify-between text-base font-bold">
              <span>Tổng thanh toán</span>
              <span className="text-primary">
                {formatCurrency(confirmedOrder.totalAmount)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="size-4" />
              <span>Tiếp tục khám phá nhà hàng</span>
            </Link>
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Left Column: Checkout Form with React Hook Form + Zod */}
      <div className="lg:col-span-7">
        <Card className="border-border/80 bg-[#1c1814]">
          <CardHeader className="border-b border-border/70 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <MapPin className="size-5" />
              </div>
              <div>
                <CardTitle className="text-xl text-foreground">
                  Thông Tin Giao Hàng Fine Dining
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Vui lòng điền đầy đủ thông tin để đội ngũ Storià phục vụ chu
                  đáo nhất
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-5"
              data-testid="checkout-form"
            >
              {/* Họ và tên */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-1.5">
                  <User className="size-3.5 text-primary" />
                  <span>
                    Họ và tên người nhận{" "}
                    <span className="text-destructive">*</span>
                  </span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Ví dụ: Lê Như Thực"
                  aria-invalid={!!errors.fullName}
                  {...register("fullName")}
                />
                {errors.fullName?.message && (
                  <p
                    role="alert"
                    data-testid="error-fullName"
                    className="text-xs font-medium text-destructive"
                  >
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Số điện thoại Việt Nam */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-1.5">
                  <Phone className="size-3.5 text-primary" />
                  <span>
                    Số điện thoại Việt Nam{" "}
                    <span className="text-destructive">*</span>
                  </span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Ví dụ: 0901234567"
                  aria-invalid={!!errors.phone}
                  {...register("phone")}
                />
                {errors.phone?.message && (
                  <p
                    role="alert"
                    data-testid="error-phone"
                    className="text-xs font-medium text-destructive"
                  >
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Địa chỉ giao hàng */}
              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-primary" />
                  <span>
                    Địa chỉ giao hàng chi tiết{" "}
                    <span className="text-destructive">*</span>
                  </span>
                </Label>
                <Input
                  id="address"
                  placeholder="Ví dụ: 88 Đồng Khởi, Phường Bến Nghé, Quận 1, TP.HCM"
                  aria-invalid={!!errors.address}
                  {...register("address")}
                />
                {errors.address?.message && (
                  <p
                    role="alert"
                    data-testid="error-address"
                    className="text-xs font-medium text-destructive"
                  >
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Ghi chú */}
              <div className="space-y-2">
                <Label htmlFor="note" className="flex items-center gap-1.5">
                  <FileText className="size-3.5 text-primary" />
                  <span>Ghi chú cho bếp trưởng / tài xế (Tùy chọn)</span>
                </Label>
                <Textarea
                  id="note"
                  placeholder="Ví dụ: Không hành, chuẩn bị thêm dụng cụ ăn bằng gỗ cao cấp, gọi trước khi giao 5 phút..."
                  aria-invalid={!!errors.note}
                  {...register("note")}
                />
                {errors.note?.message && (
                  <p
                    role="alert"
                    data-testid="error-note"
                    className="text-xs font-medium text-destructive"
                  >
                    {errors.note.message}
                  </p>
                )}
              </div>

              <div className="rounded-2xl border border-primary/25 bg-primary/10 p-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2 font-semibold text-primary">
                  <ShieldCheck className="size-4" />
                  <span>Cam kết chất lượng Storià Fine Dining</span>
                </div>
                <p className="mt-1 leading-relaxed">
                  Món ăn được niêm phong trong hộp giữ nhiệt chuyên dụng kèm
                  thiệp hướng dẫn thưởng thức từ Bếp trưởng.
                </p>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                data-testid="submit-order-button"
                className="w-full text-base font-bold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    <span>Đang xử lý đơn hàng của bạn...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="size-5" />
                    <span>
                      Xác nhận đặt hàng ({formatCurrency(finalTotal)})
                    </span>
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Order Preview Summary */}
      <div className="lg:col-span-5">
        <Card className="sticky top-24 border-border/80 bg-[#1c1814]">
          <CardHeader className="border-b border-border/70 pb-4">
            <CardTitle className="flex items-center justify-between text-lg">
              <span>Tóm Tắt Đơn Hàng</span>
              <span className="rounded-full bg-primary/15 px-3 py-0.5 text-xs font-bold text-primary">
                {totalItems} món
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 pt-5">
            {items.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Giỏ hàng của bạn hiện đang trống.
                </p>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <Link href="/">Quay lại chọn món</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-xl border border-border/70 bg-secondary/40 p-2.5"
                    >
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-serif-display text-sm font-semibold text-foreground">
                          {item.name}
                        </h4>
                        <p className="text-xs font-bold text-primary">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label={`Giảm ${item.name}`}
                          className="flex size-6 items-center justify-center rounded-md border border-border bg-secondary text-foreground hover:border-primary cursor-pointer"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          aria-label={`Tăng ${item.name}`}
                          className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground cursor-pointer"
                        >
                          <Plus className="size-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Xóa ${item.name}`}
                          className="ml-1 rounded-md p-1 text-muted-foreground hover:text-destructive cursor-pointer"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tạm tính ({totalItems} món)</span>
                    <span className="text-foreground">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Phí giao hàng tiêu chuẩn</span>
                    <span className="text-foreground">
                      {formatCurrency(deliveryFee)}
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex items-center justify-between text-base font-bold">
                    <span className="font-serif-display">Tổng thanh toán</span>
                    <span className="text-xl text-primary">
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
