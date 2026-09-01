import type { Metadata } from "next";
import IndustryLP from "@/components/IndustryLP";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";

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
    { value: "既存", label: "予約システムを活かす共存設計" },
    { value: "多店舗", label: "店舗横断ダッシュボード" },
    { value: "見積", label: "スコープに応じたカスタム対応" },
  ],
};


export const metadata: Metadata = {
  title: "美容室・サロンのLINE予約管理システム｜AI接客とアフターケア自動配信 | LINX",
  description: "美容室・ヘアサロン向けの予約管理システム。Instagramからの流入を公式LINEで受け止め、AIがスタイリスト指名の相談から予約確定まで対応。施術後のホームケア配信で再来店につなげます。",
  keywords: "美容室 予約管理 システム,美容室 予約 顧客管理 システム,サロン LINE 予約,予約 顧客 一元管理,スタイリスト 指名 予約",
  alternates: { canonical: `${SITE.url}/solutions/salon` },
  openGraph: {
    title: "美容室・サロンのLINE予約管理システム｜AI接客とアフターケア自動配信 | LINX",
    description: "美容室・ヘアサロン向けの予約管理システム。Instagramからの流入を公式LINEで受け止め、AIがスタイリスト指名の相談から予約確定まで対応。施術後のホームケア配信で再来店につなげます。",
    url: `${SITE.url}/solutions/salon`,
    siteName: SITE.name,
    locale: "ja_JP",
    type: "website",
    images: [{ url: data.heroImage, width: 1200, height: 630, alt: `${data.name}向けの予約・会員管理システム LINX` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "美容室・サロンのLINE予約管理システム｜AI接客とアフターケア自動配信 | LINX",
    description: "美容室・ヘアサロン向けの予約管理システム。Instagramからの流入を公式LINEで受け止め、AIがスタイリスト指名の相談から予約確定まで対応。施術後のホームケア配信で再来店につなげます。",
    images: [data.heroImage],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "ホーム", item: SITE.url },
            {
              "@type": "ListItem",
              position: 2,
              name: data.name,
              item: `${SITE.url}/solutions/salon`,
            },
          ],
        }}
      />
      <IndustryLP data={data} />
    </>
  );
}
