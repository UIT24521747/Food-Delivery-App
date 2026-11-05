import Link from "next/link";
import { ChevronLeft, Sparkles } from "lucide-react";
import { RESTAURANTS } from "@/data/restaurants";

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pb-20">
      {/* Sticky Sub-navigation Bar right below Header so fallback button is always visible */}
      <div className="sticky top-14 z-40 border-b border-border/80 bg-[#161310]/95 backdrop-blur-md sm:top-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2 sm:px-6 sm:py-2.5 lg:px-8">
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="size-3.5" />
            <span>Quay lại</span>
            <span className="hidden sm:inline">danh sách nhà hàng</span>
          </Link>

          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap py-0.5 no-scrollbar">
            <span className="hidden items-center gap-1 text-[11px] text-muted-foreground md:inline-flex mr-1">
              <Sparkles className="size-3 text-primary" />
              Chuyển nhanh:
            </span>
            {RESTAURANTS.map((rest) => (
              <Link
                key={rest.id}
                href={`/restaurant/${rest.id}`}
                className="shrink-0 rounded-lg border border-border/70 bg-secondary/50 px-2.5 py-1 text-[11px] font-medium text-foreground/85 transition-colors hover:border-primary/50 hover:text-primary"
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
