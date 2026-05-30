import { useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showMessage } from 'react-native-flash-message';
import {
  getAdminRewardItems,
  createRewardItem,
  updateRewardItem,
  deleteRewardItem,
  getAdminProductRedemptions,
  approveProductRedemption,
  rejectProductRedemption,
  readyProductRedemption,
  collectProductRedemption,
  getAdminUserPoints,
  adjustUserPoints,
  getAdminRewardSettingsV2,
  updateAdminRewardSettingsV2,
  type ProductRedemptionList,
  type RewardItem,
  type RewardSettingsV2,
  type UserPointsResult,
  searchAdminUsers,
  type UserSearchResult,
} from '../api/adminRewardApi';
import type { RedemptionStatusFilter } from '../types';

const QUERY_KEYS = {
  items: ['admin', 'rewards', 'items'] as const,
  redemptions: (status: string, search: string, page: number) =>
    ['admin', 'rewards', 'redemptions', status, search, page] as const,
  userPoints: (userId: string) => ['admin', 'rewards', 'users', userId, 'points'] as const,
  settingsV2: ['admin', 'rewards', 'settings-v2'] as const,
};

// ── Reward Items ──────────────────────────────────────────────────────────

export const useAdminRewardItems = () => {
  const queryClient = useQueryClient();

  const query = useQuery<RewardItem[], Error>({
    queryKey: QUERY_KEYS.items,
    queryFn: getAdminRewardItems,
  });

  const create = useMutation<RewardItem, Error, Omit<RewardItem, 'id' | 'createdAt'>>({
    mutationFn: createRewardItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.items });
      showMessage({ message: 'Article créé', type: 'success' });
    },
    onError: (err) => showMessage({ message: err.message || 'Création impossible', type: 'danger' }),
  });

  const update = useMutation<RewardItem, Error, { id: string; data: Partial<Omit<RewardItem, 'id' | 'createdAt'>> }>({
    mutationFn: ({ id, data }) => updateRewardItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.items });
      showMessage({ message: 'Article mis à jour', type: 'success' });
    },
    onError: (err) => showMessage({ message: err.message || 'Mise à jour impossible', type: 'danger' }),
  });

  const remove = useMutation<void, Error, string>({
    mutationFn: deleteRewardItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.items });
      showMessage({ message: 'Article supprimé', type: 'success' });
    },
    onError: (err) => showMessage({ message: err.message || 'Suppression impossible', type: 'danger' }),
  });

  return { query, create, update, remove };
};

// ── Product Redemptions ───────────────────────────────────────────────────

export const useAdminProductRedemptions = (status: RedemptionStatusFilter, search: string, page: number) => {
  const queryClient = useQueryClient();

  const query = useQuery<ProductRedemptionList, Error>({
    queryKey: QUERY_KEYS.redemptions(status, search, page),
    queryFn: () => getAdminProductRedemptions(status === 'all' ? undefined : status, search || undefined, page),
  });

  const approve = useMutation({
    mutationFn: (id: string) => approveProductRedemption(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'rewards', 'redemptions'] });
      showMessage({ message: 'Demande approuvée', type: 'success' });
    },
    onError: (err: Error) => showMessage({ message: err.message || 'Approbation impossible', type: 'danger' }),
  });

  const reject = useMutation({
    mutationFn: ({ id, reason, adminRemarks }: { id: string; reason: string; adminRemarks?: string }) =>
      rejectProductRedemption(id, reason, adminRemarks),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'rewards', 'redemptions'] });
      showMessage({ message: 'Demande rejetée', type: 'success' });
    },
    onError: (err: Error) => showMessage({ message: err.message || 'Rejet impossible', type: 'danger' }),
  });

  const ready = useMutation({
    mutationFn: (id: string) => readyProductRedemption(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'rewards', 'redemptions'] });
      showMessage({ message: 'Prêt pour retrait', type: 'success' });
    },
    onError: (err: Error) => showMessage({ message: err.message || 'Action impossible', type: 'danger' }),
  });

  const collect = useMutation({
    mutationFn: (id: string) => collectProductRedemption(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'rewards', 'redemptions'] });
      showMessage({ message: 'Article collecté', type: 'success' });
    },
    onError: (err: Error) => showMessage({ message: err.message || 'Action impossible', type: 'danger' }),
  });

  return { query, approve, reject, ready, collect };
};

// ── Settings V2 ────────────────────────────────────────────────────────────

export const useAdminRewardSettingsV2 = () => {
  const queryClient = useQueryClient();

  const query = useQuery<RewardSettingsV2, Error>({
    queryKey: QUERY_KEYS.settingsV2,
    queryFn: getAdminRewardSettingsV2,
  });

  const update = useMutation<RewardSettingsV2, Error, Partial<RewardSettingsV2>>({
    mutationFn: updateAdminRewardSettingsV2,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.settingsV2 });
      showMessage({ message: 'Paramètres enregistrés', type: 'success' });
    },
    onError: (err) => showMessage({ message: err.message || 'Enregistrement impossible', type: 'danger' }),
  });

  return { query, update };
};

// ── User Points ───────────────────────────────────────────────────────────

export const useAdminUserPoints = (userId: string) => {
  const queryClient = useQueryClient();

  const query = useQuery<UserPointsResult, Error>({
    queryKey: QUERY_KEYS.userPoints(userId),
    queryFn: () => getAdminUserPoints(userId),
    enabled: !!userId,
  });

  const adjust = useMutation<UserPointsResult, Error, { pointsDelta: number; reason: string }>({
    mutationFn: ({ pointsDelta, reason }) => adjustUserPoints(userId, pointsDelta, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userPoints(userId) });
      showMessage({ message: 'Points ajustés', type: 'success' });
    },
    onError: (err) => showMessage({ message: err.message || 'Ajustement impossible', type: 'danger' }),
  });

  return { query, adjust };
};

// ── Adjust Points (standalone mutation hook) ───────────────────────────────

export const useAdminAdjustPoints = () => {
  const queryClient = useQueryClient();

  return useMutation<UserPointsResult, Error, { userId: string; pointsDelta: number; reason: string }>({
    mutationFn: ({ userId, pointsDelta, reason }) => adjustUserPoints(userId, pointsDelta, reason),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userPoints(variables.userId) });
      showMessage({ message: 'Points ajustés', type: 'success' });
    },
    onError: (err) => showMessage({ message: err.message || 'Ajustement impossible', type: 'danger' }),
  });
};

// ── Search Users ───────────────────────────────────────────────────────────

export const useAdminUserSearch = (searchQuery: string) => {
  return useQuery<UserSearchResult[], Error>({
    queryKey: ['admin', 'users', 'search', searchQuery],
    queryFn: () => searchAdminUsers(searchQuery),
    enabled: searchQuery.trim().length >= 2,
    staleTime: 5 * 60 * 1000,
  });
};
