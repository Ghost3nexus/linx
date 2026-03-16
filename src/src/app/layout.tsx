import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  title: "LINX | 公式LINEに、AIスタッフを。",
  description:
    "LINXは、あなたの公式LINEにAIスタッフを追加するサービス。お客様の質問にAIが即回答。予約・在庫・FAQ対応を24時間自動化。無料ではじめられます。",
  openGraph: {
    title: "LINX | 公式LINEに、AIスタッフを。",
    description:
      "公式LINEにAIスタッフを追加。お客様の質問に24時間自動で回答。無料ではじめられます。",
    siteName: "LINX",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LINX | 公式LINEに、AIスタッフを。",
    description:
      "公式LINEにAIスタッフを追加。24時間自動応答。無料ではじめられます。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${notoSansJP.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
