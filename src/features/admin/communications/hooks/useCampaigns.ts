import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  campaignApi,
  CampaignRecord,
  CampaignStatus,
  CreateCampaignInput,
  PaginatedCampaigns,
  SendNowResult,
} from "../api/campaignApi";

const CAMPAIGNS_KEY = "admin_campaigns";

export const useAdminCampaigns = (
  filters?: { status?: CampaignStatus },
  page = 1
) =>
  useQuery<PaginatedCampaigns, Error>({
    queryKey: [CAMPAIGNS_KEY, filters, page],
    queryFn: () =>
      campaignApi.list({ page, ...filters }).then((res) => res.data.data),
  });

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation<CampaignRecord, Error, CreateCampaignInput>({
    mutationFn: (data) => campaignApi.create(data).then((res) => res.data.data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [CAMPAIGNS_KEY] }),
  });
};

export const useCancelCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation<CampaignRecord, Error, string>({
    mutationFn: (id) => campaignApi.cancel(id).then((res) => res.data.data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [CAMPAIGNS_KEY] }),
  });
};

export const useSendCampaignNow = () => {
  const queryClient = useQueryClient();
  return useMutation<SendNowResult, Error, string>({
    mutationFn: (id) => campaignApi.sendNow(id).then((res) => res.data.data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [CAMPAIGNS_KEY] }),
  });
};
