import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useCertificateForm } from "./useCertificateForm";

export const useIssueCertificateScreen = () => {
  const navigation = useNavigation();
  const form = useCertificateForm();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    ...form,
    handleGoBack,
  };
};
