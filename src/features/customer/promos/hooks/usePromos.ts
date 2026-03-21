import { useMutation, useQuery } from "@tanstack/react-query";
import {
  promoApi,
  PromoCode,
  PromoBanner,
  ValidationResult,
} from "../api";

const PROMOS_KEY = "customer_promos";
const BANNERS_KEY = "customer_promo_banners";

export const useActivePromos = () => {
  return useQuery<PromoCode[], Error>({
    queryKey: [PROMOS_KEY],
    queryFn: () =>
      promoApi.getActivePromos().then((res) => res.data.data),
  });
};

export const useActiveBanners = () => {
  return useQuery<PromoBanner[], Error>({
    queryKey: [BANNERS_KEY],
    queryFn: () =>
      promoApi.getActiveBanners().then((res) => res.data.data),
  });
};

export const useValidatePromo = () => {
  return useMutation<ValidationResult, Error, { code: string; goodsIds?: string[]; amount?: number }>({
    mutationFn: (data) =>
      promoApi.validatePromoCode(data).then((res) => res.data.data),
  });
};

export const useBannerClick = () => {
  return useMutation<void, Error, string>({
    mutationFn: (bannerId) =>
      promoApi.recordBannerClick(bannerId).then((res) => res.data.data),
  });
};
