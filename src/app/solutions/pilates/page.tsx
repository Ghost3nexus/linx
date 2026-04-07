import IndustryLP from "@/components/IndustryLP";

const data = {
  slug: "pilates",
  name: "ピラティススタジオ",
  heroImage: "/images/usecase-pilates.png",
  heroTitle: "ピラティス予約を\nAIに任せる。",
  heroSub: "リフォーマー台数×インストラクター×時間帯。複雑な予約管理をLINE AIが自動で最適化。",
  pains: [
    {
      title: "リフォーマー台数と予約枠の調整が複雑",
      description:
        "マシン台数・インストラクターの稼働・レッスン種別の組み合わせが多く、手動管理では限界。ダブルブッキングのリスクも。",
    },
    {
      title: "インストラクターのシフト管理が属人化",
      description:
        "複数インストラクターの空き状況を一元管理できず、予約受付のたびに個別確認が必要。",
    },
    {
      title: "高単価ゆえにキャンセルの損失が大きい",
      description:
        "1枠あたりの単価が高いため、直前キャンセル1件の影響が大きい。キャンセルポリシーの運用も手作業。",
    },
  ],
  features: [
    "24時間AI自動応対（LINE）",
    "リフォーマー台数連動の自動枠管理",
    "インストラクター別スケジュール・指名予約",
    "グループ / プライベートレッスンの枠分け",
    "前日・当日のリマインド自動送信",
    "キャンセルポリシーの自動適用・課金",
    "体験→入会フォローのステップ配信",
    "回数券・月謝のLINE決済リンク送付",
    "会員のレッスン履歴・出席率の自動集計",
    "キャンセル待ちの自動繰り上げ通知",
  ],
  stats: [
    { value: "24h", label: "AI自動応対" },
    { value: "1日", label: "最短導入" },
    { value: "0円", label: "初期費用" },
  ],
};

export default function Page() {
  return <IndustryLP data={data} />;
}
