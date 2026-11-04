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
        className="relative block h-56 w-full overflow-hidden"
      >
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12100e] via-[#12100e]/30 to-transparent" />

        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
          <Badge variant="default" className="gap-1 shadow-md">
            <Sparkles className="size-3" />
            <span>{restaurant.badge}</span>
          </Badge>
        </div>

        <div className="absolute top-3.5 right-3.5 flex items-center gap-1 rounded-full bg-[#12100e]/85 px-2.5 py-1 text-xs font-bold text-primary backdrop-blur-xs">
          <Star className="size-3.5 fill-primary text-primary" />
          <span>{restaurant.rating.toFixed(1)}</span>
          <span className="font-normal text-muted-foreground">
            ({restaurant.reviewCount})
          </span>
        </div>

        <div className="absolute bottom-3 left-3.5 right-3.5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
            {restaurant.cuisine}
          </p>
          <h3 className="font-serif-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {restaurant.name}
          </h3>
        </div>
      </Link>

      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-xs font-medium italic text-primary/90">
          “{restaurant.tagline}”
        </CardTitle>
        <CardDescription className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {restaurant.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2 pb-4 text-xs text-muted-foreground">
        <div className="flex items-center justify-between border-t border-border/60 pt-3">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-primary" />
            {restaurant.deliveryTime}
          </span>
          <span>
            Phí giao:{" "}
            <strong className="text-foreground">
              {formatCurrency(restaurant.deliveryFee)}
            </strong>
          </span>
        </div>
        <div className="flex items-center gap-1.5 truncate">
          <MapPin className="size-3.5 shrink-0 text-primary/80" />
          <span className="truncate">{restaurant.address}</span>
        </div>
      </CardContent>

      <CardFooter className="border-t border-border/60 bg-secondary/20 pt-3 pb-3">
        <div className="flex w-full items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            {restaurant.menu.length} món thượng hạng
          </span>
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <Link href={`/restaurant/${restaurant.id}`}>
              <span>Xem thực đơn</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
