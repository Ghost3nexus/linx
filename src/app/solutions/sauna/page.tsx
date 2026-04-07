import IndustryLP from "@/components/IndustryLP";

const data = {
  slug: "sauna",
  name: "サウナ施設",
  heroImage: "/images/usecase-sauna.png",
  heroTitle: "サウナ施設の\n混雑管理をAIで解決。",
  heroSub: "時間制予約・入退館管理・混雑状況の配信まで、LINE1つで完結。快適な体験を自動で提供。",
  pains: [
    {
      title: "混雑状況がわからず来館を躊躇される",
      description:
        "混雑情報をリアルタイムで発信できず、「行ってみたら満員だった」という不満が口コミに直結。",
    },
    {
      title: "時間制の入退館管理が手作業",
      description:
        "90分・120分などの時間制を紙や口頭で管理。超過の把握が遅れ、回転率が下がる。",
    },
    {
      title: "リピーター施策が打てていない",
      description:
        "来館頻度や利用パターンを把握できておらず、常連向けの特典やキャンペーンが場当たり的。",
    },
  ],
  features: [
    "24時間AI自動応対（LINE）",
    "時間帯別の予約枠管理（90分・120分等）",
    "入退館のLINE打刻・時間カウント",
    "混雑状況のリアルタイム自動配信",
    "空き枠の自動通知（混雑緩和時に配信）",
    "回数券・サブスクのLINE決済リンク送付",
    "来館頻度に応じた自動セグメント配信",
    "初回来館→リピート促進のステップ配信",
    "レンタル品（タオル・館内着等）の事前予約",
    "会員タグ自動付与（常連・新規・休眠等）",
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
