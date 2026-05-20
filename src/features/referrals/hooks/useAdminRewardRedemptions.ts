import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showMessage } from 'react-native-flash-message';
import {
  approveRedemption,
  getAdminRedemptions,
  getEligibleRedemptionGoods,
  getRedemptionAnalytics,
  rejectRedemption,
} from '../api/referralApi';
import type { RewardRedemption, RewardRedemptionStatus } from '../types';
import {
  getErrorMessage,
  invalidateRedemptionSideEffects,
  redemptionQueryKeys,
} from './rewardRedemptionQueryKeys';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

export const useAdminRewardRedemptions = () => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<RewardRedemptionStatus | 'ALL'>('PENDING');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [selectedRequest, setSelectedRequest] = useState<RewardRedemption | null>(null);
  const [selectedGoodsIds, setSelectedGoodsIds] = useState<string[]>([]);
  const [approvedPoints, setApprovedPoints] = useState('');
  const [note, setNote] = useState('');
  const [reason, setReason] = useState('');
  const hasInitializedPoints = useRef(false);
  const hasUserSelectedGoods = useRef(false);

  const queue = useQuery({
    queryKey: redemptionQueryKeys.admin(status, search, page, DEFAULT_LIMIT),
    queryFn: () => getAdminRedemptions(status, search, page, DEFAULT_LIMIT),
  });

  const analytics = useQuery({
    queryKey: redemptionQueryKeys.analytics(),
    queryFn: () => getRedemptionAnalytics(),
  });

  const eligibleGoods = useQuery({
    queryKey: redemptionQueryKeys.eligibleGoods(selectedRequest?.id || ''),
    queryFn: () => getEligibleRedemptionGoods(selectedRequest!.id),
    enabled: !!selectedRequest,
  });

  const pointValue = selectedRequest?.pointValueFCFA || 50;
  const goodsItems = eligibleGoods.data?.items || [];
  const selectedGoods = useMemo(
    () => goodsItems.filter((item) => selectedGoodsIds.includes(item.id)),
    [goodsItems, selectedGoodsIds]
  );

  // Selected goods calculations
  const selectedOutstanding = selectedGoods.reduce((total, item) => total + item.balanceDue, 0);
  const selectedCapValue = Math.floor(selectedOutstanding * 0.2);
  const selectedMaxPoints = Math.floor(selectedCapValue / pointValue);

  // Total (all eligible goods) calculations
  const totalOutstanding = goodsItems.reduce((total, item) => total + item.balanceDue, 0);
  const totalCapValue = Math.floor(totalOutstanding * 0.2);
  const totalMaxPoints = Math.floor(totalCapValue / pointValue);

  const parsedApprovedPoints = Number.parseInt(approvedPoints, 10) || 0;
  const approvedValue = parsedApprovedPoints * pointValue;

  // Validation logic with specific messages
  const validationMessage = useMemo(() => {
    if (!selectedRequest) return null;
    if (selectedGoodsIds.length === 0) {
      return 'Sélectionnez au moins une marchandise';
    }
    if (parsedApprovedPoints <= 0) {
      return 'Entrez un nombre de points positif';
    }
    if (parsedApprovedPoints > selectedRequest.requestedPoints) {
      return `Points approuvés dépassent la demande (${selectedRequest.requestedPoints})`;
    }
    if (approvedValue > selectedCapValue) {
      return `Valeur approuvée dépasse la limite 20% (${selectedCapValue.toLocaleString('fr-FR')} FCFA)`;
    }
    return null;
  }, [selectedRequest, selectedGoodsIds.length, parsedApprovedPoints, approvedValue, selectedCapValue]);

  const canApprove =
    !!selectedRequest &&
    selectedGoodsIds.length > 0 &&
    parsedApprovedPoints > 0 &&
    parsedApprovedPoints <= selectedRequest.requestedPoints &&
    approvedValue <= selectedCapValue;

  // Auto-select all goods when eligible goods data loads (only once per request)
  useEffect(() => {
    if (!selectedRequest) return;
    if (eligibleGoods.isLoading) return;
    if (hasUserSelectedGoods.current) return; // User manually interacted with selection
    if (selectedGoodsIds.length > 0) return; // Already has selection
    setSelectedGoodsIds(goodsItems.map((item) => item.id));
  }, [selectedRequest, eligibleGoods.isLoading, goodsItems, selectedGoodsIds.length]);

  // Auto-initialize approvedPoints once after goods are selected
  useEffect(() => {
    if (!selectedRequest) {
      hasInitializedPoints.current = false;
      return;
    }
    if (hasInitializedPoints.current) return;
    if (selectedMaxPoints === 0) return; // No goods selected yet or no cap available
    const defaultPoints = Math.min(selectedRequest.requestedPoints, selectedMaxPoints);
    setApprovedPoints(defaultPoints > 0 ? String(defaultPoints) : '');
    hasInitializedPoints.current = true;
  }, [selectedRequest, selectedMaxPoints]);

  const resetSelection = useCallback(() => {
    setSelectedRequest(null);
    setSelectedGoodsIds([]);
    setApprovedPoints('');
    setNote('');
    setReason('');
    hasInitializedPoints.current = false;
    hasUserSelectedGoods.current = false;
  }, []);

  const handleSetSelectedRequest = useCallback((request: RewardRedemption | null) => {
    setSelectedRequest(request);
    setSelectedGoodsIds([]);
    setApprovedPoints('');
    setNote('');
    setReason('');
    hasInitializedPoints.current = false;
    hasUserSelectedGoods.current = false;
  }, []);

  const approveMutation = useMutation({
    mutationFn: () => approveRedemption(selectedRequest!.id, {
      approvedPoints: parsedApprovedPoints,
      goodsIds: selectedGoodsIds,
      note,
    }),
    onSuccess: () => {
      invalidateRedemptionSideEffects(queryClient, selectedRequest?.userId);
      resetSelection();
      showMessage({ message: 'Demande approuvée', type: 'success' });
    },
    onError: (error) => showMessage({
      message: getErrorMessage(error, 'Approbation impossible'),
      type: 'danger',
    }),
  });

  const rejectMutation = useMutation({
    mutationFn: () => rejectRedemption(selectedRequest!.id, reason),
    onSuccess: () => {
      invalidateRedemptionSideEffects(queryClient, selectedRequest?.userId);
      resetSelection();
      showMessage({ message: 'Demande rejetée', type: 'success' });
    },
    onError: (error) => showMessage({ message: getErrorMessage(error, 'Rejet impossible'), type: 'danger' }),
  });

  const toggleGoods = useCallback((goodsId: string) => {
    hasUserSelectedGoods.current = true;
    setSelectedGoodsIds((current) =>
      current.includes(goodsId) ? current.filter((item) => item !== goodsId) : [...current, goodsId]
    );
  }, []);

  const selectAllGoods = useCallback(() => {
    hasUserSelectedGoods.current = true;
    setSelectedGoodsIds(goodsItems.map((item) => item.id));
  }, [goodsItems]);

  const deselectAllGoods = useCallback(() => {
    hasUserSelectedGoods.current = true;
    setSelectedGoodsIds([]);
  }, []);

  const handleStatusChange = useCallback((newStatus: RewardRedemptionStatus | 'ALL') => {
    setStatus(newStatus);
    setPage(DEFAULT_PAGE);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(DEFAULT_PAGE);
  }, []);

  const nextPage = useCallback(() => {
    if (queue.data && page < queue.data.pagination.pages) {
      setPage((p) => p + 1);
    }
  }, [page, queue.data]);

  const prevPage = useCallback(() => {
    setPage((p) => Math.max(1, p - 1));
  }, []);

  return {
    queue, status, setStatus: handleStatusChange,
    search, setSearch: handleSearchChange,
    page, setPage, nextPage, prevPage,
    selectedRequest, setSelectedRequest: handleSetSelectedRequest,
    eligibleGoods, selectedGoodsIds, toggleGoods, selectAllGoods, deselectAllGoods,
    approvedPoints, setApprovedPoints,
    note, setNote,
    reason, setReason,
    selectedOutstanding, selectedCapValue, selectedMaxPoints,
    totalOutstanding, totalCapValue, totalMaxPoints,
    approvedValue, canApprove, validationMessage,
    approve: approveMutation.mutate, reject: rejectMutation.mutate,
    closeModal: resetSelection,
    isApproving: approveMutation.isPending, isRejecting: rejectMutation.isPending,
    analytics,
  };
};
