import { NextResponse } from "next/server";
import { checkoutSchema } from "@/lib/validations/checkout.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Giả lập độ trễ mạng 1.2 giây để hiển thị rõ Spinner ở phía Client
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const parsed = checkoutSchema.safeParse({
      fullName: body.fullName,
      phone: body.phone,
      address: body.address,
      note: body.note ?? "",
    });

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Dữ liệu đặt hàng không hợp lệ.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const orderCode = `ORD-2026-${randomCode}`;

    return NextResponse.json(
      {
        success: true,
        orderCode,
        createdAt: new Date().toISOString(),
        estimatedDelivery: "25 - 35 phút",
        customer: parsed.data,
        itemsCount: Array.isArray(body.items) ? body.items.length : 0,
        totalAmount: body.totalAmount ?? 0,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi máy chủ khi xử lý đơn hàng. Vui lòng thử lại.",
      },
      { status: 500 }
    );
  }
}
