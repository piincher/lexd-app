/**
 * usePublicHomeScroll - Scroll animation hook for PublicHomeScreen
 */

import { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate } from 'react-native-reanimated';

export const usePublicHomeScroll = () => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 100], [0, 1], 'clamp'),
    transform: [
      { translateY: interpolate(scrollY.value, [0, 100], [-20, 0], 'clamp') },
    ],
  }));

  return { scrollHandler, headerStyle };
};

export default usePublicHomeScroll;
