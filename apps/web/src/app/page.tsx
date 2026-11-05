import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RestaurantCard } from "@/components/restaurant/RestaurantCard";
import { DishCard } from "@/components/restaurant/DishCard";
import {
  RESTAURANTS,
  SIGNATURE_DISHES,
  FINE_DINING_EXPERIENCES,
} from "@/data/restaurants";

export default function HomePage() {
  return (
    <div className="space-y-16 pb-24 sm:space-y-24 sm:pb-16">
      {/* EDITORIAL HERO — French Haute Gastronomie */}
      <section className="relative overflow-hidden border-b border-primary/20 bg-[#0c0b09]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-20">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="space-y-6 lg:col-span-7">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-primary/60" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-primary">
                  Collection Automne — Hiver
                </span>
              </div>

              <h1 className="font-serif-display text-4xl font-normal leading-[1.08] tracking-wide text-foreground sm:text-6xl lg:text-7xl">
                L’Art de la <br />
                <span className="italic text-primary">Haute Table</span>
              </h1>

              <p className="max-w-lg font-serif-display text-base italic leading-relaxed text-muted-foreground sm:text-xl">
                “Nơi nghệ thuật ẩm thực cổ điển giao hòa cùng nghi thức phục vụ
                hoàng gia tại bàn tiệc riêng tư của bạn.”
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button asChild size="lg">
                  <Link href="#restaurants">
                    <span>Khám Phá Nhà Hàng</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#signature-dishes">La Carte Signature</Link>
                </Button>
              </div>
            </div>

            <div className="hidden lg:col-span-5 lg:block">
              <div className="french-double-border relative aspect-[4/5] w-full overflow-hidden bg-[#13110e] p-3">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80"
                    alt="Maison Storià Haute Gastronomie"
                    fill
                    priority
                    sizes="450px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-center">
                    <p className="text-[9px] uppercase tracking-[0.32em] text-primary">
                      Menu Dégustation
                    </p>
                    <p className="mt-1 font-serif-display text-2xl italic text-foreground">
                      Storià Fine Dining
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION I: LES MAISONS (Restaurants) */}
      <section
        id="restaurants"
        className="mx-auto max-w-7xl scroll-mt-20 px-3 sm:px-8"
      >
        <div className="mb-8 flex flex-col items-center text-center sm:mb-12">
          <span className="text-[10px] uppercase tracking-[0.35em] text-primary">
            I • Les Maisons
          </span>
          <h2 className="mt-2 font-serif-display text-2xl font-normal tracking-wide text-foreground sm:text-4xl">
            Các Nhà Hàng Tuyển Chọn
          </h2>
          <div className="mt-3 h-px w-16 bg-primary/40" />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {RESTAURANTS.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* SECTION II: LA CARTE SIGNATURE (Signature Dishes) */}
      <section
        id="signature-dishes"
        className="mx-auto max-w-7xl scroll-mt-20 px-3 sm:px-8"
      >
        <div className="mb-8 flex flex-col items-center text-center sm:mb-12">
          <span className="text-[10px] uppercase tracking-[0.35em] text-primary">
            II • La Carte Signature
          </span>
          <h2 className="mt-2 font-serif-display text-2xl font-normal tracking-wide text-foreground sm:text-4xl">
            Tuyệt Tác Của Bếp Trưởng
          </h2>
          <div className="mt-3 h-px w-16 bg-primary/40" />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {SIGNATURE_DISHES.slice(0, 8).map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              restaurantName={dish.restaurantName}
            />
          ))}
        </div>
      </section>

      {/* SECTION III: LES SOIRÉES PRIVÉES (Experiences) */}
      <section
        id="experiences"
        className="mx-auto max-w-7xl scroll-mt-20 px-3 sm:px-8"
      >
        <div className="french-double-border bg-[#110f0c] px-5 py-10 sm:px-12 sm:py-14">
          <div className="mb-8 flex flex-col items-center text-center sm:mb-10">
            <span className="text-[10px] uppercase tracking-[0.35em] text-primary">
              III • Les Soirées
            </span>
            <h2 className="mt-2 font-serif-display text-2xl font-normal tracking-wide text-foreground sm:text-4xl">
              Nghi Thức Thưởng Thức
            </h2>
          </div>

          <div className="grid grid-cols-1 divide-y divide-primary/15 md:grid-cols-3 md:divide-x md:divide-y-0">
            {FINE_DINING_EXPERIENCES.map((exp, idx) => (
              <div
                key={exp.id}
                className="space-y-2 py-5 md:px-8 md:py-2 first:pt-0 last:pb-0"
              >
                <span className="font-serif-display text-xs italic text-primary">
                  0{idx + 1}.
                </span>
                <h3 className="font-serif-display text-xl font-normal text-foreground">
                  {exp.title}
                </h3>
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary/80">
                  {exp.schedule}
                </p>
                <p className="font-serif-display text-sm italic leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
