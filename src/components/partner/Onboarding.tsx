"use client";

import { motion } from "framer-motion";

const steps = [
  {
    n: "1",
    title: "打ち合わせ",
    when: "お申し込みから数日以内",
    body: "実際のLINEと管理画面を動かしながら、御社の商圏で成り立つかを一緒に確認します。",
  },
  {
    n: "2",
    title: "商圏と条件のすり合わせ",
    when: "打ち合わせの場で",
    body: "地域・業種・想定される店舗数から条件を組みます。商圏が空いているかも、その場でお答えします。",
  },
  {
    n: "3",
    title: "契約",
    when: "1週目",
    body: "テリトリーを契約書に明記します。最低契約期間は6ヶ月、以後は1ヶ月単位で自動更新します。",
  },
  {
    n: "4",
    title: "初期設定と操作研修",
    when: "2週目",
    body: "御社側で導入支援ができる状態にします。開発も移行作業も発生しません。",
  },
  {
    n: "5",
    title: "販売開始",
    when: "お申し込みから約2週間",
    body: "最初の1件は当社が同席します。",
  },
];

export default function Onboarding() {
  return (
    <section id="onboarding" className="bg-[#FAFAFA] px-6 py-[60px] sm:py-[95px]">
      <div className="mx-auto max-w-[1000px]">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-center text-[13px] font-bold uppercase tracking-[0.12em] text-[#06C755]"
        >
          Onboarding
        </motion.p>
        <h2 className="mt-4 text-center text-[26px] font-bold leading-[1.35] text-[#1A1A1A] sm:text-[38px]">
          約2週間で、販売できる状態になります。
        </h2>
        <p className="mx-auto mt-5 max-w-[640px] text-center text-[15px] leading-[1.85] text-[#666666]">
          既存のLINE公式アカウントをそのまま使うため、開発も移行作業もありません。
        </p>

        <ol className="mt-12 space-y-3">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ y: 14 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className={`flex flex-col gap-3 rounded-2xl border p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6 ${
                i === steps.length - 1
                  ? "border-[#06C755] bg-[#F0FBF4]"
                  : "border-[#EAEAEA] bg-white"
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[15px] font-bold ${
                  i === steps.length - 1 ? "bg-[#06C755] text-white" : "bg-[#1A1A1A] text-white"
                }`}
              >
                {s.n}
              </span>
              <div className="sm:w-[220px] sm:shrink-0">
                <h3 className="text-[17px] font-bold leading-snug text-[#1A1A1A]">{s.title}</h3>
                <p className="mt-1 text-[12.5px] font-bold text-[#06C755]">{s.when}</p>
              </div>
              <p className="flex-1 text-[14px] leading-[1.85] text-[#555555]">{s.body}</p>
            </motion.li>
          ))}
        </ol>

        <p className="mx-auto mt-7 max-w-[720px] text-center text-[13px] leading-[1.85] text-[#94A3B8]">
          ※ これは御社が販売できるようになるまでの期間です。導入先の店舗が使い始めるまでの時間は、
          店舗の準備状況によって変わります。すでに公式LINEを運用している店舗なら最短1日です。
        </p>
      </div>
    </section>
  );
}
