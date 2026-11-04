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
  Truck,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DishCard } from "@/components/restaurant/DishCard";
import { getRestaurantById, RESTAURANTS } from "@/data/restaurants";
import { formatCurrency } from "@/lib/utils";

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
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      {/* Restaurant Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-border/80 bg-[#1c1814] shadow-2xl">
        <div className="relative h-64 w-full sm:h-80 lg:h-96">
          <Image
            src={restaurant.coverImageUrl}
            alt={restaurant.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12100e] via-[#12100e]/60 to-transparent" />

          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 sm:top-6 sm:left-6">
            <Badge variant="default" className="gap-1.5 px-3 py-1 text-xs">
              <Sparkles className="size-3.5" />
              <span>{restaurant.badge}</span>
            </Badge>
            <Badge
              variant="secondary"
              className="gap-1.5 bg-[#12100e]/85 text-xs text-emerald-400 backdrop-blur-xs"
            >
              <CheckCircle2 className="size-3.5" />
              <span>Đang mở cửa ({restaurant.openingHours})</span>
            </Badge>
          </div>
        </div>

        <div className="relative -mt-20 px-6 pb-6 sm:px-8 sm:pb-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {restaurant.cuisine} • “{restaurant.tagline}”
              </p>
              <h1 className="font-serif-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                {restaurant.name}
              </h1>
              <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {restaurant.description}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-2xl border border-primary/40 bg-primary/15 px-4 py-2.5 text-sm font-bold text-primary">
                <Star className="size-4 fill-primary text-primary" />
                <span>{restaurant.rating.toFixed(1)}</span>
                <span className="text-xs font-normal text-foreground/80">
                  ({restaurant.reviewCount} đánh giá)
                </span>
              </div>
              <Button asChild size="lg">
                <Link href="/checkout">Xem đơn & Thanh toán</Link>
              </Button>
            </div>
          </div>

          {/* Metadata Bar */}
          <div className="mt-6 grid grid-cols-1 gap-3 border-t border-border/70 pt-5 text-xs text-muted-foreground sm:grid-cols-3">
            <div className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-primary" />
              <span>{restaurant.address}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="size-4 shrink-0 text-primary" />
              <span>Thời gian giao dự kiến: {restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="size-4 shrink-0 text-primary" />
              <span>
                Phí giao hàng tiêu chuẩn:{" "}
                <strong className="text-foreground">
                  {formatCurrency(restaurant.deliveryFee)}
                </strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section Header & Category Pills */}
      <section className="space-y-6">
        <div className="flex flex-col justify-between gap-4 border-b border-border/70 pb-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Utensils className="size-5" />
            </div>
            <div>
              <h2 className="font-serif-display text-2xl font-bold text-foreground">
                Thực Đơn Tinh Tuyển ({restaurant.menu.length} món)
              </h2>
              <p className="text-xs text-muted-foreground">
                Tất cả món ăn được chế biến tươi mới ngay khi nhận đơn
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default" className="px-3 py-1">
              Tất cả ({restaurant.menu.length})
            </Badge>
            {categories.map((cat) => (
              <Badge key={cat} variant="outline" className="px-3 py-1">
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
