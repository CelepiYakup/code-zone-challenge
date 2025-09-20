import { useMemo } from 'react';
import { PostItem, TrendCardProps } from '@/types';
import { asArray } from '@/lib/utils';

export const useMainTrendsData = (rawData: unknown, limit?: number) => {
  const items = useMemo(() => {
    return asArray(rawData as PostItem[]);
  }, [rawData]);

  const cards: TrendCardProps[] = useMemo(
    () =>
      items.map((item, i) => ({
        index: i + 1,
        title: item.attributes?.title ?? "Başlık",
        href: `/blog/${item.attributes?.slug ?? "#"}`,
        authorName: item.attributes?.authors?.[0] ?? "Rapkology",
        authorAvatar: "/a1.png",
      })),
    [items]
  );

  const visible = useMemo(() => {
    return limit ? cards.slice(0, limit) : cards;
  }, [cards, limit]);

  return {
    items,
    cards,
    visible,
    totalCount: cards.length
  };
};