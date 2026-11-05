import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-14 z-40 border-b border-primary/20 bg-[#0c0b09]/95 backdrop-blur-md sm:top-20">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-2.5 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-primary transition-colors hover:text-foreground"
          >
            <ChevronLeft className="size-3.5" />
            <span>Les Maisons</span>
          </Link>
        </div>
      </div>

      {children}
    </div>
  );
}
