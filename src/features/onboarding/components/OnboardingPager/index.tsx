import React, { useCallback, useMemo } from "react";
import { Animated, FlatList, NativeScrollEvent, View } from "react-native";
import type { NativeSyntheticEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OnboardingSlide as OnboardingSlideType } from "../../types";
import { OnboardingCTA } from "../OnboardingCTA";
import { OnboardingIndicator } from "../OnboardingIndicator";
import { OnboardingProgress } from "../OnboardingProgress";
import { OnboardingSlide } from "../OnboardingSlide";
import { createStyles } from "./OnboardingPager.styles";

type OnboardingScrollEvent = NativeSyntheticEvent<NativeScrollEvent>;

interface OnboardingPagerProps {
  slides: OnboardingSlideType[];
  scrollX: Animated.Value;
  currentIndex: number;
  isLastSlide: boolean;
  width: number;
  height: number;
  flatListRef: React.RefObject<FlatList<OnboardingSlideType> | null>;
  handleScroll: (...args: unknown[]) => void;
  onMomentumScrollEnd: (event: OnboardingScrollEvent) => void;
  onNext: () => void;
  onComplete: () => void;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<OnboardingSlideType>);

export const OnboardingPager: React.FC<OnboardingPagerProps> = ({
  slides,
  scrollX,
  currentIndex,
  isLastSlide,
  width,
  height,
  flatListRef,
  handleScroll,
  onMomentumScrollEnd,
  onNext,
  onComplete,
}) => {
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(insets), [insets]);

  const renderItem = useCallback(
    ({ item, index }: { item: OnboardingSlideType; index: number }) => (
      <OnboardingSlide
        slide={item}
        index={index}
        totalSlides={slides.length}
        width={width}
        viewportHeight={height}
      />
    ),
    [height, slides.length, width]
  );

  return (
    <>
      <OnboardingProgress
        currentIndex={currentIndex}
        totalSlides={slides.length}
        scrollX={scrollX}
        width={width}
      />

      <AnimatedFlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        style={styles.pager}
        onScroll={handleScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
        removeClippedSubviews={false}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        contentContainerStyle={styles.pagerContent}
      />

      <View style={styles.bottomSection}>
        <OnboardingIndicator
          scrollX={scrollX}
          count={slides.length}
          currentIndex={currentIndex}
          width={width}
        />

        <OnboardingCTA
          isLastSlide={isLastSlide}
          onPress={isLastSlide ? onComplete : onNext}
          onSkip={onComplete}
          currentIndex={currentIndex}
          totalSlides={slides.length}
        />
      </View>
    </>
  );
};

export default OnboardingPager;
