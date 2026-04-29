/**
 * Verification Screen
 * Thin composition wrapper for OTP verification
 */

import React from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { RootStackScreenProps } from "@src/navigations/type";
import { Notification } from "@src/components/Notification/Notification";
import { useVerificationScreen } from "../hooks/useVerificationScreen";
import { VerificationBackButton } from "../components/VerificationBackButton";
import { VerificationHeader } from "../components/VerificationHeader";
import { VerificationOtpCard } from "../components/VerificationOtpCard";
import { VerificationFooter } from "../components/VerificationFooter";

const Verification = ({ route, navigation }: RootStackScreenProps<"Verification">) => {
  const { colors } = useAppTheme();
  const phoneNumber = route.params.phoneNumber;
  const {
    otp,
    activeIndex,
    countdown,
    canResend,
    visible,
    isPending,
    isComplete,
    maskedPhone,
    inputRefs,
    setVisible,
    handleOtpChange,
    handleKeyPress,
    handleConfirm,
    handleResend,
  } = useVerificationScreen(phoneNumber);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
      <Notification
        message="Code renvoye avec succes"
        type="success"
        visible={visible}
        onDismissSnackBar={() => setVisible(false)}
      />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <VerificationBackButton onPress={() => navigation.goBack()} />
          <VerificationHeader maskedPhone={maskedPhone} />
          <VerificationOtpCard
            otp={otp}
            activeIndex={activeIndex}
            inputRefs={inputRefs}
            onOtpChange={handleOtpChange}
            onKeyPress={handleKeyPress}
            isComplete={isComplete}
            isPending={isPending}
            onConfirm={handleConfirm}
            countdown={countdown}
            canResend={canResend}
            onResend={handleResend}
          />
          <VerificationFooter />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
});

export default Verification;
