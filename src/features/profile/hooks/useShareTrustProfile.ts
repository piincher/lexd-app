import { useMutation } from "@tanstack/react-query";
import { trustProfileApi, ShareTrustProfileResponse } from "../api/trustProfileApi";

export const useShareTrustProfile = () => {
  return useMutation<ShareTrustProfileResponse, Error>({
    mutationFn: async () => {
      const response = await trustProfileApi.shareTrustProfile();
      if (!response.success) {
        throw new Error(response.message || "Failed to generate share link");
      }
      return response.data;
    },
  });
};
