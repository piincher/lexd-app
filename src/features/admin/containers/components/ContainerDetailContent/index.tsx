import React from 'react';
import { ContainerDetailHeader } from '../../screens/components/ContainerDetailHeader';
import { ContainerTimeline } from '../../screens/components/ContainerTimeline';
import { ContainerCapacityCard } from '../../screens/components/ContainerCapacityCard';
import { ContainerWaypointSection } from '../../screens/components/ContainerWaypointSection';
import { ContainerProfitCard } from '../../screens/components/ContainerProfitCard';
import { ContainerHealthPanel } from '../../screens/components/ContainerHealthPanel';
import { ContainerIssueAlerts } from '../../screens/components/ContainerIssueAlerts';
import { ContainerSmartFilters } from '../../screens/components/ContainerSmartFilters';
import { ContainerQuickActionsBar } from '../../screens/components/ContainerQuickActionsBar';
import { ContainerClientGroups } from '../../screens/components/ContainerClientGroups';
import type { ContainerDetailScreenState } from '../../screens/hooks/useContainerDetailScreen';
import type { Container } from '../../types';

interface ContainerDetailContentProps {
  container: Container;
  screen: ContainerDetailScreenState;
}

export const ContainerDetailContent: React.FC<ContainerDetailContentProps> = ({
  container,
  screen,
}) => {
  const {
    containerId,
    goodsList,
    cbmProfit,
    isRefreshing,
    handleRefresh,
    statusColor,
    statusLabel,
    currentStatusIndex,
    fillPercentage,
    fillColor,
    isAirContainer,
    capacityValue,
    maxCapacity,
    consignee,
    statusMenuVisible,
    setStatusMenuVisible,
    updateStatusMutation,
    handleUpdateStatus,
    navigation,
    handleRemoveGoods,
    handleMarkGoodsDelivered,
    handleAssignGoods,
    handleGeneratePackingList,
    handleSharePackingList,
    handleGoToLoadingList,
    handleMarkReadyForPickup,
    handleMarkDelivered,
    canMarkReadyForPickup,
    canMarkDelivered,
    assist,
  } = screen;

  const header = (
    <>
      <ContainerDetailHeader
        containerNumber={container.virtualContainerNumber || container.containerNumber}
        shippingMode={container.shippingMode?.toLowerCase() as 'air' | 'sea' | 'land'}
        status={container.status}
        statusColor={statusColor}
        statusLabel={statusLabel}
        statusMenuVisible={statusMenuVisible}
        setStatusMenuVisible={setStatusMenuVisible}
        onUpdateStatus={handleUpdateStatus}
        isUpdatingStatus={updateStatusMutation.isPending}
        onBack={() => navigation.goBack()}
        consignee={consignee}
      />
      <ContainerTimeline currentStatus={container.status} currentStatusIndex={currentStatusIndex} />
      <ContainerQuickActionsBar
        hasGoods={goodsList.length > 0}
        canMarkReadyForPickup={canMarkReadyForPickup}
        canMarkDelivered={canMarkDelivered}
        onAssignGoods={handleAssignGoods}
        onSharePackingList={handleSharePackingList}
        onOpenPackingList={handleGeneratePackingList}
        onOpenLoadingList={handleGoToLoadingList}
        onMarkReadyForPickup={handleMarkReadyForPickup}
        onMarkDelivered={handleMarkDelivered}
      />
      <ContainerHealthPanel health={assist.health} />
      <ContainerIssueAlerts issues={assist.issues} />
      <ContainerSmartFilters
        searchQuery={assist.searchQuery}
        activeFilter={assist.activeFilter}
        counts={assist.filterCounts}
        onSearchChange={assist.setSearchQuery}
        onFilterChange={assist.setActiveFilter}
      />
      <ContainerCapacityCard
        totalCBM={capacityValue}
        fillPercentage={fillPercentage}
        fillColor={fillColor}
        maxCBM={maxCapacity}
        isAir={isAirContainer}
      />
      {cbmProfit && (
        <ContainerProfitCard
          cbmProfit={cbmProfit}
          onReconcile={
            container.reconciliationStatus !== 'RECONCILED'
              ? () => screen.setShowReconcileModal(true)
              : undefined
          }
        />
      )}
      <ContainerWaypointSection
        containerId={containerId}
        containerStatus={container.status}
        containerNumber={container.virtualContainerNumber || container.containerNumber}
      />
    </>
  );

  return (
    <ContainerClientGroups
      groups={assist.clientGroups}
      header={header}
      isRefreshing={isRefreshing}
      onRefresh={handleRefresh}
      onRemoveGoods={handleRemoveGoods}
      onMarkDelivered={handleMarkGoodsDelivered}
    />
  );
};

export default ContainerDetailContent;
