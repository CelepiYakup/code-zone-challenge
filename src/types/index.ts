
export interface Article {
  _id: string;
  attributes: {
    title: string;
    desc: string;
    img: string;
    authors: string[];
    category: string[];
    tags: string[];
    trends: boolean; 
    slug: string;
  };
  createdAt: string;
}

export interface PostItem {
  _id: string;
  attributes: {
    title: string;
    slug: string;
    authors?: string[];
    img?: string;
  };
}

export interface Post {
  _id: string;
  user_id: string;
  type: "posts";
  attributes: PostAttributes;
  lang: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PostAttributes {
  trends: boolean;
  category: string[];
  tags: string[];
  authors: string[];
  title: string;
  slug: string;
  content: string;
  seo: SEOData;
  desc: string;
  img: string;
}

export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  canonicalURL: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
  description?: string;
}

export interface NavigationCategory {
  name: string;
  items: NavigationItem[];
}

export interface Artist {
  name: string;
  slug: string;
  image?: string;
  bio?: string;
  spotifyUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration?: string;
  releaseDate: string;
  videoUrl?: string;
  image: string;
  category: string[];
  tags: string[];
}

export type CategoryType =
  | "Videolar"
  | "Müzik"
  | "Sanatçılar"
  | "Trendler"
  | "Haberler"
  | "Keşfet";

export type TagType =
  | "Haftanın Videoları"
  | "Ayın Videoları"
  | "Türk Rap"
  | "POOL SESSIONS"
  | "Yeni Çıkanlar"
  | "Popüler";

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SearchQuery {
  query?: string;
  category?: CategoryType[];
  tags?: TagType[];
  artist?: string;
  dateFrom?: string;
  dateTo?: string;
  trends?: boolean;
  page?: number;
  limit?: number;
}

export interface SearchResult {
  posts: Post[];
  artists: Artist[];
  tracks: Track[];
  total: number;
}

export interface UIState {
  isLoading: boolean;
  error: string | null;
  theme: "dark" | "light";
  mobileMenuOpen: boolean;
  searchOpen: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
  subject: string;
}

export interface NewsletterForm {
  email: string;
}

export interface SocialLink {
  platform: "instagram" | "youtube" | "spotify" | "twitter" | "tiktok";
  url: string;
  handle?: string;
}