import type { Metadata } from "next";
import HashScroll from "@/components/partner/HashScroll";
import PartnerHeader from "@/components/partner/PartnerHeader";
import PartnerHero from "@/components/partner/PartnerHero";
import TwoDoors from "@/components/partner/TwoDoors";
import WhiteLabelProof from "@/components/partner/WhiteLabelProof";
import ProductVisual from "@/components/partner/ProductVisual";
import TryItLive from "@/components/partner/TryItLive";
import RevenueSimulator from "@/components/partner/RevenueSimulator";
import SalesKit from "@/components/partner/SalesKit";
import Industries from "@/components/partner/Industries";
import Roadmap from "@/components/partner/Roadmap";
import Territory from "@/components/partner/Territory";
import WhoBuilds from "@/components/partner/WhoBuilds";
import PartnerFAQ from "@/components/partner/PartnerFAQ";
import PartnerCTA from "@/components/partner/PartnerCTA";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { partnerFaqs } from "@/lib/partnerFaqs";
import { SITE } from "@/lib/site";
import { MARGIN_RATE, SUGGESTED_RETAIL, WHOLESALE_MONTHLY } from "@/lib/wholesale";

const title = "店舗AIシステムのOEM提供・販売代理店募集";
const description = `公式LINE上で予約確定・会員管理・入退館・決済まで実行する店舗運営システムを、御社ブランドでの販売向けに卸します。卸値は1店舗あたり月額${WHOLESALE_MONTHLY.toLocaleString("ja-JP")}円、想定小売${SUGGESTED_RETAIL.toLocaleString("ja-JP")}円で御社の取り分は${Math.round(MARGIN_RATE * 100)}%。エンドユーザーの画面に当社の名前は出ません。`;

export const metadata: Metadata = {
  title: `${title} | LINX PARTNERS`,
  description,
  keywords:
    "予約システム OEM,店舗管理システム OEM,ホワイトラベル SaaS,販売代理店募集,SaaS 代理店,LINE 予約システム OEM,自社ブランド 予約システム,FC本部 予約管理 システム,多店舗 予約管理 システム",
  alternates: { canonical: SITE.url },
  openGraph: {
    title: `${title} | LINX PARTNERS`,
    description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/images/hero-main.png", width: 1200, height: 630, alt: "LINX PARTNERS — 店舗AIシステムのOEM提供" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | LINX PARTNERS`,
    description,
    images: ["/images/hero-main.png"],
  },
};

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: title,
            url: SITE.url,
            description,
            inLanguage: "ja",
            isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
            about: {
              "@type": "Service",
              name: "LINX パートナープログラム（OEM・販売代理店）",
              serviceType: "ホワイトラベルSaaSの卸提供",
              provider: { "@type": "Organization", name: SITE.company, url: SITE.companyUrl },
              areaServed: { "@type": "Country", name: "日本" },
              offers: {
                "@type": "Offer",
                name: "卸値型（1店舗あたり月額）",
                price: String(WHOLESALE_MONTHLY),
                priceCurrency: "JPY",
              },
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: partnerFaqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />
      <HashScroll />
      <PartnerHeader />
      <main>
        <PartnerHero />
        <TwoDoors />
        <WhiteLabelProof />
        <ProductVisual />
        <TryItLive />
        <RevenueSimulator />
        <SalesKit />
        <Industries />
        <Roadmap />
        <Territory />
        <WhoBuilds />
        <PartnerFAQ />
        <PartnerCTA />
      </main>
      <Footer />
    </>
  );
}
