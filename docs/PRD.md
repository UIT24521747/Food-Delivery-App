# PRD — Product Requirements Document: Storià Food (Fine Dining & Food Delivery)

## 1. Giới thiệu sản phẩm (Product Overview)
**Storià Food** là nền tảng đặt món trực tuyến và trải nghiệm ẩm thực cao cấp (*Fine Dining Resto & Delivery*). Ứng dụng mang đến giao diện sang trọng lấy cảm hứng từ không gian nhà hàng Fine Dining với tông màu Đen Espresso (`#12100E`) và Vàng Amber (`#EAB308`), giúp thực khách khám phá các nhà hàng danh tiếng, chọn món đặc trưng (*Signature Dishes*), quản lý giỏ hàng mượt mà và đặt giao hàng tận nơi hoặc đặt bàn nhanh chóng.

---

## 2. Mục tiêu dự án (Goals & Objectives)
- **Buổi 1 (Nền tảng & Khung giao diện)**:
  - Thiết lập kiến trúc monorepo chuẩn chỉnh (`apps/web`, `apps/api`, `docs/`).
  - Xây dựng hệ thống thiết kế với **Next.js 16**, **Tailwind CSS** và **shadcn/ui** đáp ứng 100% responsive từ Mobile (`375px`) đến Desktop (`1440px+`).
- **Buổi 2 (App Router, Server/Client Components & Giỏ hàng Zustand)**:
  - Tổ chức dữ liệu chuẩn schema (`/data`) với tối thiểu 3 nhà hàng, mỗi nhà hàng tối thiểu 5 món ăn.
  - Tối ưu hiệu năng bằng **Server Components** cho trang chủ (`/`) và trang chi tiết nhà hàng (`/restaurant/[id]`), kết hợp nested layout, `loading.tsx`, `error.tsx` và `not-found.tsx`.
  - Quản lý giỏ hàng toàn cục bằng **Zustand** có lưu trữ bền vững vào `localStorage` (`persist`), kèm **Cart Drawer**, **Floating Cart Badge** và thông báo **Sonner Toast**.
- **Buổi 3 (Form Checkout với React Hook Form, Zod & Mock API)**:
  - Xây dựng luồng thanh toán `/checkout` kết nối từ Cart Drawer.
  - Kiểm tra dữ liệu đầu vào nghiêm ngặt bằng **Zod** + **React Hook Form** với thông báo lỗi tiếng Việt rõ ràng (Họ tên, SĐT Việt Nam chuẩn 10 số, Địa chỉ giao hàng, Ghi chú) và bổ sung Zod Schema cho **User Profile**.
  - Xử lý đặt hàng qua **Mock API Route Handler** (`POST /api/orders`), hiển thị trạng thái loading spinner, màn hình xác nhận kèm mã đơn hàng giả lập và tự động làm sạch giỏ hàng.

---

## 3. Đối tượng người dùng (Target Audience)
1. **Thực khách sành ăn (Fine Dining Lovers)**: Muốn thưởng thức các món ăn chuẩn nhà hàng 5 sao tại nhà với quy trình đặt món nhanh gọn, trực quan.
2. **Nhân viên văn phòng & Gia đình**: Cần đặt bữa trưa/bữa tối chất lượng cao, theo dõi giỏ hàng và chi phí minh bạch.

---

## 4. Mô hình dữ liệu (Data Schema — Chuẩn bị cho Buổi 4)

### 4.1. Restaurant (`Restaurant`)
| Trường | Kiểu dữ liệu | Mô tả |
| :--- | :--- | :--- |
| `id` | `string` | Định danh duy nhất của nhà hàng (VD: `storia-fine-dining`) |
| `name` | `string` | Tên nhà hàng |
| `tagline` | `string` | Khẩu hiệu nghệ thuật (VD: *The Art Of Fine Plating*) |
| `description` | `string` | Mô tả chi tiết phong cách ẩm thực |
| `cuisine` | `string` | Loại hình ẩm thực (Italian, French, Japanese Omakase...) |
| `rating` | `number` | Điểm đánh giá (VD: `4.9`) |
| `reviewCount` | `number` | Số lượt đánh giá |
| `deliveryTime` | `string` | Thời gian giao dự kiến (VD: `25-35 phút`) |
| `deliveryFee` | `number` | Phí giao hàng (VNĐ) |
| `address` | `string` | Địa chỉ nhà hàng |
| `imageUrl` | `string` | Ảnh đại diện nhà hàng |
| `badge` | `string` | Nhãn nổi bật (`Best Restaurant`, `Michelin Guide`, `Chef's Pick`) |

### 4.2. Menu Item / Dish (`MenuItem`)
| Trường | Kiểu dữ liệu | Mô tả |
| :--- | :--- | :--- |
| `id` | `string` | Định danh món ăn |
| `restaurantId` | `string` | Khóa ngoại tham chiếu tới `Restaurant.id` |
| `name` | `string` | Tên món ăn (VD: *Saffron Risotto*) |
| `description` | `string` | Thành phần & cách chế biến |
| `price` | `number` | Giá món ăn (VNĐ) |
| `imageUrl` | `string` | Hình ảnh món ăn chất lượng cao |
| `category` | `string` | Phân loại (`Signature`, `Main Course`, `Starter`, `Dessert`, `Wine & Pairing`) |
| `badge` | `string?` | Nhãn món ăn (`Chef's Choice`, `Popular`, `New`) |
| `prepTime` | `string` | Thời gian chuẩn bị (VD: `15 phút`) |

### 4.3. Order Payload (`OrderInput`)
| Trường | Kiểu dữ liệu | Ràng buộc (Zod Validation) |
| :--- | :--- | :--- |
| `fullName` | `string` | Bắt buộc, từ 2 đến 80 ký tự |
| `phone` | `string` | SĐT Việt Nam hợp lệ (`^(0\|\+84)(3\|5\|7\|8\|9)[0-9]{8}$`, VD: `0901234567`) |
| `address` | `string` | Bắt buộc, tối thiểu 10 ký tự |
| `note` | `string?` | Tùy chọn, tối đa 300 ký tự |
| `items` | `CartItem[]` | Danh sách món ăn trong giỏ hàng |
| `totalPrice` | `number` | Tổng giá trị đơn hàng |

### 4.4. User Profile (`UserProfileInput`)
| Trường | Kiểu dữ liệu | Ràng buộc (Zod Validation) |
| :--- | :--- | :--- |
| `fullName` | `string` | Bắt buộc, tối thiểu 2 ký tự |
| `email` | `string` | Email hợp lệ |
| `phone` | `string` | SĐT Việt Nam hợp lệ (10 số) |
| `address` | `string` | Địa chỉ mặc định tối thiểu 10 ký tự |
| `favoriteCuisine` | `string` | Phong cách ẩm thực yêu thích |
| `bio` | `string?` | Giới thiệu ngắn (tối đa 250 ký tự) |

---

## 5. Luồng người dùng chính (User Flows)
1. **Khám phá & Chọn nhà hàng**: Người dùng vào trang chủ `/` -> Xem banner *The Art Of Fine Plating*, danh sách *Signature Dishes*, *Experiences* và danh sách các nhà hàng -> Bấm vào một nhà hàng để chuyển sang `/restaurant/[id]`.
2. **Thêm món & Quản lý giỏ hàng**: Tại `/restaurant/[id]` (hoặc ngay trên trang chủ), người dùng bấm nút **Thêm món (+)** -> Toast thông báo xuất hiện ngay lập tức -> Badge giỏ hàng nổi cập nhật tổng số món -> Bấm vào Badge hoặc nút Giỏ hàng trên Header để mở **Cart Drawer**, điều chỉnh số lượng hoặc xóa món. Re-load trang vẫn giữ nguyên giỏ hàng nhờ `localStorage`.
3. **Thanh toán (Checkout)**: Từ **Cart Drawer**, bấm **Tiến hành đặt hàng** -> Chuyển tới `/checkout` -> Nhập Họ tên, SĐT, Địa chỉ, Ghi chú -> Hệ thống validate trực tiếp bằng Zod -> Bấm **Xác nhận đặt hàng** -> Nút hiện Spinner và bị vô hiệu hóa khi đang gửi lên `/api/orders` -> Hiển thị màn hình xác nhận kèm **Mã đơn hàng giả lập** (`ORD-...`) và xóa sạch giỏ hàng.

---

## 6. Yêu cầu phi chức năng (Non-Functional Requirements)
- **Responsive Design**: Hiển thị hoàn hảo trên Mobile (`375px`), Tablet (`768px`) và Desktop (`1440px`), không bị tràn ngang (`overflow-x-hidden`).
- **Performance**: Điểm Lighthouse Performance đạt trên 85 nhờ tận dụng React Server Components và tối ưu hóa tài nguyên.
- **Error Handling**: Có đầy đủ `loading.tsx`, `error.tsx`, và `not-found.tsx` khi truy cập ID nhà hàng không tồn tại.
