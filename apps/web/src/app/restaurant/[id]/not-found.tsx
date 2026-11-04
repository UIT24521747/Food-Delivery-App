import Link from "next/link";
import { UtensilsCrossed, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESTAURANTS } from "@/data/restaurants";

export default function RestaurantNotFound() {
  return (
    <div className="mx-auto flex min-h-[65vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
        <Sparkles className="size-3.5" />
        <span>404 — Không tìm thấy nhà hàng</span>
      </div>

      <div className="mb-6 flex size-20 items-center justify-center rounded-3xl border border-border bg-[#1c1814] text-primary shadow-xl">
        <UtensilsCrossed className="size-10" />
      </div>

      <h1 className="font-serif-display text-3xl font-bold text-foreground sm:text-4xl">
        Nhà hàng không tồn tại trong hệ thống
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
        Mã nhà hàng bạn vừa nhập không tồn tại hoặc đã ngừng phục vụ. Bạn có
        thể chọn một trong các nhà hàng Fine Dining tiêu biểu bên dưới:
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        {RESTAURANTS.map((restaurant) => (
          <Button key={restaurant.id} asChild variant="outline" size="sm">
            <Link href={`/restaurant/${restaurant.id}`}>{restaurant.name}</Link>
          </Button>
        ))}
      </div>

      <div className="mt-8">
        <Button asChild size="lg">
          <Link href="/">
            <ArrowLeft className="size-4" />
            <span>Quay về trang chủ</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
