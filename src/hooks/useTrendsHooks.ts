import { useMemo } from "react";
import { Article } from "@/types";
import { toArray } from "@/lib/utils";
import { TrendCardProps } from "../app/components/Trend/TrendCard";

export const useTrendsData = (rawData: unknown, limit?: number) => {
  const items = useMemo(() => {
    return toArray(rawData as Article[]).filter(
      (p) => p?.attributes?.title && p?.attributes?.slug
    );
  }, [rawData]);

  const cards: TrendCardProps[] = useMemo(
    () =>
      items.map((item, i) => ({
        index: i + 1,
        title: item.attributes.title,
        href: `/blog/${item.attributes.slug}`,
        authorName: item.attributes.authors?.[0] || "Rapkology",
        authorAvatar: "/a1.svg",
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
    totalCount: cards.length,
  };
};
