import { apiV2 } from "@src/api/client";

const BASE_URL = "/promos";

interface PromoCode {
  _id: string;
  promoCodeId: string;
  code: string;
  name: string;
  description: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  maxDiscount: number | null;
  minOrderAmount: number;
  validFrom: string;
  validUntil: string;
  applicableTo: string;
  status: string;
}

interface PromoBanner {
  _id: string;
  bannerId: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  linkType: "NONE" | "PROMO_CODE" | "EXTERNAL" | "SCREEN";
  promoCodeId: PromoCode | null;
  externalUrl: string | null;
  screenName: string | null;
  validFrom: string;
  validUntil: string;
  sortOrder: number;
}

interface ValidationResult {
  valid: boolean;
  reason?: string;
  discountAmount?: number;
  originalAmount?: number;
  finalAmount?: number;
  discountType?: string;
  discountValue?: number;
  promoCode?: PromoCode;
}

export type { PromoCode, PromoBanner, ValidationResult };

export const promoApi = {
  getActivePromos: () => apiV2.get(`${BASE_URL}/active`),
  getActiveBanners: () => apiV2.get(`${BASE_URL}/banners`),
  validatePromoCode: (data: { code: string; goodsIds?: string[]; amount?: number }) =>
    apiV2.post(`${BASE_URL}/validate`, data),
  recordBannerClick: (bannerId: string) =>
    apiV2.post(`${BASE_URL}/banners/${bannerId}/click`),
};
