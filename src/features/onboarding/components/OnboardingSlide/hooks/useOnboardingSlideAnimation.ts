import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import type { ViewStyle } from "react-native";

export const useOnboardingSlideAnimation = (index: number) => {
  const imageAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const descAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.stagger(120, [
      Animated.timing(imageAnim, {
        toValue: 1,
        useNativeDriver: true,
        duration: 450,
        easing: Easing.out(Easing.cubic),
        delay: 80,
      }),
      Animated.timing(titleAnim, {
        toValue: 1,
        useNativeDriver: true,
        duration: 400,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(descAnim, {
        toValue: 1,
        useNativeDriver: true,
        duration: 400,
        easing: Easing.out(Easing.cubic),
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
        translateY: imageAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [24, 0],
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
          outputRange: [16, 0],
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
          outputRange: [12, 0],
        }),
      },
    ],
    opacity: descAnim,
  };

  return { imageStyle, titleStyle, descStyle };
