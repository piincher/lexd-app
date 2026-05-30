import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { showMessage } from 'react-native-flash-message';
import {
  cancelMyProductRedemption,
  createProductRedemption,
  getMyProductRedemptions,
} from '../api/rewardApi';
import type { CreateProductRedemptionPayload } from '../types';

export const productRedemptionQueryKeys = {
  all: ['rewards', 'productRedemptions'] as const,
  me: (limit = 20) => [...productRedemptionQueryKeys.all, 'me', limit] as const,
};

const generateIdempotencyKey = () =>
  `product-redemption-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

export const useMyProductRedemptions = (limit = 20) => {
  const queryClient = useQueryClient();

  const redemptions = useInfiniteQuery({
    queryKey: productRedemptionQueryKeys.me(limit),
    queryFn: ({ pageParam }) => getMyProductRedemptions(pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.page < lastPage.pagination.pages) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
  });

  const createMutation = useMutation({
    mutationFn: (payload: Omit<CreateProductRedemptionPayload, 'idempotencyKey'>) =>
      createProductRedemption({ ...payload, idempotencyKey: generateIdempotencyKey() }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productRedemptionQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: ['rewards', 'summary'] });
      queryClient.invalidateQueries({ queryKey: ['rewards', 'me'] });
      showMessage({ message: 'Échange effectué avec succès', type: 'success' });
    },
    onError: (error) => {
      showMessage({
        message: getErrorMessage(error, 'Échange impossible'),
        type: 'danger',
      });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: cancelMyProductRedemption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productRedemptionQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: ['rewards', 'summary'] });
      queryClient.invalidateQueries({ queryKey: ['rewards', 'me'] });
      showMessage({ message: 'Demande annulée', type: 'success' });
    },
    onError: (error) => {
      showMessage({
        message: getErrorMessage(error, 'Annulation impossible'),
        type: 'danger',
      });
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
