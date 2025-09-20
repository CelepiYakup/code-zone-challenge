import { useMemo } from 'react';
import { Article } from '@/types'; // ✅ Merkezi types'tan import
import { sortArticlesByDate } from '@/lib/data-filters';
import { BLOG_LIST_COUNTS } from '@/lib/constants';

export const useArticleData = (rawData: Article[]) => {
  const articles = useMemo(() => {
    return sortArticlesByDate(rawData);
  }, [rawData]);

  const featuredArticle = useMemo(() => {
    return articles[0];
  }, [articles]);

  const sideArticles = useMemo(() => {
    return articles.slice(1, 1 + BLOG_LIST_COUNTS.SIDE);
  }, [articles]);

  const swiperArticles = useMemo(() => {
    return articles.slice(BLOG_LIST_COUNTS.SWIPER_START, BLOG_LIST_COUNTS.SWIPER_END);
  }, [articles]);

  const slides = useMemo(() => {
    return swiperArticles.length
      ? swiperArticles
      : featuredArticle
      ? [featuredArticle]
      : [];
  }, [swiperArticles, featuredArticle]);

  return {
    articles,
    featuredArticle,
    sideArticles,
    swiperArticles,
    slides
  };
};