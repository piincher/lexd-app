import type { QueryClient } from '@tanstack/react-query';
import { queryKey } from '@src/shared/constants/queryKey';
import type { RewardRedemptionStatus } from '../types';

export const redemptionQueryKeys = {
  all: ['referrals', 'redemptions'] as const,
  me: (page = 1, limit = 20) => [...redemptionQueryKeys.all, 'me', page, limit] as const,
  detail: (id: string) => [...redemptionQueryKeys.all, 'detail', id] as const,
  admin: (status: RewardRedemptionStatus | 'ALL', search?: string, page = 1, limit = 20) =>
    [...redemptionQueryKeys.all, 'admin', status, search || '', page, limit] as const,
  eligibleGoods: (id: string) => [...redemptionQueryKeys.all, 'eligible-goods', id] as const,
  analytics: () => [...redemptionQueryKeys.all, 'analytics'] as const,
};

export const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

export const invalidateRedemptionSideEffects = (queryClient: QueryClient, userId?: string) => {
  queryClient.invalidateQueries({ queryKey: ['referrals'] });
  queryClient.invalidateQueries({ queryKey: [queryKey.GOODS_KEY] });
  queryClient.invalidateQueries({ queryKey: [queryKey.PAYMENTS_KEY] });
  queryClient.invalidateQueries({ queryKey: ['payments'] });
  queryClient.invalidateQueries({ queryKey: ['myPaymentHistory'] });
  queryClient.invalidateQueries({ queryKey: redemptionQueryKeys.analytics() });
  if (userId) {
    queryClient.invalidateQueries({ queryKey: [queryKey.USER_KEY, userId] });
    queryClient.invalidateQueries({ queryKey: ['clientPayments', userId] });
  }
};
