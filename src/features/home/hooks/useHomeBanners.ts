import { useMutation, useQuery } from "@tanstack/react-query";
import { promosApi, type PromoBanner } from "@src/shared/api/promos";

const HOME_BANNERS_KEY = "home_promo_banners";

export const useHomeBanners = () => {
  return useQuery<PromoBanner[], Error>({
    queryKey: [HOME_BANNERS_KEY],
    queryFn: () => promosApi.getActiveBanners().then((res) => res.data.data),
  });
};

export const useHomeBannerClick = () => {
  return useMutation<void, Error, string>({
    mutationFn: (bannerId) =>
      promosApi.recordBannerClick(bannerId).then((res) => res.data.data),
  });
};
