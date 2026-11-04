"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[65vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <div className="mb-5 flex size-16 items-center justify-center rounded-2xl border border-destructive/40 bg-destructive/15 text-destructive">
        <AlertTriangle className="size-8" />
      </div>
      <h1 className="font-serif-display text-2xl font-bold text-foreground sm:text-3xl">
        Đã có sự cố bất ngờ xảy ra
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Hệ thống tạm thời gián đoạn khi tải nội dung. Vui lòng thử tải lại trang
        hoặc quay về trang chủ Storià Food.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset} variant="default">
          <RotateCcw className="size-4" />
          <span>Thử lại ngay</span>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">
            <Home className="size-4" />
            <span>Về trang chủ</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
