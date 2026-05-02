export const OTP_LENGTH = 6;
export const RESEND_SECONDS = 45;
export const SUPPORT_PHONE = "8618851725957";

export const getVerificationErrorMessage = (error: unknown) => {
  const fallback = "Code invalide ou expiré. Vérifiez le code reçu puis réessayez.";
  if (!error || typeof error !== "object") return fallback;
  const maybeAxiosError = error as { response?: { data?: { message?: string } }; message?: string };
  return maybeAxiosError.response?.data?.message || maybeAxiosError.message || fallback;
};

export const maskVerificationPhone = (phoneNumber: string) => {
  if (!phoneNumber) return "";
  const prefix = phoneNumber.length > 11 ? phoneNumber.slice(0, phoneNumber.length - 8) : phoneNumber.slice(0, 3);
  return `+${prefix} •••• ${phoneNumber.slice(-4)}`;
};
