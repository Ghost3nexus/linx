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
  title: "LINX | LINE AI予約・会員管理・入退館 統合システム",
  description:
    "LINXは、ジム・ヨガ・ピラティス・クリニック・サウナの予約・会員管理・入退館・決済をLINE AIで自動化する統合システム。24時間AI自動応対、SwitchBotスマートロック連携、最短1日で導入。月額29,800円、初月無料。",
  keywords: "LINE予約システム,ジム管理システム,AI予約,会員管理,入退館管理,スマートロック,ヨガ予約,ピラティス予約,フィットネス管理,hacomono代替,LINX",
  openGraph: {
    title: "LINX | LINE AI予約・会員管理・入退館 統合システム",
    description:
      "ジム・ヨガ・クリニックの予約・会員管理・入退館をLINE1つで自動化。24時間AI応対、最短1日導入、月額29,800円。",
    siteName: "LINX",
    locale: "ja_JP",
    type: "website",
    url: "https://linx-rouge.vercel.app",
    images: [
      {
        url: "/images/hero-gym.png",
        width: 1200,
        height: 630,
        alt: "LINX - LINE AI予約・会員管理システム",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LINX | LINE AI予約・会員管理・入退館 統合システム",
    description:
      "ジム・ヨガ・クリニックの運営をLINE AIで完全自動化。月額29,800円、初月無料。",
    images: ["/images/hero-gym.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://linx-rouge.vercel.app",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "LINX",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description": "LINE AI予約・会員管理・入退館・決済の統合システム。ジム・ヨガ・ピラティス・クリニック・サウナ向け。",
              "offers": {
                "@type": "Offer",
                "price": "29800",
                "priceCurrency": "JPY",
                "priceValidUntil": "2027-12-31",
              },
              "provider": {
                "@type": "Organization",
                "name": "株式会社TomorrowProof",
                "url": "https://tomorrowproof-ai.com",
                "email": "tomorrowprooftokyo@gmail.com",
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "12",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${notoSansJP.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
