import React from "react";
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { RADIUS } from "@src/shared/ui/designLanguage";

interface VerificationResendProps {
  countdown: number;
  canResend: boolean;
  isResending: boolean;
  onResend: () => void;
}

export const VerificationResend: React.FC<VerificationResendProps> = ({
  countdown,
  canResend,
  isResending,
  onResend,
}) => {
  const { colors, isDark } = useAppTheme();
  const resendEnabled = canResend && !isResending;

  return (
    <View style={styles.resendSection}>
      <Text style={[styles.resendLabel, { color: colors.text.secondary }]}>
        {"Vous n'avez pas reçu le code ?"}
      </Text>
      <View style={styles.resendRow}>
        {countdown > 0 && (
          <View style={[styles.countdownBadge, { backgroundColor: colors.background.paper }]}>
            <MaterialCommunityIcons name="timer-outline" size={14} color={colors.text.secondary} />
            <Text style={[styles.countdownText, { color: colors.text.secondary }]}>
              Disponible dans {countdown}s
            </Text>
          </View>
        )}
        <Pressable
          onPress={onResend}
          disabled={!resendEnabled}
          style={({ pressed }) => [
            styles.resendBtn,
            resendEnabled && { backgroundColor: colors.primary[50] },
            pressed && resendEnabled && { opacity: 0.7 },
          ]}
        >
          {isResending ? (
            <ActivityIndicator size="small" color={colors.primary.main} />
          ) : (
            <MaterialCommunityIcons
              name="refresh"
              size={16}
              color={resendEnabled ? colors.primary.main : colors.text.disabled}
            />
          )}
          <Text
            style={[
              styles.resendBtnText,
              { color: resendEnabled ? colors.primary.main : colors.text.disabled },
            ]}
          >
            {isResending ? "Envoi..." : "Renvoyer le code"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resendSection: {
    alignItems: "center",
    marginTop: 22,
  },
  resendLabel: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    marginBottom: 10,
  },
  resendRow: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  countdownBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.badge,
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
    borderRadius: RADIUS.control,
  },
  resendBtnText: {
    fontSize: 13,
    fontFamily: Fonts.bold,
  },
});

export default VerificationResend;
