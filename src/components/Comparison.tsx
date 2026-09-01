"use client";

import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { SUGGESTED_RETAIL } from "@/lib/wholesale";

const features = [
  // 料金
  // 表面の月額ではなく、実際にかかる総額で並べる
  { label: "基本の月額", linx: `${SUGGESTED_RETAIL.toLocaleString("ja-JP")}円`, hacomono: "35,000円/店", stores: "8,790円〜" },
  { label: "初期費用", linx: "0円", hacomono: "150,000円", stores: "0円" },
  { label: "決済連携（カード）", linx: "込み", hacomono: "+5,000円/店", stores: "込み" },
  { label: "口座振替", linx: "込み", hacomono: "+5,000円/店", stores: "非対応" },
  { label: "入退館・スマートロック", linx: "込み", hacomono: "オプション", stores: false },
  { label: "1店舗の初年度 総額", linx: `${(SUGGESTED_RETAIL * 12).toLocaleString("ja-JP")}円`, hacomono: "690,000円", stores: "要確認" },
  { label: "初月無料トライアル", linx: true, hacomono: false, stores: "7日間のみ" },
  { label: "初月無料トライアル", linx: true, hacomono: false, stores: "7日間のみ" },
  // AI
  { label: "AI自動応対（24時間LINE）", linx: true, hacomono: false, stores: false },
  { label: "AI予約受付（空き確認→確定）", linx: true, hacomono: false, stores: false },
  { label: "事前アンケート自動送信", linx: true, hacomono: false, stores: false },
  { label: "体験→入会フォロー自動化", linx: true, hacomono: false, stores: false },
  { label: "No-show自動リスケ案内", linx: true, hacomono: false, stores: false },
  // 予約・会員
  { label: "予約管理（カレンダー）", linx: true, hacomono: true, stores: true },
  { label: "会員管理・ステータス", linx: true, hacomono: true, stores: true },
  { label: "出席チェックイン", linx: true, hacomono: true, stores: false },
  { label: "スタッフ・シフト管理", linx: true, hacomono: true, stores: "制限あり" },
  // LINE
  { label: "LINE公式アカウント連携", linx: true, hacomono: "限定的", stores: false },
  { label: "LINE一斉配信", linx: true, hacomono: false, stores: false },
  // 決済
  { label: "Stripe / Square 決済", linx: true, hacomono: true, stores: true },
  { label: "入会金+月額の一括処理", linx: true, hacomono: true, stores: false },
  // 入退館
  { label: "入退館管理", linx: "SwitchBot連携", hacomono: "専用端末", stores: false },
  { label: "入退館ハードウェア費用", linx: "¥11,980〜/店", hacomono: "数十万円/店", stores: "—" },
  { label: "顔認証・指紋認証", linx: true, hacomono: true, stores: false },
  // 連携
  { label: "既存システムAPI連携", linx: true, hacomono: false, stores: false },
  { label: "CSV会員一括インポート", linx: true, hacomono: true, stores: true },
  // セキュリティ
  { label: "AES-256暗号化", linx: true, hacomono: true, stores: true },
  { label: "AI脆弱性自動監視", linx: true, hacomono: false, stores: false },
  // 将来
  { label: "AI顧客分析・離脱予測", linx: "開発予定", hacomono: false, stores: false },
  { label: "AIシフト自動生成", linx: "開発予定", hacomono: false, stores: false },
];

const competitors = [
  { key: "linx", label: "LINX", highlight: true },
  { key: "hacomono", label: "hacomono", highlight: false },
  { key: "stores", label: "STORES 予約", highlight: false },
];

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#E8F5E9]">
        <Check size={14} className="text-[#06C755]" />
      </span>
    ) : (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FFF0F0]">
        <X size={14} className="text-[#E53935]" />
      </span>
    );
  }
  return <span className="text-[12px] sm:text-[13px] font-medium">{value}</span>;
}

/**
 * hacomono の内訳（2026年9月時点・公開情報）
 *  初期 150,000円（税別・初回のみ）／基本 35,000円/店・月
 *  カード決済 +5,000／口座振替 +5,000／POS +5,000／独自ドメイン +3,000
 *  会費商売ならカード決済と口座振替は実質必須のため、初年度総額は
 *  150,000 + (35,000+5,000+5,000) × 12 = 690,000円 で算出する（保守的に POS は含めない）。
 *  POS まで入れると 150,000 + 50,000 × 12 = 750,000円。
 */
export default function Comparison() {
  return (
    <section className="py-[60px] sm:py-[80px] px-4 sm:px-6 bg-white">
      <div className="max-w-[900px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-[#06C755] font-bold text-[13px] tracking-wider text-center mb-3"
        >
          COMPARISON
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[22px] sm:text-[32px] md:text-[38px] font-extrabold text-center text-[#1A1A1A] leading-tight"
        >
          他サービスとの比較
        </motion.h2>

        {/* Table - both desktop and mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 sm:mt-10"
        >
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="min-w-[600px] bg-white rounded-xl border border-[#E8E8E8] shadow-sm overflow-hidden">
              <table className="w-full border-collapse text-[12px] sm:text-[13px]">
                <thead>
                  <tr className="border-b border-[#E8E8E8]">
                    <th className="text-left text-[11px] sm:text-[12px] text-[#999] font-medium p-3 sm:p-4 w-[160px] sm:w-[200px] bg-[#F9FAFB]" />
                    {competitors.map((c) => (
                      <th
                        key={c.key}
                        className={`text-center text-[12px] sm:text-[13px] font-bold p-3 sm:p-4 ${
                          c.highlight ? "text-[#06C755] bg-[#F5FBF7]" : "text-[#666]"
                        }`}
                      >
                        {c.highlight && (
                          <span className="block text-[10px] bg-[#06C755] text-white px-2 py-0.5 rounded-full mb-1 mx-auto w-fit">
                            LINX
                          </span>
                        )}
                        {c.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature) => (
                    <tr key={feature.label} className="border-b border-[#F5F5F5] last:border-b-0">
                      <td className="text-[12px] sm:text-[13px] text-[#333] p-2.5 sm:p-3 font-medium bg-[#F9FAFB]">{feature.label}</td>
                      {competitors.map((c) => (
                        <td
                          key={c.key}
                          className={`text-center p-2.5 sm:p-3 ${c.highlight ? "bg-[#F5FBF7]" : ""}`}
                        >
                          <CellValue value={feature[c.key as keyof typeof feature] as boolean | string} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <p className="mt-8 text-center text-[12px] leading-relaxed text-[#999999]">
          ※ 2026年9月時点の各社公開情報より。hacomono の初年度総額は、初期費用150,000円に
          基本35,000円/店とカード決済5,000円・口座振替5,000円を加えた12ヶ月分で算出しています。
          <br className="hidden sm:block" />
          会費商売では決済系のオプションが実質必須になるためです。POS機能（+5,000円/店）まで含めると750,000円になります。
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <a
            href="/login"
            className="btn-primary text-[16px] px-10 py-[18px]"
          >
            無料ではじめる
            <ArrowRight size={16} className="btn-arrow" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
