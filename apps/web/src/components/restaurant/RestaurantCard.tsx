import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Restaurant } from "@/data/restaurants";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card className="group flex flex-col justify-between overflow-hidden border-primary/20 bg-[#13110e] transition-colors duration-500 hover:border-primary/60">
      <div>
        <Link
          href={`/restaurant/${restaurant.id}`}
          className="relative block h-36 w-full overflow-hidden sm:h-56"
        >
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13110e] via-[#13110e]/20 to-transparent" />

          <div className="absolute top-2.5 left-2.5 border border-primary/45 bg-[#0c0b09]/90 px-2 py-0.5 text-[8px] uppercase tracking-[0.22em] text-primary sm:top-3.5 sm:left-3.5 sm:text-[9px]">
            {restaurant.badge}
          </div>
        </Link>

        <div className="space-y-1.5 p-3 sm:p-5">
          <p className="truncate text-[8px] uppercase tracking-[0.25em] text-primary sm:text-[9px]">
            {restaurant.cuisine}
          </p>
          <Link href={`/restaurant/${restaurant.id}`}>
            <h3 className="line-clamp-1 font-serif-display text-base font-medium tracking-wide text-foreground transition-colors group-hover:text-primary sm:text-2xl">
              {restaurant.name}
            </h3>
          </Link>
          <p className="line-clamp-2 font-serif-display text-xs italic leading-snug text-muted-foreground sm:text-sm">
            “{restaurant.tagline}”
          </p>
        </div>
      </div>

      <div className="border-t border-primary/15 px-3 py-2.5 sm:px-5 sm:py-3.5">
        <Link
          href={`/restaurant/${restaurant.id}`}
          className="flex items-center justify-between text-[9px] uppercase tracking-[0.22em] text-foreground/80 transition-colors group-hover:text-primary sm:text-[10px]"
        >
          <span>La Carte</span>
          <ArrowUpRight className="size-3.5 text-primary" />
        </Link>
      </div>
    </Card>
  );
}
