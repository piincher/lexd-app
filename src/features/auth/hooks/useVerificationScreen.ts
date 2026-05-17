import { useState, useCallback, useEffect, useMemo } from "react";
import { Linking } from "react-native";
import { useOtpState } from "./useOtpState";
import { useOtpResend } from "./useOtpResend";
import { useOtpVerification } from "./useOtpVerification";
import { maskVerificationPhone, SUPPORT_PHONE } from "./verificationHelpers";

export const useVerificationScreen = (phoneNumber: string) => {
  const [errorMessage, setErrorMessage] = useState("");
  const clearError = useCallback(() => {
    if (errorMessage) setErrorMessage("");
  }, [errorMessage]);

  const {
    otp,
    activeIndex,
    pastedCodeToSubmit,
    setInputRef,
    handleOtpChange,
    handleKeyPress,
    resetOtp,
    consumePastedCodeToSubmit,
  } = useOtpState(clearError);

  const {
    countdown,
    canResend,
    visible,
    isResending,
    setVisible,
    handleResend,
  } = useOtpResend(phoneNumber, resetOtp, setErrorMessage);

  const {
    isPending,
    isComplete,
    handleConfirm,
    submitCode,
  } = useOtpVerification(phoneNumber, otp, setErrorMessage);

  useEffect(() => {
    if (!pastedCodeToSubmit) return;

    if (!isPending) {
      submitCode(pastedCodeToSubmit);
    }
    consumePastedCodeToSubmit();
  }, [consumePastedCodeToSubmit, isPending, pastedCodeToSubmit, submitCode]);

  const handleSupport = useCallback(() => {
    const text = encodeURIComponent(`Bonjour ChinaLink, je n'arrive pas à vérifier mon numéro +${phoneNumber}.`);
    Linking.openURL(`https://wa.me/${SUPPORT_PHONE}?text=${text}`);
  }, [phoneNumber]);

  const maskedPhone = useMemo(() => maskVerificationPhone(phoneNumber), [phoneNumber]);

  return {
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
  };
};
