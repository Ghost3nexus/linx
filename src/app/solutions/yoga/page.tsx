import IndustryLP from "@/components/IndustryLP";

const data = {
  slug: "yoga",
  name: "ヨガスタジオ",
  heroImage: "/images/usecase-yoga.png",
  heroTitle: "ヨガスタジオの\n予約管理をゼロに。",
  heroSub: "少人数クラスの定員管理からリマインドまで、AIがLINEで自動化。講師は指導に集中できる。",
  pains: [
    {
      title: "少人数クラスの空き管理が煩雑",
      description:
        "定員6〜10名のクラスごとに空き状況を確認し、手動で返信。キャンセル待ちの管理も手作業。",
    },
    {
      title: "当日キャンセル・無断欠席が多い",
      description:
        "リマインドが不十分でドタキャン率が高く、空き枠を埋められないまま売上が減少。",
    },
    {
      title: "新規体験からの継続率が読めない",
      description:
        "体験レッスン後のフォローがインストラクター任せ。データに基づいた改善ができていない。",
    },
  ],
  features: [
    "24時間AI自動応対（LINE）",
    "クラス別の空き状況リアルタイム表示",
    "キャンセル待ちの自動繰り上げ通知",
    "前日・当日のリマインド自動送信",
    "体験レッスン→入会フォローのステップ配信",
    "インストラクター別スケジュール管理",
    "月謝・回数券のLINE決済リンク送付",
    "会員タグ自動付与（初心者・経験者等）",
    "休会・プラン変更のセルフ手続き",
    "出席データの自動集計・分析",
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
