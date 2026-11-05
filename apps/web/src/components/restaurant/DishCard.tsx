import Image from "next/image";
import { Clock, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { formatCurrency } from "@/lib/utils";
import type { MenuItem } from "@/data/restaurants";

interface DishCardProps {
  dish: MenuItem;
  restaurantName?: string;
}

export function DishCard({ dish, restaurantName }: DishCardProps) {
  return (
    <Card className="group flex flex-col overflow-hidden border-border/80 bg-[#1c1814] transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
      <div className="relative h-28 w-full overflow-hidden sm:h-44">
        <Image
          src={dish.imageUrl}
          alt={dish.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12100e] via-transparent to-transparent" />

        {dish.badge && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
            <Badge
              variant="default"
              className="gap-1 px-1.5 py-0.5 text-[9px] shadow-md sm:px-2.5 sm:text-[11px]"
            >
              <Sparkles className="size-2.5 sm:size-3" />
              <span>{dish.badge}</span>
            </Badge>
          </div>
        )}

        <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[10px] text-foreground/90 sm:bottom-2.5 sm:left-3 sm:right-3 sm:text-[11px]">
          <span className="truncate rounded-md bg-[#12100e]/80 px-1.5 py-0.5 font-medium backdrop-blur-xs sm:px-2">
            {dish.category}
          </span>
          <span className="hidden items-center gap-1 rounded-md bg-[#12100e]/80 px-2 py-0.5 backdrop-blur-xs sm:flex">
            <Clock className="size-3 text-primary" />
            {dish.prepTime}
          </span>
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col justify-between p-2.5 sm:p-4">
        <div className="space-y-1">
          {restaurantName && (
            <p className="truncate text-[9px] font-medium uppercase tracking-wider text-primary/80 sm:text-[11px]">
              {restaurantName}
            </p>
          )}
          <h3 className="line-clamp-1 font-serif-display text-xs font-bold text-foreground transition-colors group-hover:text-primary sm:text-base">
            {dish.name}
          </h3>
          <p className="line-clamp-2 text-[11px] leading-snug text-muted-foreground sm:text-xs sm:leading-relaxed">
            {dish.description}
          </p>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-1.5 border-t border-border/60 pt-2.5 sm:mt-4 sm:pt-3">
          <div>
            <span className="hidden text-[10px] uppercase tracking-wider text-muted-foreground sm:block">
              Giá phục vụ
            </span>
            <span className="font-serif-display text-xs font-bold text-primary sm:text-base">
              {formatCurrency(dish.price)}
            </span>
          </div>

          <AddToCartButton item={dish} restaurantName={restaurantName} />
        </div>
      </CardContent>
    </Card>
  );
}
