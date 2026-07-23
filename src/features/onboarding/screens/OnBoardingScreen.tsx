import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useOnboardingScreen } from "./hooks/useOnboardingScreen";
import { OnboardingBackground } from "../components/OnboardingBackground";
import { OnboardingPager } from "../components";

export const OnboardingScreen: React.FC = () => {
   const {
      width,
      height,
      isDark,
      styles,
      onboardingData,
      handlers,
   } = useOnboardingScreen();

   return (
      <View style={styles.container}>
         <StatusBar style={isDark ? "light" : "dark"} />
         <OnboardingBackground isDark={isDark} />

         <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
            <OnboardingPager
               slides={onboardingData.slides}
               scrollX={onboardingData.scrollX}
               currentIndex={onboardingData.currentIndex}
               isLastSlide={onboardingData.isLastSlide}
               width={width}
               height={height}
               flatListRef={onboardingData.flatListRef}
               handleScroll={onboardingData.handleScroll}
               onMomentumScrollEnd={onboardingData.onMomentumScrollEnd}
               onNext={onboardingData.goToNext}
               onComplete={handlers.handleComplete}
            />
         </SafeAreaView>
      </View>
   );
};

export default OnboardingScreen;
