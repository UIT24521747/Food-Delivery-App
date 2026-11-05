import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-primary/20 bg-[#090807] text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif-display text-2xl font-normal uppercase tracking-[0.25em] text-foreground">
                Maison Storià
              </span>
              <p className="mt-1 text-[9px] uppercase tracking-[0.35em] text-primary">
                Paris • Milan • Saigon
              </p>
            </Link>
            <p className="max-w-xs font-serif-display text-base italic leading-relaxed text-muted-foreground">
              “L’art de la table et de la haute gastronomie contemporaine.”
            </p>
          </div>

          {/* Les Maisons */}
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase tracking-[0.28em] text-primary">
              Les Maisons
            </h3>
            <ul className="space-y-2 font-serif-display text-base text-foreground/85">
              <li>
                <Link
                  href="/restaurant/storia-fine-dining"
                  className="transition-colors hover:text-primary"
                >
                  Storià Fine Dining
                </Link>
              </li>
              <li>
                <Link
                  href="/restaurant/latelier-de-saigon"
                  className="transition-colors hover:text-primary"
                >
                  L&apos;Atelier de Saigon
                </Link>
              </li>
              <li>
                <Link
                  href="/restaurant/kuroshio-omakase"
                  className="transition-colors hover:text-primary"
                >
                  Kuroshio Omakase
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

          {/* Conciergerie */}
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase tracking-[0.28em] text-primary">
              Conciergerie
            </h3>
            <div className="space-y-1.5 text-xs leading-relaxed text-muted-foreground">
              <p>88 Đồng Khởi, Quận 1, TP. Hồ Chí Minh</p>
              <p>Réservation & Privé: 0901 234 567</p>
              <p>Service du Soir: 17:00 – 23:30</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-primary/15 pt-8 text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 sm:flex-row">
          <p>© {new Date().getFullYear()} Maison Storià</p>
          <p>Haute Gastronomie & Service Privé</p>
        </div>
      </div>
    </footer>
  );
}
