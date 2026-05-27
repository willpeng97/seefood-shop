import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartHydration } from "@/components/CartHydration";

const notoSans = Noto_Sans_TC({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "鱸好家 | 台灣水產直送電商",
  description:
    "急凍鎖鮮、溯源透明的水產電商。嘉義魚塭直送金目鱸、雲林白蝦，三清處理安心選購。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className={`${notoSans.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <CartHydration />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
