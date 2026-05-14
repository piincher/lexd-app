/**
 * OnboardingCTA - Modern call-to-action buttons
 */

import React, { useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./OnboardingCTA.styles";

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
  const { width } = useWindowDimensions();
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const isNarrow = width < 360;
  // Show skip button on all slides except the last one
  const showSkip = !isLastSlide;

  if (isLastSlide) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={onPress}
          activeOpacity={0.9}
          accessibilityRole="button"
        >
          <Text
            style={styles.primaryText}
            numberOfLines={1}
            adjustsFontSizeToFit
            maxFontSizeMultiplier={1.15}
          >
            Commencer
          </Text>
          <AntDesign name="arrow-right" size={20} color={colors.primary.main} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.skipSlot}>
          {showSkip ? (
            <TouchableOpacity
              style={styles.skipButton}
              onPress={onSkip}
              activeOpacity={0.7}
              accessibilityRole="button"
            >
              <Text
                style={styles.skipText}
                numberOfLines={1}
                adjustsFontSizeToFit
                maxFontSizeMultiplier={1.15}
              >
                Passer
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.nextSlot}>
          <TouchableOpacity
            style={[styles.button, styles.nextButton, isNarrow && styles.nextButtonCompact]}
            onPress={onPress}
            activeOpacity={0.9}
            accessibilityRole="button"
          >
            <Text
              style={styles.nextText}
              numberOfLines={1}
              adjustsFontSizeToFit
              maxFontSizeMultiplier={1.15}
            >
              Suivant
            </Text>
            <AntDesign name="right" size={16} color={colors.text.inverse} style={styles.iconSmall} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnboardingCTA;
