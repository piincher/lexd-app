import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import type { ViewStyle } from "react-native";

export const useOnboardingSlideAnimation = (index: number) => {
  const imageAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const descAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.stagger(150, [
      Animated.spring(imageAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
      Animated.spring(titleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
      Animated.spring(descAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
    ]);

    animation.start();

    return () => {
      animation.stop();
    };
  }, [descAnim, imageAnim, index, titleAnim]);

  const imageStyle: Animated.WithAnimatedObject<ViewStyle> = {
    transform: [
      {
        scale: imageAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
      {
        translateY: imageAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
    opacity: imageAnim,
  };

  const titleStyle: Animated.WithAnimatedObject<ViewStyle> = {
    transform: [
      {
        translateY: titleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [30, 0],
        }),
      },
    ],
    opacity: titleAnim,
  };

  const descStyle: Animated.WithAnimatedObject<ViewStyle> = {
    transform: [
      {
        translateY: descAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
    opacity: descAnim,
  };

  return { imageStyle, titleStyle, descStyle };
};
