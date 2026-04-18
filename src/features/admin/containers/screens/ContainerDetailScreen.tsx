/**
 * ContainerDetailScreen - Container details with goods management
 * Refactored: Composition pattern with extracted components
 */

import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContainerDetailScreen } from './hooks/useContainerDetailScreen';
import { styles } from './ContainerDetailScreen.styles';
import { ContainerDetailHeader } from './components/ContainerDetailHeader';
import { ContainerTimeline } from './components/ContainerTimeline';
import { ContainerCapacityCard } from './components/ContainerCapacityCard';
import { ContainerGoodsList } from './components/ContainerGoodsList';
import { ContainerWaypointSection } from './components/ContainerWaypointSection';
import { ContainerActionButtons } from './components/ContainerActionButtons';
import { ContainerDialogs } from './components/ContainerDialogs';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { ContainerProfitCard } from './components/ContainerProfitCard';

/**
 * Container Delivery Flow (Option A):
 * 
 * 1. Admin clicks "Marquer comme Livré" on Container
 * 2. Backend handles cascade:
 *    - Container status → DELIVERED
 *    - All goods in container → DELIVERED
 *    - Associated orders auto-update if all goods delivered
 * 3. Customer sees "Livré" status
 * 
 * Note: Order-level "Mark as Delivered" button has been removed
 * since delivery is now managed at the container level.
 */

export const ContainerDetailScreen: React.FC = () => {
  const screen = useContainerDetailScreen();
  if (screen.isLoading) return <LoadingState />;
  if (!screen.container) return <ErrorState onBack={() => screen.navigation.goBack()} />;

  const { container, goodsList, cbmProfit, isRefreshing, statusColor, statusLabel,
    currentStatusIndex, fillPercentage, fillColor, isAirContainer, capacityValue, maxCapacity, handleRefresh } = screen;
  const { containerId, statusMenuVisible, setStatusMenuVisible, handleUpdateStatus } = screen;
  const { showDeleteDialog, setShowDeleteDialog, confirmDeleteContainer } = screen;
  const { showRemoveGoodsDialog, setShowRemoveGoodsDialog, confirmRemoveGoods } = screen;
  const { showReadyForPickupDialog, setShowReadyForPickupDialog, confirmMarkReadyForPickup } = screen;
  const { showDeliveredDialog, setShowDeliveredDialog, confirmMarkDelivered } = screen;
  const { handleRemoveGoods, handleMarkGoodsDelivered, handleAssignGoods } = screen;
  const { handleMarkDelivered, canMarkDelivered } = screen;
  const { handleGeneratePackingList, handleGoToLoadingList, handleMarkReadyForPickup } = screen;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}>
        <ContainerDetailHeader
          containerNumber={container.virtualContainerNumber || container.containerNumber}
          shippingMode={container.shippingMode}
          status={container.status}
          statusColor={statusColor}
          statusLabel={statusLabel}
          statusMenuVisible={statusMenuVisible}
          setStatusMenuVisible={setStatusMenuVisible}
          onUpdateStatus={handleUpdateStatus}
          onBack={() => screen.navigation.goBack()}
        />
        <ContainerTimeline currentStatus={container.status} currentStatusIndex={currentStatusIndex} />
        <ContainerCapacityCard totalCBM={capacityValue} fillPercentage={fillPercentage} fillColor={fillColor} maxCBM={maxCapacity} isAir={isAirContainer} />
        {cbmProfit && <ContainerProfitCard cbmProfit={cbmProfit} />}
        <ContainerWaypointSection 
          containerId={containerId} 
          containerStatus={container.status}
          containerNumber={container.virtualContainerNumber || container.containerNumber}
        />
        <ContainerGoodsList goodsList={goodsList} onRemoveGoods={handleRemoveGoods} onMarkDelivered={handleMarkGoodsDelivered} />
      </ScrollView>

      <ContainerActionButtons
        onAssignGoods={handleAssignGoods}
        onGeneratePackingList={handleGeneratePackingList}
        onGoToLoadingList={handleGoToLoadingList}
        onMarkReadyForPickup={handleMarkReadyForPickup}
        onMarkDelivered={handleMarkDelivered}
        hasGoods={goodsList.length > 0}
        canMarkReadyForPickup={container.status === 'ARRIVED'}
        canMarkDelivered={canMarkDelivered}
      />

      <ContainerDialogs
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
        onConfirmDelete={confirmDeleteContainer}
        hasGoods={goodsList.length > 0}
        showRemoveGoodsDialog={showRemoveGoodsDialog}
        setShowRemoveGoodsDialog={setShowRemoveGoodsDialog}
        onConfirmRemoveGoods={confirmRemoveGoods}
        showReadyForPickupDialog={showReadyForPickupDialog}
        setShowReadyForPickupDialog={setShowReadyForPickupDialog}
        onConfirmReadyForPickup={confirmMarkReadyForPickup}
        showDeliveredDialog={showDeliveredDialog}
        setShowDeliveredDialog={setShowDeliveredDialog}
        onConfirmDelivered={confirmMarkDelivered}
      />
    </SafeAreaView>
  );
};

export default ContainerDetailScreen;
