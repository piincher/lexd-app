import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  promoAdminApi,
  PromoRecord,
  BannerRecord,
  CreatePromoInput,
  UpdatePromoInput,
  CreateBannerInput,
  UpdateBannerInput,
} from "../api/promoAdminApi";

const ADMIN_PROMOS_KEY = "admin_promos";
const ADMIN_BANNERS_KEY = "admin_banners";

export const useCreatePromo = () => {
  const queryClient = useQueryClient();

  return useMutation<PromoRecord, Error, CreatePromoInput>({
    mutationFn: (data) => promoAdminApi.createPromo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_PROMOS_KEY] });
    },
  });
};

export const useUpdatePromo = () => {
  const queryClient = useQueryClient();

  return useMutation<PromoRecord, Error, { id: string; data: UpdatePromoInput }>({
    mutationFn: ({ id, data }) => promoAdminApi.updatePromo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_PROMOS_KEY] });
    },
  });
};

export const useDeactivatePromo = () => {
  const queryClient = useQueryClient();

  return useMutation<PromoRecord, Error, string>({
    mutationFn: (id) => promoAdminApi.deactivatePromo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_PROMOS_KEY] });
    },
  });
};

export const useClonePromo = () => {
  const queryClient = useQueryClient();

  return useMutation<PromoRecord, Error, string>({
    mutationFn: (id) => promoAdminApi.clonePromo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_PROMOS_KEY] });
    },
  });
};

export const useCreateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation<BannerRecord, Error, CreateBannerInput>({
    mutationFn: (data) => promoAdminApi.createBanner(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_BANNERS_KEY] });
    },
  });
};

export const useUpdateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation<BannerRecord, Error, { id: string; data: UpdateBannerInput }>({
    mutationFn: ({ id, data }) => promoAdminApi.updateBanner(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_BANNERS_KEY] });
    },
  });
};

export const useDeactivateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation<BannerRecord, Error, string>({
    mutationFn: (id) => promoAdminApi.deactivateBanner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_BANNERS_KEY] });
    },
  });
};
