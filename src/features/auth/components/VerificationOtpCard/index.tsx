import React from "react";
import { StyleSheet, Platform, Text, View } from "react-native";
import type { TextInput } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Fonts } from "@src/constants/Fonts";
import { VerificationOtpInputs } from "../VerificationOtpInputs";
import { VerificationConfirmButton } from "../VerificationConfirmButton";
import { VerificationResend } from "../VerificationResend";

interface VerificationOtpCardProps {
  otp: string[];
  activeIndex: number;
  setInputRef: (index: number, ref: TextInput | null) => void;
  onOtpChange: (value: string, index: number) => void;
  onKeyPress: (key: string, index: number) => void;
  errorMessage: string;
  isComplete: boolean;
  isPending: boolean;
  onConfirm: () => void;
  countdown: number;
  canResend: boolean;
  isResending: boolean;
  onResend: () => void;
}

export const VerificationOtpCard: React.FC<VerificationOtpCardProps> = ({
  otp,
  activeIndex,
  setInputRef,
  onOtpChange,
  onKeyPress,
  errorMessage,
  isComplete,
  isPending,
  onConfirm,
  countdown,
  canResend,
  isResending,
  onResend,
}) => {
  const { colors, isDark } = useAppTheme();
  const cardBg = isDark ? "rgba(255,255,255,0.06)" : "#FFFFFF";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";

  return (
    <Animated.View
      entering={FadeInDown.delay(200).duration(500).springify()}
      style={[styles.otpCard, { backgroundColor: cardBg, borderColor: cardBorder }]}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { color: colors.text.primary }]}>Code de connexion</Text>
        <Text style={[styles.cardSubtitle, { color: colors.text.secondary }]}>
          Le code expire rapidement pour protéger votre compte.
        </Text>
      </View>
      <VerificationOtpInputs
        otp={otp}
        activeIndex={activeIndex}
        setInputRef={setInputRef}
        onOtpChange={onOtpChange}
        onKeyPress={onKeyPress}
        hasError={Boolean(errorMessage)}
      />
      {Boolean(errorMessage) && (
        <View style={[styles.errorBox, { backgroundColor: isDark ? "rgba(220,38,38,0.12)" : "#FEF2F2" }]}>
          <Text style={[styles.errorText, { color: colors.status.error }]}>{errorMessage}</Text>
        </View>
      )}
      <VerificationConfirmButton isComplete={isComplete} isPending={isPending} onConfirm={onConfirm} />
      <VerificationResend countdown={countdown} canResend={canResend} isResending={isResending} onResend={onResend} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  otpCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    marginTop: 22,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
      },
      android: { elevation: 4 },
    }),
  },
  cardHeader: {
    marginBottom: 18,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 5,
  },
  errorBox: {
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 14,
  },
  errorText: {
    fontSize: 12,
    lineHeight: 17,
    fontFamily: Fonts.medium,
    textAlign: "center",
  },
});

export default VerificationOtpCard;
