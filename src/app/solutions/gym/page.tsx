import IndustryLP from "@/components/IndustryLP";

const data = {
  slug: "gym",
  name: "パーソナルジム",
  heroImage: "/images/hero-gym.png",
  heroTitle: "ジム運営を\nAIで自動化する。",
  heroSub: "予約・入退館・会員管理・決済まで、LINE1つで完結。スタッフの負担をゼロに。",
  pains: [
    {
      title: "予約対応に追われて本業に集中できない",
      description:
        "セミパーソナル・マンツーマンの予約調整をスタッフが手動で対応。営業時間外の問い合わせは取りこぼしに。",
    },
    {
      title: "体験→入会の歩留まりが低い",
      description:
        "体験予約後のフォローが属人化し、入会につながらないまま離脱。自動フォローアップの仕組みがない。",
    },
    {
      title: "入退館管理がアナログで手間がかかる",
      description:
        "紙の台帳やICカードの管理コストが負担。会員ごとの利用頻度も把握しにくい。",
    },
  ],
  features: [
    "24時間AI自動応対（LINE）",
    "空き確認→予約確定を自動化",
    "セミパーソナル / マンツーマン枠の管理",
    "体験予約→入会フォローの自動ステップ配信",
    "入退館のLINE打刻・通知",
    "月会費のLINE決済リンク送付",
    "休会・退会手続きのセルフ化",
    "トレーナー別スケジュール管理",
    "リマインド通知（前日・当日）",
    "会員属性タグの自動付与・セグメント配信",
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
