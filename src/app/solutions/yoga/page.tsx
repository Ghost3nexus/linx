import type { Metadata } from "next";
import IndustryLP from "@/components/IndustryLP";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";

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


export const metadata: Metadata = {
  title: "ヨガスタジオ予約管理システム｜LINE AIで定員管理とリマインドを自動化 | LINX",
  description: "ヨガスタジオ向けの予約管理システム。少人数クラスの定員管理、キャンセル待ち、前日リマインドまで公式LINE上のAIが自動化。講師は指導に集中でき、予約の取りこぼしも防げます。",
  keywords: "ヨガ 予約管理 システム,ヨガスタジオ 予約,定員管理,LINE 予約管理 システム,レッスン予約 システム",
  alternates: { canonical: `${SITE.url}/solutions/yoga` },
  openGraph: {
    title: "ヨガスタジオ予約管理システム｜LINE AIで定員管理とリマインドを自動化 | LINX",
    description: "ヨガスタジオ向けの予約管理システム。少人数クラスの定員管理、キャンセル待ち、前日リマインドまで公式LINE上のAIが自動化。講師は指導に集中でき、予約の取りこぼしも防げます。",
    url: `${SITE.url}/solutions/yoga`,
    siteName: SITE.name,
    locale: "ja_JP",
    type: "website",
    images: [{ url: data.heroImage, width: 1200, height: 630, alt: `${data.name}向けの予約・会員管理システム LINX` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ヨガスタジオ予約管理システム｜LINE AIで定員管理とリマインドを自動化 | LINX",
    description: "ヨガスタジオ向けの予約管理システム。少人数クラスの定員管理、キャンセル待ち、前日リマインドまで公式LINE上のAIが自動化。講師は指導に集中でき、予約の取りこぼしも防げます。",
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
              item: `${SITE.url}/solutions/yoga`,
            },
          ],
        }}
      />
      <IndustryLP data={data} />
    </>
  );
}
