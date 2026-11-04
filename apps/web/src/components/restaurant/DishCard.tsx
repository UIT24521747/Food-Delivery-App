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
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={dish.imageUrl}
          alt={dish.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12100e] via-transparent to-transparent" />

        {dish.badge && (
          <div className="absolute top-3 left-3">
            <Badge variant="default" className="gap-1 text-[11px] shadow-md">
              <Sparkles className="size-3" />
              <span>{dish.badge}</span>
            </Badge>
          </div>
        )}

        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-foreground/90">
          <span className="rounded-md bg-[#12100e]/80 px-2 py-0.5 font-medium backdrop-blur-xs">
            {dish.category}
          </span>
          <span className="flex items-center gap-1 rounded-md bg-[#12100e]/80 px-2 py-0.5 backdrop-blur-xs">
            <Clock className="size-3 text-primary" />
            {dish.prepTime}
          </span>
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col justify-between p-4">
        <div className="space-y-1.5">
          {restaurantName && (
            <p className="text-[11px] font-medium uppercase tracking-wider text-primary/80">
              {restaurantName}
            </p>
          )}
          <h3 className="font-serif-display text-base font-bold text-foreground group-hover:text-primary transition-colors">
            {dish.name}
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {dish.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
              Giá phục vụ
            </span>
            <span className="font-serif-display text-base font-bold text-primary">
              {formatCurrency(dish.price)}
            </span>
          </div>

          <AddToCartButton item={dish} restaurantName={restaurantName} />
        </div>
      </CardContent>
    </Card>
  );
}
