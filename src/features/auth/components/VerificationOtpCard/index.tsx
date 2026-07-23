import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import type { TextInput } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Fonts } from "@src/constants/Fonts";
import { HAIRLINE, RADIUS } from "@src/shared/ui/designLanguage";
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
  const styles = createStyles(colors);
  const cardBg = colors.background.card;
  const cardBorder = colors.border;

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
        <View style={[styles.errorBox, { backgroundColor: colors.feedback.errorBg }]}>
          <Text style={[styles.errorText, { color: colors.status.error }]}>{errorMessage}</Text>
        </View>
      )}
      <VerificationConfirmButton isComplete={isComplete} isPending={isPending} onConfirm={onConfirm} />
      <VerificationResend countdown={countdown} canResend={canResend} isResending={isResending} onResend={onResend} />
    </Animated.View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  otpCard: {
    borderRadius: RADIUS.card,
    borderWidth: HAIRLINE,
    padding: 24,
    marginTop: 22,
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
    borderRadius: RADIUS.control,
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
