import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface VerificationHeaderProps {
  maskedPhone: string;
  onEditPhone: () => void;
}

export const VerificationHeader: React.FC<VerificationHeaderProps> = ({ maskedPhone, onEditPhone }) => {
  const { colors, isDark } = useAppTheme();

  return (
    <Animated.View entering={FadeInDown.delay(100).duration(500).springify()} style={styles.heroSection}>
      <LinearGradient
        colors={isDark ? [`${colors.primary.main}2E`, `${colors.status.info}1A`] : [colors.feedback.successBg, colors.feedback.infoBg]}
        style={styles.heroIconCircle}
      >
        <MaterialCommunityIcons name="shield-key-outline" size={34} color={colors.primary.main} />
      </LinearGradient>

      <Text style={[styles.heroTitle, { color: colors.text.primary }]}>Vérification sécurisée</Text>
      <Text style={[styles.heroSubtitle, { color: colors.text.secondary }]}>
        Entrez le code à 6 chiffres envoyé par WhatsApp ou SMS.
      </Text>
      <Pressable
        onPress={onEditPhone}
        style={[styles.phoneHighlight, { backgroundColor: colors.background.paper, borderColor: colors.border }]}
        accessibilityRole="button"
        accessibilityLabel="Modifier le numéro de téléphone"
      >
        <View style={[styles.phoneIcon, { backgroundColor: colors.primary[50] }]}>
          <MaterialCommunityIcons name="cellphone-check" size={16} color={colors.primary.main} />
        </View>
        <View style={styles.phoneCopy}>
          <Text style={[styles.phoneLabel, { color: colors.text.secondary }]}>Numéro de connexion</Text>
          <Text style={[styles.phoneText, { color: colors.text.primary }]}>{maskedPhone}</Text>
        </View>
        <MaterialCommunityIcons name="pencil-outline" size={18} color={colors.text.secondary} />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    alignItems: "center",
    marginTop: 18,
  },
  heroIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  heroTitle: {
    fontSize: 25,
    fontFamily: Fonts.bold,
    marginBottom: 6,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 320,
  },
  phoneHighlight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    width: "100%",
    minHeight: 58,
  },
  phoneIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  phoneCopy: {
    flex: 1,
  },
  phoneLabel: {
    fontSize: 11,
    fontFamily: Fonts.medium,
    marginBottom: 3,
  },
  phoneText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
  },
});

export default VerificationHeader;
