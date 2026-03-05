"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollRatio = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      // Show after 30% scroll, hide near footer (last 5%)
      setVisible(scrollRatio > 0.3 && scrollRatio < 0.95);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Mobile: full-width bottom bar */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-[#050508]/95 backdrop-blur-xl border-t border-[#1A1A2E] md:hidden z-40"
            style={{ paddingBottom: "max(env(safe-area-inset-bottom), 1rem)" }}
          >
            <a
              href="/login"
              className="block bg-[#06C755] hover:bg-[#08E065] text-white text-center py-4 rounded-xl font-semibold text-[16px] cta-glow transition-all active:scale-95 touch-manipulation"
            >
              無料で始める
            </a>
          </motion.div>

          {/* Desktop: subtle bottom bar */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 hidden md:block z-40"
          >
            <div className="bg-[#050508]/90 backdrop-blur-xl border-t border-[#1A1A2E]">
              <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-white font-bold text-[15px]">
                    LIN<span className="text-[#06C755]">X</span>
                  </span>
                  <span className="text-[#6B7280] text-[13px]">
                    公式LINEにAIスタッフを追加。月額0円から。
                  </span>
                </div>
                <a
                  href="/login"
                  className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#08E065] text-white font-semibold px-6 py-2.5 rounded-xl text-[13px] transition-all duration-200 active:scale-95 cta-glow"
                >
                  無料で試す
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
