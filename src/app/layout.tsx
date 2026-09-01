import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { SITE, INDEXABLE } from "@/lib/site";

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
  metadataBase: new URL(SITE.url),
  title: {
    default: "LINX | 公式LINEで動く店舗運営システム",
    template: "%s",
  },
  description:
    "公式LINE上のAIが、問い合わせ対応から空き確認・予約確定・会員管理・入退館・決済までを実行する店舗運営システム。株式会社TomorrowProof が提供しています。",
  robots: {
    index: INDEXABLE,
    follow: INDEXABLE,
    googleBot: { index: INDEXABLE, follow: INDEXABLE },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE.company,
            url: SITE.companyUrl,
            email: SITE.email,
            address: {
              "@type": "PostalAddress",
              addressCountry: "JP",
              addressRegion: "東京都",
              addressLocality: "港区",
              streetAddress: "南青山7-1-27-702",
            },
            founder: { "@type": "Person", name: "上月 貴博" },
            foundingDate: "2025-08-08",
            brand: { "@type": "Brand", name: SITE.name },
          }}
        />
      </head>
      <body className={`${inter.variable} ${notoSansJP.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
