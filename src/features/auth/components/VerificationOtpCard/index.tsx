import React from "react";
import { StyleSheet, Platform, TextInput } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { VerificationOtpInputs } from "../VerificationOtpInputs";
import { VerificationConfirmButton } from "../VerificationConfirmButton";
import { VerificationResend } from "../VerificationResend";

interface VerificationOtpCardProps {
  otp: string[];
  activeIndex: number;
  inputRefs: React.MutableRefObject<(TextInput | null)[]>;
  onOtpChange: (value: string, index: number) => void;
  onKeyPress: (key: string, index: number) => void;
  isComplete: boolean;
  isPending: boolean;
  onConfirm: () => void;
  countdown: number;
  canResend: boolean;
  onResend: () => void;
}

export const VerificationOtpCard: React.FC<VerificationOtpCardProps> = ({
  otp,
  activeIndex,
  inputRefs,
  onOtpChange,
  onKeyPress,
  isComplete,
  isPending,
  onConfirm,
  countdown,
  canResend,
  onResend,
}) => {
  const { isDark } = useAppTheme();
  const cardBg = isDark ? "rgba(255,255,255,0.06)" : "#FFFFFF";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";

  return (
    <Animated.View
      entering={FadeInDown.delay(200).duration(500).springify()}
      style={[styles.otpCard, { backgroundColor: cardBg, borderColor: cardBorder }]}
    >
      <VerificationOtpInputs
        otp={otp}
        activeIndex={activeIndex}
        inputRefs={inputRefs}
        onOtpChange={onOtpChange}
        onKeyPress={onKeyPress}
      />
      <VerificationConfirmButton isComplete={isComplete} isPending={isPending} onConfirm={onConfirm} />
      <VerificationResend countdown={countdown} canResend={canResend} onResend={onResend} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  otpCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    marginTop: 28,
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
});

export default VerificationOtpCard;
