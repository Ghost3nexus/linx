import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "利用規約 | LINX",
  description: "LINXサービス利用規約",
};

export default function Terms() {
  return (
    <main className="min-h-screen bg-white text-[#1A1A1A]">
      <div className="max-w-[720px] mx-auto px-6 py-20">
        <Link
          href="/"
          className="inline-block mb-8 text-[14px] text-[#999999] hover:text-[#06C755] transition-colors"
        >
          &larr; LINXトップに戻る
        </Link>

        <h1 className="text-[28px] font-bold mb-2">利用規約</h1>
        <p className="text-[13px] text-[#999999] mb-10">制定日: 2026年3月16日</p>

        <div className="space-y-8 text-[15px] leading-relaxed text-[#333333]">
          <section>
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">第1条（適用範囲）</h2>
            <p>本利用規約（以下「本規約」）は、株式会社TomorrowProof（以下「当社」）が提供するLINX（以下「本サービス」）の利用に関する条件を定めるものです。本サービスを利用するすべてのユーザーに適用されます。</p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">第2条（定義）</h2>
            <p className="mb-3">本規約において、以下の用語は次の意味で使用します。</p>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-medium">「本サービス」</span>とは、当社が提供するLINE AI自動化コンシェルジュ「LINX」をいいます。LINE公式アカウントと連携し、AI自動応答、予約管理、決済リンク生成、顧客管理等の機能を提供するクラウドサービスです。</li>
              <li><span className="font-medium">「ユーザー」</span>とは、本規約に同意の上、本サービスのアカウントを登録した法人または個人をいいます。</li>
              <li><span className="font-medium">「アカウント」</span>とは、本サービスを利用するためにユーザーに付与される利用権限をいいます。</li>
              <li><span className="font-medium">「ナレッジ」</span>とは、ユーザーが本サービスに登録する店舗情報、FAQ、メニュー情報、営業時間その他のAI応答の基礎となるデータをいいます。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">第3条（アカウント登録）</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>ユーザーは、当社所定の方法により、メールアドレス等の情報を提供してアカウントを登録するものとします。</li>
              <li>ユーザーは、登録情報を正確かつ最新の状態に保つ義務を負います。</li>
              <li>アカウントの管理責任はユーザーに帰属し、第三者への譲渡・貸与はできません。</li>
              <li>当社は、以下の場合にアカウント登録を拒否または削除できるものとします。
                <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                  <li>虚偽の情報を登録した場合</li>
                  <li>過去に本規約違反によりアカウントを削除された場合</li>
                  <li>その他、当社が不適当と判断した場合</li>
                </ul>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">第4条（料金・支払い）</h2>
            <p className="mb-3">本サービスは以下のプランを提供します。料金はすべて税込価格です。</p>
            <table className="w-full text-[14px] mb-4">
              <thead>
                <tr className="border-b border-[#E8E8E8] text-[#999999]">
                  <th className="py-2 text-left font-medium">プラン</th>
                  <th className="py-2 text-left font-medium">月額料金</th>
                  <th className="py-2 text-left font-medium">概要</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E8]">
                {[
                  ["Free", "¥0", "基本機能・月50メッセージまで"],
                  ["Starter", "¥2,980", "AI応答強化・月500メッセージ"],
                  ["Standard", "¥9,800", "予約・決済連携・月2,000メッセージ"],
                  ["Pro", "¥29,800", "全機能・無制限メッセージ・優先サポート"],
                ].map(([plan, price, desc]) => (
                  <tr key={plan}>
                    <td className="py-3 pr-3 font-medium">{plan}</td>
                    <td className="py-3 pr-3">{price}</td>
                    <td className="py-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ol className="list-decimal list-inside space-y-2">
              <li>有料プランの決済はStripe社のシステムを通じて行われます。クレジットカード情報は当社では保持しません。</li>
              <li>月額料金は利用開始日を起算日とし、毎月自動的に決済されます。</li>
              <li>プランの変更はいつでも可能です。アップグレードは即時反映、ダウングレードは次回請求日から適用されます。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">第5条（サービス内容）</h2>
            <p className="mb-3">本サービスは、LINE公式アカウントと連携した以下の機能を提供します。</p>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-medium">AI自動応答</span> — ナレッジに基づくLINEメッセージへの自動応答</li>
              <li><span className="font-medium">予約管理</span> — LINE上での予約受付・変更・キャンセル処理</li>
              <li><span className="font-medium">決済リンク生成</span> — Stripe連携による決済URLの自動生成・送信</li>
              <li><span className="font-medium">顧客管理</span> — LINE友だち情報の一元管理・タグ付け・セグメント</li>
              <li><span className="font-medium">分析ダッシュボード</span> — メッセージ数・予約数・売上等の可視化</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">第6条（AI応答の免責）</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>AIによる応答は、ユーザーが登録したナレッジおよびAIモデルの推論に基づく参考情報であり、その正確性、完全性、最新性を保証するものではありません。</li>
              <li>AIの応答はハルシネーション（事実と異なる情報の生成）を含む可能性があります。重要な情報については、ユーザーの責任で確認してください。</li>
              <li>本サービスのAI応答は、医療、法律、税務、金融その他の専門的助言に代わるものではありません。これらの分野に関する質問には、ユーザーの責任で専門家にご相談ください。</li>
              <li>AIの応答内容に起因して、ユーザーまたは第三者（LINEエンドユーザーを含む）に生じた損害について、当社は故意・重過失の場合を除き責任を負いません。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">第7条（ナレッジ登録の責任）</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>ユーザーが本サービスに登録するナレッジの正確性、適法性、第三者の権利非侵害については、ユーザーが一切の責任を負います。</li>
              <li>社外秘情報、個人情報、機密情報をナレッジとして登録する場合、ユーザーは適切な権限を有していることを保証するものとします。</li>
              <li>ナレッジはAI処理のため外部APIプロバイダ（Anthropic社 Claude API）に送信されます。登録前に情報の機密性を十分に検討してください。</li>
              <li>当社は、ナレッジの内容が法令に違反する場合、または本規約に反する場合に、事前通知の上で当該ナレッジを削除できるものとします。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">第8条（禁止事項）</h2>
            <p className="mb-3">ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>法令または公序良俗に違反する利用</li>
              <li>犯罪行為に関連する利用</li>
              <li>当社または第三者の知的財産権、プライバシー権その他の権利を侵害する行為</li>
              <li>本サービスのリバースエンジニアリング、逆コンパイル、逆アセンブル</li>
              <li>本サービスに過度な負荷をかける大量リクエスト、スクレイピング、自動化ツールによるアクセス</li>
              <li>他のユーザーのアカウントへの不正アクセス</li>
              <li>虚偽情報の登録または詐欺的な利用</li>
              <li>本サービスを利用したスパム送信、迷惑行為</li>
              <li>その他、当社が不適切と判断する行為</li>
            </ol>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">第9条（データの取り扱い）</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>LINE上の会話ログは、サービス品質向上およびAI応答改善のため、最大90日間保持されます。90日を超えた会話ログは自動的に削除されます。</li>
              <li>ユーザーが登録したナレッジおよび顧客データは、アカウント有効期間中は保持されます。</li>
              <li>アカウント削除後、ユーザーのデータ（ナレッジ、顧客データ、設定情報）は30日間保持された後、完全に削除されます。</li>
              <li>データのバックアップはユーザーの責任で行ってください。当社は、データの喪失について故意・重過失の場合を除き責任を負いません。</li>
              <li>個人情報の取り扱いについては、当社<Link href="/privacy" className="text-[#06C755] hover:underline">プライバシーポリシー</Link>をご確認ください。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">第10条（SLA）</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>当社は、本サービスの月間稼働率99.5%を目標とします。ただし、これは保証値ではありません。</li>
              <li>計画メンテナンスについては、原則として3営業日前までにメールまたはサービス内通知で事前にお知らせします。</li>
              <li>以下の事由による中断・停止は、稼働率の計算から除外されます。
                <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                  <li>計画メンテナンス</li>
                  <li>LINE Platform側の障害</li>
                  <li>外部APIプロバイダ（Anthropic、Stripe等）の障害</li>
                  <li>不可抗力（天災、戦争、法令変更等）</li>
                </ul>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">第11条（解約）</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>ユーザーは、いつでも本サービスを解約できます。解約はアカウント設定画面から行うことができます。</li>
              <li>有料プランの解約は、次回請求日の前日までに行ってください。日割りでの返金は行いません。</li>
              <li>解約後、アカウントおよびデータは30日間保持された後、完全に削除されます。</li>
              <li>当社は、ユーザーが本規約に違反した場合、事前通知の上でアカウントを停止または削除できるものとします。重大な違反の場合は、即時停止できるものとします。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">第12条（免責事項）</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>当社は、本サービスの利用に起因してユーザーまたは第三者に生じた間接損害、付随的損害、特別損害、逸失利益について責任を負いません。</li>
              <li>当社の賠償責任は、当該損害が発生した月のユーザーの利用料金を上限とします。</li>
              <li>天災地変、戦争、テロ、パンデミック、法令変更、通信障害その他の不可抗力に起因するサービスの中断・停止について、当社は責任を負いません。</li>
              <li>LINE社のプラットフォーム変更またはAPI仕様変更に起因するサービスの変更・制限について、当社は責任を負いません。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">第13条（規約変更）</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>当社は、必要に応じて本規約を変更できるものとします。</li>
              <li>重要な変更がある場合、変更の効力発生日の14日前までに、メールまたはサービス内通知で事前にお知らせします。</li>
              <li>変更後も本サービスの利用を継続した場合、変更後の規約に同意したものとみなします。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">第14条（準拠法・管轄裁判所）</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>本規約の準拠法は日本法とします。</li>
              <li>本規約に関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</li>
            </ol>
          </section>

          <section className="pt-6 border-t border-[#E8E8E8]">
            <table className="w-full text-[14px]">
              <tbody className="divide-y divide-[#E8E8E8]">
                {[
                  ["事業者名", "株式会社TomorrowProof"],
                  ["代表者", "KOZUKI TAKAHIRO"],
                  ["所在地", "東京都港区南青山7丁目1番27-702号"],
                  ["メールアドレス", "tomorrowprooftokyo@gmail.com"],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td className="py-2 pr-4 text-[#999999] font-medium w-[140px]">{label}</td>
                    <td className="py-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <p className="text-[13px] text-[#999999] pt-6 border-t border-[#E8E8E8]">
            2026年3月16日 制定 — 株式会社TomorrowProof 代表取締役 KOZUKI TAKAHIRO
          </p>
        </div>
      </div>
    </main>
  );
}
