import Link from "next/link";
import { UtensilsCrossed, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
        <Sparkles className="size-3.5" />
        <span>404 — Không tìm thấy trang hoặc nhà hàng</span>
      </div>

      <div className="mb-6 flex size-20 items-center justify-center rounded-3xl border border-border bg-[#1c1814] text-primary shadow-xl">
        <UtensilsCrossed className="size-10" />
      </div>

      <h1 className="font-serif-display text-3xl font-bold text-foreground sm:text-4xl">
        Nhà hàng hoặc bàn tiệc không tồn tại
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
        Rất tiếc, đường dẫn hoặc mã nhà hàng bạn vừa truy cập không có trong hệ
        thống Storià Food. Hãy khám phá các nhà hàng Fine Dining khác đang mở
        cửa phục vụ.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/">
            <ArrowLeft className="size-4" />
            <span>Quay về trang chủ Storià Food</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
