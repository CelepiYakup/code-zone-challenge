export const TRENDS_LIMITS = {
  BLOG_TRENDS: 4,
  MAIN_TRENDS: 6,
  HOMEPAGE_TRENDS: 8,
} as const;

export const BATCH_SIZES = {
  DISCOVER: 4,
  DISCOVER_PAGE: 8,
  TRENDS: 6,
  TRENDS_BLOG: 4,
  MONTHLY_FAV: 10,
} as const;

export const INITIAL_TAGS = {
  DISCOVER: [
    { name: "Yabancı Rap", active: true },
    { name: "Türk Rap" },
    { name: "Rap Haberleri" },
    { name: "Haftanın Klipleri" },
    { name: "Ayın Klipleri" },
    { name: "Rap Sohbetleri" },
    { name: "Rap Müsabakaları" },
  ],
  DISCOVER_PAGE: [
    { name: "Türk Rap" },
    { name: "Yabancı Rap", active: true },
    { name: "Rap Haberleri" },
    { name: "Haftanın Klipleri" },
    { name: "Ayın Klipleri" },
    { name: "Rap Sohbetleri" },
    { name: "Rap Müsabakaları" },
  ],
} as const;

export const SLIDER_SETTINGS = {
  AUTO_PLAY_INTERVAL: 4000,
  FEATURED_COUNT: 1,
  SIDE_ARTICLES_COUNT: 4,
  SWIPER_ARTICLES_COUNT: 6,
  MAX_DESC_LENGTH: {
    FEATURED: 180,
    SIDE_ARTICLE: 110,
  },
} as const;

export const BLOG_LIST_COUNTS = {
  FEATURED: 1,
  SIDE: 4,
  SWIPER_START: 5,
  SWIPER_END: 11,
} as const;
