import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Star,
  Clock,
  MapPin,
  Sparkles,
  Utensils,
  Info,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DishCard } from "@/components/restaurant/DishCard";
import { getRestaurantById, RESTAURANTS } from "@/data/restaurants";

interface RestaurantPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return RESTAURANTS.map((restaurant) => ({
    id: restaurant.id,
  }));
}

export async function generateMetadata({
  params,
}: RestaurantPageProps): Promise<Metadata> {
  const { id } = await params;
  const restaurant = getRestaurantById(id);

  if (!restaurant) {
    return {
      title: "Không tìm thấy nhà hàng | Storià Food",
    };
  }

  return {
    title: `${restaurant.name} — Thực Đơn Fine Dining | Storià Food`,
    description: restaurant.description,
  };
}

export default async function RestaurantDetailPage({
  params,
}: RestaurantPageProps) {
  const { id } = await params;
  const restaurant = getRestaurantById(id);

  if (!restaurant) {
    notFound();
  }

  const categories = Array.from(
    new Set(restaurant.menu.map((item) => item.category))
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-3 py-4 sm:space-y-10 sm:px-6 sm:py-8 lg:px-8">
      {/* Restaurant Hero Banner — Compact on mobile so dishes are immediately visible */}
      <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-[#1c1814] shadow-2xl sm:rounded-3xl">
        <div className="relative h-36 w-full sm:h-72 lg:h-80">
          <Image
            src={restaurant.coverImageUrl}
            alt={restaurant.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12100e] via-[#12100e]/65 to-transparent" />

          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 sm:top-5 sm:left-6 sm:gap-2">
            <Badge
              variant="default"
              className="gap-1 px-2.5 py-0.5 text-[10px] sm:px-3 sm:py-1 sm:text-xs"
            >
              <Sparkles className="size-3" />
              <span>{restaurant.badge}</span>
            </Badge>
            <Badge
              variant="secondary"
              className="gap-1 bg-[#12100e]/85 px-2.5 py-0.5 text-[10px] text-emerald-400 backdrop-blur-xs sm:text-xs"
            >
              <CheckCircle2 className="size-3" />
              <span>Mở cửa ({restaurant.openingHours})</span>
            </Badge>
          </div>
        </div>

        <div className="relative -mt-12 px-4 pb-4 sm:-mt-20 sm:px-8 sm:pb-8">
          <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end lg:gap-6">
            <div className="space-y-1.5 sm:space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary sm:text-xs">
                {restaurant.cuisine} • “{restaurant.tagline}”
              </p>
              <h1 className="font-serif-display text-2xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                {restaurant.name}
              </h1>
              <p className="line-clamp-2 max-w-3xl text-xs leading-relaxed text-muted-foreground sm:line-clamp-none sm:text-base">
                {restaurant.description}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1 rounded-xl border border-primary/40 bg-primary/15 px-3 py-1.5 text-xs font-bold text-primary sm:rounded-2xl sm:px-4 sm:py-2.5 sm:text-sm">
                <Star className="size-3.5 fill-primary text-primary sm:size-4" />
                <span>{restaurant.rating.toFixed(1)}</span>
                <span className="text-[11px] font-normal text-foreground/80 sm:text-xs">
                  ({restaurant.reviewCount})
                </span>
              </div>
              <Button
                asChild
                size="sm"
                className="h-8 rounded-xl px-3 text-xs sm:h-11 sm:px-6 sm:text-sm"
              >
                <Link href="/checkout">Thanh toán ngay</Link>
              </Button>
            </div>
          </div>

          {/* Metadata Bar: Only restaurant location, opening hours, and note that delivery is calculated at checkout */}
          <div className="mt-3 grid grid-cols-1 gap-2 border-t border-border/70 pt-3 text-[11px] text-muted-foreground sm:mt-6 sm:grid-cols-3 sm:gap-3 sm:pt-5 sm:text-xs">
            <div className="flex items-center gap-1.5 truncate sm:gap-2.5">
              <MapPin className="size-3.5 shrink-0 text-primary sm:size-4" />
              <span className="truncate">{restaurant.address}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <Clock className="size-3.5 shrink-0 text-primary sm:size-4" />
              <span>Giờ phục vụ: {restaurant.openingHours}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <Info className="size-3.5 shrink-0 text-primary sm:size-4" />
              <span>Phí & thời gian giao tính khi nhập địa chỉ</span>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section Header & Category Pills */}
      <section className="space-y-4 sm:space-y-6">
        <div className="flex flex-col justify-between gap-3 border-b border-border/70 pb-3 sm:flex-row sm:items-center sm:pb-5">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex size-8 items-center justify-center rounded-xl bg-primary/15 text-primary sm:size-10">
              <Utensils className="size-4 sm:size-5" />
            </div>
            <div>
              <h2 className="font-serif-display text-lg font-bold text-foreground sm:text-2xl">
                Thực Đơn Tinh Tuyển ({restaurant.menu.length} món)
              </h2>
              <p className="text-[11px] text-muted-foreground sm:text-xs">
                Hiển thị dạng lưới 2 cột tối ưu để bạn dễ dàng chọn món cùng lúc
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 no-scrollbar sm:flex-wrap sm:pb-0">
            <Badge
              variant="default"
              className="shrink-0 px-2.5 py-0.5 text-[11px] sm:px-3 sm:py-1 sm:text-xs"
            >
              Tất cả ({restaurant.menu.length})
            </Badge>
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant="outline"
                className="shrink-0 px-2.5 py-0.5 text-[11px] sm:px-3 sm:py-1 sm:text-xs"
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        {/* Menu Grid: 2 columns on mobile, 3 on tablet/medium, 4 on desktop */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {restaurant.menu.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              restaurantName={restaurant.name}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
