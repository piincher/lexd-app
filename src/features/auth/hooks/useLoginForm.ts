import { useCallback, useMemo, useState } from "react";
import { initMixpanel } from "@src/config/Analytic";
import { useLogin } from "./useLogin";
import { useCountrySelection } from "./useCountrySelection";
import { usePhoneValidation } from "./usePhoneValidation";
import { useAutoDetectCountry } from "./useAutoDetectCountry";
import { getLoginErrorMessage } from "./loginFormHelpers";

export const useLoginForm = () => {
  const [phone, setPhoneState] = useState("");
  const [error, setError] = useState("");

  const {
    selectedCountry,
    setSelectedCountry,
    showCountryPicker,
    setShowCountryPicker,
    countries,
  } = useCountrySelection();

  const { detect } = useAutoDetectCountry();

  const { normalizedPhone, validationError } = usePhoneValidation(phone, selectedCountry);

  const { mutate, data: loginData, isSuccess, isPending } = useLogin();
  const mixpanel = useMemo(() => initMixpanel(), []);

  const fullPhone = useMemo(
    () => selectedCountry.code + normalizedPhone,
    [normalizedPhone, selectedCountry.code]
  );

  const isLoading = isPending;
  const isReviewLogin = Boolean(loginData?.reviewLogin && (loginData.accessToken || loginData.token));

  const setPhone = useCallback((text: string) => {
    const digitsOnly = text.replace(/[^0-9]/g, "");

    const detected = detect(digitsOnly, selectedCountry);
    if (detected) {
      setSelectedCountry(detected.country);
      setPhoneState(detected.nationalNumber);
      if (error) setError("");
      return;
    }

    setPhoneState(digitsOnly);
    if (error) setError("");
  }, [error, selectedCountry, detect, setSelectedCountry]);

  const clearError = useCallback(() => setError(""), []);

  const handleSubmit = useCallback(() => {
    if (isPending) return;

    setError("");

    if (validationError) {
      setError(validationError);
      return;
    }

    mixpanel.track("Login", { country: selectedCountry.country, phone: normalizedPhone });

    mutate(fullPhone, {
      onError: (err: unknown) => {
        setError(getLoginErrorMessage(err));
      }
    });
  }, [isPending, validationError, selectedCountry, normalizedPhone, fullPhone, mutate, mixpanel]);

  return {
    phone,
    selectedCountry,
    showCountryPicker,
    error,
    fullPhone,
    setPhone,
    setSelectedCountry,
    setShowCountryPicker,
    handleSubmit,
    clearError,
    isLoading,
    isSuccess,
    isReviewLogin,
    countries,
  };
};
