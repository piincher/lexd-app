/**
 * LoginFooter — Minimal trust footer
 * Hallmark · component: footer · genre: modern-minimal
 */

import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Fonts } from "@src/constants/Fonts";

interface LoginFooterProps {
  onTermsPress?: () => void;
  onPrivacyPress?: () => void;
}

export const LoginFooter: React.FC<LoginFooterProps> = ({
  onTermsPress,
  onPrivacyPress,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.termsText, { color: colors.text.secondary }]}>
        En vous connectant, vous acceptez nos{" "}
        <Pressable onPress={onTermsPress} hitSlop={4}>
          <Text style={[styles.link, { color: colors.primary.main }]}>
            Conditions
          </Text>
        </Pressable>{" "}
        et notre{" "}
        <Pressable onPress={onPrivacyPress} hitSlop={4}>
          <Text style={[styles.link, { color: colors.primary.main }]}>
            Confidentialité
          </Text>
        </Pressable>
      </Text>

      <View style={styles.creditRow}>
        <Text style={[styles.creditText, { color: colors.text.disabled }]}>
          Made with{" "}
        </Text>
        <MaterialCommunityIcons name="heart" size={10} color={colors.status.error} />
        <Text style={[styles.creditText, { color: colors.text.disabled }]}>
          {" "}by nuvotech.tech
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 32,
  },
  termsText: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    textAlign: "center",
    lineHeight: 18,
  },
  link: {
    fontSize: 11,
    fontFamily: Fonts.medium,
  },
  creditRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  creditText: {
    fontSize: 10,
    fontFamily: Fonts.regular,
  },
});

export default LoginFooter;
