/**
 * SecurityNote — Subtle trust signal
 * Hallmark · component: micro-copy · genre: modern-minimal
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

export const SecurityNote: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="lock-check-outline"
        size={14}
        color={colors.text.disabled}
      />
      <Text style={[styles.text, { color: colors.text.disabled }]}>
        Vérification sécurisée par WhatsApp
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 20,
  },
  text: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    letterSpacing: 0.2,
  },
});

export default SecurityNote;
