import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Réservation & Commande | Maison Storià",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-8 sm:py-12">
      <div className="space-y-3 border-b border-primary/20 pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-primary transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-3.5" />
          <span>La Maison</span>
        </Link>

        <h1 className="font-serif-display text-3xl font-normal tracking-wide text-foreground sm:text-5xl">
          Xác Nhận Đơn Hàng
        </h1>
      </div>

      <CheckoutForm />
    </div>
  );
}
