import { useState, useEffect } from 'react';

export const useSlider = <T>(items: T[]) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === Math.max(items.length - 1, 0) ? 0 : prev + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const activeItem = items.length
    ? items[Math.min(currentSlide, items.length - 1)]
    : undefined;

  useEffect(() => {
    if (currentSlide > items.length - 1) {
      setCurrentSlide(0);
    }
  }, [items.length, currentSlide]);

  return {
    currentSlide,
    nextSlide,
    goToSlide,
    activeItem,
    hasItems: items.length > 0,
    hasMultipleItems: items.length > 1
  };
};