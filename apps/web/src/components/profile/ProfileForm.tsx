"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
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
      favoriteCuisine: "Haute Gastronomie Française",
      bio: "Thực khách thành viên.",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values: UserProfileFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success(`Đã cập nhật hồ sơ của ${values.fullName}`);
  };

  return (
    <Card className="mx-auto max-w-2xl border-primary/20 bg-[#13110e] p-2 sm:p-6">
      <CardHeader className="border-b border-primary/15 pb-4">
        <p className="text-[9px] uppercase tracking-[0.32em] text-primary">
          Membre Privé
        </p>
        <CardTitle className="font-serif-display text-2xl font-normal">
          Hồ Sơ Thành Viên
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="profile-fullName"
                className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
              >
                Họ và tên
              </Label>
              <Input
                id="profile-fullName"
                {...register("fullName")}
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName?.message && (
                <p className="pt-1 text-xs text-destructive">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="profile-email"
                className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
              >
                Email
              </Label>
              <Input
                id="profile-email"
                type="email"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              {errors.email?.message && (
                <p className="pt-1 text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="profile-phone"
                className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
              >
                Số điện thoại
              </Label>
              <Input
                id="profile-phone"
                type="tel"
                {...register("phone")}
                aria-invalid={!!errors.phone}
              />
              {errors.phone?.message && (
                <p className="pt-1 text-xs text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="profile-cuisine"
                className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
              >
                Phong cách ẩm thực
              </Label>
              <Input
                id="profile-cuisine"
                {...register("favoriteCuisine")}
                aria-invalid={!!errors.favoriteCuisine}
              />
              {errors.favoriteCuisine?.message && (
                <p className="pt-1 text-xs text-destructive">
                  {errors.favoriteCuisine.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="profile-address"
              className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
            >
              Địa chỉ
            </Label>
            <Input
              id="profile-address"
              {...register("address")}
              aria-invalid={!!errors.address}
            />
            {errors.address?.message && (
              <p className="pt-1 text-xs text-destructive">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="profile-bio"
              className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
            >
              Ghi chú khẩu vị
            </Label>
            <Textarea
              id="profile-bio"
              {...register("bio")}
              aria-invalid={!!errors.bio}
            />
            {errors.bio?.message && (
              <p className="pt-1 text-xs text-destructive">
                {errors.bio.message}
              </p>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Đang lưu...</span>
                </>
              ) : (
                <span>Lưu Hồ Sơ</span>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
