import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface VerificationResendProps {
  countdown: number;
  canResend: boolean;
  onResend: () => void;
}

export const VerificationResend: React.FC<VerificationResendProps> = ({
  countdown,
  canResend,
  onResend,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.resendSection}>
      <Text style={[styles.resendLabel, { color: colors.text.secondary }]}>
        Vous n'avez pas recu le code ?
      </Text>
      <View style={styles.resendRow}>
        {countdown > 0 && (
          <View style={styles.countdownBadge}>
            <MaterialCommunityIcons name="timer-outline" size={14} color={colors.text.secondary} />
            <Text style={[styles.countdownText, { color: colors.text.secondary }]}>
              {countdown}s
            </Text>
          </View>
        )}
        <Pressable
          onPress={onResend}
          disabled={!canResend}
          style={({ pressed }) => [
            styles.resendBtn,
            canResend && { backgroundColor: "rgba(34,197,94,0.1)" },
            pressed && canResend && { opacity: 0.7 },
          ]}
        >
          <MaterialCommunityIcons
            name="refresh"
            size={16}
            color={canResend ? "#22C55E" : colors.text.disabled}
          />
          <Text
            style={[
              styles.resendBtnText,
              { color: canResend ? "#22C55E" : colors.text.disabled },
            ]}
          >
            Renvoyer
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resendSection: {
    alignItems: "center",
    marginTop: 24,
  },
  resendLabel: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    marginBottom: 10,
  },
  resendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  countdownBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0,0,0,0.04)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  countdownText: {
    fontSize: 13,
    fontFamily: Fonts.bold,
  },
  resendBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  resendBtnText: {
    fontSize: 13,
    fontFamily: Fonts.bold,
  },
});

export default VerificationResend;
