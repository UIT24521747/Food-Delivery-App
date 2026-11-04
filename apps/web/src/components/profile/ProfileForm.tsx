"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Utensils,
  FileText,
  Save,
  Loader2,
} from "lucide-react";
import {
  userProfileSchema,
  type UserProfileFormValues,
} from "@/lib/validations/profile.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      fullName: "Alex Nguyễn",
      email: "alex@storiafood.vn",
      phone: "0901234567",
      address: "88 Đồng Khởi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      favoriteCuisine: "Ẩm thực Ý Đương Đại & Omakase",
      bio: "Thực khách yêu thích nấm Truffle đen vùng Umbria và rượu vang vùng Tuscany.",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values: UserProfileFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success(`Đã lưu hồ sơ của ${values.fullName} thành công!`);
  };

  return (
    <Card className="mx-auto max-w-2xl border-border/80 bg-[#1c1814]">
      <CardHeader className="border-b border-border/70 pb-5">
        <CardTitle className="text-xl text-foreground">
          Thông Tin Hồ Sơ Thực Khách VIP (User Profile Schema)
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Biểu mẫu sử dụng <code className="text-primary">userProfileSchema</code>{" "}
          (Zod + React Hook Form) theo yêu cầu Buổi 3.
        </p>
      </CardHeader>

      <CardContent className="pt-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="profile-fullName" className="flex items-center gap-1.5">
                <User className="size-3.5 text-primary" />
                <span>Họ và tên *</span>
              </Label>
              <Input
                id="profile-fullName"
                {...register("fullName")}
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName?.message && (
                <p className="text-xs font-medium text-destructive">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-email" className="flex items-center gap-1.5">
                <Mail className="size-3.5 text-primary" />
                <span>Email *</span>
              </Label>
              <Input
                id="profile-email"
                type="email"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              {errors.email?.message && (
                <p className="text-xs font-medium text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="profile-phone" className="flex items-center gap-1.5">
                <Phone className="size-3.5 text-primary" />
                <span>Số điện thoại Việt Nam *</span>
              </Label>
              <Input
                id="profile-phone"
                type="tel"
                {...register("phone")}
                aria-invalid={!!errors.phone}
              />
              {errors.phone?.message && (
                <p className="text-xs font-medium text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-cuisine" className="flex items-center gap-1.5">
                <Utensils className="size-3.5 text-primary" />
                <span>Ẩm thực yêu thích *</span>
              </Label>
              <Input
                id="profile-cuisine"
                {...register("favoriteCuisine")}
                aria-invalid={!!errors.favoriteCuisine}
              />
              {errors.favoriteCuisine?.message && (
                <p className="text-xs font-medium text-destructive">
                  {errors.favoriteCuisine.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-address" className="flex items-center gap-1.5">
              <MapPin className="size-3.5 text-primary" />
              <span>Địa chỉ giao hàng mặc định *</span>
            </Label>
            <Input
              id="profile-address"
              {...register("address")}
              aria-invalid={!!errors.address}
            />
            {errors.address?.message && (
              <p className="text-xs font-medium text-destructive">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-bio" className="flex items-center gap-1.5">
              <FileText className="size-3.5 text-primary" />
              <span>Giới thiệu & Khẩu vị cá nhân</span>
            </Label>
            <Textarea
              id="profile-bio"
              {...register("bio")}
              aria-invalid={!!errors.bio}
            />
            {errors.bio?.message && (
              <p className="text-xs font-medium text-destructive">
                {errors.bio.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Đang lưu hồ sơ...</span>
              </>
            ) : (
              <>
                <Save className="size-4" />
                <span>Lưu cập nhật hồ sơ</span>
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
