import { apiV2 } from "./client";

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

export interface PromoBanner {
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

export const promosApi = {
  getActiveBanners: () => apiV2.get(`${BASE_URL}/banners`),
  recordBannerClick: (bannerId: string) =>
    apiV2.post(`${BASE_URL}/banners/${bannerId}/click`),
};
