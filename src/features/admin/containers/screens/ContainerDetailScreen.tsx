/**
 * ContainerDetailScreen - Container details with goods management
 * Refactored: Composition pattern with extracted components
 */

import React from 'react';
import { SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { useContainerDetailScreen } from './hooks';
import { styles } from './ContainerDetailScreen.styles';
import {
  ContainerDetailHeader, ContainerTimeline, ContainerCapacityCard,
  ContainerGoodsList, ContainerWaypointSection, ContainerActionButtons,
  ContainerDialogs, LoadingState, ErrorState,
} from './components';

export const ContainerDetailScreen: React.FC = () => {
  const screen = useContainerDetailScreen();
  if (screen.isLoading) return <LoadingState />;
  if (!screen.container) return <ErrorState onBack={() => screen.navigation.goBack()} />;

  const { container, goodsList, isRefreshing, statusColor, statusLabel, 
    currentStatusIndex, fillPercentage, fillColor, handleRefresh } = screen;
  const { containerId, statusMenuVisible, setStatusMenuVisible, handleUpdateStatus } = screen;
  const { showDeleteDialog, setShowDeleteDialog, confirmDeleteContainer } = screen;
  const { showRemoveGoodsDialog, setShowRemoveGoodsDialog, confirmRemoveGoods } = screen;
  const { showReadyForPickupDialog, setShowReadyForPickupDialog, confirmMarkReadyForPickup } = screen;
  const { handleRemoveGoods, handleMarkGoodsDelivered, handleAssignGoods } = screen;
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
        <ContainerCapacityCard totalCBM={container.totalCBM || 0} fillPercentage={fillPercentage} fillColor={fillColor} />
        <ContainerWaypointSection containerId={containerId} />
        <ContainerGoodsList goodsList={goodsList} onRemoveGoods={handleRemoveGoods} onMarkDelivered={handleMarkGoodsDelivered} />
      </ScrollView>

      <ContainerActionButtons
        onAssignGoods={handleAssignGoods}
        onGeneratePackingList={handleGeneratePackingList}
        onGoToLoadingList={handleGoToLoadingList}
        onMarkReadyForPickup={handleMarkReadyForPickup}
        hasGoods={goodsList.length > 0}
        canMarkReadyForPickup={container.status === 'ARRIVED'}
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
      />
    </SafeAreaView>
  );
};

export default ContainerDetailScreen;
