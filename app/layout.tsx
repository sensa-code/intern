import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "獸醫住院醫師訓練系統",
  description: "基於 BSAVA 臨床程序指南的個人化訓練計劃管理",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Server-rendered 導航列 — 純 Link，無需 usePathname */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <nav className="container mx-auto px-4 h-14 flex items-center gap-6">
            <Link
              href="/"
              className="font-semibold text-lg hover:opacity-80 transition-opacity"
            >
              VetTrainer
            </Link>
            <Link
              href="/procedures"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              程序資料庫
            </Link>
            <Link
              href="/training"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              訓練計劃
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
