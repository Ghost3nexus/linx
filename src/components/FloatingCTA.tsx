"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
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
      )}
    </AnimatePresence>
  );
}
