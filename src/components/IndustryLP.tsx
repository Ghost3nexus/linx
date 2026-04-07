"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import PhonePopup from "./PhonePopup";

export interface IndustryData {
  slug: string;
  name: string;
  heroImage: string;
  heroTitle: string;
  heroSub: string;
  pains: { title: string; description: string }[];
  features: string[];
  stats: { value: string; label: string }[];
  testimonial?: { quote: string; name: string; role: string };
}

export default function IndustryLP({ data }: { data: IndustryData }) {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src={data.heroImage} alt={data.name} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>
          <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-20 w-full">
            <div className="max-w-[600px]">
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-[#06C755] font-bold text-[14px] tracking-wider mb-4"
              >
                LINX for {data.name}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-white text-[32px] sm:text-[48px] font-extrabold leading-[1.2]"
              >
                {data.heroTitle}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-white/80 text-[16px] sm:text-[18px] mt-5 leading-[1.8]"
              >
                {data.heroSub}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex gap-4 mt-8"
              >
                <a href="/documents" className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-8 py-4 rounded-full text-[15px] transition-all hover:shadow-lg">
                  資料請求 <ArrowRight size={16} />
                </a>
                <a href="#features" className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-full text-[15px] transition-all hover:bg-white/10">
                  機能を見る
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex gap-8 mt-12"
              >
                {data.stats.map(s => (
                  <div key={s.label}>
                    <p className="text-[#06C755] text-[28px] font-extrabold">{s.value}</p>
                    <p className="text-white/60 text-[12px] mt-1">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="py-[80px] px-6 bg-[#FAFAFA]">
          <div className="max-w-[900px] mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-[28px] sm:text-[40px] font-extrabold text-center text-[#1A1A1A] leading-tight"
            >
              {data.name}運営の課題
            </motion.h2>
            <div className="mt-10 grid sm:grid-cols-3 gap-5">
              {data.pains.map((pain, i) => (
                <motion.div
                  key={pain.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl p-7 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E53935]/10 flex items-center justify-center mb-4">
                    <span className="text-[#E53935] font-extrabold text-[18px]">{i + 1}</span>
                  </div>
                  <h3 className="text-[17px] font-extrabold text-[#1A1A1A]">{pain.title}</h3>
                  <p className="text-[14px] text-[#666] mt-2 leading-relaxed">{pain.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-[80px] px-6 bg-white">
          <div className="max-w-[800px] mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-[28px] sm:text-[40px] font-extrabold text-center text-[#1A1A1A] leading-tight"
            >
              LINXで解決できること
            </motion.h2>
            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {data.features.map((feat, i) => (
                <motion.div
                  key={feat}
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-start gap-3 bg-[#F9FAFB] rounded-xl p-4"
                >
                  <div className="w-6 h-6 rounded-full bg-[#06C755] flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} className="text-white" />
                  </div>
                  <p className="text-[14px] text-[#1A1A1A] font-medium">{feat}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-[80px] px-6 bg-[#1A1A1A]">
          <div className="max-w-[700px] mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-white text-[28px] sm:text-[40px] font-extrabold leading-tight"
            >
              まずは無料でお試しください
            </motion.h2>
            <p className="text-white/60 text-[16px] mt-4">初月無料。初期費用0円。最短1日で導入完了。</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a href="/login" className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-8 py-4 rounded-full text-[16px] transition-all hover:shadow-[0_8px_30px_rgba(6,199,85,0.4)]">
                初月無料で始める <ArrowRight size={18} />
              </a>
              <a href="/documents" className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-full text-[16px] transition-all hover:bg-white/10">
                資料請求
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <PhonePopup />
    </>
  );
}
