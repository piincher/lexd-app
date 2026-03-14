/**
 * useTimelineAnimation - Animation states for timeline progress
 */
import { useEffect, useState } from 'react';

export const useTimelineAnimation = (progressPercentage: number, delay = 300) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercentage);
    }, delay);
    return () => clearTimeout(timer);
  }, [progressPercentage, delay]);

  return { animatedProgress };
};
