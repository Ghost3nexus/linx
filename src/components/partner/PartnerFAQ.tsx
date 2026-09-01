"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { partnerFaqs } from "@/lib/partnerFaqs";

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#EAEAEA]">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-5 py-5 text-left group"
      >
        <span className="text-[15px] sm:text-[16px] font-bold text-[#1A1A1A] leading-relaxed group-hover:text-[#06C755] transition-colors">
          {q}
        </span>
        <ChevronDown
          size={20}
          className={`text-[#999999] shrink-0 mt-0.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="overflow-hidden text-[14px] sm:text-[15px] text-[#555555] leading-[1.9] pb-6 pr-8"
        >
          {a}
        </motion.p>
      )}
    </div>
  );
}

export default function PartnerFAQ() {
  return (
    <section id="faq" className="py-[60px] sm:py-[90px] px-6 bg-[#FAFAFA]">
      <div className="max-w-[800px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[26px] sm:text-[36px] font-bold text-center text-[#1A1A1A] leading-[1.35]"
        >
          よくあるご質問
        </motion.h2>
        <div className="mt-10 bg-white border border-[#EAEAEA] rounded-2xl px-6 sm:px-8">
          {partnerFaqs.map((f) => (
            <Item key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
