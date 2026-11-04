# AGENTS.md — Hướng dẫn dành cho AI Coding Agents & OpenCode

Tài liệu này cung cấp ngữ cảnh kiến trúc, quy ước code và quy trình làm việc cho **OpenCode** và các AI Coding Agents khi phát triển dự án **Storià Food (`wds-food-delivery-lenhuthuc`)**.

---

## 1. Tổng quan kiến trúc Monorepo

Dự án được tổ chức theo cấu trúc **pnpm workspace monorepo**:

```text
wds-food-delivery-lenhuthuc/
├── apps/
│   ├── web/                # Frontend: Next.js 16 (App Router, React 19, TypeScript)
│   └── api/                # Backend: API Service (Chuẩn bị cho Buổi 4)
├── docs/
│   ├── PRD.md              # Product Requirements Document
│   └── screenshots/        # Hình ảnh giao diện tham khảo & kết quả
├── scripts/
│   └── check-ac.mjs        # Script tự động kiểm tra Chuẩn đầu ra (AC) Buổi 1-2-3
├── docker-compose.yml      # Hạ tầng Docker (PostgreSQL, Redis)
├── pnpm-workspace.yaml     # Cấu hình pnpm workspace
└── package.json            # Root scripts điều phối monorepo
```

---

## 2. Công nghệ sử dụng (Tech Stack)

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling & UI**: Tailwind CSS v4 + shadcn/ui (Radix UI primitives + Lucide Icons)
- **Design System**: *Storià Food — Fine Dining Resto*
  - Nền tối sang trọng (`#12100E`, `#1C1915`, `#25201B`)
  - Điểm nhấn Vàng Hoàng Gia / Amber (`#EAB308`, `#F59E0B`)
  - Typography: `Playfair Display` (Serif cho tiêu đề) + `Plus Jakarta Sans` / `Inter` (Sans-serif cho nội dung)
- **State Management**: Zustand (`persist` middleware lưu vào `localStorage`)
- **Form & Validation**: React Hook Form + Zod (`@hookform/resolvers/zod`)
- **Notifications**: Sonner (`toast.success`, `toast.info`, `toast.error`)

---

## 3. Quy tắc Server Components vs Client Components

1. **Mặc định dùng Server Components** cho các trang và layout hiển thị dữ liệu:
   - `src/app/page.tsx` (Trang chủ hiển thị danh sách nhà hàng & món đặc trưng)
   - `src/app/restaurant/[id]/page.tsx` (Trang chi tiết nhà hàng & thực đơn)
   - `src/app/restaurant/[id]/layout.tsx` (Nested layout cho nhà hàng)
2. **Chỉ thêm `"use client"`** ở các leaf components có tương tác người dùng hoặc dùng browser hooks / Zustand store:
   - `src/components/cart/AddToCartButton.tsx` (Nút thêm/tăng/giảm món ăn)
   - `src/components/cart/CartDrawer.tsx` (Ngăn kéo xem trước giỏ hàng)
   - `src/components/cart/FloatingCartBadge.tsx` (Nút giỏ hàng nổi hiển thị số lượng)
   - `src/components/checkout/CheckoutForm.tsx` (Form đặt hàng React Hook Form + Zod)
   - `src/components/profile/ProfileForm.tsx` (Form cập nhật hồ sơ người dùng)

---

## 4. Quy chuẩn Git Flow & Conventional Commits

- Mỗi tính năng được phát triển trên nhánh riêng theo cú pháp `feat/<ten-tinh-nang>`, `fix/<ten-loi>`, hoặc `docs/<noi-dung>`.
- Tin nhắn commit tuân thủ **Conventional Commits**:
  - `feat(web): add zustand cart store with localStorage persistence`
  - `feat(checkout): implement react-hook-form with Vietnamese zod validation`
  - `docs(prd): add product requirements document and setup guide`
  - `chore(docker): configure postgres and redis services`

---

## 5. Lệnh thường dùng

```bash
# Cài đặt dependencies toàn monorepo
pnpm install

# Chạy môi trường phát triển Frontend (apps/web)
pnpm dev

# Build production kiểm tra lỗi TypeScript & Next.js
pnpm build

# Khởi động các dịch vụ Docker (Postgres & Redis)
docker compose up -d

# Chạy bộ kiểm tra tự động Chuẩn đầu ra (AC) cho cả 3 buổi
pnpm check:ac
```
