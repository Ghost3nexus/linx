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

const title = "店舗のAI予約・会員管理システム｜公式LINEで予約確定・入退館・決済まで";
const description =
  "公式LINE上のAIが、問い合わせに答えるだけでなく空き確認から予約確定、会員管理、入退館、決済まで実行する店舗運営システム。ジム・ヨガ・ピラティス・クリニック・サウナ・美容室向け。既存のLINE公式アカウントにそのまま追加できます。";

export const metadata: Metadata = {
  title: `${title} | LINX`,
  description,
  keywords:
    "店舗 予約管理 システム,LINE 予約管理 システム,AI 予約システム 店舗,会員管理 システム 店舗,入退館 管理,店舗運営 自動化 システム",
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
