import { useCallback } from "react";
import { Keyboard } from "react-native";
import { hapticMedium, hapticSuccess, hapticError } from "@src/shared/lib/haptics";
import { useVerification } from "./useVerification";
import { OTP_LENGTH, getVerificationErrorMessage } from "./verificationHelpers";

export const useOtpVerification = (
  phoneNumber: string,
  otp: string[],
  setErrorMessage: (msg: string) => void,
) => {
  const { mutate: verify, isPending } = useVerification();

  const submitCode = useCallback((code: string) => {
    const normalizedCode = code.replace(/[^0-9]/g, "").slice(0, OTP_LENGTH);
    if (isPending || normalizedCode.length !== OTP_LENGTH) return;

    hapticMedium();
    Keyboard.dismiss();
    verify(
      { phone: phoneNumber, otp: normalizedCode },
      {
        onSuccess: () => hapticSuccess(),
        onError: (error) => {
          hapticError();
          setErrorMessage(getVerificationErrorMessage(error));
        },
      }
    );
  }, [isPending, phoneNumber, verify, setErrorMessage]);

  const handleConfirm = useCallback(() => {
    submitCode(otp.join(""));
  }, [otp, submitCode]);

  const isComplete = otp.every((d) => d !== "");

  return {
    isPending,
    isComplete,
    handleConfirm,
    submitCode,
  };
};
