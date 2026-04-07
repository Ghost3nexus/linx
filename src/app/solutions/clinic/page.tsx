import IndustryLP from "@/components/IndustryLP";

const data = {
  slug: "clinic",
  name: "クリニック・整体院",
  heroImage: "/images/usecase-clinic.png",
  heroTitle: "問診・予約・リマインド\nすべてLINEで完結。",
  heroSub: "事前問診から予約管理、来院リマインドまでAIが自動化。受付業務の負担を大幅に削減。",
  pains: [
    {
      title: "電話予約の対応で受付が回らない",
      description:
        "診療時間中の電話対応に追われ、来院中の患者対応がおろそかに。営業時間外の予約は取りこぼし。",
    },
    {
      title: "事前問診が紙のまま、データ化できていない",
      description:
        "来院時に紙で記入→スタッフが転記。時間がかかる上にミスも発生。デジタル化したいが仕組みがない。",
    },
    {
      title: "予約のリマインド不足で無断キャンセルが多い",
      description:
        "リマインド連絡を手動で行う余裕がなく、無断キャンセルや遅刻が頻発。稼働率が上がらない。",
    },
  ],
  features: [
    "24時間AI自動応対（LINE）",
    "診療メニュー別の予約枠管理",
    "LINEで事前問診フォームを自動送信",
    "前日・当日のリマインド自動送信",
    "担当施術者の指名予約",
    "初診→再診フォローのステップ配信",
    "会計・決済リンクのLINE送付",
    "患者タグの自動付与（症状・来院頻度等）",
    "キャンセル枠の自動再募集",
    "来院データの自動集計・リピート分析",
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
