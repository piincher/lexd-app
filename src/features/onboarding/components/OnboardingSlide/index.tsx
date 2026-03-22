/**
 * OnboardingSlide - Individual slide content component
 * Displays image, title and description for each onboarding slide
 */

import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { OnboardingSlide as OnboardingSlideType } from "../../types/onboarding.types";
import { Fonts } from "@src/constants/Fonts";
import { lightTheme } from "@src/constants/Theme";

interface OnboardingSlideProps {
  slide: OnboardingSlideType;
  width?: number;
}

const { width: screenWidth } = Dimensions.get("window");

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  slide,
  width = screenWidth,
}) => {
  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.imageContainer}>
        <Image
          source={slide.image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: lightTheme.spacing.lg,
  },
  imageContainer: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "70%",
    height: "70%",
  },
  contentContainer: {
    flex: 0.3,
    alignItems: "center",
    paddingHorizontal: lightTheme.spacing.xl,
  },
  title: {
    color: lightTheme.colors.text.inverse,
    fontSize: lightTheme.typography.h2.fontSize,
    fontWeight: lightTheme.typography.h2.fontWeight as "700",
    fontFamily: Fonts.black,
    textAlign: "center",
    marginBottom: lightTheme.spacing.md,
  },
  description: {
    color: lightTheme.colors.text.inverse,
    fontSize: lightTheme.typography.body.fontSize,
    fontFamily: Fonts.regular,
    textAlign: "center",
    lineHeight: lightTheme.typography.body.lineHeight,
  },
});

export default OnboardingSlide;
