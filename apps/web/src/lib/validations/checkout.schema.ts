import { z } from "zod";

/**
 * Regex kiểm tra số điện thoại di động Việt Nam hợp lệ:
 * Bắt đầu bằng 0 hoặc +84, theo sau là các đầu số 3, 5, 7, 8, 9 và 8 chữ số tiếp theo.
 * Ví dụ hợp lệ: 0901234567, 0987654321, 0356789123, +84901234567
 */
export const VIETNAMESE_PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập họ và tên người nhận." })
    .min(2, { message: "Họ và tên phải có ít nhất 2 ký tự." })
    .max(80, { message: "Họ và tên không được vượt quá 80 ký tự." }),

  phone: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập số điện thoại liên hệ." })
    .regex(VIETNAMESE_PHONE_REGEX, {
      message:
        "Số điện thoại không hợp lệ (ví dụ đúng: 0901234567 hoặc 0987654321).",
    }),

  address: z
    .string()
    .trim()
    .min(1, { message: "Vui lòng nhập địa chỉ giao hàng." })
    .min(10, {
      message:
        "Địa chỉ giao hàng cần chi tiết hơn (tối thiểu 10 ký tự, gồm số nhà, tên đường).",
    })
    .max(200, { message: "Địa chỉ giao hàng không được vượt quá 200 ký tự." }),

  note: z
    .string()
    .trim()
    .max(300, { message: "Ghi chú đơn hàng không được vượt quá 300 ký tự." })
    .optional()
    .or(z.literal("")),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
