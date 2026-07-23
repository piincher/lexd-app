import React, { useMemo, useState } from 'react';
import { ContainerDetailHeader } from '../../screens/components/ContainerDetailHeader';
import { ContainerEtaCard } from '../../screens/components/ContainerEtaCard';
import { LoadPlanSuggestionCard } from '../../screens/components/LoadPlanSuggestionCard';
import { ScanToAssignModal } from '../../screens/components/ScanToAssignModal';
import { ContainerKeyInfoCard } from '../../screens/components/ContainerKeyInfoCard';
import { buildContainerEta } from '../../screens/hooks/containerEta';
import { useContainerLoadPlan } from '../../screens/hooks/useContainerLoadPlan';
import { ContainerTimeline } from '../../screens/components/ContainerTimeline';
import { ContainerCapacityCard } from '../../screens/components/ContainerCapacityCard';
import { ContainerWaypointSection } from '../../screens/components/ContainerWaypointSection';
import { ContainerProfitCard } from '../../screens/components/ContainerProfitCard';
import { ContainerHealthPanel } from '../../screens/components/ContainerHealthPanel';
import { ContainerIssueAlerts } from '../../screens/components/ContainerIssueAlerts';
import { ContainerSmartFilters } from '../../screens/components/ContainerSmartFilters';
import { ContainerDetailQuickActions } from '../../screens/components/ContainerDetailQuickActions';
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
    assist,
  } = screen;

  const eta = useMemo(() => buildContainerEta(container), [container]);
  const loadPlan = useContainerLoadPlan(container);
  const [scanVisible, setScanVisible] = useState(false);

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
      <ContainerDetailQuickActions
        goodsCount={goodsList.length}
        screen={screen}
        onScanAssign={() => setScanVisible(true)}
      />
      <ContainerHealthPanel health={assist.health} />
      <ContainerEtaCard eta={eta} />
      <ContainerKeyInfoCard container={container} />
      {loadPlan.isLoadable && loadPlan.plan && (
        <LoadPlanSuggestionCard
          plan={loadPlan.plan}
          isApplying={loadPlan.isApplying}
          onApply={loadPlan.applyPlan}
        />
      )}
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
        containerLabel={container.virtualContainerNumber || container.containerNumber}
        containerStatus={container.status}
        containerNumber={container.virtualContainerNumber || container.containerNumber}
      />
    </>
  );

  return (
    <>
      <ContainerClientGroups
        groups={assist.clientGroups}
        header={header}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        onRemoveGoods={handleRemoveGoods}
        onMarkDelivered={handleMarkGoodsDelivered}
      />
      <ScanToAssignModal
        visible={scanVisible}
        containerId={containerId}
        shippingMode={container.shippingMode}
        onDismiss={() => setScanVisible(false)}
      />
    </>
  );
};

export default ContainerDetailContent;
