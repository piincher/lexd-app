import { useMemo } from "react";
import type { CountryCode } from "../components/types";
import { normalizeNationalPhone, getPhoneValidationError } from "./loginFormHelpers";

export const usePhoneValidation = (phone: string, country: CountryCode) => {
  const normalizedPhone = useMemo(
    () => normalizeNationalPhone(phone, country),
    [phone, country]
  );

  const validationError = useMemo(
    () => getPhoneValidationError(normalizedPhone, country),
    [normalizedPhone, country]
  );

  return { normalizedPhone, validationError };
};
