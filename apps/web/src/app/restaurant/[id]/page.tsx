import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
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
      title: "Maison Storià",
    };
  }

  return {
    title: `${restaurant.name} — Maison Storià`,
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

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-3 py-6 sm:space-y-14 sm:px-8 sm:py-10">
      {/* Classical Editorial Header */}
      <section className="border border-primary/25 bg-[#13110e]">
        <div className="relative h-40 w-full sm:h-72">
          <Image
            src={restaurant.coverImageUrl}
            alt={restaurant.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13110e] via-[#13110e]/55 to-transparent" />
        </div>

        <div className="relative -mt-12 px-5 pb-6 sm:-mt-20 sm:px-10 sm:pb-10">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="space-y-2">
              <p className="text-[9px] uppercase tracking-[0.3em] text-primary sm:text-[10px]">
                {restaurant.cuisine} • {restaurant.openingHours}
              </p>
              <h1 className="font-serif-display text-3xl font-normal tracking-wide text-foreground sm:text-5xl">
                {restaurant.name}
              </h1>
              <p className="max-w-2xl font-serif-display text-sm italic leading-relaxed text-muted-foreground sm:text-lg">
                {restaurant.description}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <Button asChild size="default">
                <Link href="/checkout">Đặt Bàn Tiệc</Link>
              </Button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-primary/15 pt-4 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span>{restaurant.address}</span>
            <span className="text-primary">★ {restaurant.rating.toFixed(1)}</span>
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-primary/20 pb-3">
          <div>
            <span className="text-[9px] uppercase tracking-[0.32em] text-primary">
              La Carte
            </span>
            <h2 className="font-serif-display text-2xl font-normal text-foreground sm:text-3xl">
              Thực Đơn
            </h2>
          </div>
          <span className="font-serif-display text-sm italic text-muted-foreground">
            {restaurant.menu.length} Tuyệt tác
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
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
