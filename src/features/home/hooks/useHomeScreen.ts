import { useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { interpolate, Extrapolate } from "react-native-reanimated";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "@src/providers";
import createStyles from "../screens/HomeScreen.styles";

interface UseHomeScreenReturn {
  scrollRef: React.RefObject<ScrollView>;
  scrollHandler: (event: any) => void;
  backButtonStyle: any;
  whatsappStyle: any;
  handleBackToTop: () => void;
  handlePressBlockOne: () => void;
  handlePressBlockTwo: () => void;
  styles: any;
  colors: any;
}

export const useHomeScreen = (): UseHomeScreenReturn => {
  const navigation = useNavigation();
  const scrollY = useSharedValue(0);
  const scrollRef = useAnimatedRef<ScrollView>();
  const headerHeight = useSharedValue(100);
  const isScrolled = useSharedValue(false);
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors);

  const handlePressBlockOne = () => {
    navigation.navigate("faq");
  };

  const handlePressBlockTwo = () => {
    navigation.navigate("AboutUs");
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      headerHeight.value = interpolate(
        event.contentOffset.y,
        [0, 100],
        [100, 70],
        Extrapolate.CLAMP
      );
      isScrolled.value = event.contentOffset.y > 800;
    },
  });

  const backButtonStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isScrolled.value ? 1 : 0),
    transform: [{ scale: withSpring(isScrolled.value ? 1 : 0.8) }],
  }));

  const whatsappStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(isScrolled.value ? 1 : 0.8) }],
  }));

  const handleBackToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return {
    scrollRef: scrollRef as unknown as React.RefObject<ScrollView>,
    scrollHandler,
    backButtonStyle,
    whatsappStyle,
    handleBackToTop,
    handlePressBlockOne,
    handlePressBlockTwo,
    styles,
    colors,
  };
};
