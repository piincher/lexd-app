import React from 'react';
import { ContainerQuickActionsBar } from './ContainerQuickActionsBar';
import type { ContainerDetailScreenState } from '../hooks/useContainerDetailScreen';

interface ContainerDetailQuickActionsProps {
  goodsCount: number;
  screen: ContainerDetailScreenState;
  onScanAssign: () => void;
}

export const ContainerDetailQuickActions: React.FC<ContainerDetailQuickActionsProps> = ({
  goodsCount,
  screen,
  onScanAssign,
}) => (
  <ContainerQuickActionsBar
    hasGoods={goodsCount > 0}
    canMarkReadyForPickup={screen.canMarkReadyForPickup}
    canMarkDelivered={screen.canMarkDelivered}
    canArchive={screen.canArchive}
    canUnarchive={screen.canUnarchive}
    isArchiving={screen.archiveContainerMutation.isPending}
    isUnarchiving={screen.unarchiveContainerMutation.isPending}
    onAssignGoods={screen.handleAssignGoods}
    onScanAssign={onScanAssign}
    onSharePackingList={screen.handleSharePackingList}
    onOpenPackingList={screen.handleGeneratePackingList}
    onOpenLoadingList={screen.handleGoToLoadingList}
    onMarkReadyForPickup={screen.handleMarkReadyForPickup}
    onMarkDelivered={screen.handleMarkDelivered}
    onArchive={screen.confirmArchiveContainer}
    onUnarchive={screen.confirmUnarchiveContainer}
  />
);
