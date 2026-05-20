import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import {
  cancelRedemption,
  createRedemptionRequest,
  getMyRedemptions,
} from '../api/referralApi';
import {
  getErrorMessage,
  invalidateRedemptionSideEffects,
  redemptionQueryKeys,
} from './rewardRedemptionQueryKeys';

const generateIdempotencyKey = () =>
  `redemption-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const useMyRewardRedemptions = (page = 1, limit = 20) => {
  const queryClient = useQueryClient();
  const redemptions = useQuery({
    queryKey: redemptionQueryKeys.me(page, limit),
    queryFn: () => getMyRedemptions(page, limit),
  });

  const createMutation = useMutation({
    mutationFn: ({ points, note }: { points: number; note?: string }) =>
      createRedemptionRequest(points, note, generateIdempotencyKey()),
    onSuccess: () => {
      invalidateRedemptionSideEffects(queryClient);
      showMessage({ message: 'Demande de points envoyée', type: 'success' });
    },
    onError: (error) => {
      showMessage({ message: getErrorMessage(error, 'Demande impossible'), type: 'danger' });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: cancelRedemption,
    onSuccess: () => {
      invalidateRedemptionSideEffects(queryClient);
      showMessage({ message: 'Demande annulée', type: 'success' });
    },
    onError: (error) => {
      showMessage({ message: getErrorMessage(error, 'Annulation impossible'), type: 'danger' });
    },
  });

  return {
    redemptions,
    createRedemption: createMutation.mutate,
    cancelRedemption: cancelMutation.mutate,
    isCreatingRedemption: createMutation.isPending,
    isCancellingRedemption: cancelMutation.isPending,
  };
};

export const usePaginatedMyRedemptions = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 20;

  const query = useQuery({
    queryKey: redemptionQueryKeys.me(page, limit),
    queryFn: () => getMyRedemptions(page, limit),
  });

  const createMutation = useMutation({
    mutationFn: ({ points, note }: { points: number; note?: string }) =>
      createRedemptionRequest(points, note, generateIdempotencyKey()),
    onSuccess: () => {
      invalidateRedemptionSideEffects(queryClient);
      showMessage({ message: 'Demande de points envoyée', type: 'success' });
    },
    onError: (error) => {
      showMessage({ message: getErrorMessage(error, 'Demande impossible'), type: 'danger' });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: cancelRedemption,
    onSuccess: () => {
      invalidateRedemptionSideEffects(queryClient);
      showMessage({ message: 'Demande annulée', type: 'success' });
    },
    onError: (error) => {
      showMessage({ message: getErrorMessage(error, 'Annulation impossible'), type: 'danger' });
    },
  });

  const goToPage = useCallback((p: number) => {
    setPage(Math.max(1, p));
  }, []);

  const nextPage = useCallback(() => {
    if (query.data && page < query.data.pagination.pages) {
      setPage((p) => p + 1);
    }
  }, [page, query.data]);

  const prevPage = useCallback(() => {
    setPage((p) => Math.max(1, p - 1));
  }, []);

  return {
    ...query,
    page,
    limit,
    goToPage,
    nextPage,
    prevPage,
    createRedemption: createMutation.mutate,
    cancelRedemption: cancelMutation.mutate,
    isCreatingRedemption: createMutation.isPending,
    isCancellingRedemption: cancelMutation.isPending,
  };
};
