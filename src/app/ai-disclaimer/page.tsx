import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI生成物に関する免責事項 | LINX",
  description: "LINXのAI生成物に関する免責事項",
};

export default function AIDisclaimer() {
  return (
    <main className="min-h-screen bg-[#050508] text-[#FAFAFA]">
      <div className="max-w-[720px] mx-auto px-6 py-20">
        <Link
          href="/"
          className="inline-block mb-8 text-[14px] text-[#6B7280] hover:text-white transition-colors"
        >
          &larr; LINXトップに戻る
        </Link>

        <h1 className="text-[28px] font-bold mb-2">AI生成物に関する免責事項</h1>
        <p className="text-[13px] text-[#6B7280] mb-10">制定日: 2026年3月6日</p>

        <div className="space-y-8 text-[15px] leading-relaxed text-[#D1D5DB]">
          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">第1条（適用範囲）</h2>
            <p className="mb-3">本免責事項は、合同会社トゥモロープルーフが提供する以下のサービスにおけるAI生成物（テキスト、画像、コード、分析結果等）に適用されます。</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Lumina Studio（AI×クリエイティブ制作）</li>
              <li>AI絵本メーカー（AI絵本生成）</li>
              <li>LINX（LINE AI自動化）</li>
              <li>ささげ生成AI（商品画像・説明文AI）</li>
              <li>AIエージェント導入支援</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">第2条（AI生成物の性質）</h2>
            <p className="mb-3">AI生成物は確率的手法に基づく出力であり、以下の特性があります。</p>
            <ul className="list-disc list-inside space-y-1">
              <li>事実と異なる情報（ハルシネーション）が含まれる可能性</li>
              <li>不正確・不完全な内容が含まれる可能性</li>
              <li>同一入力でも異なる出力が得られる場合がある</li>
              <li>最新情報が反映されていない場合がある</li>
            </ul>
            <p className="mt-3">AI生成物は判断支援ツールであり、専門家の助言に代わるものではありません。最終判断は利用者の責任で行ってください。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">第3条（品質保証の範囲と限界）</h2>
            <p>当社はAI生成物の正確性、完全性、最新性、特定目的への適合性を保証しません。品質は利用者の入力情報に依存し、出力の再現性も保証しません。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">第4条（著作権・知的財産権）</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>利用者の入力データの権利は利用者に帰属します</li>
              <li>AIが自律生成した部分は、著作権法上保護されない可能性があります</li>
              <li>利用者が創作的に関与した場合、その程度に応じて保護される可能性があります</li>
              <li>当社はAI生成物の知的財産権を主張しません</li>
              <li>第三者の知的財産権の非侵害は保証しません。利用者の責任で確認してください</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">第5条（第三者の権利侵害）</h2>
            <p>AI生成物が既存の著作物等と類似する可能性があります。商業利用の際は第三者の権利を侵害していないか確認してください。AI生成物の使用に起因する紛争は、利用者の責任において解決するものとします。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">第6条（禁止事項）</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>法令・公序良俗に違反するコンテンツの生成</li>
              <li>誹謗中傷・差別を助長するコンテンツの生成</li>
              <li>詐欺・虚偽表示目的での使用</li>
              <li>マルウェア・スパム等の悪意あるコンテンツの生成</li>
              <li>サービスの技術的制限の回避</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">第7条（損害賠償の制限）</h2>
            <p className="mb-3">当社の故意・重過失を除き、賠償額は損害原因月の利用料金を上限とします。以下の損害については責任を負いません。</p>
            <ul className="list-disc list-inside space-y-1">
              <li>間接損害、付随的損害、特別損害</li>
              <li>逸失利益、逸失機会</li>
              <li>AI生成物に依拠した意思決定に起因する損害</li>
              <li>不可抗力に起因する損害</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">第8条（データの取り扱い）</h2>
            <p>
              入力データはAI処理のためAnthropic（Claude API）およびGoogle（Gemini API）に送信されます。詳細は
              <Link href="/privacy" className="text-[#06C755] hover:underline">プライバシーポリシー</Link>
              をご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">第9条（サービスの変更・中断）</h2>
            <p>AIモデルのアップデートや保守により、事前通知なくサービスを変更・中断する場合があります。これに起因する損害について、当社の故意・重過失を除き責任を負いません。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">第10条（準拠法・管轄裁判所）</h2>
            <p>準拠法は日本法。東京地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
          </section>

          <p className="text-[13px] text-[#6B7280] pt-6 border-t border-[#1A1A2E]">
            2026年3月6日 施行 — 合同会社トゥモロープルーフ 代表社員 KOZUKI TAKAHIRO
          </p>
        </div>
      </div>
    </main>
  );
}
