"use client";

import { useState } from "react";
import Link from "next/link";
import { meetingHref, documentsHref } from "@/lib/site";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const nav = [
  { label: "売るもの", href: "#whatyouget" },
  { label: "収益の立ち方", href: "#revenue" },
  { label: "売れる業界", href: "#industries" },
  { label: "テリトリー", href: "#territory" },
  { label: "よくある質問", href: "#faq" },
];

export default function PartnerHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0B0C0E]/92 backdrop-blur border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-6 h-[64px] flex items-center justify-between">
        <Link href="/" className="text-[22px] font-bold tracking-tight text-white">
          LIN<span className="text-[#06C755]">X</span>
          <span className="ml-2 text-[11px] font-bold text-white/45 tracking-widest align-middle">
            PARTNERS
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-[14px] text-white/70 hover:text-white transition-colors"
            >
              {n.label}
            </a>
          ))}
          <Link
            href="/product"
            className="text-[14px] text-white/70 hover:text-white transition-colors"
          >
            製品を見る
          </Link>
          <Link
            href={meetingHref()}
            className="inline-flex items-center bg-[#06C755] text-white font-bold px-5 py-2.5 rounded-full text-[14px] hover:bg-[#05B04A] transition-colors"
          >
            打ち合わせを申し込む
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="lg:hidden border-t border-white/10 bg-[#0B0C0E] overflow-hidden"
        >
          <div className="px-6 py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[15px] text-white/80 border-b border-white/10"
              >
                {n.label}
              </a>
            ))}
            <Link href="/product" onClick={() => setOpen(false)} className="py-3 text-[15px] text-white/80 border-b border-white/10">
              製品を見る
            </Link>
            <Link
              href={meetingHref()}
              onClick={() => setOpen(false)}
              className="mt-3 text-center bg-[#06C755] text-white font-bold py-3 rounded-full text-[15px]"
            >
              打ち合わせを申し込む
            </Link>
            <Link
              href={documentsHref()}
              onClick={() => setOpen(false)}
              className="mt-2 text-center border border-white/25 text-white font-bold py-3 rounded-full text-[15px]"
            >
              資料を受け取る
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
