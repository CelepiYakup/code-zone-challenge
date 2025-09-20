import { useMemo, useState, useEffect } from "react";

export const usePagination = <T>(items: T[], initialBatchSize: number = 8) => {
  const [visibleCount, setVisibleCount] = useState(initialBatchSize);
  const [loadingMore, setLoadingMore] = useState(false);

  const visible = useMemo(
    () => items.slice(0, visibleCount),
    [items, visibleCount]
  );

  const hasMore = visibleCount < items.length;

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((count) =>
        Math.min(count + initialBatchSize, items.length)
      );
      setLoadingMore(false);
    }, 600);
  };

  const resetPagination = () => setVisibleCount(initialBatchSize);

  useEffect(() => {
    resetPagination();
  }, [items, initialBatchSize]);

  return {
    visible,
    hasMore,
    loadingMore,
    handleLoadMore,
    resetPagination,
  };
};
