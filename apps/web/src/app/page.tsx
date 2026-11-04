import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Sparkles,
  ArrowRight,
  Wine,
  Music,
  ChevronRight,
  ShieldCheck,
  Clock,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RestaurantCard } from "@/components/restaurant/RestaurantCard";
import { DishCard } from "@/components/restaurant/DishCard";
import {
  RESTAURANTS,
  SIGNATURE_DISHES,
  FINE_DINING_EXPERIENCES,
} from "@/data/restaurants";

export default function HomePage() {
  return (
    <div className="space-y-16 pb-12">
      {/* HERO SECTION — Inspired by Storià Food Fine Dining UI Kit */}
      <section className="relative overflow-hidden border-b border-border/80 bg-gradient-to-b from-[#1a1510] via-[#12100e] to-[#12100e] pt-8 pb-14 sm:pt-12 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left Column: Greeting, Search & Value Props */}
            <div className="space-y-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3.5 py-1.5 text-xs font-semibold text-primary">
                <Sparkles className="size-3.5" />
                <span>Best Restaurant & Fine Dining Delivery</span>
              </div>

              <div className="space-y-2">
                <p className="font-serif-display text-lg font-medium text-muted-foreground sm:text-xl">
                  Good Evening,{" "}
                  <span className="font-bold text-primary">Alex!</span>
                </p>
                <h1 className="font-serif-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  The Art Of <br />
                  <span className="text-primary">Fine Plating</span>
                </h1>
              </div>

              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Taste The Extraordinary Tonight. Đắm mình trong không gian ẩm
                thực thượng hạng, nơi mỗi món ăn được chế biến từ nguyên liệu
                tinh tuyển bởi các bếp trưởng Michelin và giao tận bàn tiệc của
                bạn.
              </p>

              {/* Search Bar Style from UI Kit */}
              <div className="flex max-w-lg items-center gap-3 rounded-2xl border border-border bg-[#faf7f2] px-4 py-2.5 text-[#12100e] shadow-xl">
                <Search className="size-5 shrink-0 text-[#78716c]" />
                <input
                  type="text"
                  readOnly
                  placeholder="Tìm kiếm món ăn, nấm Truffle, Wagyu hoặc rượu vang..."
                  aria-label="Tìm kiếm món ăn"
                  className="w-full bg-transparent text-sm font-medium text-[#12100e] placeholder:text-[#78716c] focus:outline-none"
                />
                <Button asChild size="sm" className="rounded-xl px-4">
                  <Link href="#restaurants">Khám phá</Link>
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button asChild size="lg" className="gap-3 px-7">
                  <Link href="#restaurants">
                    <span>Begin The Experience</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#signature-dishes">Xem Signature Dishes</Link>
                </Button>
              </div>

              {/* Trust Highlights */}
              <div className="grid grid-cols-3 gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:max-w-lg">
                <div className="flex items-center gap-2">
                  <Award className="size-4 shrink-0 text-primary" />
                  <span>4 Nhà hàng 5 sao</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4 shrink-0 text-primary" />
                  <span>Giao nhanh 25 phút</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 shrink-0 text-primary" />
                  <span>Giữ nhiệt chuẩn vị</span>
                </div>
              </div>
            </div>

            {/* Right Column: Fine Plating Showcase Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl border border-primary/30 bg-[#1c1814] p-4 shadow-2xl gold-glow">
                <div className="relative h-64 w-full overflow-hidden rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80"
                    alt="The Art Of Fine Plating"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12100e] via-[#12100e]/30 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge variant="default" className="gap-1">
                      <Sparkles className="size-3" />
                      <span>Chef&apos;s Choice Tonight</span>
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-xs font-medium text-primary">
                      Storià Fine Dining
                    </p>
                    <h2 className="font-serif-display text-xl font-bold text-foreground">
                      Tasting Menu Mùa Thu 2026
                    </h2>
                  </div>
                </div>

                {/* Mini Dish Previews matching the mobile UI kit */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Link
                    href="/restaurant/storia-fine-dining"
                    className="group rounded-2xl border border-primary/40 bg-secondary/50 p-2.5 transition-colors hover:border-primary"
                  >
                    <div className="relative h-24 w-full overflow-hidden rounded-xl">
                      <Image
                        src="https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=400&q=80"
                        alt="Saffron Risotto"
                        fill
                        sizes="200px"
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-2 text-center font-serif-display text-xs font-bold text-primary">
                      Chef&apos;s Choice
                    </p>
                    <p className="text-center text-[11px] text-muted-foreground">
                      Saffron Risotto
                    </p>
                  </Link>

                  <Link
                    href="/restaurant/latelier-de-saigon"
                    className="group rounded-2xl border border-border bg-secondary/30 p-2.5 transition-colors hover:border-primary/50"
                  >
                    <div className="relative h-24 w-full overflow-hidden rounded-xl">
                      <Image
                        src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80"
                        alt="Tagliolini Al Tartufo"
                        fill
                        sizes="200px"
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-2 text-center font-serif-display text-xs font-bold text-foreground">
                      Best Popular
                    </p>
                    <p className="text-center text-[11px] text-muted-foreground">
                      Tagliolini Tartufo
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: RESTAURANT LIST (Server Component rendering mock data) */}
      <section
        id="restaurants"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-1.5">
            <Badge variant="outline" className="gap-1">
              <Sparkles className="size-3" />
              <span>Curated Fine Dining Partners</span>
            </Badge>
            <h2 className="font-serif-display text-2xl font-bold text-foreground sm:text-3xl">
              Danh Sách Nhà Hàng Thượng Hạng
            </h2>
            <p className="text-sm text-muted-foreground">
              Chọn nhà hàng yêu thích để khám phá toàn bộ thực đơn và đặt món
              ngay.
            </p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Hiển thị {RESTAURANTS.length} nhà hàng đang mở cửa
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {RESTAURANTS.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* SECTION 2: SIGNATURE DISHES (From UI Kit "Signature Dishes") */}
      <section
        id="signature-dishes"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-8 flex items-end justify-between">
          <div className="space-y-1.5">
            <Badge variant="outline" className="gap-1">
              <Sparkles className="size-3" />
              <span>Signature Dishes</span>
            </Badge>
            <h2 className="font-serif-display text-2xl font-bold text-foreground sm:text-3xl">
              Tuyệt Tác Món Ngon Đặc Trưng
            </h2>
            <p className="text-sm text-muted-foreground">
              Những món ăn được thực khách yêu thích nhất tối nay — thêm trực
              tiếp vào giỏ hàng của bạn.
            </p>
          </div>
          <Link
            href="/restaurant/storia-fine-dining"
            className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:inline-flex"
          >
            <span>See All</span>
            <ChevronRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SIGNATURE_DISHES.slice(0, 8).map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              restaurantName={dish.restaurantName}
            />
          ))}
        </div>
      </section>

      {/* SECTION 3: EXPERIENCES (From UI Kit "Experiences: Jazz & Cocktails, Wine Tasting") */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border/80 bg-[#181410] p-6 sm:p-10">
          <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Exclusive Dining Experiences
              </p>
              <h2 className="font-serif-display text-2xl font-bold text-foreground sm:text-3xl">
                Trải Nghiệm Ẩm Thực & Sự Kiện Tối Nay
              </h2>
            </div>
            <Link
              href="/checkout"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Đặt trước cùng đơn hàng →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {FINE_DINING_EXPERIENCES.map((exp) => (
              <Card
                key={exp.id}
                className="flex flex-col justify-between border-border/80 bg-[#1c1814] p-5 transition-colors hover:border-primary/50"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                    {exp.iconName === "wine" ? (
                      <Wine className="size-5" />
                    ) : exp.iconName === "music" ? (
                      <Music className="size-5" />
                    ) : (
                      <Sparkles className="size-5" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif-display text-base font-bold text-foreground">
                        {exp.title}
                      </h3>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {exp.schedule} •{" "}
                      <span className="font-semibold text-primary">
                        {exp.status}
                      </span>
                    </p>
                    <p className="pt-1 text-xs leading-relaxed text-muted-foreground/90">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
