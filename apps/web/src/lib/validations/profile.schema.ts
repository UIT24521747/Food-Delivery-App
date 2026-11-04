import { z } from "zod";
import { VIETNAMESE_PHONE_REGEX } from "./checkout.schema";

export const userProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập họ và tên của bạn." })
    .min(2, { message: "Họ và tên phải có ít nhất 2 ký tự." })
    .max(80, { message: "Họ và tên không được vượt quá 80 ký tự." }),

  email: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập địa chỉ email." })
    .email({ message: "Địa chỉ email không đúng định dạng (ví dụ: alex@storiafood.vn)." }),

  phone: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập số điện thoại." })
    .regex(VIETNAMESE_PHONE_REGEX, {
      message: "Số điện thoại Việt Nam không hợp lệ (ví dụ: 0901234567).",
    }),

  address: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập địa chỉ mặc định." })
    .min(10, { message: "Địa chỉ mặc định phải có ít nhất 10 ký tự." })
    .max(200, { message: "Địa chỉ không được vượt quá 200 ký tự." }),

  favoriteCuisine: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng chọn phong cách ẩm thực yêu thích." }),

  bio: z
    .string()
    .trim()
    .max(250, { message: "Giới thiệu bản thân không được vượt quá 250 ký tự." })
    .optional()
    .or(z.literal("")),
});

export type UserProfileFormValues = z.infer<typeof userProfileSchema>;
