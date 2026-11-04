import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProfileForm } from "@/components/profile/ProfileForm";

export const metadata: Metadata = {
  title: "Hồ Sơ Thực Khách VIP | Storià Food",
  description: "Quản lý thông tin cá nhân và sở thích ẩm thực tại Storià Food.",
};

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-2 text-center">
        <Badge variant="outline" className="gap-1">
          <Sparkles className="size-3" />
          <span>Member Profile</span>
        </Badge>
        <h1 className="font-serif-display text-3xl font-bold text-foreground sm:text-4xl">
          Hồ Sơ Thực Khách Storià
        </h1>
        <p className="text-sm text-muted-foreground">
          Cập nhật thông tin liên hệ và địa chỉ giao hàng mặc định của bạn.
        </p>
      </div>

      <ProfileForm />
    </div>
  );
}
