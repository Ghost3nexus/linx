import IndustryLP from "@/components/IndustryLP";

const data = {
  slug: "salon",
  name: "美容室・ヘアサロン",
  heroImage: "/images/hero-salon.png",
  heroTitle: "次の美容室体験を、\nLINEで。",
  heroSub: "ホットペッパービューティーで終わらない、サロンの美意識を延長するデジタルコンシェルジュ。Instagramからの流入をLINEで受け止め、スタイリスト指名からアフターケアまでを一つの所作でつなぎます。",
  pains: [
    {
      title: "Instagram流入をLINEで受け止められない",
      description:
        "せっかくフォロワーが集まっても、予約は外部プラットフォームに流れ、サロン独自の顧客関係が築けない。世界観に惹かれたお客様の最初の一声を置く場所がない。",
    },
    {
      title: "施術後の顧客接点が途切れる",
      description:
        "次回来店までの3週間、顧客はサロンを忘れていく。ホームケア提案やアフターケア、次回来店の最適タイミング通知など、継続的な接点を作る仕組みがない。",
    },
    {
      title: "スタイリスト指名が属人的",
      description:
        "スター・スタイリストの個人ブランドがサロンの資産になっていない。指名予約を加速する仕組みが弱く、個々の集客力を組織的に活かせていない。",
    },
  ],
  features: [
    "Silent Concierge(AIが24時間、サロンの世界観でご相談対応)",
    "Editorial Rich Menu(雑誌のようなLINEリッチメニュー設計)",
    "AfterCare Ritual(施術後のホームケア自動配信)",
    "Stylist Signature(NFC名刺 × デジタル名刺連携)",
    "Instagram → LINE の流入導線設計",
    "既存予約システム(ホットペッパー等)との共存設計",
    "スタイリスト個別ページとの連携",
    "指名予約の加速機能",
    "施術履歴に基づくパーソナライズ配信",
    "ブランディング完全カスタム対応",
  ],
  stats: [
    { value: "1.9ヶ月", label: "投資回収目安" },
    { value: "6店舗", label: "同時展開対応" },
    { value: "¥16,300", label: "1店舗月額~" },
  ],
};

export default function Page() {
  return <IndustryLP data={data} />;
}
