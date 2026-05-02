import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { TextInput, Keyboard, Linking } from "react-native";
import { hapticError, hapticMedium, hapticSuccess } from "@src/shared/lib/haptics";
import { useVerification } from "./useVerification";
import { useLogin } from "./useLogin";
import { getVerificationErrorMessage, maskVerificationPhone, OTP_LENGTH, RESEND_SECONDS, SUPPORT_PHONE } from "./verificationHelpers";

export const useVerificationScreen = (phoneNumber: string) => {
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
  const [activeIndex, setActiveIndex] = useState(0);
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const { mutate: verify, isPending } = useVerification();
  const { mutate: resendOtp, isPending: isResending } = useLogin();

  useEffect(() => { inputRefs.current[activeIndex]?.focus(); }, [activeIndex]);

  useEffect(() => {
    if (canResend) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { setCanResend(true); clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [canResend]);

  const handleOtpChange = useCallback((value: string, index: number) => {
    if (errorMessage) setErrorMessage("");
    if (value.length > 1) {
      const pasted = value.replace(/[^0-9]/g, "").slice(0, OTP_LENGTH);
      if (pasted.length === OTP_LENGTH) {
        setOtp(pasted.split("")); setActiveIndex(OTP_LENGTH - 1); Keyboard.dismiss(); return;
      }
    }
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    const newOtp = [...otp]; newOtp[index] = digit; setOtp(newOtp);
    if (digit && index < OTP_LENGTH - 1) setActiveIndex(index + 1);
  }, [errorMessage, otp]);

  const handleKeyPress = useCallback((key: string, index: number) => {
    if (errorMessage) setErrorMessage("");
    if (key !== "Backspace") return;
    const newOtp = [...otp];
    if (!newOtp[index] && index > 0) { setActiveIndex(index - 1); newOtp[index - 1] = ""; }
    else { newOtp[index] = ""; }
    setOtp(newOtp);
  }, [errorMessage, otp]);

  const handleConfirm = useCallback(() => {
    hapticMedium();
    const code = otp.join("");
    if (code.length !== OTP_LENGTH) return;
    Keyboard.dismiss();
    verify(
      { phone: phoneNumber, otp: code },
      {
        onSuccess: () => hapticSuccess(),
        onError: (error) => {
          hapticError();
          setErrorMessage(getVerificationErrorMessage(error));
        },
      }
    );
  }, [otp, phoneNumber, verify]);

  const handleResend = useCallback(() => {
    if (!canResend || isResending) return;
    setCountdown(RESEND_SECONDS); setCanResend(false); setOtp(new Array(OTP_LENGTH).fill("")); setActiveIndex(0); setErrorMessage("");
    resendOtp(phoneNumber, {
      onSuccess: () => { hapticSuccess(); setVisible(true); setTimeout(() => setVisible(false), 2000); },
      onError: (error) => { hapticError(); setCanResend(true); setErrorMessage(getVerificationErrorMessage(error)); },
    });
  }, [canResend, isResending, phoneNumber, resendOtp]);

  const setInputRef = useCallback((index: number, ref: TextInput | null) => {
    inputRefs.current[index] = ref;
  }, []);

  const handleSupport = useCallback(() => {
    const text = encodeURIComponent(`Bonjour ChinaLink, je n'arrive pas à vérifier mon numéro +${phoneNumber}.`);
    Linking.openURL(`https://wa.me/${SUPPORT_PHONE}?text=${text}`);
  }, [phoneNumber]);

  const isComplete = otp.every((d) => d !== "");
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
