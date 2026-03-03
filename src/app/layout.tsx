import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "LINX | LINEグループに、AIスタッフを。",
  description:
    "LINXは、あなたのLINEグループにAIコンシェルジュを追加するサービス。顧客対応を24時間自動化。導入5分、月額0円から。",
  openGraph: {
    title: "LINX | LINEグループに、AIスタッフを。",
    description:
      "LINEグループにAIコンシェルジュを追加。顧客対応を24時間自動化。導入5分、月額0円から。",
    siteName: "LINX",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LINX | LINEグループに、AIスタッフを。",
    description:
      "LINEグループにAIコンシェルジュを追加。顧客対応を24時間自動化。",
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
