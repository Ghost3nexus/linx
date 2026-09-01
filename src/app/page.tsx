import type { Metadata } from "next";
import HashScroll from "@/components/partner/HashScroll";
import PartnerHeader from "@/components/partner/PartnerHeader";
import PartnerHero from "@/components/partner/PartnerHero";
import TwoDoors from "@/components/partner/TwoDoors";
import WhiteLabelProof from "@/components/partner/WhiteLabelProof";
import ProductVisual from "@/components/partner/ProductVisual";
import TryItLive from "@/components/partner/TryItLive";
import RevenueStructure from "@/components/partner/RevenueStructure";
import SalesKit from "@/components/partner/SalesKit";
import Industries from "@/components/partner/Industries";
import Onboarding from "@/components/partner/Onboarding";
import Roadmap from "@/components/partner/Roadmap";
import Territory from "@/components/partner/Territory";
import WhoBuilds from "@/components/partner/WhoBuilds";
import PartnerFAQ from "@/components/partner/PartnerFAQ";
import PartnerCTA from "@/components/partner/PartnerCTA";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { partnerFaqs } from "@/lib/partnerFaqs";
import { SITE } from "@/lib/site";

const title = "多店舗・FC向け 店舗管理AI OS のOEM提供｜店舗運営 自動化システムの販売代理店募集";
const description =
  "多店舗の予約管理・顧客管理・入退館・決済を公式LINE上のAIでつなぐ店舗管理AI OSを、御社ブランドでの販売向けに卸します。店舗運営の自動化システムとして、FC本部・チェーン本部の本部管理にも対応。初期費用は0円、販売価格と契約期間は御社が決められます。エンドユーザーの画面に当社の名前は出ません。卸値と条件は個別にご提示します。";

export const metadata: Metadata = {
  title: `${title} | LINX PARTNERS`,
  description,
  keywords: [
    // OEM・代理店（このページの主戦場）
    "予約システム OEM", "店舗管理システム OEM", "ホワイトラベル SaaS",
    "販売代理店募集", "SaaS 代理店", "自社ブランド 予約システム",
    // 多店舗・FC（GMO提案のターゲット層）
    "多店舗 予約管理 システム", "FC 予約管理 システム", "多店舗 予約 顧客管理 システム",
    "複数店舗 一元管理", "マルチ店舗 管理", "本部 管理",
    "店舗運営 自動化 システム", "店舗運営 自動化 AI システム", "店舗管理 AI OS", "店舗OS",
    "会員管理 システム 店舗", "企業向け カスタマイズ", "API 連携", "CSV データ移行",
  ].join(","),
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
                name: "OEM・販売代理店向けの卸提供",
                availability: "https://schema.org/InStock",
                priceSpecification: {
                  "@type": "PriceSpecification",
                  description: "卸値と掛け率は、商圏と規模に応じて個別にご提示します。",
                },
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
        <RevenueStructure />
        <SalesKit />
        <Industries />
        <Onboarding />
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
