import React, { useMemo } from "react";
import { View, Text, Image, Animated } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { OnboardingSlide as OnboardingSlideType } from "../../types/onboarding.types";
import { useOnboardingSlideAnimation } from "./hooks/useOnboardingSlideAnimation";
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
  const { colors } = useAppTheme();
  const styles = useMemo(
    () => createStyles({ width, viewportHeight, colors }),
    [viewportHeight, width, colors]
  );
  const showCounter = viewportHeight >= 680;
  const { imageStyle, titleStyle, descStyle } = useOnboardingSlideAnimation(index);

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
