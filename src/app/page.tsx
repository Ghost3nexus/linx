import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Pain from "@/components/Pain";
import BeforeAfter from "@/components/BeforeAfter";
import Solution from "@/components/Solution";
import ProductShowcase from "@/components/ProductShowcase";
import HowItWorks from "@/components/HowItWorks";
import Demo from "@/components/Demo";
import Journey from "@/components/Journey";
import Stats from "@/components/Stats";
import UseCases from "@/components/UseCases";
import SocialProof from "@/components/SocialProof";
import Comparison from "@/components/Comparison";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import SecurityBadges from "@/components/SecurityBadges";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import PhonePopup from "@/components/PhonePopup";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Pain />
        <BeforeAfter />
        <Solution />
        <ProductShowcase />
        <HowItWorks />
        <Demo />
        <Journey />
        <Stats />
        <UseCases />
        <SocialProof />
        <Comparison />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <SecurityBadges />
      </main>
      <Footer />
      <FloatingCTA />
      <PhonePopup />
    </>
  );
}
