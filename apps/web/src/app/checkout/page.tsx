import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Thanh Toán & Đặt Hàng | Storià Food",
  description:
    "Hoàn tất đơn hàng Fine Dining của bạn tại Storià Food với xác thực thông tin nhanh chóng.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
        >
          <ChevronLeft className="size-4 text-primary" />
          <span>Quay lại tiếp tục chọn món</span>
        </Link>

        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <Badge variant="outline" className="mb-2 gap-1">
              <Sparkles className="size-3" />
              <span>Fine Dining Checkout</span>
            </Badge>
            <h1 className="font-serif-display text-3xl font-bold text-foreground sm:text-4xl">
              Xác Nhận & Đặt Giao Hàng
            </h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Bước cuối cùng để thưởng thức bữa tối thượng hạng tại nhà
          </p>
        </div>
      </div>

      <CheckoutForm />
    </div>
  );
}
