"use client";

import { motion } from "framer-motion";
import { Check, Wrench } from "lucide-react";

const done = [
  "エンドユーザー側の完全ホワイトラベル（店舗ごとの公式LINE・AI表示名の変更）",
  "テナント単位のデータ分離（会員・予約・会話ログ）",
  "多店舗の権限管理（店舗ごとのロール）",
  "既存システムとのAPI連携・CSVによる会員データの一括取り込み",
];

const building = [
  {
    title: "利用規約・プライバシーポリシーの出し分け",
    note: "OEMでは御社が契約主体になるため必須。最優先で開発しており、初回のご契約前に提供します",
  },
  {
    title: "管理画面のブランディング（ロゴ・配色・favicon）",
    note: "現在は当社の画面のままです。エンドユーザーが触れるLINE側には影響しません",
  },
  {
    title: "管理画面の独自ドメイン対応",
    note: "テナントごとのURL、および御社ドメインでの提供",
  },
  {
    title: "パートナー管理画面",
    note: "御社が導入先店舗を一覧・管理する画面。現在は個別のアカウント単位での管理になります",
  },
  {
    title: "卸値請求の自動化",
    note: "当面は月次のご請求で対応します",
  },
];

export default function Roadmap() {
  return (
    <section className="py-[60px] sm:py-[90px] px-6 bg-[#FAFAFA]">
      <div className="max-w-[1000px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[26px] sm:text-[36px] font-bold text-center text-[#1A1A1A] leading-[1.35]"
        >
          できないことも、先に書いておきます。
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 text-center text-[#666666] text-[15px] leading-[1.85] max-w-[640px] mx-auto"
        >
          契約してから「実はできない」と分かるのが、いちばん困ると思います。
          <br className="hidden sm:block" />
          現在地をそのまま出します。
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="bg-white border border-[#EAEAEA] rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#06C755] flex items-center justify-center shrink-0">
                <Check size={15} className="text-white" strokeWidth={3} />
              </span>
              <h3 className="text-[17px] font-bold text-[#1A1A1A]">いま動いていること</h3>
            </div>
            <ul className="mt-6 space-y-4">
              {done.map((d) => (
                <li key={d} className="text-[14px] text-[#333333] leading-[1.8] pl-1">
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-[#EAEAEA] rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#B26A00] flex items-center justify-center shrink-0">
                <Wrench size={14} className="text-white" strokeWidth={2.5} />
              </span>
              <h3 className="text-[17px] font-bold text-[#1A1A1A]">これから作るもの</h3>
            </div>
            <ul className="mt-6 space-y-5">
              {building.map((b) => (
                <li key={b.title}>
                  <p className="text-[14px] font-bold text-[#1A1A1A] leading-snug">{b.title}</p>
                  <p className="mt-1.5 text-[13px] text-[#777777] leading-[1.75]">{b.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
