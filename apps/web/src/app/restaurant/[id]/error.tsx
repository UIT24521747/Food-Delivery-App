"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RestaurantError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Restaurant page error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-12 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-destructive/40 bg-destructive/15 text-destructive">
        <AlertTriangle className="size-7" />
      </div>
      <h2 className="font-serif-display text-2xl font-bold text-foreground">
        Không thể tải thông tin nhà hàng
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Đã có lỗi xảy ra khi tải thực đơn nhà hàng. Vui lòng thử lại hoặc chọn
        nhà hàng khác.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Button onClick={reset} variant="default">
          <RotateCcw className="size-4" />
          <span>Thử lại</span>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="size-4" />
            <span>Về trang chủ</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
