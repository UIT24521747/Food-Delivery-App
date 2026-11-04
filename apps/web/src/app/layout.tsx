import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FloatingCartBadge } from "@/components/cart/FloatingCartBadge";
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Storià Food — Fine Dining & Gourmet Food Delivery",
  description:
    "Taste The Extraordinary Tonight. Đặt món Fine Dining chuẩn 5 sao từ Storià Food với thực đơn tinh tuyển và giao hàng giữ nhiệt cao cấp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${jakarta.variable} dark`}
    >
      <body className=" flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <FloatingCartBadge />
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
