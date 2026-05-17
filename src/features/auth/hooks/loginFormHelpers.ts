import type { CountryCode } from "../components/types";

export const COUNTRIES: CountryCode[] = [
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

export const getLoginErrorMessage = (error: unknown) => {
  const fallback = "Une erreur est survenue. Veuillez réessayer.";
  if (!error || typeof error !== "object") return fallback;

  const maybeAxiosError = error as {
    response?: { data?: { message?: string } };
    message?: string;
  };

  return maybeAxiosError.response?.data?.message || maybeAxiosError.message || fallback;
};

export const normalizeNationalPhone = (phone: string, country: CountryCode) => {
  const digitsOnly = phone.replace(/[^0-9]/g, "");

  if (["33", "233"].includes(country.code) && digitsOnly.startsWith("0")) {
    return digitsOnly.replace(/^0+/, "");
  }

  return digitsOnly;
};

export const getPhoneValidationError = (phone: string, country: CountryCode) => {
  if (!phone) return "Numero de telephone requis";

  if (phone.length < country.minLength || phone.length > country.maxLength) {
    return `Le numero ${country.country} doit contenir ${country.validationLabel}.`;
  }

  if (country.code === "86" && !phone.startsWith("1")) {
    return "Le numero Chine doit commencer par 1.";
  }

  return "";
};
