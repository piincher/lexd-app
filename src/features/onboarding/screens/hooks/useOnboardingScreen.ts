import { useCallback, useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@src/navigations/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useOnboarding } from "../../hooks/useOnboarding";
import { createStyles } from "../OnboardingScreen.styles";
import { getOnboardingBackgroundColors } from "../onboardingColors";

export const useOnboardingScreen = () => {
  const { width, height } = useWindowDimensions();
  const { isDark } = useAppTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const styles = useMemo(() => createStyles(), []);

  const onboardingData = useOnboarding(width);

  const backgroundColors = useMemo(
    () => getOnboardingBackgroundColors(onboardingData.bgColors, isDark),
    [onboardingData.bgColors, isDark],
  );

  const backgroundColor = onboardingData.scrollX.interpolate({
    inputRange: backgroundColors.map((_, i) => i * width),
    outputRange: backgroundColors,
  });

  const handleComplete = useCallback(() => {
    onboardingData.completeOnboarding();
    navigation.replace("HomeTab" as never);
  }, [onboardingData.completeOnboarding, navigation]);

  return {
    width,
    height,
    isDark,
    styles,
    onboardingData,
    backgroundColor,
    handlers: {
      handleComplete,
    },
  };
};
