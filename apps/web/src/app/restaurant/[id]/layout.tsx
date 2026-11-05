import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pb-20">
      {/* Sticky Sub-navigation Bar right below Header so fallback button is always visible */}
      <div className="sticky top-14 z-40 border-b border-border/80 bg-[#161310]/95 backdrop-blur-md sm:top-20">
        <div className="mx-auto flex max-w-7xl items-center px-3 py-2 sm:px-6 sm:py-2.5 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="size-3.5" />
            <span>Quay lại danh sách nhà hàng</span>
          </Link>
        </div>
      </div>

      {children}
    </div>
  );
}
