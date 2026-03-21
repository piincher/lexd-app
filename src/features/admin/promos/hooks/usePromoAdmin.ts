import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  promoAdminApi,
  PaginatedPromos,
  PaginatedBanners,
  PromoRecord,
  BannerRecord,
  PromoStats,
  CreatePromoInput,
  UpdatePromoInput,
  CreateBannerInput,
  UpdateBannerInput,
} from "../api/promoAdminApi";

const ADMIN_PROMOS_KEY = "admin_promos";
const ADMIN_BANNERS_KEY = "admin_banners";
const ADMIN_PROMO_STATS_KEY = "admin_promo_stats";

// ── Promo Hooks ──────────────────────────────────────────────────────────

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

export const useCreatePromo = () => {
  const queryClient = useQueryClient();

  return useMutation<PromoRecord, Error, CreatePromoInput>({
    mutationFn: (data) =>
      promoAdminApi.createPromo(data).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_PROMOS_KEY] });
    },
  });
};

export const useUpdatePromo = () => {
  const queryClient = useQueryClient();

  return useMutation<PromoRecord, Error, { id: string; data: UpdatePromoInput }>({
    mutationFn: ({ id, data }) =>
      promoAdminApi.updatePromo(id, data).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_PROMOS_KEY] });
    },
  });
};

export const useDeactivatePromo = () => {
  const queryClient = useQueryClient();

  return useMutation<PromoRecord, Error, string>({
    mutationFn: (id) =>
      promoAdminApi.deactivatePromo(id).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_PROMOS_KEY] });
    },
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

// ── Banner Hooks ─────────────────────────────────────────────────────────

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

export const useCreateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation<BannerRecord, Error, CreateBannerInput>({
    mutationFn: (data) =>
      promoAdminApi.createBanner(data).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_BANNERS_KEY] });
    },
  });
};

export const useUpdateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation<BannerRecord, Error, { id: string; data: UpdateBannerInput }>({
    mutationFn: ({ id, data }) =>
      promoAdminApi.updateBanner(id, data).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_BANNERS_KEY] });
    },
  });
};

export const useDeactivateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation<BannerRecord, Error, string>({
    mutationFn: (id) =>
      promoAdminApi.deactivateBanner(id).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_BANNERS_KEY] });
    },
  });
};
