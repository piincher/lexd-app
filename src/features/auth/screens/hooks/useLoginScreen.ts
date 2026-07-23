import { useEffect, useState, useCallback } from "react";
import { Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useLoginForm } from "../../hooks/useLoginForm";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { CountryCode } from "../../components/types";
import type { navigationProps } from "@src/app/navigation/type";

export const useLoginScreen = () => {
  const navigation = useNavigation<navigationProps>();
  const { colors } = useAppTheme();
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    phone, setPhone, selectedCountry, setSelectedCountry,
    showCountryPicker, setShowCountryPicker, error, handleSubmit,
    isLoading, isSuccess, isReviewLogin, fullPhone, countries,
  } = useLoginForm();

  useEffect(() => {
    if (isSuccess && fullPhone && !isReviewLogin) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        navigation.navigate("Verification", { phoneNumber: fullPhone });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, isReviewLogin, fullPhone, navigation]);

  const handleDismissSuccess = useCallback(() => setShowSuccess(false), []);
  const handleSelectCountry = useCallback(() => setShowCountryPicker(true), [setShowCountryPicker]);
  const handleCountrySelect = useCallback((c: CountryCode) => {
    setSelectedCountry(c);
    setShowCountryPicker(false);
  }, [setSelectedCountry, setShowCountryPicker]);
  const handleClearPhone = useCallback(() => setPhone(""), [setPhone]);
  const handleDemoPress = useCallback(() => navigation.navigate("GuestPreview"), [navigation]);
  const handleTermsPress = useCallback(() => Linking.openURL("https://www.lexdservices.com/fr/terms"), []);
  const handlePrivacyPress = useCallback(() => Linking.openURL("https://www.lexdservices.com/fr/privacy"), []);

  return {
    phone, setPhone, selectedCountry, setSelectedCountry,
    showCountryPicker, setShowCountryPicker, error, handleSubmit,
    isLoading, isSuccess, isReviewLogin, fullPhone, countries,
    showSuccess, setShowSuccess,
    cardBg: colors.background.card,
    cardBorder: colors.border,
    handleDismissSuccess,
    handleSelectCountry,
    handleCountrySelect,
    handleClearPhone,
    handleDemoPress,
    handleTermsPress,
    handlePrivacyPress,
  };
};
