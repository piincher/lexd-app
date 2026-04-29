import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { ContainerDetailHeader } from '../../screens/components/ContainerDetailHeader';
import { ContainerTimeline } from '../../screens/components/ContainerTimeline';
import { ContainerCapacityCard } from '../../screens/components/ContainerCapacityCard';
import { ContainerGoodsList } from '../../screens/components/ContainerGoodsList';
import { ContainerWaypointSection } from '../../screens/components/ContainerWaypointSection';
import { ContainerProfitCard } from '../../screens/components/ContainerProfitCard';
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
    handleUpdateStatus,
    navigation,
    handleRemoveGoods,
    handleMarkGoodsDelivered,
  } = screen;

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}>
      <ContainerDetailHeader
        containerNumber={container.virtualContainerNumber || container.containerNumber}
        shippingMode={container.shippingMode?.toLowerCase() as 'air' | 'sea' | 'land'}
        status={container.status}
        statusColor={statusColor}
        statusLabel={statusLabel}
        statusMenuVisible={statusMenuVisible}
        setStatusMenuVisible={setStatusMenuVisible}
        onUpdateStatus={handleUpdateStatus}
        onBack={() => navigation.goBack()}
        consignee={consignee}
      />
      <ContainerTimeline currentStatus={container.status} currentStatusIndex={currentStatusIndex} />
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
      <ContainerGoodsList
        goodsList={goodsList}
        onRemoveGoods={handleRemoveGoods}
        onMarkDelivered={handleMarkGoodsDelivered}
      />
    </ScrollView>
  );
};

export default ContainerDetailContent;
