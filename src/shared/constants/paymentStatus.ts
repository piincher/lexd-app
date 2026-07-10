/**
 * Canonical payment status values returned by the backend.
 * The legacy v1 order model historically stored title-case values
 * ("Paid", "Unpaid"), while newer code stores upper-case values
 * ("PAID", "PARTIAL", "UNPAID"). Consumers should normalize raw
 * values through `normalizePaymentStatus` before comparing.
 */

export type PaymentStatus = "PAID" | "PARTIAL" | "UNPAID";

export const PAYMENT_STATUS: Record<PaymentStatus, PaymentStatus> = {
  PAID: "PAID",
  PARTIAL: "PARTIAL",
  UNPAID: "UNPAID",
} as const;

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  PAID: "Payé",
  PARTIAL: "Partiellement payé",
  UNPAID: "Non payé",
};

export type PaymentStatusColorKey = "success" | "warning" | "error";

export const PAYMENT_STATUS_COLOR_KEYS: Record<PaymentStatus, PaymentStatusColorKey> = {
  PAID: "success",
  PARTIAL: "warning",
  UNPAID: "error",
};

/**
 * Normalize a raw payment status string to the canonical upper-case form.
 */
export const normalizePaymentStatus = (status: string | null | undefined): PaymentStatus => {
  const normalized = String(status || "").toUpperCase();

  if (normalized === "PAID" || normalized === "FULLYPAID" || normalized === "FULLY PAID") {
    return PAYMENT_STATUS.PAID;
  }

  if (normalized === "PARTIAL" || normalized === "PARTIALLYPAID" || normalized === "PARTIALLY PAID") {
    return PAYMENT_STATUS.PARTIAL;
  }

  return PAYMENT_STATUS.UNPAID;
};

/**
 * Check whether a payment status represents a fully paid order.
 */
export const isPaidStatus = (status: string | null | undefined): boolean =>
  normalizePaymentStatus(status) === PAYMENT_STATUS.PAID;

/**
 * Check whether any payment has been recorded (fully or partially).
 */
export const hasPaymentStatus = (status: string | null | undefined): boolean => {
  const normalized = normalizePaymentStatus(status);
  return normalized === PAYMENT_STATUS.PAID || normalized === PAYMENT_STATUS.PARTIAL;
};
