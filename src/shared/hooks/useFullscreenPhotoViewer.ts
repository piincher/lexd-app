import { useState, useCallback } from 'react';

export const useFullscreenPhotoViewer = (photoCount: number) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const open = useCallback((index = 0) => {
    setCurrentIndex(Math.max(0, Math.min(index, photoCount - 1)));
    setIsVisible(true);
  }, [photoCount]);

  const close = useCallback(() => {
    setIsVisible(false);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photoCount);
  }, [photoCount]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + photoCount) % photoCount);
  }, [photoCount]);

  return {
    isVisible,
    currentIndex,
    totalCount: photoCount,
    open,
    close,
    goNext,
    goPrev,
    setIndex: setCurrentIndex,
  };
};
