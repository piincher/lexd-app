import React, { useCallback, useMemo } from "react";
import { StatusBar, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useOnboarding } from "../hooks/useOnboarding";
import { OnboardingBackground } from "../components/OnboardingBackground";
import { OnboardingPager } from "../components";
import { createStyles } from "./OnboardingScreen.styles";
import { getOnboardingBackgroundColors } from "./onboardingColors";

type Props = RootStackScreenProps<"OnBoarding">;

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
   const { width, height } = useWindowDimensions();
   const { isDark } = useAppTheme();
   const styles = useMemo(() => createStyles(), []);

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
   } = useOnboarding(width);

   const backgroundColors = useMemo(
      () => getOnboardingBackgroundColors(bgColors, isDark),
      [bgColors, isDark],
   );

   const handleComplete = useCallback(() => {
      completeOnboarding();
      navigation.replace("HomeTab", undefined);
   }, [completeOnboarding, navigation]);

   const backgroundColor = scrollX.interpolate({
      inputRange: backgroundColors.map((_, i) => i * width),
      outputRange: backgroundColors,
   });

   return (
      <View style={styles.container}>
         <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
         <OnboardingBackground backgroundColor={backgroundColor} />

         <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
            <OnboardingPager
               slides={slides}
               scrollX={scrollX}
               currentIndex={currentIndex}
               isLastSlide={isLastSlide}
               width={width}
               height={height}
               flatListRef={flatListRef}
               handleScroll={handleScroll}
               onMomentumScrollEnd={onMomentumScrollEnd}
               onNext={goToNext}
               onComplete={handleComplete}
            />
         </SafeAreaView>
      </View>
   );
};

export default OnboardingScreen;
