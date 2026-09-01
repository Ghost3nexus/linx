import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import BeforeAfter from "@/components/BeforeAfter";
import Solution from "@/components/Solution";
import ProductShowcase from "@/components/ProductShowcase";
import HowItWorks from "@/components/HowItWorks";
import Demo from "@/components/Demo";
import Journey from "@/components/Journey";
import Stats from "@/components/Stats";
import UseCases from "@/components/UseCases";
import RiskFree from "@/components/RiskFree";
import DataProof from "@/components/DataProof";
import Comparison from "@/components/Comparison";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import AboutCompany from "@/components/AboutCompany";
import SecurityBadges from "@/components/SecurityBadges";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import PhonePopup from "@/components/PhonePopup";
import JsonLd from "@/components/JsonLd";
import { faqs } from "@/lib/faqs";
import { SITE } from "@/lib/site";
import { SUGGESTED_RETAIL } from "@/lib/wholesale";

const title = "店舗 予約管理システム｜LINEのAIが24時間 予約受付・顧客管理・入退館まで";
const description =
  "店舗の予約管理と顧客管理をLINEで一元化する、店舗管理AI OSです。公式LINE上のAIが24時間 予約受付に応対し、空き確認から予約の自動確定まで実行。会員管理・顧客カルテ・予約履歴の管理・入退館管理・決済連携までつながります。ジム・美容室・ヨガ・ピラティス・クリニック・サウナ向け。既存のLINE公式アカウントにそのまま追加できます。";

export const metadata: Metadata = {
  title: `${title} | LINX`,
  description,
  keywords: [
    "店舗 予約管理 システム", "店舗 予約管理 システム 導入",
    "店舗 顧客管理 システム", "店舗 顧客管理 システム 比較",
    "LINE 予約管理 システム", "LINE 予約管理 システム 導入", "LINE 予約",
    "AI 予約システム 店舗", "AI 自動応対", "24時間 予約受付",
    "問い合わせ 自動化", "予約 自動確定", "予約 顧客 一元管理",
    "顧客管理 一元化", "顧客カルテ", "予約履歴 管理",
    "会員管理 システム 店舗", "入退館 管理", "決済 連携",
    "店舗運営 自動化 システム", "LINE 顧客対応 自動化", "店舗管理 AI OS",
  ].join(","),
  alternates: { canonical: `${SITE.url}/product` },
  openGraph: {
    title: `${title} | LINX`,
    description,
    url: `${SITE.url}/product`,
    siteName: SITE.name,
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/images/hero-gym.png", width: 1200, height: 630, alt: "LINX — 店舗のAI予約・会員管理システム" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | LINX`,
    description,
    images: ["/images/hero-gym.png"],
  },
};

export default function ProductPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: SITE.name,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            url: `${SITE.url}/product`,
            description,
            offers: {
              "@type": "Offer",
              price: String(SUGGESTED_RETAIL),
              priceCurrency: "JPY",
              priceValidUntil: "2027-12-31",
            },
            provider: { "@type": "Organization", name: SITE.company, url: SITE.companyUrl },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "ホーム", item: SITE.url },
              { "@type": "ListItem", position: 2, name: "製品紹介", item: `${SITE.url}/product` },
            ],
          },
        ]}
      />
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <BeforeAfter />
        <Solution />
        <ProductShowcase />
        <HowItWorks />
        <Demo />
        <Journey />
        <Stats />
        <UseCases />
        <RiskFree />
        <DataProof />
        <Comparison />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <AboutCompany />
        <SecurityBadges />
      </main>
      <Footer />
      <FloatingCTA />
      <PhonePopup />
    </>
  );
}
