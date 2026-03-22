/**
 * SubmitButton Component
 * Gradient submit button with loading state
 */

import React from "react";
import { Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Fonts } from "@src/constants/Fonts";

interface SubmitButtonProps {
  onPress: () => void;
  isLoading: boolean;
  text?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ onPress, isLoading, text = "Continuer" }) => (
  <Pressable
    onPress={onPress}
    disabled={isLoading}
    style={({ pressed }) => [
      styles.container,
      isLoading && styles.disabled,
      pressed && !isLoading && styles.pressed,
    ]}
  >
    <LinearGradient
      colors={isLoading ? ["#9CA3AF", "#9CA3AF"] : ["#22C55E", "#16A34A"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <>
          <Text style={styles.text}>{text}</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#FFF" />
        </>
      )}
    </LinearGradient>
  </Pressable>
);

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
  text: { fontSize: 16, fontFamily: Fonts.bold, color: "#FFF", letterSpacing: 0.3 },
});

export default SubmitButton;
