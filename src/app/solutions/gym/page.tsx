import type { Metadata } from "next";
import IndustryLP from "@/components/IndustryLP";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";

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


export const metadata: Metadata = {
  title: "ジム予約管理システム｜LINEでAI予約・会員管理・入退館まで | LINX",
  description: "パーソナルジム・フィットネス向けの予約管理システム。公式LINE上のAIが空き確認から予約確定まで自動対応し、会員管理・入退館・月会費決済まで一元化。体験から入会までのフォローも自動化します。",
  keywords: "ジム 予約管理 システム,ジム 予約 顧客管理 システム,入退館 管理,会員管理,パーソナルジム 予約,フィットネス 管理システム",
  alternates: { canonical: `${SITE.url}/solutions/gym` },
  openGraph: {
    title: "ジム予約管理システム｜LINEでAI予約・会員管理・入退館まで | LINX",
    description: "パーソナルジム・フィットネス向けの予約管理システム。公式LINE上のAIが空き確認から予約確定まで自動対応し、会員管理・入退館・月会費決済まで一元化。体験から入会までのフォローも自動化します。",
    url: `${SITE.url}/solutions/gym`,
    siteName: SITE.name,
    locale: "ja_JP",
    type: "website",
    images: [{ url: data.heroImage, width: 1200, height: 630, alt: `${data.name}向けの予約・会員管理システム LINX` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ジム予約管理システム｜LINEでAI予約・会員管理・入退館まで | LINX",
    description: "パーソナルジム・フィットネス向けの予約管理システム。公式LINE上のAIが空き確認から予約確定まで自動対応し、会員管理・入退館・月会費決済まで一元化。体験から入会までのフォローも自動化します。",
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
              item: `${SITE.url}/solutions/gym`,
            },
          ],
        }}
      />
      <IndustryLP data={data} />
    </>
  );
}
