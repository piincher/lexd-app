import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

const OTP_LENGTH = 6;

interface VerificationOtpInputsProps {
  otp: string[];
  activeIndex: number;
  setInputRef: (index: number, ref: TextInput | null) => void;
  onOtpChange: (value: string, index: number) => void;
  onKeyPress: (key: string, index: number) => void;
  hasError: boolean;
}

export const VerificationOtpInputs: React.FC<VerificationOtpInputsProps> = ({
  otp,
  activeIndex,
  setInputRef,
  onOtpChange,
  onKeyPress,
  hasError,
}) => {
  const { colors, isDark } = useAppTheme();
  const activeColor = hasError ? colors.status.error : colors.primary.main;

  return (
    <View style={styles.otpRow}>
      {Array.from({ length: OTP_LENGTH }).map((_, index) => {
        const isActive = index === activeIndex;
        const isFilled = otp[index] !== "";

        return (
          <View
            key={index}
            style={[
              styles.otpInputWrapper,
              {
                borderColor: isActive
                  ? activeColor
                  : isFilled
                    ? isDark
                      ? "rgba(34,197,94,0.45)"
                      : "rgba(34,197,94,0.35)"
                    : isDark
                      ? "rgba(255,255,255,0.1)"
                      : "#E5E7EB",
                backgroundColor: isActive
                  ? isDark
                    ? "rgba(34,197,94,0.08)"
                    : "rgba(34,197,94,0.04)"
                  : isDark
                    ? "rgba(255,255,255,0.04)"
                    : "#F9FAFB",
              },
            ]}
          >
            <TextInput
              ref={(ref) => setInputRef(index, ref)}
              style={[styles.otpInput, { color: colors.text.primary }]}
              value={otp[index]}
              onChangeText={(val) => onOtpChange(val, index)}
              onKeyPress={({ nativeEvent }) => onKeyPress(nativeEvent.key, index)}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete="sms-otp"
              importantForAutofill="yes"
              maxLength={index === 0 ? OTP_LENGTH : 1}
              selectTextOnFocus
              accessibilityLabel={`Chiffre ${index + 1} du code de vérification`}
            />
            {isActive && !isFilled && <View style={[styles.cursor, { backgroundColor: activeColor }]} />}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  otpRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  otpInputWrapper: {
    flex: 1,
    maxWidth: 52,
    height: 58,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  otpInput: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    textAlign: "center",
    width: "100%",
    height: "100%",
    paddingVertical: 0,
  },
  cursor: {
    position: "absolute",
    bottom: 14,
    width: 20,
    height: 2,
    borderRadius: 1,
  },
});

export default VerificationOtpInputs;
