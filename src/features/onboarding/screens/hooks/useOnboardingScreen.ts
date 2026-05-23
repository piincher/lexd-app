import { useCallback, useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@src/navigations/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useOnboarding } from "../../hooks/useOnboarding";
import { createStyles } from "../OnboardingScreen.styles";

export const useOnboardingScreen = () => {
  const { width, height } = useWindowDimensions();
  const { isDark } = useAppTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const styles = useMemo(() => createStyles(), []);

  const onboardingData = useOnboarding(width);

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
    handlers: {
      handleComplete,
    },
  };
};
