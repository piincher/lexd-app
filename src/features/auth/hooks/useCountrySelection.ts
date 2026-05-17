import { useState } from "react";
import type { CountryCode } from "../components/types";
import { COUNTRIES } from "./loginFormHelpers";

export const useCountrySelection = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(COUNTRIES[0]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  return {
    selectedCountry,
    setSelectedCountry,
    showCountryPicker,
    setShowCountryPicker,
    countries: COUNTRIES,
  };
};
