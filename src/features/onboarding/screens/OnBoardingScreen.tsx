/**
 * OnboardingScreen - Modern onboarding experience
 * Features: Animated backgrounds, smooth transitions, progress indicators
 */

import React, { useCallback } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
} from "react-native";
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from "react-native-safe-area-context";
import { PublicStackScreenProps } from "@src/navigations/type";
import { useOnboarding } from "../hooks/useOnboarding";
import { OnboardingSlide } from "../components/OnboardingSlide";
import { OnboardingIndicator } from "../components/OnboardingIndicator";
import { OnboardingCTA } from "../components/OnboardingCTA";
import { OnboardingProgress } from "../components/OnboardingProgress";
import { OnboardingBackground } from "../components/OnboardingBackground";

interface Props extends PublicStackScreenProps<"OnBoarding"> {}

const { width, height } = Dimensions.get("window");

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList) as any;

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const {
    scrollX,
    currentIndex,
    isLastSlide,
    slides,
    bgColors,
    handleScroll,
    onMomentumScrollEnd,
    completeOnboarding,
    goToNext,
    flatListRef,
  } = useOnboarding();

  const handleComplete = useCallback(() => {
    completeOnboarding();
    navigation.replace("CheckRoute");
  }, [completeOnboarding, navigation]);

  // Interpolate background color based on scroll position
  const backgroundColor = scrollX.interpolate({
    inputRange: bgColors.map((_, i) => i * width),
    outputRange: bgColors,
  });

  const renderItem = useCallback(
    ({ item, index }: { item: typeof slides[0]; index: number }) => (
      <OnboardingSlide
        slide={item}
        index={index}
        totalSlides={slides.length}
        width={width}
      />
    ),
    [slides.length]
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Animated Background */}
      <OnboardingBackground backgroundColor={backgroundColor} />

      <SafeAreaView style={styles.safeArea}>
        {/* Progress Bar */}
        <OnboardingProgress
          currentIndex={currentIndex}
          totalSlides={slides.length}
          scrollX={scrollX}
          width={width}
        />

        {/* Slides */}
        <AnimatedFlashList
          ref={flatListRef}
          data={slides}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={handleScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          scrollEventThrottle={16}
          getItemLayout={(_: any, index: number) => ({
            length: width,
            offset: width * index,
            index,
          })}
          contentContainerStyle={styles.flatListContent}
        />

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Dot Indicators */}
          <OnboardingIndicator
            scrollX={scrollX}
            count={slides.length}
            currentIndex={currentIndex}
            width={width}
          />

          {/* CTA Buttons */}
          <OnboardingCTA
            isLastSlide={isLastSlide}
            onPress={isLastSlide ? handleComplete : goToNext}
            onSkip={handleComplete}
            currentIndex={currentIndex}
            totalSlides={slides.length}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  flatListContent: {
    flexGrow: 1,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 24,
  },
});

export default OnboardingScreen;
