/**
 * SubmitButton — Solid primary CTA
 * Hallmark · component: button · genre: modern-minimal
 * states: default · pressed · disabled · loading
 */

import React from "react";
import { Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { hapticMedium } from "@src/shared/lib/haptics";

interface SubmitButtonProps {
  onPress: () => void;
  isLoading: boolean;
  text?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  onPress,
  isLoading,
  text = "Continuer",
}) => {
  const { colors } = useAppTheme();

  const handlePress = () => {
    if (isLoading) return;
    hapticMedium();
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isLoading}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: isLoading
            ? colors.primary.light
            : colors.primary.main,
        },
        pressed && !isLoading && {
          backgroundColor: colors.primary.dark,
          transform: [{ scale: 0.98 }],
        },
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.text.inverse} />
      ) : (
        <>
          <Text style={[styles.text, { color: colors.text.inverse }]}>
            {text}
          </Text>
          <MaterialCommunityIcons
            name="arrow-right"
            size={20}
            color={colors.text.inverse}
          />
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 56,
    borderRadius: 16,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    letterSpacing: 0.3,
  },
});

export default SubmitButton;
