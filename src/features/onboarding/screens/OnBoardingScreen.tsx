/**
 * OnboardingScreen - Main onboarding screen
 * Following SRP: Screen is a thin wrapper (< 100 lines)
 * Composition only - delegates to components and hooks
 */

import React, { useCallback } from "react";
import { View, useWindowDimensions, Animated } from "react-native";
import { PublicStackScreenProps } from "@src/navigations/type";
import { useOnboarding } from "../hooks/useOnboarding";
import { OnboardingBackdrop } from "../components/OnboardingBackdrop";
import { OnboardingSquare } from "../components/OnboardingSquare";
import { OnboardingSlide } from "../components/OnboardingSlide";
import { OnboardingIndicator } from "../components/OnboardingIndicator";
import { OnboardingCTA } from "../components/OnboardingCTA";
import { styles } from "./OnboardingScreen.styles";

interface Props extends PublicStackScreenProps<"OnBoarding"> {}

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const { 
    scrollX, 
    currentIndex, 
    isLastSlide, 
    slides, 
    bgColors,
    handleScroll,
    onMomentumScrollEnd,
    completeOnboarding,
    flatListRef,
  } = useOnboarding();

  const handleComplete = useCallback(() => {
    completeOnboarding();
    navigation.replace("CheckRoute");
  }, [completeOnboarding, navigation]);

  return (
    <View style={styles.container}>
      <OnboardingBackdrop scrollX={scrollX} colors={bgColors} />
      <OnboardingSquare scrollX={scrollX} />
      
      <Animated.FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={slides}
        renderItem={({ item }) => <OnboardingSlide slide={item} width={width} />}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
        showsHorizontalScrollIndicator={false}
      />
      
      <OnboardingIndicator scrollX={scrollX} count={slides.length} currentIndex={currentIndex} />
      <OnboardingCTA isLastSlide={isLastSlide} onPress={handleComplete} />
    </View>
  );
};

export default OnboardingScreen;
