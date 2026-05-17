import { useCallback } from 'react';
import { CargoBagStatus } from '../types';
import { useCargoBagDetailNavigation } from './detail/useCargoBagDetailNavigation';
import { useCargoBagDetailData } from './detail/useCargoBagDetailData';
import { useCargoBagDetailUI } from './detail/useCargoBagDetailUI';
import { useCargoBagStatusActions } from './detail/useCargoBagStatusActions';
import { useCargoBagGoodsActions } from './detail/useCargoBagGoodsActions';

const STATUS_LABELS: Record<CargoBagStatus, string> = {
  PACKED: 'Emballé',
  CHECKED_IN: 'Enregistré',
  LOADED: 'Chargé',
  IN_TRANSIT: 'En transit',
  ARRIVED: 'Arrivé',
  CLEARED: 'Dédouané',
};

export const useCargoBagDetailScreen = () => {
  const { navigation, cargoBagId, airwayBillId } = useCargoBagDetailNavigation();
  const {
    cargoBag,
    waypointPayload,
    goodsList,
    isLoading,
    isRefreshing,
    refetch,
    refetchWaypoints,
  } = useCargoBagDetailData(cargoBagId);

  const ui = useCargoBagDetailUI();

  const statusActions = useCargoBagStatusActions(
    cargoBagId,
    airwayBillId,
    navigation,
    ui.setStatusMenuVisible,
    refetch,
    refetchWaypoints
  );

  const goodsActions = useCargoBagGoodsActions(
    cargoBagId,
    airwayBillId,
    navigation,
    ui.selectedRemoveIds,
    ui.setRemoveMode,
    ui.setSelectedRemoveIds,
    refetch
  );

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleRefresh = useCallback(() => {
    refetch();
    refetchWaypoints();
  }, [refetch, refetchWaypoints]);

  return {
    cargoBag,
    waypointPayload,
    goodsList,
    isLoading,
    isRefreshing,
    handleRefresh,
    handleBack,
    statusMenuVisible: ui.statusMenuVisible,
    setStatusMenuVisible: ui.setStatusMenuVisible,
    statusLabels: STATUS_LABELS,
    handleChangeStatus: statusActions.handleChangeStatus,
    handleWaypointStatusChange: statusActions.handleWaypointStatusChange,
    removeMode: ui.removeMode,
    selectedRemoveIds: ui.selectedRemoveIds,
    handleToggleRemoveMode: ui.toggleRemoveMode,
    handleToggleRemoveSelection: ui.toggleRemoveSelection,
    handleConfirmRemove: goodsActions.handleConfirmRemove,
    handleAddGoods: goodsActions.handleAddGoods,
    handleDeleteBag: statusActions.handleDeleteBag,
    isRemoving: goodsActions.isRemoving,
    isUpdatingStatus: statusActions.isUpdatingStatus,
  };
};
