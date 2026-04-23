/**
 * SubmitButton Component
 * Gradient submit button with loading state
 */

import React from "react";
import { Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import { hapticMedium } from "@src/shared/lib/haptics";

interface SubmitButtonProps {
  onPress: () => void;
  isLoading: boolean;
  text?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ onPress, isLoading, text = "Continuer" }) => {
  const handlePress = () => {
    hapticMedium();
    onPress();
  };

  return (
  <Pressable
    onPress={handlePress}
    disabled={isLoading}
    style={({ pressed }) => [
      styles.container,
      isLoading && styles.disabled,
      pressed && !isLoading && styles.pressed,
    ]}
  >
    <LinearGradient
      colors={isLoading ? [Theme.colors.text.disabled, Theme.colors.text.disabled] : [Theme.colors.primary.main, Theme.colors.primary.dark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={Theme.colors.text.inverse} />
      ) : (
        <>
          <Text style={styles.text}>{text}</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color={Theme.colors.text.inverse} />
        </>
      )}
    </LinearGradient>
  </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 20, borderRadius: 16, overflow: "hidden" },
  disabled: { opacity: 0.7 },
  pressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
  },
  text: { fontSize: 16, fontFamily: Fonts.bold, color: Theme.colors.text.inverse, letterSpacing: 0.3 },
});

export default SubmitButton;
