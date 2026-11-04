"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Utensils,
  ShoppingBag,
  UserCircle2,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, selectTotalItems } from "@/store/useCartStore";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Khám phá" },
  { href: "/#restaurants", label: "Nhà hàng 5 sao" },
  { href: "/#signature-dishes", label: "Signature Dishes" },
  { href: "/#experiences", label: "Trải nghiệm & Sự kiện" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const totalItems = useCartStore(selectTotalItems);
  const setDrawerOpen = useCartStore((state) => state.setDrawerOpen);

  const badgeCount = hasHydrated ? totalItems : 0;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-[#12100e]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        {/* Left: Mobile Menu Button + Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Mở menu điều hướng"
            className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-secondary/70 text-foreground transition-colors hover:border-primary/50 hover:text-primary md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>

          <Link
            href="/"
            className="group flex items-center gap-2.5 focus:outline-none"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15 border border-primary/40 text-primary transition-transform group-hover:scale-105">
              <Utensils className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-display text-lg font-bold tracking-wide text-primary sm:text-xl">
                Storià Food
              </span>
              <span className="hidden text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
                Fine Dining Resto
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation (Cleared & focused on discoverability) */}
        <nav className="hidden items-center gap-1.5 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" && pathname === "/";
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/15 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-secondary/70 hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions (Cart Drawer Trigger & Profile) */}
        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            onClick={() => setDrawerOpen(true)}
            data-testid="header-cart-button"
            className="relative h-10 gap-2 rounded-xl border-primary/40 bg-secondary/70 px-3.5 text-foreground hover:border-primary hover:bg-primary/15 hover:text-primary"
          >
            <ShoppingBag className="size-4 text-primary" />
            <span className="hidden text-xs font-semibold sm:inline">
              Giỏ hàng
            </span>
            <span
              data-testid="header-cart-badge"
              className="flex min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[11px] font-extrabold text-primary-foreground"
            >
              {badgeCount}
            </span>
          </Button>

          <Link
            href="/profile"
            aria-label="Hồ sơ cá nhân"
            title="Hồ sơ thực khách"
            className="flex size-10 items-center justify-center rounded-xl border border-border bg-secondary/60 text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary"
          >
            <UserCircle2 className="size-5" />
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-border/80 bg-[#181512] px-4 py-4 md:hidden">
          <div className="mb-3 flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-3 py-2 text-xs text-primary">
            <Sparkles className="size-4 shrink-0" />
            <span>Good Evening, Alex! Taste The Extraordinary Tonight.</span>
          </div>
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-foreground/90 transition-colors hover:bg-secondary hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
