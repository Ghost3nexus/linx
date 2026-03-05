"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "機能", href: "#solution" },
  { label: "料金", href: "#pricing" },
  { label: "事例", href: "#usecases" },
  { label: "FAQ", href: "#faq" },
  { label: "お問い合わせ", href: "https://calendar.app.google/AJXwDSRvDQEWTxjb7" },
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
          ? "bg-[#050508]/95 backdrop-blur-xl border-b border-[#1A1A2E]"
          : "bg-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-[64px] flex items-center justify-between">
        <a href="#" className="text-[20px] font-bold tracking-tight text-white">
          LIN<span className="text-[#06C755]">X</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-[#9CA3AF] text-[14px] hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/login"
            className="bg-[#06C755] hover:bg-[#08E065] text-white text-[14px] font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 active:scale-95"
          >
            無料で始める
          </a>
        </nav>

        <button
          className="md:hidden text-white p-2 -mr-2 touch-manipulation"
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
              className="fixed inset-0 top-[64px] bg-black/60 md:hidden z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden bg-[#0A0A0F] border-b border-[#1A1A2E] px-6 pb-8 relative z-50"
            >
              <div className="flex flex-col gap-2 pt-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={() => setMobileOpen(false)}
                    className="text-[#9CA3AF] text-[16px] hover:text-white transition-colors py-3 touch-manipulation"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 bg-[#06C755] text-white text-[16px] font-semibold py-4 rounded-xl text-center touch-manipulation"
                >
                  無料で始める
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
