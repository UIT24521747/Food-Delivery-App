"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronLeft,
  Home,
  Compass,
} from "lucide-react";
import { useCartStore, selectTotalItems } from "@/store/useCartStore";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "La Maison" },
  { href: "/#restaurants", label: "Les Tables" },
  { href: "/#signature-dishes", label: "La Carte" },
  { href: "/#experiences", label: "Soirées" },
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
      <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-[#0c0b09]/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-8">
          {/* Left: Mobile Back/Menu Trigger + Brand Logotype */}
          <div className="flex items-center gap-3">
            {isSubPage ? (
              <Link
                href="/"
                aria-label="Quay về trang chủ"
                className="inline-flex size-8 items-center justify-center border border-primary/35 text-primary transition-colors hover:bg-primary hover:text-primary-foreground md:hidden"
              >
                <ChevronLeft className="size-4" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Mở menu điều hướng"
                className="inline-flex size-8 items-center justify-center border border-primary/30 text-foreground/80 transition-colors hover:border-primary hover:text-primary md:hidden cursor-pointer"
              >
                {mobileMenuOpen ? (
                  <X className="size-4" />
                ) : (
                  <Menu className="size-4" />
                )}
              </button>
            )}

            <Link href="/" className="group flex flex-col focus:outline-none">
              <span className="font-serif-display text-lg font-medium tracking-[0.22em] uppercase text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                Maison Storià
              </span>
              <span className="hidden text-[9px] uppercase tracking-[0.35em] text-primary/80 sm:block">
                Haute Gastronomie
              </span>
            </Link>
          </div>

          {/* Center: Classical Minimalist Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === "/" && pathname === "/";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative py-1 text-[11px] uppercase tracking-[0.24em] transition-colors duration-300",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Discreet Cart & Member Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              data-testid="header-cart-button"
              className="group inline-flex h-9 items-center gap-2.5 border border-primary/40 bg-transparent px-3.5 text-[10px] uppercase tracking-[0.2em] text-foreground transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground cursor-pointer sm:h-10 sm:px-5"
            >
              <ShoppingBag className="size-3.5 text-primary transition-colors group-hover:text-primary-foreground" />
              <span className="hidden sm:inline">Giỏ hàng</span>
              <span
                data-testid="header-cart-badge"
                className="font-serif-display text-xs font-semibold text-primary transition-colors group-hover:text-primary-foreground"
              >
                ({badgeCount})
              </span>
            </button>

            <Link
              href="/profile"
              aria-label="Hồ sơ cá nhân"
              className="flex size-9 items-center justify-center border border-primary/30 text-foreground/80 transition-colors hover:border-primary hover:text-primary sm:size-10"
            >
              <User className="size-4" />
            </Link>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="border-t border-primary/20 bg-[#0c0b09] px-4 py-4 md:hidden">
            <nav className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="border border-primary/20 px-3 py-2.5 text-center text-[10px] uppercase tracking-[0.22em] text-foreground/90 transition-colors hover:border-primary hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Fixed Mobile Bottom Bar */}
      <nav
        aria-label="Điều hướng di động"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-primary/25 bg-[#0c0b09]/95 backdrop-blur-md md:hidden"
      >
        <div className="mx-auto grid max-w-md grid-cols-4 divide-x divide-primary/15">
          <Link
            href="/"
            className={cn(
              "flex flex-col items-center justify-center gap-1 py-2.5 text-[9px] uppercase tracking-[0.18em] transition-colors",
              pathname === "/"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Home className="size-3.5" />
            <span>Maison</span>
          </Link>

          <Link
            href="/#restaurants"
            className="flex flex-col items-center justify-center gap-1 py-2.5 text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
          >
            <Compass className="size-3.5" />
            <span>Tables</span>
          </Link>

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-center justify-center gap-1 py-2.5 text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="size-3.5 text-primary" />
              {badgeCount > 0 && (
                <span className=" -top-1.5 -right-2.5 absolute flex min-w-[14px] items-center justify-center bg-primary px-1 text-[8px] font-bold text-primary-foreground">
                  {badgeCount}
                </span>
              )}
            </div>
            <span>Giỏ ({badgeCount})</span>
          </button>

          <Link
            href="/profile"
            className={cn(
              "flex flex-col items-center justify-center gap-1 py-2.5 text-[9px] uppercase tracking-[0.18em] transition-colors",
              pathname.startsWith("/profile")
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <User className="size-3.5" />
            <span>Hồ sơ</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
