import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface VerificationHeaderProps {
  maskedPhone: string;
}

export const VerificationHeader: React.FC<VerificationHeaderProps> = ({ maskedPhone }) => {
  const { colors } = useAppTheme();

  return (
    <Animated.View entering={FadeInDown.delay(100).duration(500).springify()} style={styles.heroSection}>
      <LinearGradient
        colors={["rgba(34,197,94,0.12)", "rgba(34,197,94,0.04)"]}
        style={styles.heroIconCircle}
      >
        <MaterialCommunityIcons name="message-lock-outline" size={36} color="#22C55E" />
      </LinearGradient>

      <Text style={[styles.heroTitle, { color: colors.text.primary }]}>Verification</Text>
      <Text style={[styles.heroSubtitle, { color: colors.text.secondary }]}>
        Entrez le code a 6 chiffres envoye au
      </Text>
      <View style={styles.phoneHighlight}>
        <MaterialCommunityIcons name="phone-outline" size={14} color="#22C55E" />
        <Text style={[styles.phoneText, { color: colors.text.primary }]}>{maskedPhone}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    alignItems: "center",
    marginTop: 24,
    paddingHorizontal: 20,
  },
  heroIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 26,
    fontFamily: Fonts.bold,
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    textAlign: "center",
    lineHeight: 20,
  },
  phoneHighlight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
    backgroundColor: "rgba(34,197,94,0.08)",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  phoneText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    letterSpacing: 1,
  },
});

export default VerificationHeader;
