import { Article } from '@/types'; // ✅ Merkezi types'tan import

export const filterArticlesByTag = (
  articles: Article[],
  selectedTag: string
): Article[] => {
  switch (selectedTag) {
    case "Türk Rap":
      return articles.filter((a) => a.attributes.tags.includes("Türk Rap"));
    case "Haftanın Klipleri":
      return articles.filter((a) =>
        a.attributes.tags.includes("Haftanın Videoları")
      );
    case "Ayın Klipleri":
      return articles.filter((a) =>
        a.attributes.tags.includes("Ayın Videoları")
      );
    case "Rap Sohbetleri":
    case "Rap Müsabakaları":
      return [];
    default:
      return articles;
  }
};

export const sortArticlesByDate = (articles: Article[]): Article[] => {
  return articles
    .filter((a) => a.attributes.title?.trim() && a.attributes.img?.trim())
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
};