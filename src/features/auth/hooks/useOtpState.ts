import { useState, useRef, useCallback, useEffect } from "react";
import { TextInput, Keyboard } from "react-native";
import { OTP_LENGTH } from "./verificationHelpers";

export const useOtpState = (clearError: () => void) => {
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
  const [activeIndex, setActiveIndex] = useState(0);
  const [pastedCodeToSubmit, setPastedCodeToSubmit] = useState<string | null>(null);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const skipNextFocusRef = useRef(false);

  useEffect(() => {
    if (skipNextFocusRef.current) {
      skipNextFocusRef.current = false;
      return;
    }
    inputRefs.current[activeIndex]?.focus();
  }, [activeIndex]);

  const setInputRef = useCallback((index: number, ref: TextInput | null) => {
    inputRefs.current[index] = ref;
  }, []);

  const handleOtpChange = useCallback((value: string, index: number) => {
    clearError();
    if (value.length > 1) {
      const pasted = value.replace(/[^0-9]/g, "").slice(0, OTP_LENGTH);
      if (pasted.length === OTP_LENGTH) {
        setOtp(pasted.split(""));
        if (activeIndex !== OTP_LENGTH - 1) {
          skipNextFocusRef.current = true;
        }
        setActiveIndex(OTP_LENGTH - 1);
        setPastedCodeToSubmit(pasted);
        Keyboard.dismiss();
        return;
      }
    }
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < OTP_LENGTH - 1) setActiveIndex(index + 1);
  }, [activeIndex, clearError, otp]);

  const handleKeyPress = useCallback((key: string, index: number) => {
    clearError();
    if (key !== "Backspace") return;
    const newOtp = [...otp];
    if (!newOtp[index] && index > 0) {
      setActiveIndex(index - 1);
      newOtp[index - 1] = "";
    } else {
      newOtp[index] = "";
    }
    setOtp(newOtp);
  }, [clearError, otp]);

  const resetOtp = useCallback(() => {
    setOtp(new Array(OTP_LENGTH).fill(""));
    setActiveIndex(0);
    setPastedCodeToSubmit(null);
  }, []);

  const consumePastedCodeToSubmit = useCallback(() => {
    setPastedCodeToSubmit(null);
  }, []);

  return {
    otp,
    activeIndex,
    pastedCodeToSubmit,
    setInputRef,
    handleOtpChange,
    handleKeyPress,
    resetOtp,
    consumePastedCodeToSubmit,
  };
};
