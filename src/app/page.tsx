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
import BetaPartner from "@/components/BetaPartner";
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

export default function Home() {
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
            url: SITE.url,
            description:
              "公式LINE上のAIが、問い合わせ対応だけでなく空き確認・予約確定・会員管理・入退館・決済まで実行する店舗運営システム。ジム・ヨガ・ピラティス・クリニック・サウナ・美容室向け。",
            offers: {
              "@type": "Offer",
              price: "29800",
              priceCurrency: "JPY",
              priceValidUntil: "2027-12-31",
            },
            provider: {
              "@type": "Organization",
              name: SITE.company,
              url: SITE.companyUrl,
            },
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
            "@type": "WebSite",
            name: SITE.name,
            url: SITE.url,
            inLanguage: "ja",
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
        <BetaPartner />
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
