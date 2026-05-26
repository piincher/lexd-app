import React from 'react';
import { ContainerDangerZone } from '../../screens/components/ContainerDangerZone';
import { ContainerDialogs } from '../../screens/components/ContainerDialogs';
import { ContainerReconciliationModal } from '../../screens/components/ContainerReconciliationModal';
import type { ContainerDetailScreenState } from '../../screens/hooks/useContainerDetailScreen';
import type { Container } from '../../types';

interface ContainerDetailFooterProps {
  container: Container;
  screen: ContainerDetailScreenState;
}

export const ContainerDetailFooter: React.FC<ContainerDetailFooterProps> = ({
  container,
  screen,
}) => {
  const {
    goodsList,
    cbmProfit,
    showReconcileModal,
    setShowReconcileModal,
    handleReconcile,
    reconcileMutation,
    handleAssignGoods,
    handleDeleteContainer,
    deleteContainerMutation,
    showDeleteDialog,
    setShowDeleteDialog,
    confirmDeleteContainer,
    showRemoveGoodsDialog,
    setShowRemoveGoodsDialog,
    confirmRemoveGoods,
    showReadyForPickupDialog,
    setShowReadyForPickupDialog,
    confirmMarkReadyForPickup,
    showDeliveredDialog,
    setShowDeliveredDialog,
    confirmMarkDelivered,
  } = screen;

  return (
    <>
      <ContainerDangerZone
        onAssignGoods={handleAssignGoods}
        onDeleteContainer={handleDeleteContainer}
        isDeletingContainer={deleteContainerMutation.isPending}
      />

      <ContainerDialogs
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
        onConfirmDelete={confirmDeleteContainer}
        hasGoods={goodsList.length > 0}
        isDeletingContainer={deleteContainerMutation.isPending}
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

      {cbmProfit?.dualLedger && (
        <ContainerReconciliationModal
          visible={showReconcileModal}
          onDismiss={() => setShowReconcileModal(false)}
          onConfirm={handleReconcile}
          isLoading={reconcileMutation.isPending}
          containerNumber={container.virtualContainerNumber || container.containerNumber}
          clientTotalCBM={cbmProfit.dualLedger.clientTotalCBM}
          clientTotalRevenue={cbmProfit.dualLedger.clientTotalRevenue}
          currentAgentUnitCost={cbmProfit.dualLedger.agentUnitCost}
        />
      )}
    </>
  );
};

export default ContainerDetailFooter;
