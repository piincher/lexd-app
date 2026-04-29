import { useEffect, useState, useRef, useCallback } from "react";
import { TextInput, Keyboard, Alert } from "react-native";
import { hapticMedium } from "@src/shared/lib/haptics";
import { useVerification } from "./useVerification";
import { useLogin } from "./useLogin";

const OTP_LENGTH = 6;

export const useVerificationScreen = (phoneNumber: string) => {
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
  const [activeIndex, setActiveIndex] = useState(0);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [visible, setVisible] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const { mutate: verify, isPending } = useVerification();
  const { mutate: resendOtp } = useLogin();

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
    if (value.length > 1) {
      const pasted = value.replace(/[^0-9]/g, "").slice(0, OTP_LENGTH);
      if (pasted.length === OTP_LENGTH) {
        setOtp(pasted.split("")); setActiveIndex(OTP_LENGTH - 1); Keyboard.dismiss(); return;
      }
    }
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    const newOtp = [...otp]; newOtp[index] = digit; setOtp(newOtp);
    if (digit && index < OTP_LENGTH - 1) setActiveIndex(index + 1);
  }, [otp]);

  const handleKeyPress = useCallback((key: string, index: number) => {
    if (key !== "Backspace") return;
    const newOtp = [...otp];
    if (!newOtp[index] && index > 0) { setActiveIndex(index - 1); newOtp[index - 1] = ""; }
    else { newOtp[index] = ""; }
    setOtp(newOtp);
  }, [otp]);

  const handleConfirm = useCallback(() => {
    hapticMedium();
    const code = otp.join("");
    if (code.length !== OTP_LENGTH) return;
    verify({ phone: phoneNumber, otp: code });
  }, [otp, phoneNumber, verify]);

  const handleResend = useCallback(() => {
    if (!canResend) return;
    setCountdown(30); setCanResend(false); setOtp(new Array(OTP_LENGTH).fill("")); setActiveIndex(0);
    resendOtp(phoneNumber, {
      onSuccess: () => { setVisible(true); setTimeout(() => setVisible(false), 2000); },
      onError: () => { setCanResend(true); Alert.alert("Erreur", "Impossible de renvoyer le code. Veuillez reessayer."); },
    });
  }, [canResend, phoneNumber, resendOtp]);

  const isComplete = otp.every((d) => d !== "");
  const maskedPhone = phoneNumber ? `+${phoneNumber.slice(0, 3)} ** ** ${phoneNumber.slice(-2)}` : "";

  return { otp, activeIndex, countdown, canResend, visible, isPending, isComplete, maskedPhone, inputRefs, setVisible, handleOtpChange, handleKeyPress, handleConfirm, handleResend };
};
