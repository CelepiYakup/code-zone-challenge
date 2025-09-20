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
    content?: string; 
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

export interface TrendCardProps {
  index: number;
  authorAvatar?: string | null;
  authorName?: string | null;
  title: string;
  href: string;
}