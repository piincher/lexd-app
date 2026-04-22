import { useRef, useState, useCallback, useMemo } from "react";
import { Animated, FlatList, NativeScrollEvent } from "react-native";
import type { NativeSyntheticEvent } from "react-native";
import { useAppLaunchStore } from "@src/store/AppLaunch";
import { ONBOARDING_SLIDES, BACKGROUND_COLORS } from "../constants";
import { OnboardingSlide } from "../types/onboarding.types";

type OnboardingScrollEvent = NativeSyntheticEvent<NativeScrollEvent>;

export interface UseOnboardingReturn {
  // State
  currentIndex: number;
  scrollX: Animated.Value;
  isLastSlide: boolean;
  slides: typeof ONBOARDING_SLIDES;
  bgColors: typeof BACKGROUND_COLORS;

  // Actions
  goToNext: () => void;
  goToPrevious: () => void;
  goToSlide: (index: number) => void;
  completeOnboarding: () => void;

  // Handlers
  handleScroll: (...args: unknown[]) => void;
  onMomentumScrollEnd: (event: OnboardingScrollEvent) => void;

  // Refs
  flatListRef: React.RefObject<FlatList<OnboardingSlide> | null>;
}

export const useOnboarding = (pageWidth: number): UseOnboardingReturn => {
  const flatListRef = useRef<FlatList<OnboardingSlide>>(null);
  const [scrollX] = useState(() => new Animated.Value(0));
  const [currentIndex, setCurrentIndex] = useState(0);
  const setIsAppLaunchFirst = useAppLaunchStore((state) => state.setIsAppLaunchFirst);

  const isLastSlide = useMemo(
    () => currentIndex === ONBOARDING_SLIDES.length - 1,
    [currentIndex]
  );

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < ONBOARDING_SLIDES.length) {
      flatListRef.current?.scrollToIndex({ index, animated: true });
      setCurrentIndex(index);
    }
  }, []);

  const goToNext = useCallback(() => {
    if (currentIndex < ONBOARDING_SLIDES.length - 1) {
      goToSlide(currentIndex + 1);
    }
  }, [currentIndex, goToSlide]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  }, [currentIndex, goToSlide]);

  const completeOnboarding = useCallback(() => {
    setIsAppLaunchFirst(false);
  }, [setIsAppLaunchFirst]);

  const handleScroll = useMemo(
    () =>
      Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
        useNativeDriver: false,
      }),
    [scrollX]
  );

  const onMomentumScrollEnd = useCallback((event: OnboardingScrollEvent) => {
    if (pageWidth <= 0) return;
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / pageWidth);
    const clampedIndex = Math.max(0, Math.min(newIndex, ONBOARDING_SLIDES.length - 1));
    setCurrentIndex(clampedIndex);
  }, [pageWidth]);

  return {
    currentIndex,
    scrollX,
    isLastSlide,
    slides: ONBOARDING_SLIDES,
    bgColors: BACKGROUND_COLORS,
    goToNext,
    goToPrevious,
    goToSlide,
    completeOnboarding,
    handleScroll,
    onMomentumScrollEnd,
    flatListRef,
  };
};
