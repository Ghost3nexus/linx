"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const nav = [
  { label: "手に入るもの", href: "#whatyouget" },
  { label: "収益を試算する", href: "#simulator" },
  { label: "売れる業界", href: "#industries" },
  { label: "テリトリー", href: "#territory" },
  { label: "よくある質問", href: "#faq" },
];

export default function PartnerHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#EEEEEE]">
      <div className="max-w-[1200px] mx-auto px-6 h-[64px] flex items-center justify-between">
        <Link href="/" className="text-[22px] font-bold tracking-tight text-[#1A1A1A]">
          LIN<span className="text-[#06C755]">X</span>
          <span className="ml-2 text-[11px] font-bold text-[#666666] tracking-widest align-middle">
            PARTNERS
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-[14px] text-[#444444] hover:text-[#06C755] transition-colors"
            >
              {n.label}
            </a>
          ))}
          <Link
            href="/product"
            className="text-[14px] text-[#444444] hover:text-[#06C755] transition-colors"
          >
            製品を見る
          </Link>
          <Link
            href="/documents"
            className="inline-flex items-center bg-[#06C755] text-white font-bold px-5 py-2.5 rounded-full text-[14px] hover:bg-[#05B04A] transition-colors"
          >
            パートナー資料
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-[#1A1A1A]"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="lg:hidden border-t border-[#EEEEEE] bg-white overflow-hidden"
        >
          <div className="px-6 py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[15px] text-[#444444] border-b border-[#F5F5F5]"
              >
                {n.label}
              </a>
            ))}
            <Link href="/product" onClick={() => setOpen(false)} className="py-3 text-[15px] text-[#444444] border-b border-[#F5F5F5]">
              製品を見る
            </Link>
            <Link
              href="/documents"
              onClick={() => setOpen(false)}
              className="mt-3 text-center bg-[#06C755] text-white font-bold py-3 rounded-full text-[15px]"
            >
              パートナー資料を請求する
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
