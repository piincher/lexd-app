import type { PromoType, PromoApplicableTo, PromoTargetAudience } from "../../api/promoAdminApi";

export const PROMO_TYPE_OPTIONS: { label: string; value: PromoType }[] = [
  { label: "Pourcentage", value: "PERCENTAGE" },
  { label: "Montant fixe", value: "FIXED_AMOUNT" },
];

export const APPLICABLE_TO_OPTIONS: { label: string; value: PromoApplicableTo }[] = [
  { label: "Tous", value: "ALL" },
  { label: "Maritime", value: "MARITIME" },
  { label: "Aérien", value: "AERIEN" },
  { label: "Premier envoi", value: "FIRST_ORDER" },
];

export const TARGET_AUDIENCE_OPTIONS: { label: string; value: PromoTargetAudience }[] = [
  { label: "Tous", value: "ALL" },
  { label: "Nouveaux", value: "NEW" },
  { label: "Certifiés", value: "CERTIFIED" },
  { label: "Fidèles", value: "LOYAL" },
];

export const formatDisplayDate = (dateStr: string): string => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
};

export const toDateString = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};
