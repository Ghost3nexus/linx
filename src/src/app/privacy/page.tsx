import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | LINX",
  description: "LINXのプライバシーポリシー（個人情報保護方針）",
};

export default function Privacy() {
  return (
    <main className="min-h-screen bg-[#050508] text-[#FAFAFA]">
      <div className="max-w-[720px] mx-auto px-6 py-20">
        <Link
          href="/"
          className="inline-block mb-8 text-[14px] text-[#6B7280] hover:text-white transition-colors"
        >
          &larr; LINXトップに戻る
        </Link>

        <h1 className="text-[28px] font-bold mb-2">プライバシーポリシー</h1>
        <p className="text-[13px] text-[#6B7280] mb-6">制定日: 2026年3月6日</p>

        <p className="text-[15px] leading-relaxed text-[#D1D5DB] mb-10">
          合同会社トゥモロープルーフ（以下「当社」）は、個人情報保護法その他の関連法令を遵守し、以下のとおりプライバシーポリシーを定めます。本ポリシーは、Lumina Studio、AI絵本メーカー、LINX、ささげ生成AI、およびTomorrowProofコーポレートサイトに適用されます。
        </p>

        <div className="space-y-8 text-[15px] leading-relaxed text-[#D1D5DB]">
          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">第1条（事業者情報）</h2>
            <table className="w-full text-[14px]">
              <tbody className="divide-y divide-[#1A1A2E]">
                {[
                  ["事業者名", "合同会社トゥモロープルーフ"],
                  ["代表者", "KOZUKI TAKAHIRO"],
                  ["所在地", "東京都港区"],
                  ["お問い合わせ", "sackozuki@gmail.com"],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td className="py-2 pr-4 text-[#6B7280] font-medium w-[140px]">{label}</td>
                    <td className="py-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">第2条（取得する個人情報の種類）</h2>
            <h3 className="text-[15px] font-medium text-white mb-2">直接取得する情報</h3>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>氏名、メールアドレス、会社名・所属・役職、電話番号、住所</li>
              <li>決済情報（クレジットカード情報はStripe社が管理）</li>
              <li>アップロード画像・素材</li>
              <li>LINE ユーザー情報（LINX連携時）</li>
            </ul>
            <h3 className="text-[15px] font-medium text-white mb-2">自動取得する情報</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>アクセスログ、IPアドレス、ブラウザ・OS情報</li>
              <li>閲覧ページ・利用履歴</li>
              <li>Cookie・トラッキング情報（GA4、Vercel Analytics）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">第3条（利用目的）</h2>
            <ol className="list-decimal list-inside space-y-1">
              <li>サービスの提供・運営（アカウント管理、本人確認）</li>
              <li>料金の請求（計算、請求書発行、決済処理）</li>
              <li>サービスの改善（利用状況分析、新機能開発）</li>
              <li>カスタマーサポート</li>
              <li>マーケティング（オプトアウト可能）</li>
              <li>セキュリティ（不正アクセス検知・防止）</li>
              <li>法的義務の履行</li>
              <li>AI処理（アップロードデータのAI API処理）</li>
            </ol>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">第4条（AI APIへのデータ送信）</h2>
            <p className="mb-3">当社のサービスでは、AI機能提供のため、以下のAPIプロバイダにデータを送信します。</p>
            <ul className="list-disc list-inside space-y-1 mb-3">
              <li>Anthropic（Claude API） — テキストデータ</li>
              <li>Google AI（Gemini API） — 画像・テキストデータ</li>
            </ul>
            <p>送信データはAPIプロバイダのAIモデル学習には使用されません。処理完了後は速やかに削除されます。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">第5条（第三者提供）</h2>
            <p className="mb-3">利用者の同意なく個人情報を第三者に提供しません。ただし以下の業務委託先には必要範囲で提供します。</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Stripe, Inc. — 決済処理</li>
              <li>Google LLC — アクセス解析・AI処理</li>
              <li>Vercel Inc. — ホスティング</li>
              <li>Anthropic PBC — AI処理</li>
              <li>LINE Corp. — LINX連携</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">第6条（Cookie・アナリティクス）</h2>
            <p>当社ウェブサイトでは、GA4およびVercel Analyticsを使用しています。Cookieの受け入れはブラウザ設定で管理できます。Google Analyticsのオプトアウトは、Googleのオプトアウトアドオンをご利用ください。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">第7条（児童の個人情報）</h2>
            <p>AI絵本メーカーにおける児童データは、保護者または施設責任者の同意を得て取得し、絵本生成目的のみに使用します。サービス利用終了後、所定の期間内に削除します。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">第8条（データの保存・管理）</h2>
            <p>すべての通信はTLS/SSLにより暗号化。データベースの個人情報は暗号化して保管。アクセスは業務上必要な最小限に制限しています。データは米国所在のサーバー（Vercel, Railway）に保存されます。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">第9条（開示・訂正・削除）</h2>
            <p>利用者は、自己の個人情報の開示・訂正・削除を請求できます。本人確認の上、原則30日以内に対応します。お問い合わせ窓口（sackozuki@gmail.com）までご連絡ください。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">第10条（安全管理措置）</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>HTTPS（TLS 1.2以上）の使用</li>
              <li>データベースの暗号化</li>
              <li>アクセス制御・認証の実施</li>
              <li>不正アクセス検知・防止システムの導入</li>
              <li>APIキー・認証情報の安全な管理</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">第11条（本ポリシーの変更）</h2>
            <p>法令の改正やサービス内容の変更により、本ポリシーを変更する場合があります。重要な変更がある場合はメール等で通知します。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-white mb-3">第12条（お問い合わせ窓口）</h2>
            <table className="w-full text-[14px]">
              <tbody className="divide-y divide-[#1A1A2E]">
                {[
                  ["事業者名", "合同会社トゥモロープルーフ"],
                  ["個人情報保護管理者", "KOZUKI TAKAHIRO（代表社員）"],
                  ["メールアドレス", "sackozuki@gmail.com"],
                  ["対応時間", "平日 10:00 - 18:00"],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td className="py-2 pr-4 text-[#6B7280] font-medium w-[180px]">{label}</td>
                    <td className="py-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <p className="text-[13px] text-[#6B7280] pt-6 border-t border-[#1A1A2E]">
            2026年3月6日 制定 — 合同会社トゥモロープルーフ 代表社員 KOZUKI TAKAHIRO
          </p>
        </div>
      </div>
    </main>
  );
}
