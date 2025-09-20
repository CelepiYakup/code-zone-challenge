import { useState, useEffect } from "react";

interface Tag {
  name: string;
  active?: boolean;
}

export const useFilters = <T>(
  items: T[],
  filterFunction: (items: T[], selectedTag: string) => T[],
  initialTags: Tag[] = []
) => {
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [filtered, setFiltered] = useState<T[]>(items);

  useEffect(() => {
    setFiltered(items);
  }, [items]);

  useEffect(() => {
    const activeTag = tags.find(tag => tag.active);
    if (activeTag && items.length > 0) {
      const filteredItems = filterFunction(items, activeTag.name);
      setFiltered(filteredItems);
    } else {
      setFiltered(items);
    }
  }, [tags, items, filterFunction]);

  const handleTag = (idx: number) => {
    const nextTags = tags.map((t, i) => ({ ...t, active: i === idx }));
    setTags(nextTags);
  };

  const initializeTags = (newTags: Tag[]) => {
    setTags(newTags);
  };

  return {
    tags,
    filtered,
    setFiltered,
    handleTag,
    initializeTags,
    setTags,
  };
};