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
  themeColor: "#050508",
};

export const metadata: Metadata = {
  title: "LINX | 公式LINEに、AIスタッフを。",
  description:
    "LINXは、あなたの公式LINEにAIコンシェルジュを追加するサービス。顧客対応を24時間自動化。1週間無料お試し。",
  openGraph: {
    title: "LINX | 公式LINEに、AIスタッフを。",
    description:
      "公式LINEにAIコンシェルジュを追加。顧客対応を24時間自動化。1週間無料お試し。",
    siteName: "LINX",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LINX | 公式LINEに、AIスタッフを。",
    description:
      "公式LINEにAIコンシェルジュを追加。顧客対応を24時間自動化。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <body className={`${inter.variable} ${notoSansJP.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
