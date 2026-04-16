import {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface UseHomeScreenReturn {
  scrollHandler: (event: any) => void;
  whatsappStyle: any;
}

export const useHomeScreen = (): UseHomeScreenReturn => {
  const scrollY = useSharedValue(0);
  const isScrolled = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
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

  return {
    scrollHandler,
    whatsappStyle,
  };
};
