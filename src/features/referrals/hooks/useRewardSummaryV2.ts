import { useQuery } from '@tanstack/react-query';
import { getMyRewardSummaryV2 } from '../api/rewardApi';

export const rewardSummaryV2QueryKeys = {
  summary: ['rewards', 'summary'] as const,
};

export const useMyRewardSummaryV2 = () =>
  useQuery({
    queryKey: rewardSummaryV2QueryKeys.summary,
    queryFn: getMyRewardSummaryV2,
  });
