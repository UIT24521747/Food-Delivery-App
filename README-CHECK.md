# ✅ README-CHECK.md — Hướng dẫn Tự Kiểm Tra Chuẩn Đầu Ra (AC)

Tài liệu này hướng dẫn cách sử dụng bộ công cụ kiểm tra tự động (`scripts/check-ac.mjs`) và danh sách kiểm tra thủ công để xác nhận dự án hoàn thành 100% Chuẩn đầu ra (Acceptance Criteria - AC) của **Buổi 1**, **Buổi 2** và **Buổi 3**.

---

## 1. Chạy bộ kiểm tra tự động bằng 1 lệnh

Từ thư mục gốc của dự án (`Food Delivery App - Frontend`), chạy lệnh:

```bash
pnpm check:ac
```

### Bộ script `pnpm check:ac` sẽ tự động kiểm tra:
1. **Buổi 1 - Phần A (Môi trường, Git Flow & Repo)**:
   - Kiểm tra phiên bản `node -v`, `pnpm -v`, `git --version`, `docker -v`.
   - Kiểm tra cấu trúc monorepo (`apps/web`, `apps/api`, `/docs`).
   - Kiểm tra sự tồn tại và nội dung của `README.md`, `AGENTS.md`, `.gitignore`, `docker-compose.yml`, và `/docs/PRD.md`.
   - Kiểm tra lịch sử Git với các nhánh `feat/...` và định dạng **Conventional Commits**.
2. **Buổi 1 - Phần B (Khung giao diện Tailwind CSS + shadcn/ui)**:
   - Kiểm tra `apps/web/package.json` sử dụng **Next.js 16**, **Tailwind CSS** và các gói **shadcn/ui**.
   - Kiểm tra sự tồn tại của `Header`, `Footer`, và các component `Button`, `Card`, `Badge`, `Sheet`, `Input`...
3. **Buổi 2 (App Router, Server/Client Components & Giỏ hàng Zustand)**:
   - Kiểm tra mock data trong `/data` có **>= 3 nhà hàng**, mỗi nhà hàng có **>= 5 món ăn**, và đầy đủ các trường `id`, `name`, `price`, `imageUrl`, `restaurantId`.
   - Kiểm tra trang chủ (`src/app/page.tsx`) và trang chi tiết (`src/app/restaurant/[id]/page.tsx`) là **Server Components** (không có `"use client"` ở đầu file).
   - Kiểm tra đầy đủ nested `layout.tsx`, `loading.tsx`, `error.tsx`, và `not-found.tsx`.
   - Kiểm tra `"use client"` chỉ đặt ở các component tương tác (`AddToCartButton`, `CartDrawer`, `FloatingCartBadge`, `CheckoutForm`, `ProfileForm`).
   - Kiểm tra **Zustand Cart Store** có `persist` lưu vào `localStorage`, các actions thêm/xóa/tăng/giảm, selectors tính tổng số lượng & tổng tiền, và tích hợp **Sonner Toast**.
4. **Buổi 3 (Form Checkout với React Hook Form, Zod & Mock API)**:
   - Kiểm tra trang `/checkout` và liên kết dẫn từ `CartDrawer`.
   - Kiểm tra **Zod Schema** cho Checkout (`fullName`, `phone` chuẩn SĐT Việt Nam, `address`, `note`) kèm thông báo lỗi tiếng Việt.
   - Kiểm tra **Zod Schema** cho **User Profile** (`profile.schema.ts`).
   - Kiểm tra trực tiếp logic regex SĐT Việt Nam (ví dụ `0901234567` hợp lệ, `12345` hoặc `0123456789` bị từ chối).
   - Kiểm tra Mock API Route Handler (`src/app/api/orders/route.ts`), trạng thái loading spinner, màn hình xác nhận có mã đơn giả lập và gọi `clearCart()`.

---

## 2. Kiểm tra trải nghiệm thực tế trên trình duyệt

Khởi chạy server phát triển:

```bash
pnpm dev
```

Mở **[http://localhost:3000](http://localhost:3000)** và thử nghiệm theo kịch bản sau:

1. **Trang chủ (`/`)**:
   - Quan sát giao diện *Storià Food — Fine Dining* với Header, Hero Banner, Signature Dishes, Experiences và danh sách 4 nhà hàng.
   - Thu phóng trình duyệt từ `375px` (Mobile) lên Desktop để kiểm tra độ co giãn, không bị thanh cuộn ngang.
2. **Trang chi tiết nhà hàng (`/restaurant/[id]`) & Trang Not Found**:
   - Bấm vào bất kỳ nhà hàng nào (VD: `/restaurant/storia-fine-dining`) -> Xem danh sách 6 món ăn kèm hình ảnh và giá.
   - Thử truy cập `/restaurant/nha-hang-khong-ton-tai` -> Hệ thống hiển thị trang **Not Found (404)** sang trọng.
3. **Giỏ hàng Zustand, Persist, Drawer, Badge & Toast**:
   - Bấm **Thêm món** -> Thông báo **Toast (Sonner)** xuất hiện ngay lập tức, đồng thời **Floating Cart Badge** ở góc phải dưới tăng số lượng.
   - Bấm `F5` (Reload trang) -> Giỏ hàng vẫn giữ nguyên số lượng món từ `localStorage`.
   - Bấm vào **Floating Cart Badge** hoặc nút **Giỏ hàng** trên Header -> **Cart Drawer** mở ra cho phép tăng/giảm/xóa món và xem tổng tiền.
4. **Thanh toán (`/checkout`) & Hồ sơ (`/profile`)**:
   - Trong **Cart Drawer**, bấm **"Tiến hành đặt hàng"** để sang `/checkout`.
   - Bấm **Xác nhận đặt hàng** khi để trống hoặc nhập sai SĐT (VD: `012345`) -> Mỗi trường lỗi hiện đúng 1 dòng thông báo tiếng Việt bên dưới.
   - Nhập thông tin hợp lệ (VD: Họ tên `Lê Như Thực`, SĐT `0901234567`, Địa chỉ `123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh`) và bấm **Xác nhận đặt hàng**:
     - Nút bấm hiện **Spinner** và bị vô hiệu hóa khoảng 1.2 giây.
     - Màn hình chuyển sang **Xác nhận đơn hàng thành công** kèm mã đơn giả lập (`ORD-2026-...`).
     - Kiểm tra lại giỏ hàng -> Giỏ hàng đã được xóa sạch (`0` món).
