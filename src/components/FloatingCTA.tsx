"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollRatio = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(scrollRatio > 0.25 && scrollRatio < 0.95);
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
            className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-xl border-t border-[#E8E8E8] md:hidden z-40 shadow-lg"
            style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.75rem)" }}
          >
            <a
              href="/login"
              className="block bg-[#06C755] hover:bg-[#05B04A] text-white text-center py-4 rounded-full font-bold text-[16px] cta-glow transition-all active:scale-95 touch-manipulation"
            >
              無料ではじめる
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
            <div className="bg-white/95 backdrop-blur-xl border-t border-[#E8E8E8] shadow-lg">
              <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-[#1A1A1A] font-bold text-[15px]">
                    LIN<span className="text-[#06C755]">X</span>
                  </span>
                  <span className="text-[#999999] text-[14px]">
                    公式LINEにAIスタッフを追加。月額0円から。
                  </span>
                </div>
                <a
                  href="/login"
                  className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-6 py-2.5 rounded-full text-[14px] transition-all duration-200 active:scale-95 cta-glow"
                >
                  無料ではじめる
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
