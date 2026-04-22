import React, { useEffect, useMemo, useRef } from "react";
import { View, Text, Image, Animated } from "react-native";
import type { ViewStyle } from "react-native";
import { OnboardingSlide as OnboardingSlideType } from "../../types/onboarding.types";
import { createStyles } from "./OnboardingSlide.styles";

interface OnboardingSlideProps {
  slide: OnboardingSlideType;
  index: number;
  totalSlides: number;
  width: number;
  viewportHeight: number;
}

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  slide,
  index,
  totalSlides,
  width,
  viewportHeight,
}) => {
  const styles = useMemo(
    () => createStyles({ width, viewportHeight }),
    [viewportHeight, width]
  );
  const showCounter = viewportHeight >= 680;

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

  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.imageSection}>
        <Animated.View style={[styles.imageWrapper, imageStyle]}>
          <Image source={slide.image} style={styles.image} resizeMode="contain" />
        </Animated.View>

        <View style={[styles.decorationCircle, styles.circle1]} />
        <View style={[styles.decorationCircle, styles.circle2]} />
      </View>

      <View style={styles.contentSection}>
        <Animated.Text
          style={[styles.title, titleStyle]}
          numberOfLines={2}
          adjustsFontSizeToFit
          maxFontSizeMultiplier={1.15}
        >
          {slide.title}
        </Animated.Text>
        
        <Animated.Text
          style={[styles.description, descStyle]}
          numberOfLines={3}
          adjustsFontSizeToFit
          maxFontSizeMultiplier={1.12}
        >
          {slide.description}
        </Animated.Text>

        {showCounter ? (
          <View style={styles.counter}>
            <Text style={styles.counterText} maxFontSizeMultiplier={1.1}>
              <Text style={styles.counterCurrent}>{index + 1}</Text>
              <Text style={styles.counterTotal}> / {totalSlides}</Text>
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default OnboardingSlide;
