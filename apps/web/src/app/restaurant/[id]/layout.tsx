import Link from "next/link";
import { ChevronLeft, Sparkles } from "lucide-react";
import { RESTAURANTS } from "@/data/restaurants";

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pb-16">
      {/* Nested Sub-navigation Bar for Restaurant Pages */}
      <div className="border-b border-border/70 bg-[#161310]/90">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <ChevronLeft className="size-4 text-primary" />
            <span>Quay lại danh sách nhà hàng</span>
          </Link>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="hidden items-center gap-1 text-[11px] text-muted-foreground sm:inline-flex mr-1">
              <Sparkles className="size-3 text-primary" />
              Chuyển nhanh:
            </span>
            {RESTAURANTS.map((rest) => (
              <Link
                key={rest.id}
                href={`/restaurant/${rest.id}`}
                className="rounded-lg border border-border/70 bg-secondary/50 px-2.5 py-1 text-[11px] font-medium text-foreground/85 transition-colors hover:border-primary/50 hover:text-primary"
              >
                {rest.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
