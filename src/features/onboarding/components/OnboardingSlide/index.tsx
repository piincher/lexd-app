/**
 * OnboardingSlide - Modern slide component with animations
 */

import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  ViewStyle,
} from "react-native";
import { OnboardingSlide as OnboardingSlideType } from "../../types/onboarding.types";
import { Fonts } from "@src/constants/Fonts";
import { lightTheme } from "@src/constants/Theme";

interface OnboardingSlideProps {
  slide: OnboardingSlideType;
  index: number;
  totalSlides: number;
  width?: number;
}

const { width: screenWidth } = Dimensions.get("window");

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  slide,
  index,
  totalSlides,
  width = screenWidth,
}) => {
  // Animation values
  const imageAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const descAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Staggered entrance animation
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
  }, [index]);

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
      {/* Image Section */}
      <View style={styles.imageSection}>
        <Animated.View style={[styles.imageWrapper, imageStyle]}>
          <Image
            source={slide.image}
            style={styles.image}
            resizeMode="contain"
          />
        </Animated.View>
        
        {/* Decorative Elements */}
        <View style={[styles.decorationCircle, styles.circle1]} />
        <View style={[styles.decorationCircle, styles.circle2]} />
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        <Animated.Text style={[styles.title, titleStyle]}>
          {slide.title}
        </Animated.Text>
        
        <Animated.Text style={[styles.description, descStyle]}>
          {slide.description}
        </Animated.Text>

        {/* Slide Counter */}
        <View style={styles.counter}>
          <Text style={styles.counterText}>
            <Text style={styles.counterCurrent}>{index + 1}</Text>
            <Text style={styles.counterTotal}> / {totalSlides}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  imageSection: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  imageWrapper: {
    width: "85%",
    height: "85%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  decorationCircle: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  circle1: {
    width: 200,
    height: 200,
    top: "10%",
    right: "5%",
  },
  circle2: {
    width: 120,
    height: 120,
    bottom: "20%",
    left: "10%",
  },
  contentSection: {
    flex: 0.8,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    fontFamily: Fonts.black,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 36,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  description: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  counter: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
  },
  counterText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
  },
  counterCurrent: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  counterTotal: {
    color: "rgba(255, 255, 255, 0.7)",
  },
});

export default OnboardingSlide;
