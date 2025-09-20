import { useEffect } from 'react';

export const useAutoPlay = (
  nextSlide: () => void,
  itemCount: number,
  interval: number = 4000,
  enabled: boolean = true
) => {
  useEffect(() => {
    if (!enabled || !itemCount || itemCount <= 1) return;
    
    const intervalId = setInterval(nextSlide, interval);
    return () => clearInterval(intervalId);
  }, [nextSlide, itemCount, interval, enabled]);
};