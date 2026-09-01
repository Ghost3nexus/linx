"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AI_UNIT_WHOLESALE,
  DEFAULT_RESPONSES,
  FLAT_MONTHLY,
  SUGGESTED_RETAIL,
  WHOLESALE_MONTHLY,
  simulate,
  yen,
  type PlanType,
} from "@/lib/wholesale";

function Slider({
  label, value, min, max, step, onChange, format,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (n: number) => void; format: (n: number) => string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <label className="text-[13px] text-[#AAAAAA]">{label}</label>
        <span className="text-white text-[20px] font-bold tabular-nums">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-[#3A3A3A] accent-[#06C755]"
      />
    </div>
  );
}

export default function RevenueSimulator() {
  const [plan, setPlan] = useState<PlanType>("wholesale");
  const [clients, setClients] = useState(20);
  const [responses, setResponses] = useState(DEFAULT_RESPONSES);
  const [retail, setRetail] = useState(SUGGESTED_RETAIL);

  const r = useMemo(
    () => simulate({ plan, clients, responses, retail }),
    [plan, clients, responses, retail]
  );

  /** 卸値型で1店舗増やしたときの粗利の増分 */
  const perClientProfit = retail - WHOLESALE_MONTHLY - responses * AI_UNIT_WHOLESALE;

  return (
    <section id="simulator" className="py-[60px] sm:py-[100px] px-6 bg-[#1A1A1A]">
      <div className="max-w-[1050px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-[13px] font-bold tracking-[0.12em] uppercase text-[#06C755] text-center"
        >
          Simulator
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-4 text-[26px] sm:text-[38px] font-bold text-center text-white leading-[1.35]"
        >
          いくら儲かるのか、動かして確かめてください。
        </motion.h2>
        <p className="mt-4 text-center text-[#999999] text-[14px] sm:text-[15px] leading-relaxed">
          卸値は当社への支払い、売上は御社がエンドユーザーから受け取る額です。
        </p>

        <div className="mt-10 grid lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-8">
          {/* 入力 */}
          <div className="bg-[#242424] rounded-2xl p-6 sm:p-8 space-y-8">
            <div>
              <p className="text-[13px] text-[#AAAAAA] mb-3">仕入れの形</p>
              <div className="grid grid-cols-2 gap-2 bg-[#1A1A1A] p-1.5 rounded-xl">
                {([
                  ["wholesale", "卸値型"],
                  ["flat", "固定枠型"],
                ] as const).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setPlan(key)}
                    className={`py-2.5 rounded-lg text-[14px] font-bold transition-colors ${
                      plan === key ? "bg-[#06C755] text-white" : "text-[#999999] hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[12px] text-[#777777] leading-relaxed">
                {plan === "wholesale"
                  ? `1顧客あたり月額 ${yen(WHOLESALE_MONTHLY)} を仕入れる形。少数から始められます。`
                  : `月額 ${yen(FLAT_MONTHLY)} 固定で顧客数は無制限。増やすほど1件あたりの原価が下がります。`}
              </p>
            </div>

            <Slider
              label="導入する店舗数"
              value={clients} min={1} max={100} step={1}
              onChange={setClients}
              format={(n) => `${n} 店舗`}
            />
            <Slider
              label="1店舗あたりの月間AI応答数"
              value={responses} min={100} max={3000} step={100}
              onChange={setResponses}
              format={(n) => `${n.toLocaleString("ja-JP")} 回`}
            />
            <Slider
              label="エンドユーザーへの月額（御社が決める）"
              value={retail} min={5000} max={60000} step={1000}
              onChange={setRetail}
              format={yen}
            />
          </div>

          {/* 出力 */}
          <div className="bg-[#242424] rounded-2xl p-6 sm:p-8 flex flex-col">
            <div className="space-y-5">
              <div className="flex items-baseline justify-between pb-5 border-b border-[#3A3A3A]">
                <span className="text-[14px] text-[#AAAAAA]">御社の売上</span>
                <span className="text-white text-[24px] sm:text-[28px] font-bold tabular-nums">
                  {yen(r.revenue)}
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-[14px] text-[#AAAAAA]">仕入れ（当社へのお支払い）</span>
                <span className="text-[#DDDDDD] text-[20px] font-bold tabular-nums">
                  − {yen(r.cost)}
                </span>
              </div>
              <div className="pl-4 space-y-2 text-[13px] text-[#888888]">
                <div className="flex justify-between">
                  <span>{plan === "flat" ? "固定枠" : `月額 ${yen(WHOLESALE_MONTHLY)} × ${clients}店舗`}</span>
                  <span className="tabular-nums">{yen(r.costMonthly)}</span>
                </div>
                <div className="flex justify-between">
                  <span>AI応答 ¥{AI_UNIT_WHOLESALE} × {(clients * responses).toLocaleString("ja-JP")}回</span>
                  <span className="tabular-nums">{yen(r.costAi)}</span>
                </div>
              </div>

              <div className="pt-5 border-t border-[#3A3A3A]">
                <div className="flex items-baseline justify-between">
                  <span className="text-[15px] font-bold text-white">御社の粗利（月）</span>
                  <span
                    className={`text-[32px] sm:text-[40px] font-extrabold tabular-nums leading-none ${
                      r.profit >= 0 ? "text-[#06C755]" : "text-[#FF6B6B]"
                    }`}
                  >
                    {yen(r.profit)}
                  </span>
                </div>
                <div className="mt-2 text-right text-[13px] text-[#999999] tabular-nums">
                  粗利率 {(r.profitRate * 100).toFixed(1)}% ／ 年間 {yen(r.profit * 12)}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-7">
              <div className="bg-[#1A1A1A] rounded-xl p-4 text-[13px] leading-relaxed">
                {plan === "flat" ? (
                  r.breakEvenClients ? (
                    <p className="text-[#DDDDDD]">
                      この条件なら
                      <span className="text-[#06C755] font-bold text-[16px] mx-1 tabular-nums">
                        {r.breakEvenClients}店舗
                      </span>
                      で固定枠の費用を回収できます。ここから先は、増やすほど1店舗あたりの原価が下がります。
                    </p>
                  ) : (
                    <p className="text-[#FF6B6B]">
                      1店舗あたりのAI原価が販売価格を超えています。販売価格を上げるか、応答数の想定を見直してください。
                    </p>
                  )
                ) : perClientProfit > 0 ? (
                  <p className="text-[#DDDDDD]">
                    1店舗増えるごとに、御社の粗利が
                    <span className="text-[#06C755] font-bold text-[16px] mx-1 tabular-nums">
                      {yen(perClientProfit)}
                    </span>
                    増えます（年間 {yen(perClientProfit * 12)}）。
                  </p>
                ) : (
                  <p className="text-[#FF6B6B]">
                    この条件では1店舗あたりが赤字です。販売価格を上げるか、応答数の想定を見直してください。
                  </p>
                )}
              </div>
              <p className="mt-4 text-[12px] text-[#777777] leading-relaxed">
                エンドユーザーへは従量のまま請求しても、月額に含めたパッケージに変換しても構いません。
                仕入れは従量、販売は定額という変換自体が、御社の利益になります。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
