import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | LINX",
  description: "LINXの特定商取引法に基づく表記",
};

export default function Tokushoho() {
  return (
    <main className="min-h-screen bg-[#050508] text-[#FAFAFA]">
      <div className="max-w-[720px] mx-auto px-6 py-20">
        <Link
          href="/"
          className="inline-block mb-8 text-[14px] text-[#6B7280] hover:text-white transition-colors"
        >
          &larr; LINXトップに戻る
        </Link>

        <h1 className="text-[28px] font-bold mb-2">特定商取引法に基づく表記</h1>
        <p className="text-[13px] text-[#6B7280] mb-10">最終更新日: 2026年3月6日</p>

        <div className="space-y-8 text-[15px] leading-relaxed text-[#D1D5DB]">
          <table className="w-full text-[14px]">
            <tbody className="divide-y divide-[#1A1A2E]">
              {[
                ["販売事業者", "合同会社トゥモロープルーフ（TomorrowProof LLC）"],
                ["代表者", "KOZUKI TAKAHIRO"],
                ["設立", "2025年8月"],
                ["所在地", "東京都港区青山"],
                ["連絡先メールアドレス", "sackozuki@gmail.com"],
                ["お問い合わせ受付時間", "平日 10:00 - 18:00（土日祝日・年末年始を除く）"],
              ].map(([label, value]) => (
                <tr key={label}>
                  <td className="py-3 pr-4 text-[#6B7280] font-medium whitespace-nowrap align-top w-[160px]">{label}</td>
                  <td className="py-3">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-4">販売サービス・役務の内容</h2>
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-[#1A1A2E] text-[#6B7280]">
                  <th className="py-2 text-left font-medium">サービス名</th>
                  <th className="py-2 text-left font-medium">概要</th>
                  <th className="py-2 text-left font-medium">課金形態</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A2E]">
                {[
                  ["Lumina Studio", "AI×クリエイティブ制作サービス", "月額 / 案件単位"],
                  ["AI絵本メーカー", "園児向けAI絵本生成アプリ", "ワークショップ / 月額"],
                  ["LINX", "LINE AI自動化コンシェルジュ", "月額SaaS"],
                  ["ささげ生成AI", "商品画像・説明文AI生成", "月額SaaS"],
                  ["AIコンサルティング", "AI実装支援", "案件単位"],
                ].map(([name, desc, billing]) => (
                  <tr key={name}>
                    <td className="py-3 pr-3 text-white font-medium">{name}</td>
                    <td className="py-3 pr-3">{desc}</td>
                    <td className="py-3">{billing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">販売価格</h2>
            <p>各サービスの料金は、サービスサイトまたは個別見積書に記載の金額に準じます。表示価格はすべて税込価格です。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">代金の支払方法</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>クレジットカード（Stripe経由: VISA / Mastercard / AMEX / JCB）</li>
              <li>銀行振込（振込手数料はお客様負担）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">代金の支払時期</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>月額サブスクリプション: 利用開始時に初月分決済、以降毎月自動決済</li>
              <li>案件単位: 請求書発行日より30日以内</li>
              <li>ワークショップ: 申込時に全額決済</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">役務の提供時期</h2>
            <p>クラウドサービスにつき、アカウント発行後即時ご利用いただけます。コンサルティングについては契約書に定める納期に準じます。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">返品・キャンセルについて</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="text-white font-medium">月額サブスクリプション:</span> 月単位での解約が可能。次回請求日前日までに申請。日割り返金なし。</li>
              <li><span className="text-white font-medium">案件単位:</span> 着手前は全額返金。着手後は進捗に応じた実費を差し引いて返金。</li>
              <li><span className="text-white font-medium">ワークショップ:</span> 開催3日前までのキャンセルは全額返金。それ以降は返金不可。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">動作環境</h2>
            <p>インターネット接続環境、最新版のChrome / Safari / Edge / Firefox。LINXについてはLINE公式アカウントの開設が必要です。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">個人情報の取り扱い</h2>
            <p>
              お客様の個人情報は、当社
              <Link href="/privacy" className="text-[#06C755] hover:underline">プライバシーポリシー</Link>
              に基づき適切に管理いたします。
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">準拠法・管轄裁判所</h2>
            <p>準拠法は日本法。東京地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
          </section>
        </div>
      </div>
    </main>
  );
}
