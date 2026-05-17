import { useMemo } from "react";
import { productType } from "@src/shared/types/order";

const parsePrice = (value: unknown): number => {
  if (value === null || value === undefined || value === "") return 0;
  const num = parseFloat(String(value));
  return isNaN(num) ? 0 : num;
};

const parseCBM = (value: unknown): string => {
  if (value === null || value === undefined || value === "" || value === "0") return "";
  return String(value);
};

export type PaymentStatus = "UNPAID" | "PARTIAL" | "PAID";

export interface OrderPaymentData {
  isAir: boolean;
  totalPrice: number;
  paidAmount: number;
  balanceDue: number;
  paymentStatus: PaymentStatus;
  paymentLabel: string;
  cbmValue: string;
}

export const useOrderPaymentData = (order: productType): OrderPaymentData => {
  const isAir = order.shippingMode?.toLowerCase() === "air";

  const goodsTotal = order.goodsIds && Array.isArray(order.goodsIds)
    ? order.goodsIds.reduce((sum: number, g: unknown) => {
        if (typeof g === "object" && g !== null && "totalCost" in g) {
          return sum + (parseFloat(String((g as { totalCost?: unknown }).totalCost || 0)) || 0);
        }
        return sum;
      }, 0)
    : 0;

  const totalPrice = parsePrice(order.calculatedTotal) || parsePrice(order.priceTotal) || parsePrice(order.totalCost) || goodsTotal;
  const paidAmount = parsePrice(order.paidAmount);
  const balanceDue = parsePrice(order.balanceDue) || Math.max(0, totalPrice - paidAmount);

  let paymentStatus: PaymentStatus = "UNPAID";
  if (totalPrice > 0 && (balanceDue <= 0 || paidAmount >= totalPrice)) {
    paymentStatus = "PAID";
  } else if (paidAmount > 0 && totalPrice > 0) {
    paymentStatus = "PARTIAL";
  }

  const apiStatus = (order.paymentStatus || "").toUpperCase();
  if (apiStatus === "PAID" || apiStatus === "FULLYPAID") paymentStatus = "PAID";
  else if (apiStatus === "PARTIAL" || apiStatus === "PARTIALLYPAID") paymentStatus = "PARTIAL";

  let cbmValue = parseCBM(order.packageCBM) || parseCBM(order.calculatedCBM);
  if (!cbmValue && order.goodsIds && Array.isArray(order.goodsIds)) {
    const totalGoodsCBM = order.goodsIds.reduce((sum: number, g: unknown) => {
      if (typeof g === "object" && g !== null && "cbm" in g) {
        return sum + (parseFloat(String((g as { cbm?: unknown }).cbm)) || 0);
      }
      return sum;
    }, 0);
    if (totalGoodsCBM > 0) cbmValue = totalGoodsCBM.toFixed(4);
  }

  const paymentLabel = useMemo(() => {
    switch (paymentStatus) {
      case "PAID": return "Payé";
      case "PARTIAL": return "Partiellement payé";
      default: return "Non payé";
    }
  }, [paymentStatus]);

  return { isAir, totalPrice, paidAmount, balanceDue, paymentStatus, paymentLabel, cbmValue };
};
