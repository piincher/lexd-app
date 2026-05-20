import { useQuery } from "@tanstack/react-query";
import { trustProfileApi, TrustProfile } from "../api/trustProfileApi";

const QUERY_KEYS = {
  trustProfile: "trustProfile",
  profile: () => [QUERY_KEYS.trustProfile, "profile"] as const,
};

export const useTrustProfile = () => {
  return useQuery<TrustProfile, Error>({
    queryKey: QUERY_KEYS.profile(),
    queryFn: async () => {
      const response = await trustProfileApi.getTrustProfile();
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch trust profile");
      }
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
};
