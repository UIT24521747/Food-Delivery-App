import Link from "next/link";
import { Utensils, MapPin, Phone, Clock, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/80 bg-[#100e0c] text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex size-10 items-center justify-center rounded-xl border border-primary/40 bg-primary/15 text-primary">
                <Utensils className="size-5" />
              </div>
              <div>
                <span className="font-serif-display text-xl font-bold text-primary">
                  Storià Food
                </span>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Fine Dining Resto
                </p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The Art Of Fine Plating — Trải nghiệm ẩm thực 5 sao và giao món
              thượng hạng tận nơi, nơi mỗi chi tiết đều thì thầm sự tinh tế.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" />
              <span>Michelin Guide Curated Delivery</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="font-serif-display text-base font-semibold text-foreground">
              Khám Phá
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-primary"
                >
                  Trang chủ Storià
                </Link>
              </li>
              <li>
                <Link
                  href="/#restaurants"
                  className="transition-colors hover:text-primary"
                >
                  Danh sách nhà hàng Fine Dining
                </Link>
              </li>
              <li>
                <Link
                  href="/#signature-dishes"
                  className="transition-colors hover:text-primary"
                >
                  Signature Dishes (Món đặc trưng)
                </Link>
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="transition-colors hover:text-primary"
                >
                  Giỏ hàng & Thanh toán
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="transition-colors hover:text-primary"
                >
                  Hồ sơ thực khách VIP
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Featured Restaurants */}
          <div className="space-y-3">
            <h3 className="font-serif-display text-base font-semibold text-foreground">
              Nhà Hàng Nổi Bật
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/restaurant/storia-fine-dining"
                  className="transition-colors hover:text-primary"
                >
                  Storià Fine Dining (Ẩm thực Ý)
                </Link>
              </li>
              <li>
                <Link
                  href="/restaurant/latelier-de-saigon"
                  className="transition-colors hover:text-primary"
                >
                  L&apos;Atelier de Saigon (Ẩm thực Pháp)
                </Link>
              </li>
              <li>
                <Link
                  href="/restaurant/kuroshio-omakase"
                  className="transition-colors hover:text-primary"
                >
                  Kuroshio Omakase & Kaiseki
                </Link>
              </li>
              <li>
                <Link
                  href="/restaurant/trattoria-bella-notte"
                  className="transition-colors hover:text-primary"
                >
                  Trattoria Bella Notte
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-3">
            <h3 className="font-serif-display text-base font-semibold text-foreground">
              Liên Hệ & Phục Vụ
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>88 Đồng Khởi, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-primary" />
                <span>Hotline VIP: 0901 234 567</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="size-4 shrink-0 text-primary" />
                <span>Phục vụ mỗi ngày: 10:30 – 23:30</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} Storià Food — Fine Dining & Delivery.
            All rights reserved.
          </p>
          <p className="text-muted-foreground/80">
            Built with Next.js 16 • Tailwind CSS • shadcn/ui • Zustand • Zod
          </p>
        </div>
      </div>
    </footer>
  );
}
