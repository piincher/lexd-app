import { useCallback, useMemo, useState } from "react";
import { initMixpanel } from "@src/config/Analytic";
import { useLogin } from "./useLogin";
import type { CountryCode } from "../components/types";

const COUNTRIES: CountryCode[] = [
   { code: "223", flag: "🇲🇱", country: "Mali", minLength: 8, maxLength: 8, placeholder: "XX XX XX XX", validationLabel: "8 chiffres" },
   { code: "225", flag: "🇨🇮", country: "Côte d'Ivoire", minLength: 8, maxLength: 10, placeholder: "XX XX XX XX", validationLabel: "8 à 10 chiffres" },
   { code: "221", flag: "🇸🇳", country: "Sénégal", minLength: 9, maxLength: 9, placeholder: "XX XXX XX XX", validationLabel: "9 chiffres" },
   { code: "226", flag: "🇧🇫", country: "Burkina Faso", minLength: 8, maxLength: 8, placeholder: "XX XX XX XX", validationLabel: "8 chiffres" },
   { code: "224", flag: "🇬🇳", country: "Guinée", minLength: 9, maxLength: 9, placeholder: "XXX XX XX XX", validationLabel: "9 chiffres" },
   { code: "228", flag: "🇹🇬", country: "Togo", minLength: 8, maxLength: 8, placeholder: "XX XX XX XX", validationLabel: "8 chiffres" },
   { code: "229", flag: "🇧🇯", country: "Bénin", minLength: 8, maxLength: 10, placeholder: "XX XX XX XX", validationLabel: "8 à 10 chiffres" },
   { code: "233", flag: "🇬🇭", country: "Ghana", minLength: 9, maxLength: 9, inputMaxLength: 10, placeholder: "XX XXX XXXX", validationLabel: "9 chiffres sans le 0 initial" },
   { code: "86", flag: "🇨🇳", country: "Chine", minLength: 11, maxLength: 11, placeholder: "1XX XXXX XXXX", validationLabel: "11 chiffres" },
   { code: "33", flag: "🇫🇷", country: "France", minLength: 9, maxLength: 9, inputMaxLength: 10, placeholder: "6 XX XX XX XX", validationLabel: "9 chiffres sans le 0 initial" },
];

const getLoginErrorMessage = (error: unknown) => {
   const fallback = "Une erreur est survenue. Veuillez réessayer.";
   if (!error || typeof error !== "object") return fallback;

   const maybeAxiosError = error as {
      response?: { data?: { message?: string } };
      message?: string;
   };

   return maybeAxiosError.response?.data?.message || maybeAxiosError.message || fallback;
};

const normalizeNationalPhone = (phone: string, country: CountryCode) => {
   const digitsOnly = phone.replace(/[^0-9]/g, "");

   if (["33", "233"].includes(country.code) && digitsOnly.startsWith("0")) {
      return digitsOnly.replace(/^0+/, "");
   }

   return digitsOnly;
};

const getPhoneValidationError = (phone: string, country: CountryCode) => {
   if (!phone) return "Numero de telephone requis";

   if (phone.length < country.minLength || phone.length > country.maxLength) {
      return `Le numero ${country.country} doit contenir ${country.validationLabel}.`;
   }

   if (country.code === "86" && !phone.startsWith("1")) {
      return "Le numero Chine doit commencer par 1.";
   }

   return "";
};

export const useLoginForm = () => {
   // State
   const [phone, setPhoneState] = useState("");
   const [selectedCountry, setSelectedCountry] = useState<CountryCode>(COUNTRIES[0]);
   const [showCountryPicker, setShowCountryPicker] = useState(false);
   const [error, setError] = useState("");

   // API hooks
   const { mutate, data: loginData, isSuccess, isPending } = useLogin();
   const mixpanel = useMemo(() => initMixpanel(), []);

   // Computed
   const normalizedPhone = useMemo(
      () => normalizeNationalPhone(phone, selectedCountry),
      [phone, selectedCountry]
   );
   const fullPhone = useMemo(
      () => selectedCountry.code + normalizedPhone,
      [normalizedPhone, selectedCountry.code]
   );
   const isLoading = isPending;
   const isReviewLogin = Boolean(loginData?.reviewLogin && (loginData.accessToken || loginData.token));

   // Actions
   const setPhone = useCallback((text: string) => {
      const digitsOnly = text.replace(/[^0-9]/g, "");
      setPhoneState(digitsOnly);
      if (error) setError("");
   }, [error]);

   const clearError = useCallback(() => setError(""), []);

   const handleSubmit = useCallback(() => {
      setError("");
      const validationError = getPhoneValidationError(normalizedPhone, selectedCountry);

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
   }, [normalizedPhone, selectedCountry, fullPhone, mutate, mixpanel]);

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
      isReviewLogin,
      // Constants
      countries: COUNTRIES,
   };
};
