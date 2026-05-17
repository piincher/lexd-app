import { useState, useEffect, useCallback } from "react";
import { hapticSuccess, hapticError } from "@src/shared/lib/haptics";
import { RESEND_SECONDS, getVerificationErrorMessage } from "./verificationHelpers";
import { useLogin } from "./useLogin";

export const useOtpResend = (
  phoneNumber: string,
  resetOtp: () => void,
  setErrorMessage: (msg: string) => void,
) => {
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [visible, setVisible] = useState(false);
  const { mutate: resendOtp, isPending: isResending } = useLogin();

  useEffect(() => {
    if (canResend) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [canResend]);

  const handleResend = useCallback(() => {
    if (!canResend || isResending) return;
    setCountdown(RESEND_SECONDS);
    setCanResend(false);
    resetOtp();
    setErrorMessage("");
    resendOtp(phoneNumber, {
      onSuccess: () => {
        hapticSuccess();
        setVisible(true);
        setTimeout(() => setVisible(false), 2000);
      },
      onError: (error) => {
        hapticError();
        setCanResend(true);
        setErrorMessage(getVerificationErrorMessage(error));
      },
    });
  }, [canResend, isResending, phoneNumber, resendOtp, resetOtp, setErrorMessage]);

  return {
    countdown,
    canResend,
    visible,
    isResending,
    setVisible,
    handleResend,
  };
};
