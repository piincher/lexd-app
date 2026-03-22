/**
 * OnboardingCTA - Call-to-action buttons for onboarding
 */

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { COLORS } from "@src/constants/Colors";

interface OnboardingCTAProps {
  isLastSlide: boolean;
  onPress: () => void;
  onSkip?: () => void;
}

export const OnboardingCTA: React.FC<OnboardingCTAProps> = ({
  isLastSlide,
  onPress,
  onSkip,
}) => {
  if (isLastSlide) {
    return (
      <View style={[styles.container, styles.lastSlideContainer]}>
        <TouchableOpacity
          style={[styles.button, styles.primary]}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryText}>Commencer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.row]}>
      {onSkip && (
        <TouchableOpacity style={styles.skip} onPress={onSkip} activeOpacity={0.8}>
          <Text style={styles.skipText}>Passer</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={[styles.button, styles.next]} onPress={onPress} activeOpacity={0.8}>
        <Text style={styles.nextText}>Suivant</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  lastSlideContainer: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  primary: {
    backgroundColor: "#FFFFFF",
    minWidth: 180,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  primaryText: {
    color: COLORS.heading,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Fonts.medium,
  },
  next: {
    backgroundColor: "#FFFFFF",
    minWidth: 120,
  },
  nextText: {
    color: COLORS.heading,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Fonts.medium,
  },
  skip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: Fonts.medium,
    opacity: 0.9,
  },
});

export default OnboardingCTA;
