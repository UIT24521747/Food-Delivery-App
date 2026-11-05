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
  Home,
  Compass,
  ChevronLeft,
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
  const isSubPage = pathname !== "/";

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-[#12100e]/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:h-20 sm:px-6 lg:px-8">
          {/* Left: Mobile Back/Menu Button + Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isSubPage ? (
              <Link
                href="/"
                aria-label="Quay về trang chủ"
                className="inline-flex size-9 items-center justify-center rounded-xl border border-primary/40 bg-primary/15 text-primary transition-colors hover:bg-primary hover:text-primary-foreground md:hidden"
              >
                <ChevronLeft className="size-5" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Mở menu điều hướng"
                className="inline-flex size-9 items-center justify-center rounded-xl border border-border bg-secondary/70 text-foreground transition-colors hover:border-primary/50 hover:text-primary md:hidden cursor-pointer"
              >
                {mobileMenuOpen ? (
                  <X className="size-4" />
                ) : (
                  <Menu className="size-4" />
                )}
              </button>
            )}

            <Link
              href="/"
              className="group flex items-center gap-2 focus:outline-none sm:gap-2.5"
            >
              <div className="flex size-9 items-center justify-center rounded-xl border border-primary/40 bg-primary/15 text-primary transition-transform group-hover:scale-105 sm:size-10">
                <Utensils className="size-4 sm:size-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-display text-base font-bold tracking-wide text-primary sm:text-xl">
                  Storià Food
                </span>
                <span className="hidden text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
                  Fine Dining Resto
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
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
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDrawerOpen(true)}
              data-testid="header-cart-button"
              className="relative h-9 gap-1.5 rounded-xl border-primary/40 bg-secondary/70 px-2.5 text-foreground hover:border-primary hover:bg-primary/15 hover:text-primary sm:h-10 sm:gap-2 sm:px-3.5"
            >
              <ShoppingBag className="size-4 text-primary" />
              <span className="hidden text-xs font-semibold sm:inline">
                Giỏ hàng
              </span>
              <span
                data-testid="header-cart-badge"
                className="flex min-w-[18px] items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-extrabold text-primary-foreground sm:min-w-[20px] sm:text-[11px]"
              >
                {badgeCount}
              </span>
            </Button>

            <Link
              href="/profile"
              aria-label="Hồ sơ cá nhân"
              title="Hồ sơ thực khách"
              className="flex size-9 items-center justify-center rounded-xl border border-border bg-secondary/60 text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary sm:size-10"
            >
              <UserCircle2 className="size-4 sm:size-5" />
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="border-t border-border/80 bg-[#181512] px-4 py-3 md:hidden">
            <div className="mb-2.5 flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-3 py-2 text-xs text-primary">
              <Sparkles className="size-4 shrink-0" />
              <span>Good Evening, Alex! Taste The Extraordinary Tonight.</span>
            </div>
            <nav className="grid grid-cols-2 gap-1.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl border border-border/60 bg-secondary/40 px-3 py-2 text-xs font-medium text-foreground/90 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Fixed Bottom Navigation Bar on Mobile (Matching Storià Food UI Kit + instant fallback) */}
      <nav
        aria-label="Thanh điều hướng cố định dưới cùng trên Mobile"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border/90 bg-[#12100e]/95 px-2 py-1.5 backdrop-blur-md md:hidden"
      >
        <div className="mx-auto grid max-w-md grid-cols-4 items-center gap-1">
          <Link
            href="/"
            className={cn(
              "flex flex-col items-center justify-center gap-0.5 rounded-xl py-1 text-[10px] font-semibold transition-colors",
              pathname === "/"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Home className="size-4" />
            <span>Trang chủ</span>
          </Link>

          <Link
            href="/#restaurants"
            className="flex flex-col items-center justify-center gap-0.5 rounded-xl py-1 text-[10px] font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <Compass className="size-4" />
            <span>Nhà hàng</span>
          </Link>

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="relative flex flex-col items-center justify-center gap-0.5 rounded-xl py-1 text-[10px] font-semibold text-muted-foreground transition-colors hover:text-primary cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="size-4 text-primary" />
              {badgeCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 flex min-w-[15px] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-extrabold text-primary-foreground">
                  {badgeCount}
                </span>
              )}
            </div>
            <span>Giỏ hàng</span>
          </button>

          <Link
            href="/profile"
            className={cn(
              "flex flex-col items-center justify-center gap-0.5 rounded-xl py-1 text-[10px] font-semibold transition-colors",
              pathname.startsWith("/profile")
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <UserCircle2 className="size-4" />
            <span>Hồ sơ</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
