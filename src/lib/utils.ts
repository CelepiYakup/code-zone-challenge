import { PostItem } from "../types/index";
export const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
export const formatNumber = (num: number) => {
  if (num >= 1000) {
    return num;
  }
  return num;
};

export const truncateTitle = (title: string, maxLength: number = 50) => {
  if (title.length <= maxLength) return title;
  return title.substring(0, maxLength).trim() + "...";
};

export const truncateDesc = (desc: string, maxLength: number = 80) => {
  if (desc.length <= maxLength) return desc;
  return desc.substring(0, maxLength).trim() + "...";
};

export const truncate = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

export const toArray = (v: unknown) => (Array.isArray(v) ? v : []);

export const asArray = (v: unknown): PostItem[] =>
  Array.isArray(v) ? (v as PostItem[]) : [];
