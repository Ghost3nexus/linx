import IndustryLP from "@/components/IndustryLP";

const data = {
  slug: "pickleball",
  name: "ピックルボール施設",
  heroImage: "/images/usecase-pickleball.png",
  heroTitle: "コート予約も大会運営も\nLINEで完結。",
  heroSub: "コート予約・会員管理・大会エントリーまで、AIが自動化。急成長するスポーツの運営を支える。",
  pains: [
    {
      title: "コート予約の調整が煩雑",
      description:
        "複数コート×時間帯×利用人数の組み合わせを手動で管理。電話やDMでの予約受付に時間を取られる。",
    },
    {
      title: "大会・イベントの参加管理が手作業",
      description:
        "エントリー受付、組み合わせ発表、結果通知をすべて手動で対応。参加者が増えるほど負荷が増大。",
    },
    {
      title: "新規会員の獲得・定着施策が不足",
      description:
        "体験プログラム後のフォローが不十分で、会員登録につながらない。利用頻度の低い会員へのアプローチもできていない。",
    },
  ],
  features: [
    "24時間AI自動応対（LINE）",
    "コート別・時間帯別の予約管理",
    "大会・イベントのエントリー自動受付",
    "参加者への組み合わせ・結果の自動通知",
    "体験→会員登録フォローのステップ配信",
    "月会費・ビジター料金のLINE決済リンク送付",
    "レッスン予約（初心者クラス・上級者クラス）",
    "前日・当日のリマインド自動送信",
    "会員ランク別のセグメント配信",
    "利用頻度に応じた休眠会員への自動アプローチ",
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
