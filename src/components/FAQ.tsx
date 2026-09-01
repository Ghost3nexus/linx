"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/faqs";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#F0F0F0] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 sm:py-7 min-h-[44px] text-left gap-4 touch-manipulation"
      >
        <span className="text-[#1A1A1A] font-bold text-[16px] sm:text-[18px]" style={{ lineHeight: 1.5 }}>
          {q}
        </span>
        <ChevronDown
          size={22}
          className={`text-[#AAAAAA] shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-[#06C755]" : ""}`}
          style={{ transition: "transform 0.3s cubic-bezier(.25,1,.5,1), color 0.3s" }}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[300px] pb-7" : "max-h-0"}`}>
        <p className="text-[#666666] text-[15px] sm:text-[16px]" style={{ lineHeight: 1.8 }}>{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-[50px] sm:py-[80px] md:py-[100px] px-6 bg-white">
      <div className="max-w-[760px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-4"
        >
          よくある質問
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[28px] sm:text-[36px] md:text-[48px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.3 }}
        >
          気になることはありますか？
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 bg-white rounded-2xl border border-[#E8E8E8] px-7 sm:px-10 shadow-sm"
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
