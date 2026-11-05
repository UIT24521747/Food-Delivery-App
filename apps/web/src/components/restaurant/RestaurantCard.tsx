import Image from "next/image";
import Link from "next/link";
import { Star, Clock, MapPin, ArrowUpRight, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import type { Restaurant } from "@/data/restaurants";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card className="group overflow-hidden border-border/80 bg-[#1c1814] transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl">
      <Link
        href={`/restaurant/${restaurant.id}`}
        className="relative block h-32 w-full overflow-hidden sm:h-52"
      >
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12100e] via-[#12100e]/30 to-transparent" />

        <div className="absolute top-2 left-2 flex items-center gap-1.5 sm:top-3.5 sm:left-3.5">
          <Badge
            variant="default"
            className="gap-1 px-1.5 py-0.5 text-[9px] shadow-md sm:px-2.5 sm:text-xs"
          >
            <Sparkles className="size-2.5 sm:size-3" />
            <span className="truncate max-w-[90px] sm:max-w-none">
              {restaurant.badge}
            </span>
          </Badge>
        </div>

        <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-[#12100e]/85 px-1.5 py-0.5 text-[10px] font-bold text-primary backdrop-blur-xs sm:top-3.5 sm:right-3.5 sm:px-2.5 sm:py-1 sm:text-xs">
          <Star className="size-2.5 fill-primary text-primary sm:size-3.5" />
          <span>{restaurant.rating.toFixed(1)}</span>
          <span className="hidden font-normal text-muted-foreground sm:inline">
            ({restaurant.reviewCount})
          </span>
        </div>

        <div className="absolute bottom-2 left-2.5 right-2.5 sm:bottom-3 sm:left-3.5 sm:right-3.5">
          <p className="truncate text-[9px] font-semibold uppercase tracking-widest text-primary sm:text-[11px]">
            {restaurant.cuisine}
          </p>
          <h3 className="line-clamp-1 font-serif-display text-sm font-bold text-foreground transition-colors group-hover:text-primary sm:text-xl">
            {restaurant.name}
          </h3>
        </div>
      </Link>

      <CardHeader className="p-2.5 pb-1.5 sm:p-5 sm:pb-2 sm:pt-4">
        <CardTitle className="line-clamp-1 text-[10px] font-medium italic text-primary/90 sm:text-xs">
          “{restaurant.tagline}”
        </CardTitle>
        <CardDescription className="line-clamp-2 text-[11px] leading-snug text-muted-foreground sm:text-xs sm:leading-relaxed">
          {restaurant.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-1.5 p-2.5 pt-0 pb-2.5 text-[10px] text-muted-foreground sm:space-y-2 sm:p-5 sm:pt-0 sm:pb-4 sm:text-xs">
        <div className="flex items-center justify-between border-t border-border/60 pt-2 sm:pt-3">
          <span className="flex items-center gap-1">
            <Clock className="size-3 text-primary sm:size-3.5" />
            {restaurant.deliveryTime}
          </span>
          <span className="hidden sm:inline">
            Phí giao:{" "}
            <strong className="text-foreground">
              {formatCurrency(restaurant.deliveryFee)}
            </strong>
          </span>
        </div>
        <div className="hidden items-center gap-1.5 truncate sm:flex">
          <MapPin className="size-3.5 shrink-0 text-primary/80" />
          <span className="truncate">{restaurant.address}</span>
        </div>
      </CardContent>

      <CardFooter className="border-t border-border/60 bg-secondary/20 p-2.5 sm:px-5 sm:py-3">
        <div className="flex w-full items-center justify-between gap-1">
          <span className="hidden text-xs font-medium text-muted-foreground sm:inline">
            {restaurant.menu.length} món thượng hạng
          </span>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-7 w-full gap-1 rounded-lg px-2 text-[11px] sm:h-8 sm:w-auto sm:rounded-xl sm:px-3 sm:text-xs"
          >
            <Link href={`/restaurant/${restaurant.id}`}>
              <span>Thực đơn ({restaurant.menu.length})</span>
              <ArrowUpRight className="size-3 sm:size-3.5" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
