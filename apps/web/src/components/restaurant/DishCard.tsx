import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { formatCurrency } from "@/lib/utils";
import type { MenuItem } from "@/data/restaurants";

interface DishCardProps {
  dish: MenuItem;
  restaurantName?: string;
}

export function DishCard({ dish, restaurantName }: DishCardProps) {
  return (
    <Card className="group flex flex-col overflow-hidden border-primary/20 bg-[#13110e] transition-colors duration-500 hover:border-primary/55">
      <div className="relative h-32 w-full overflow-hidden sm:h-48">
        <Image
          src={dish.imageUrl}
          alt={dish.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13110e] via-transparent to-black/20" />

        {dish.badge && (
          <div className="absolute top-2.5 left-2.5 border border-primary/45 bg-[#0c0b09]/90 px-2 py-0.5 text-[8px] uppercase tracking-[0.22em] text-primary sm:top-3 sm:left-3 sm:text-[9px]">
            {dish.badge}
          </div>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col justify-between p-3 sm:p-5">
        <div className="space-y-1.5">
          <p className="truncate text-[8px] uppercase tracking-[0.24em] text-primary/80 sm:text-[9px]">
            {restaurantName || dish.category}
          </p>
          <h3 className="line-clamp-1 font-serif-display text-sm font-medium tracking-wide text-foreground transition-colors group-hover:text-primary sm:text-xl">
            {dish.name}
          </h3>
          <p className="line-clamp-2 font-serif-display text-xs italic leading-snug text-muted-foreground sm:text-sm sm:leading-relaxed">
            {dish.description}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-primary/15 pt-2.5 sm:mt-5 sm:pt-3.5">
          <span className="font-serif-display text-sm font-medium tracking-wider text-primary sm:text-lg">
            {formatCurrency(dish.price)}
          </span>

          <AddToCartButton item={dish} restaurantName={restaurantName} />
        </div>
      </CardContent>
    </Card>
  );
}
