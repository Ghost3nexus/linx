import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Pain from "@/components/Pain";
import Solution from "@/components/Solution";
import HowItWorks from "@/components/HowItWorks";
import Demo from "@/components/Demo";
import Metrics from "@/components/Metrics";
import MetricsCTA from "@/components/MetricsCTA";
import UseCases from "@/components/UseCases";
import SocialProof from "@/components/SocialProof";
import Comparison from "@/components/Comparison";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import SecurityBadges from "@/components/SecurityBadges";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Pain />
        <Solution />
        <HowItWorks />
        <Demo />
        <Metrics />
        <MetricsCTA />
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
    </>
  );
}
