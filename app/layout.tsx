import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_TC } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "VetTrainer — 獸醫住院醫師訓練系統",
    template: "%s | VetTrainer",
  },
  description: "基於 BSAVA 臨床程序指南的獸醫住院醫師訓練系統，涵蓋 343 個犬貓臨床程序，支援中英雙語切換與 12+ 專科分類。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansTC.variable} antialiased flex flex-col min-h-screen font-sans`}
        style={{ fontFamily: 'var(--font-geist-sans), var(--font-noto-sans-tc), "Microsoft JhengHei", sans-serif' }}
      >
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
