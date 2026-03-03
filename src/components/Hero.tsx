"use client";

import { motion } from "framer-motion";
import { Zap, Wallet, Smartphone } from "lucide-react";
import ChatMockup from "./ChatMockup";

const badges = [
  { icon: Zap, label: "導入5分" },
  { icon: Wallet, label: "月額0円から" },
  { icon: Smartphone, label: "LINEを変えなくていい" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
          >
            LINEグループに、
            <br />
            <span className="text-primary">AIスタッフ</span>を。
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-lg md:text-xl text-sub leading-relaxed max-w-2xl mx-auto"
          >
            LINXが、あなたの代わりにLINEグループで顧客対応。
            <br className="hidden md:block" />
            導入5分。月額0円から。いつものLINEに追加するだけ。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#cta"
              className="bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 hover:scale-[1.02]"
            >
              無料で始める
            </a>
            <a
              href="#demo"
              className="border border-border hover:border-primary text-text hover:text-primary font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200"
            >
              デモを見る
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            {badges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5"
              >
                <badge.icon size={18} className="text-primary" />
                <span className="text-sm text-text font-medium">
                  {badge.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 flex justify-center"
        >
          <ChatMockup />
        </motion.div>
      </div>
    </section>
  );
}
