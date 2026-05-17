import { useQuery } from "@tanstack/react-query";
import {
  promoAdminApi,
  PaginatedPromos,
  PaginatedBanners,
  PromoStats,
} from "../api/promoAdminApi";

const ADMIN_PROMOS_KEY = "admin_promos";
const ADMIN_BANNERS_KEY = "admin_banners";
const ADMIN_PROMO_STATS_KEY = "admin_promo_stats";

export const useAdminPromos = (
  filters?: { status?: string },
  page = 1
) => {
  return useQuery<PaginatedPromos, Error>({
    queryKey: [ADMIN_PROMOS_KEY, filters, page],
    queryFn: () =>
      promoAdminApi
        .getPromos({ page, ...filters })
        .then((res) => res.data.data),
  });
};

export const useAdminBanners = (
  filters?: { status?: string },
  page = 1
) => {
  return useQuery<PaginatedBanners, Error>({
    queryKey: [ADMIN_BANNERS_KEY, filters, page],
    queryFn: () =>
      promoAdminApi
        .getBanners({ page, ...filters })
        .then((res) => res.data.data),
  });
};

export const usePromoStats = (promoId: string, enabled = true) => {
  return useQuery<PromoStats, Error>({
    queryKey: [ADMIN_PROMO_STATS_KEY, promoId],
    queryFn: () =>
      promoAdminApi.getPromoStats(promoId).then((res) => res.data.data),
    enabled: enabled && !!promoId,
  });
};
