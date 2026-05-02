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
    isResending,
    isComplete,
    maskedPhone,
    errorMessage,
    setInputRef,
    setVisible,
    handleOtpChange,
    handleKeyPress,
    handleConfirm,
    handleResend,
    handleSupport,
  } = useVerificationScreen(phoneNumber);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
      <Notification
        message="Code renvoyé avec succès"
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
          <VerificationHeader maskedPhone={maskedPhone} onEditPhone={() => navigation.goBack()} />
          <VerificationOtpCard
            otp={otp}
            activeIndex={activeIndex}
            setInputRef={setInputRef}
            onOtpChange={handleOtpChange}
            onKeyPress={handleKeyPress}
            errorMessage={errorMessage}
            isComplete={isComplete}
            isPending={isPending}
            onConfirm={handleConfirm}
            countdown={countdown}
            canResend={canResend}
            isResending={isResending}
            onResend={handleResend}
          />
          <VerificationFooter onSupport={handleSupport} />
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
