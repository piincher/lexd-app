/**
 * OnboardingCTA - Modern call-to-action buttons
 */

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { AntDesign } from "@expo/vector-icons";

interface OnboardingCTAProps {
  isLastSlide: boolean;
  onPress: () => void;
  onSkip?: () => void;
  currentIndex: number;
  totalSlides: number;
}

export const OnboardingCTA: React.FC<OnboardingCTAProps> = ({
  isLastSlide,
  onPress,
  onSkip,
  currentIndex,
}) => {
  // Show skip button only on first 2 slides
  const showSkip = currentIndex < 2;

  if (isLastSlide) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={onPress}
          activeOpacity={0.9}
        >
          <Text style={styles.primaryText}>Commencer</Text>
          <AntDesign name="arrowright" size={20} color="#8B5CF6" style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {showSkip ? (
          <TouchableOpacity
            style={styles.skipButton}
            onPress={onSkip}
            activeOpacity={0.7}
          >
            <Text style={styles.skipText}>Passer</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}

        <TouchableOpacity
          style={[styles.button, styles.nextButton]}
          onPress={onPress}
          activeOpacity={0.9}
        >
          <Text style={styles.nextText}>Suivant</Text>
          <AntDesign name="right" size={16} color="#FFFFFF" style={styles.iconSmall} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    width: "100%",
  },
  nextButton: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingHorizontal: 28,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  skipText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
    fontFamily: Fonts.medium,
    fontWeight: "500",
  },
  primaryText: {
    color: "#8B5CF6",
    fontSize: 18,
    fontFamily: Fonts.bold,
    fontWeight: "700",
  },
  nextText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    fontWeight: "600",
  },
  icon: {
    marginLeft: 8,
  },
  iconSmall: {
    marginLeft: 6,
  },
  placeholder: {
    width: 60,
  },
});

export default OnboardingCTA;
