import type { Metadata } from "next";
import IndustryLP from "@/components/IndustryLP";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";

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


export const metadata: Metadata = {
  title: "ピラティス予約管理システム｜マシン台数×講師×時間帯をLINE AIで最適化 | LINX",
  description: "ピラティススタジオ向けの予約管理システム。リフォーマーの台数・インストラクター・時間帯が絡む複雑な枠管理を、公式LINE上のAIが自動で最適化。会員管理と決済まで一元化します。",
  keywords: "ピラティス 予約管理 システム,ピラティス 予約,リフォーマー 予約,スタジオ 予約管理,LINE 予約 AI",
  alternates: { canonical: `${SITE.url}/solutions/pilates` },
  openGraph: {
    title: "ピラティス予約管理システム｜マシン台数×講師×時間帯をLINE AIで最適化 | LINX",
    description: "ピラティススタジオ向けの予約管理システム。リフォーマーの台数・インストラクター・時間帯が絡む複雑な枠管理を、公式LINE上のAIが自動で最適化。会員管理と決済まで一元化します。",
    url: `${SITE.url}/solutions/pilates`,
    siteName: SITE.name,
    locale: "ja_JP",
    type: "website",
    images: [{ url: data.heroImage, width: 1200, height: 630, alt: `${data.name}向けの予約・会員管理システム LINX` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ピラティス予約管理システム｜マシン台数×講師×時間帯をLINE AIで最適化 | LINX",
    description: "ピラティススタジオ向けの予約管理システム。リフォーマーの台数・インストラクター・時間帯が絡む複雑な枠管理を、公式LINE上のAIが自動で最適化。会員管理と決済まで一元化します。",
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
              item: `${SITE.url}/solutions/pilates`,
            },
          ],
        }}
      />
      <IndustryLP data={data} />
    </>
  );
}
