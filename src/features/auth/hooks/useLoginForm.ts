import { useCallback, useMemo, useState } from "react";
import { initMixpanel } from "@src/config/Analytic";
import { useLogin, useLoginApple } from "./useLogin";

interface CountryCode {
   code: string;
   flag: string;
   country: string;
}

const COUNTRIES: CountryCode[] = [
   { code: "223", flag: "🇲🇱", country: "Mali" },
   { code: "225", flag: "🇨🇮", country: "Côte d'Ivoire" },
];

const SPECIAL_PHONES = ["22376696177", "22317865673"];

export const useLoginForm = () => {
   // State
   const [phone, setPhoneState] = useState("");
   const [selectedCountry, setSelectedCountry] = useState<CountryCode>(COUNTRIES[0]);
   const [showCountryPicker, setShowCountryPicker] = useState(false);
   const [error, setError] = useState("");

   // API hooks
   const { mutate, isSuccess, isPending } = useLogin();
   const { mutate: appleLogin, isPending: applePending } = useLoginApple();
   const mixpanel = useMemo(() => initMixpanel(), []);

   // Computed
   const fullPhone = useMemo(() => selectedCountry.code + phone, [phone, selectedCountry.code]);
   const isLoading = isPending || applePending;

   // Actions
   const setPhone = useCallback((text: string) => {
      const digitsOnly = text.replace(/[^0-9]/g, "");
      setPhoneState(digitsOnly);
      if (error) setError("");
   }, [error]);

   const clearError = useCallback(() => setError(""), []);

   const handleSubmit = useCallback(() => {
      setError("");
      const trimmed = phone.trim();

      if (!trimmed) {
         setError("Numero de telephone requis");
         return;
      }
      if (trimmed.length < 8) {
         setError("Le numero doit contenir 8 chiffres");
         return;
      }

      mixpanel.track("Login", { phone: trimmed });

      if (SPECIAL_PHONES.includes(fullPhone)) {
         appleLogin({ phone: fullPhone });
      } else {
         mutate(fullPhone);
      }
   }, [phone, fullPhone, mutate, appleLogin, mixpanel]);

   return {
      // State
      phone,
      selectedCountry,
      showCountryPicker,
      error,
      fullPhone,
      // Actions
      setPhone,
      setSelectedCountry,
      setShowCountryPicker,
      handleSubmit,
      clearError,
      // API
      isLoading,
      isSuccess,
      // Constants
      countries: COUNTRIES,
   };
};
