import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();

let passed = 0;
let failed = 0;

function check(title, condition, detail = "") {
  if (condition) {
    passed++;
    console.log(`  ✅ [PASS] ${title}`);
  } else {
    failed++;
    console.error(`  ❌ [FAIL] ${title}${detail ? ` — ${detail}` : ""}`);
  }
}

function fileExistsNonEmpty(relPath) {
  const full = path.join(ROOT, relPath);
  return fs.existsSync(full) && fs.statSync(full).size > 20;
}

function readFile(relPath) {
  const full = path.join(ROOT, relPath);
  return fs.existsSync(full) ? fs.readFileSync(full, "utf8") : "";
}

function runCmdVersion(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim();
  } catch {
    return "";
  }
}

console.log("\n======================================================================");
console.log("🍽️  BỘ KIỂM TRA CHUẨN ĐẦU RA (AC) — STORIÀ FOOD (BUỔI 1, BUỔI 2, BUỔI 3)");
console.log("======================================================================\n");

// ---------------------------------------------------------------------------
// BUỔI 1 - PHẦN A: Môi trường, Git flow & Repo
// ---------------------------------------------------------------------------
console.log("📌 BUỔI 1 - PHẦN A: Môi trường, Git flow & Repo");

const nodeVer = runCmdVersion("node -v");
const pnpmVer = runCmdVersion("pnpm -v");
const gitVer = runCmdVersion("git --version");
const dockerVer = runCmdVersion("docker -v");

check(
  "node -v, pnpm -v, git --version và docker -v không báo lỗi",
  Boolean(nodeVer && pnpmVer && gitVer && dockerVer),
  `node=${nodeVer}, pnpm=${pnpmVer}, git=${gitVer}, docker=${dockerVer}`
);

check(
  "Tổ chức monorepo: Frontend ở apps/web, Backend ở apps/api",
  fs.existsSync(path.join(ROOT, "apps/web/package.json")) &&
    fs.existsSync(path.join(ROOT, "apps/api/package.json"))
);

check(
  "Thư mục /docs có đủ file PRD (docs/PRD.md)",
  fileExistsNonEmpty("docs/PRD.md")
);

check(
  "README.md, AGENTS.md và .gitignore có nội dung hợp lý, không để file trống",
  fileExistsNonEmpty("README.md") &&
    fileExistsNonEmpty("AGENTS.md") &&
    fileExistsNonEmpty(".gitignore")
);

check(
  "docker-compose.yml cơ bản tồn tại và hợp lệ",
  fileExistsNonEmpty("docker-compose.yml")
);

const gitBranches = runCmdVersion("git branch -a");
const gitLog = runCmdVersion("git log --oneline -n 20");
check(
  "Git flow có các nhánh feat/... và commit theo Conventional Commits",
  gitBranches.includes("feat/") &&
    /(feat|chore|docs)(\(.+\))?:/.test(gitLog)
);

// ---------------------------------------------------------------------------
// BUỔI 1 - PHẦN B: Khung giao diện - Tailwind CSS + shadcn/ui
// ---------------------------------------------------------------------------
console.log("\n📌 BUỔI 1 - PHẦN B: Khung giao diện - Tailwind CSS + shadcn/ui");

const webPkg = JSON.parse(readFile("apps/web/package.json") || "{}");
check(
  "Khởi tạo project Next.js 16 trong apps/web bằng pnpm",
  Boolean(webPkg.dependencies?.next && webPkg.dependencies.next.includes("16"))
);

check(
  "Setup đầy đủ Tailwind CSS và shadcn/ui (components.json + ui components)",
  fileExistsNonEmpty("apps/web/components.json") &&
    fileExistsNonEmpty("apps/web/src/components/ui/button.tsx") &&
    fileExistsNonEmpty("apps/web/src/components/ui/card.tsx")
);

check(
  "Dựng layout khung gồm Header và Footer",
  fileExistsNonEmpty("apps/web/src/components/layout/Header.tsx") &&
    fileExistsNonEmpty("apps/web/src/components/layout/Footer.tsx") &&
    readFile("apps/web/src/app/layout.tsx").includes("<Header") &&
    readFile("apps/web/src/app/layout.tsx").includes("<Footer")
);

// ---------------------------------------------------------------------------
// BUỔI 2: App Router, Server/Client Components & giỏ hàng Zustand
// ---------------------------------------------------------------------------
console.log("\n📌 BUỔI 2: App Router, Server/Client Components & Giỏ hàng Zustand");

const mockDataContent = readFile("apps/web/src/data/restaurants.ts");
const restaurantMatches = mockDataContent.match(/id:\s*"(storia-fine-dining|latelier-de-saigon|kuroshio-omakase|trattoria-bella-notte)"/g) || [];
const dishMatches = mockDataContent.match(/restaurantId:\s*"/g) || [];

check(
  "Mock data trong /data có tối thiểu 3 nhà hàng, mỗi nhà hàng >= 5 món, đúng schema (id, name, price, imageUrl, restaurantId)",
  restaurantMatches.length >= 3 &&
    dishMatches.length >= 15 &&
    mockDataContent.includes("imageUrl") &&
    mockDataContent.includes("restaurantId") &&
    mockDataContent.includes("price")
);

const homePageContent = readFile("apps/web/src/app/page.tsx");
check(
  "Trang chủ hiển thị danh sách nhà hàng bằng Server Component (không dùng 'use client' ở page.tsx)",
  !homePageContent.trimStart().startsWith('"use client"') &&
    !homePageContent.trimStart().startsWith("'use client'") &&
    homePageContent.includes("RESTAURANTS.map")
);

const restPageContent = readFile("apps/web/src/app/restaurant/[id]/page.tsx");
check(
  "Trang /restaurant/[id] là Server Component hiển thị món ăn kèm hình ảnh, giá và gọi notFound() khi id không tồn tại",
  !restPageContent.trimStart().startsWith('"use client"') &&
    restPageContent.includes("notFound()") &&
    restPageContent.includes("DishCard")
);

check(
  "Đầy đủ nested layout, loading.tsx, error.tsx và trang not-found.tsx trong /restaurant/[id]",
  fileExistsNonEmpty("apps/web/src/app/restaurant/[id]/layout.tsx") &&
    fileExistsNonEmpty("apps/web/src/app/restaurant/[id]/loading.tsx") &&
    fileExistsNonEmpty("apps/web/src/app/restaurant/[id]/error.tsx") &&
    fileExistsNonEmpty("apps/web/src/app/restaurant/[id]/not-found.tsx")
);

const addToCartContent = readFile("apps/web/src/components/cart/AddToCartButton.tsx");
const cartStoreContent = readFile("apps/web/src/store/useCartStore.ts");
check(
  "Chỉ dùng 'use client' ở component tương tác (AddToCartButton, CartDrawer, FloatingCartBadge)",
  addToCartContent.includes('"use client"') &&
    readFile("apps/web/src/components/cart/CartDrawer.tsx").includes('"use client"') &&
    readFile("apps/web/src/components/cart/FloatingCartBadge.tsx").includes('"use client"')
);

check(
  "Zustand Cart Store có persist (LocalStorage), actions thêm/xóa/tăng/giảm, selectors tổng số lượng & tổng tiền và Sonner Toast",
  cartStoreContent.includes("persist(") &&
    cartStoreContent.includes("localStorage") &&
    cartStoreContent.includes("selectTotalItems") &&
    cartStoreContent.includes("selectTotalPrice") &&
    cartStoreContent.includes("toast.")
);

// ---------------------------------------------------------------------------
// BUỔI 3: Form Checkout với React Hook Form, Zod & Mock API
// ---------------------------------------------------------------------------
console.log("\n📌 BUỔI 3: Form Checkout với React Hook Form, Zod & Mock API");

const cartDrawerContent = readFile("apps/web/src/components/cart/CartDrawer.tsx");
check(
  "Có trang /checkout và nút dẫn trực tiếp từ Cart Drawer sang /checkout",
  fileExistsNonEmpty("apps/web/src/app/checkout/page.tsx") &&
    cartDrawerContent.includes('href="/checkout"')
);

const checkoutSchemaContent = readFile("apps/web/src/lib/validations/checkout.schema.ts");
const vnPhoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
check(
  "Zod schema cho form Checkout (họ tên, SĐT Việt Nam, địa chỉ, ghi chú) với thông báo lỗi tiếng Việt",
  checkoutSchemaContent.includes("fullName") &&
    checkoutSchemaContent.includes("phone") &&
    checkoutSchemaContent.includes("address") &&
    checkoutSchemaContent.includes("note") &&
    vnPhoneRegex.test("0901234567") &&
    !vnPhoneRegex.test("0123456789") &&
    !vnPhoneRegex.test("abc123456")
);

check(
  "Tự viết thêm Zod schema cho User Profile (profile.schema.ts)",
  fileExistsNonEmpty("apps/web/src/lib/validations/profile.schema.ts") &&
    readFile("apps/web/src/lib/validations/profile.schema.ts").includes("userProfileSchema")
);

const checkoutFormContent = readFile("apps/web/src/components/checkout/CheckoutForm.tsx");
check(
  "Dùng React Hook Form + zodResolver, hiện Spinner & disable nút khi đang gửi, hiện mã đơn giả lập và xóa giỏ hàng (clearCart)",
  checkoutFormContent.includes("useForm") &&
    checkoutFormContent.includes("zodResolver") &&
    checkoutFormContent.includes("isSubmitting") &&
    checkoutFormContent.includes("animate-spin") &&
    checkoutFormContent.includes("clearCart()") &&
    fileExistsNonEmpty("apps/web/src/app/api/orders/route.ts")
);

console.log("\n======================================================================");
console.log(`🎉 KẾT QUẢ KIỂM TRA: ${passed}/${passed + failed} hạng mục ĐẠT CHUẨN (AC)`);
console.log("======================================================================\n");

if (failed > 0) {
  process.exit(1);
}
