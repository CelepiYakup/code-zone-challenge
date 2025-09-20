import type { Metadata } from "next";

export const SITE_CONFIG = {
  name: "Rapkology",
  title: "Rapkology - Türk Rap Sahnesinin Kalbi",
  description: "Türk rap müzik dünyasının en son haberleri, videolar, sanatçı röportajları ve trend içerikler. LARK2020, Favor, BCY, M Lisa ve daha fazlası.",
  url: "https://rapkology.com",
  locale: "tr_TR",
  language: "tr",
  themeColor: "#FFD700",
  authors: [{ name: "Rapkology Team" }]
} as const;

export const SEO_KEYWORDS = [
  "türk rap",
  "hip hop", 
  "rapkology",
  "lark2020",
  "favor",
  "bcy",
  "m lisa",
  "felat",
  "bac0",
  "akın gezginci",
  "pool sessions",
  "rap müzik",
  "türkiye rap"
] as const;

export const FONT_CONFIG = {
  preconnectUrls: [
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com"
  ],
  googleFontsUrl: "https://fonts.googleapis.com/css2?family=Saira:wght@100;200;300;400;500;600;700;800;900&display=swap"
} as const;

export const PWA_CONFIG = {
  manifest: "/manifest.json",
  favicon: "/favicon.ico",
  appleTouchIcon: {
    href: "/apple-touch-icon.png",
    sizes: "180x180"
  }
} as const;

export function generateMetadata(): Metadata {
  return {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    keywords: SEO_KEYWORDS.join(", "),
    viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
    robots: "index, follow",
    openGraph: {
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      type: "website",
      locale: SITE_CONFIG.locale,
      siteName: SITE_CONFIG.name,
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
    },
  };
}