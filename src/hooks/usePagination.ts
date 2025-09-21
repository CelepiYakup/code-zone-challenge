import { useMemo, useState, useEffect, useCallback } from "react";

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
  const resetPagination = useCallback(() => {
    setVisibleCount(initialBatchSize);
  }, [initialBatchSize]);

  useEffect(() => {
    resetPagination();
  }, [items, resetPagination]);

  return {
    visible,
    hasMore,
    loadingMore,
    handleLoadMore,
    resetPagination,
  };
};