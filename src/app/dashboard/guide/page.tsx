"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Copy, Check } from "lucide-react";

function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-[#E8E8E8] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-[#FAFAFA] hover:bg-[#F5F5F5] transition-colors text-left"
      >
        <span className="text-[16px] font-bold text-[#1A1A1A]">{title}</span>
        {open ? <ChevronUp size={20} className="text-[#999]" /> : <ChevronDown size={20} className="text-[#999]" />}
      </button>
      {open && <div className="px-6 py-5 space-y-4 text-[15px] text-[#333] leading-relaxed">{children}</div>}
    </div>
  );
}

function Step({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="w-8 h-8 rounded-full bg-[#06C755] text-white flex items-center justify-center text-[14px] font-bold shrink-0 mt-0.5">
        {num}
      </div>
      <div>
        <p className="font-bold text-[#1A1A1A] mb-1">{title}</p>
        <div className="text-[14px] text-[#666]">{children}</div>
      </div>
    </div>
  );
}

export default function GuidePage() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="mb-8">
        <h1 className="text-[24px] sm:text-[28px] font-bold text-[#1A1A1A]">LINX 取扱説明書</h1>
        <p className="text-[15px] text-[#666] mt-2">初期設定から運用まで、ステップごとにご案内します。</p>
      </div>

      <div className="space-y-4">

        {/* 初期セットアップ */}
        <Section title="1. 初期セットアップ（所要時間: 約15分）" defaultOpen={true}>
          <Step num={1} title="アカウント登録">
            <p>メールアドレスとパスワード（8文字以上）で登録します。登録後、自動でセットアップ画面に遷移します。</p>
          </Step>
          <Step num={2} title="お店の情報を登録">
            <p>3つの方法から選べます:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>URLから自動取得</strong>（おすすめ）: ホームページのURLを入力するとAIが自動で店舗情報を抽出</li>
              <li><strong>手動入力</strong>: 営業時間、料金、メニュー等をテキストで登録</li>
              <li><strong>PDF読み込み</strong>: パンフレット等のPDFをアップロード（5MBまで）</li>
            </ul>
          </Step>
          <Step num={3} title="LINE公式アカウントを接続">
            <p>LINE Developersでチャネルを作成し、3つの値をコピペします:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Channel ID</li>
              <li>Channel Secret</li>
              <li>Channel Access Token</li>
            </ul>
            <p className="mt-2 text-[13px] text-[#999]">※ 設定画面に詳細な手順ガイドがあります</p>
          </Step>
          <Step num={4} title="Webhook URLを設定">
            <p>LINXが生成するWebhook URLをLINE Developersの「Webhook URL」に貼り付けます。「応答メッセージ」はOFFにしてください。</p>
          </Step>
        </Section>

        {/* 基本操作 */}
        <Section title="2. 基本操作">
          <div className="space-y-3">
            <div className="bg-[#F9FAFB] rounded-lg p-4">
              <p className="font-bold mb-1">ダッシュボード</p>
              <p className="text-[14px] text-[#666]">今月のAI応答数、登録情報数、プラン状況を一目で確認。クイックリンクから各機能にアクセスできます。</p>
            </div>
            <div className="bg-[#F9FAFB] rounded-lg p-4">
              <p className="font-bold mb-1">お店の情報（ナレッジ）</p>
              <p className="text-[14px] text-[#666]">AIが回答に使う情報源です。営業時間、料金、FAQ、アクセス方法など、お客様から聞かれそうな情報を登録してください。情報は何件でも追加・編集・削除できます。</p>
            </div>
            <div className="bg-[#F9FAFB] rounded-lg p-4">
              <p className="font-bold mb-1">予約管理</p>
              <p className="text-[14px] text-[#666]">週間カレンダーで予約を一覧表示。営業時間の設定、手動での予約追加・キャンセルが可能です。Standard以上のプランではLINE上でAIが自動で予約を受け付けます。</p>
            </div>
            <div className="bg-[#F9FAFB] rounded-lg p-4">
              <p className="font-bold mb-1">顧客管理</p>
              <p className="text-[14px] text-[#666]">LINE経由で予約したお客様は自動で顧客リストに追加されます。名前、メール、電話番号、来店回数を管理できます。CSVインポートで既存の顧客データも一括登録可能です。</p>
            </div>
            <div className="bg-[#F9FAFB] rounded-lg p-4">
              <p className="font-bold mb-1">会話ログ</p>
              <p className="text-[14px] text-[#666]">AIとお客様の会話履歴を検索・閲覧できます。AIが回答できなかった質問（エスカレーション）はバッジ表示されるので、手動で対応してください。</p>
            </div>
          </div>
        </Section>

        {/* お客様の体験フロー */}
        <Section title="3. お客様の体験フロー（自動）">
          <div className="bg-[#F5FBF7] border border-[#D4EDD8] rounded-xl p-5">
            <p className="font-bold text-[#1A1A1A] mb-3">LINE友だち追加からご入会まで</p>
            <div className="space-y-3 text-[14px]">
              <div className="flex gap-3 items-start">
                <span className="bg-[#06C755] text-white rounded-full w-6 h-6 flex items-center justify-center text-[12px] font-bold shrink-0">1</span>
                <p>お客様がLINE友だち追加 → <strong>ウェルカムメッセージが自動送信</strong>（お店の名前入り）</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="bg-[#06C755] text-white rounded-full w-6 h-6 flex items-center justify-center text-[12px] font-bold shrink-0">2</span>
                <p>リッチメニューから「無料体験」「料金案内」「予約」等をタップ → <strong>AIが自動応答</strong></p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="bg-[#06C755] text-white rounded-full w-6 h-6 flex items-center justify-center text-[12px] font-bold shrink-0">3</span>
                <p>予約希望 → AIが空き枠を表示 → お客様が選択 → <strong>予約自動確定</strong></p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="bg-[#06C755] text-white rounded-full w-6 h-6 flex items-center justify-center text-[12px] font-bold shrink-0">4</span>
                <p>予約前日 → <strong>リマインドLINE自動送信</strong></p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="bg-[#06C755] text-white rounded-full w-6 h-6 flex items-center justify-center text-[12px] font-bold shrink-0">5</span>
                <p>体験完了後（スタッフがステータスを「完了」に変更）→ <strong>入会案内LINE自動送信</strong></p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="bg-[#06C755] text-white rounded-full w-6 h-6 flex items-center justify-center text-[12px] font-bold shrink-0">6</span>
                <p>お客様が「入会したい」とメッセージ → AIが<strong>決済リンク（Stripe）を自動生成・送信</strong></p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="bg-[#06C755] text-white rounded-full w-6 h-6 flex items-center justify-center text-[12px] font-bold shrink-0">7</span>
                <p>3日後、未入会の場合 → <strong>フォローアップLINE自動送信</strong></p>
              </div>
            </div>
            <p className="mt-4 text-[13px] text-[#06C755] font-bold">スタッフが行うのは「体験完了」のステータス変更のみ。他はすべて自動です。</p>
          </div>
        </Section>

        {/* リッチメニュー */}
        <Section title="4. リッチメニュー">
          <p>LINXは自動でリッチメニュー（LINEの下部メニュー）を設定します。デフォルトのボタン構成:</p>
          <div className="bg-[#F9FAFB] rounded-lg p-4 mt-2">
            <div className="grid grid-cols-2 gap-2 text-center text-[14px]">
              <div className="bg-white border border-[#E8E8E8] rounded-lg py-3 font-bold">無料体験を予約</div>
              <div className="bg-white border border-[#E8E8E8] rounded-lg py-3 font-bold">メニューと料金</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-[14px] mt-2">
              <div className="bg-white border border-[#E8E8E8] rounded-lg py-3">予約</div>
              <div className="bg-white border border-[#E8E8E8] rounded-lg py-3">営業時間</div>
              <div className="bg-white border border-[#E8E8E8] rounded-lg py-3">問い合わせ</div>
            </div>
          </div>
          <p className="text-[14px] text-[#666] mt-3">各ボタンをタップすると、対応するメッセージがAIに自動送信されます。メニューのカスタマイズは設定画面から可能です。</p>
        </Section>

        {/* 決済設定 */}
        <Section title="5. 決済リンク設定（Stripe連携）">
          <p>LINE上でお客様に決済リンクを送信するには、Stripeアカウントが必要です。</p>
          <Step num={1} title="Stripeアカウント作成">
            <p><a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="text-[#06C755] underline inline-flex items-center gap-1">stripe.com <ExternalLink size={12} /></a> で無料アカウントを作成</p>
          </Step>
          <Step num={2} title="APIキーを取得">
            <p>Stripe ダッシュボード → 開発者 → APIキー → 「シークレットキー」をコピー</p>
          </Step>
          <Step num={3} title="LINXに登録">
            <p>LINX 設定ページ → 「決済設定」→ シークレットキーを貼り付けて保存</p>
          </Step>
          <p className="text-[13px] text-[#999] mt-2">※ 決済はお客様のStripeアカウントで直接処理されます。LINXが売上を預かることはありません。</p>
        </Section>

        {/* 営業時間設定 */}
        <Section title="6. 営業時間・予約枠の設定">
          <p>予約管理ページの「営業時間設定」から、曜日ごとに以下を設定できます:</p>
          <ul className="list-disc pl-5 space-y-1 text-[14px] text-[#666]">
            <li><strong>営業開始・終了時刻</strong></li>
            <li><strong>定休日</strong>（曜日ごとにON/OFF）</li>
            <li><strong>1枠あたりの時間</strong>（30分/60分/90分等）</li>
            <li><strong>同時受付人数</strong>（グループレッスン対応）</li>
          </ul>
          <p className="text-[14px] text-[#666] mt-2">AIはこの設定に基づいて空き枠を自動計算し、お客様に提示します。</p>
        </Section>

        {/* プラン別機能 */}
        <Section title="7. プラン別の機能一覧">
          <div className="overflow-x-auto">
            <table className="w-full text-[14px] border-collapse">
              <thead>
                <tr className="border-b-2 border-[#E8E8E8]">
                  <th className="text-left py-2 pr-4">機能</th>
                  <th className="text-center py-2 px-2">Free</th>
                  <th className="text-center py-2 px-2">Starter</th>
                  <th className="text-center py-2 px-2">Standard</th>
                  <th className="text-center py-2 px-2">Pro</th>
                </tr>
              </thead>
              <tbody className="text-[#666]">
                {[
                  ["AI自動応答", "50回/月", "500回", "2,000回", "10,000回"],
                  ["ナレッジ登録", "1件", "5件", "無制限", "無制限"],
                  ["予約管理", "o", "o", "o", "o"],
                  ["顧客管理", "o", "o", "o", "o"],
                  ["会話ログ", "o", "o", "o", "o"],
                  ["リマインド通知", "o", "o", "o", "o"],
                  ["体験後フォローアップ", "o", "o", "o", "o"],
                  ["AI予約受付", "-", "-", "o", "o"],
                  ["LINE決済リンク", "-", "-", "o", "o"],
                  ["Web検索回答", "-", "-", "o", "o"],
                  ["エスカレーション通知", "-", "-", "o", "o"],
                  ["スタッフ自動転送", "-", "-", "-", "o"],
                ].map(([feature, ...plans], i) => (
                  <tr key={i} className="border-b border-[#F0F0F0]">
                    <td className="py-2.5 pr-4 font-medium text-[#333]">{feature}</td>
                    {plans.map((v, j) => (
                      <td key={j} className="text-center py-2.5 px-2">
                        {v === "o" ? <span className="text-[#06C755] font-bold">●</span> : v === "-" ? <span className="text-[#DDD]">-</span> : v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* よくある質問 */}
        <Section title="8. よくある質問">
          <div className="space-y-4">
            <div>
              <p className="font-bold text-[#1A1A1A]">Q. AIが間違った回答をしたらどうなりますか？</p>
              <p className="text-[14px] text-[#666] mt-1">AIはナレッジに登録された情報のみで回答します。情報がない場合は「担当者に確認します」と回答し、エスカレーション通知が届きます。ナレッジの内容を充実させることで回答精度が上がります。</p>
            </div>
            <div>
              <p className="font-bold text-[#1A1A1A]">Q. LINE公式アカウントは新しく作る必要がありますか？</p>
              <p className="text-[14px] text-[#666] mt-1">既存のLINE公式アカウントをそのまま使えます。LINE Developersでチャネルを作成し、LINXに接続するだけです。既存の友だちはそのまま引き継がれます。</p>
            </div>
            <div>
              <p className="font-bold text-[#1A1A1A]">Q. 月の応答回数を超えたらどうなりますか？</p>
              <p className="text-[14px] text-[#666] mt-1">上限に達すると、AIの自動応答が一時停止します。プランのアップグレードで即座に再開できます。手動でのLINE応答は影響を受けません。</p>
            </div>
            <div>
              <p className="font-bold text-[#1A1A1A]">Q. 解約はいつでもできますか？</p>
              <p className="text-[14px] text-[#666] mt-1">はい、いつでも解約できます。解約金はありません。課金ページからStripeの管理画面にアクセスし、サブスクリプションをキャンセルしてください。</p>
            </div>
            <div>
              <p className="font-bold text-[#1A1A1A]">Q. 複数店舗で使えますか？</p>
              <p className="text-[14px] text-[#666] mt-1">Starter以上のプランで複数のLINEアカウントを接続できます。Starter: 3件、Standard: 10件、Pro: 無制限です。</p>
            </div>
          </div>
        </Section>

        {/* サポート */}
        <Section title="9. サポート・お問い合わせ">
          <div className="bg-[#F9FAFB] rounded-lg p-4">
            <p className="font-bold text-[#1A1A1A] mb-2">お問い合わせ先</p>
            <p className="text-[14px] text-[#666]">メール: tomorrowprooftokyo@gmail.com</p>
            <p className="text-[14px] text-[#666] mt-1">対応時間: 平日 10:00-18:00（土日祝休み）</p>
            <p className="text-[14px] text-[#666] mt-3">Standard以上: 優先サポート（24時間以内に返信）</p>
            <p className="text-[14px] text-[#666]">Pro: 専任サポート担当</p>
          </div>
        </Section>

      </div>

      <div className="mt-8 text-center text-[13px] text-[#999]">
        <p>最終更新: 2026年3月28日</p>
      </div>
    </div>
  );
}
