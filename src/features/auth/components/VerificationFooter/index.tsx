import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface VerificationFooterProps {
  onSupport: () => void;
}

export const VerificationFooter: React.FC<VerificationFooterProps> = ({ onSupport }) => {
  const { colors, isDark } = useAppTheme();

  return (
    <Animated.View entering={FadeIn.delay(400).duration(400)} style={styles.footer}>
      <View style={[styles.helpCard, { backgroundColor: colors.background.paper, borderColor: colors.border }]}>
        <MaterialCommunityIcons name="lifebuoy" size={20} color={colors.primary.main} />
        <View style={styles.helpCopy}>
          <Text style={[styles.helpTitle, { color: colors.text.primary }]}>{"Besoin d'aide ?"}</Text>
          <Text style={[styles.helpText, { color: colors.text.secondary }]}>
            {"Contactez ChinaLink si le code n'arrive pas après quelques minutes."}
          </Text>
        </View>
        <Pressable
          onPress={onSupport}
          style={({ pressed }) => [styles.supportBtn, { borderColor: colors.primary.main }, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Contacter le support ChinaLink sur WhatsApp"
        >
          <MaterialCommunityIcons name="whatsapp" size={18} color={colors.primary.main} />
        </Pressable>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: "auto",
    paddingVertical: 24,
  },
  helpCard: {
    minHeight: 76,
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  helpCopy: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 13,
    fontFamily: Fonts.bold,
  },
  helpText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    lineHeight: 17,
    marginTop: 2,
  },
  supportBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});

export default VerificationFooter;
