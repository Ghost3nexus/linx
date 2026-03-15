"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "機能", href: "#solution" },
  { label: "料金", href: "#pricing" },
  { label: "導入事例", href: "#usecases" },
  { label: "よくある質問", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100"
          : "bg-white"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-[64px] flex items-center justify-between">
        <a href="#" className="text-[22px] font-bold tracking-tight text-[#1A1A1A]">
          LIN<span className="text-[#06C755]">X</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#555555] text-[15px] font-medium hover:text-[#06C755] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/login"
            className="bg-[#06C755] hover:bg-[#05B04A] text-white text-[15px] font-bold px-7 py-3 rounded-full transition-all duration-200 active:scale-95 cta-glow"
          >
            無料ではじめる
          </a>
        </nav>

        <button
          className="md:hidden text-[#1A1A1A] p-2 -mr-2 touch-manipulation"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="メニュー"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-[64px] bg-black/30 md:hidden z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden bg-white border-b border-gray-100 px-6 pb-8 relative z-50 shadow-lg"
            >
              <div className="flex flex-col gap-2 pt-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-[#333333] text-[17px] font-medium hover:text-[#06C755] transition-colors py-3 touch-manipulation"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 bg-[#06C755] text-white text-[17px] font-bold py-4 rounded-full text-center touch-manipulation cta-glow"
                >
                  無料ではじめる
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
