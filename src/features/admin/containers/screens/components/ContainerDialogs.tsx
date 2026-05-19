/**
 * ContainerDialogs - Dialog components for ContainerDetailScreen
 * Extracted to keep ContainerDetailScreen under 100 lines
 */

import React from 'react';
import { DeleteContainerDialog } from './DeleteContainerDialog';
import { RemoveGoodsDialog } from './RemoveGoodsDialog';
import { ReadyForPickupDialog } from './ReadyForPickupDialog';
import { DeliveredDialog } from './DeliveredDialog';

interface ContainerDialogsProps {
  // Delete dialog
  showDeleteDialog: boolean;
  setShowDeleteDialog: (show: boolean) => void;
  onConfirmDelete: () => void;
  hasGoods: boolean;
  isDeletingContainer: boolean;

  // Remove goods dialog
  showRemoveGoodsDialog: boolean;
  setShowRemoveGoodsDialog: (show: boolean) => void;
  onConfirmRemoveGoods: () => void;

  // Ready for pickup dialog
  showReadyForPickupDialog: boolean;
  setShowReadyForPickupDialog: (show: boolean) => void;
  onConfirmReadyForPickup: () => void;

  // Delivered dialog
  showDeliveredDialog: boolean;
  setShowDeliveredDialog: (show: boolean) => void;
  onConfirmDelivered: () => void;
}

export const ContainerDialogs: React.FC<ContainerDialogsProps> = ({
  // Delete dialog
  showDeleteDialog,
  setShowDeleteDialog,
  onConfirmDelete,
  hasGoods,
  isDeletingContainer,

  // Remove goods dialog
  showRemoveGoodsDialog,
  setShowRemoveGoodsDialog,
  onConfirmRemoveGoods,

  // Ready for pickup dialog
  showReadyForPickupDialog,
  setShowReadyForPickupDialog,
  onConfirmReadyForPickup,

  // Delivered dialog
  showDeliveredDialog,
  setShowDeliveredDialog,
  onConfirmDelivered,
}) => {
  return (
    <>
      <DeleteContainerDialog
        visible={showDeleteDialog}
        onDismiss={() => setShowDeleteDialog(false)}
        onConfirm={onConfirmDelete}
        hasGoods={hasGoods}
        isDeleting={isDeletingContainer}
      />

      <RemoveGoodsDialog
        visible={showRemoveGoodsDialog}
        onDismiss={() => setShowRemoveGoodsDialog(false)}
        onConfirm={onConfirmRemoveGoods}
      />

      <ReadyForPickupDialog
        visible={showReadyForPickupDialog}
        onDismiss={() => setShowReadyForPickupDialog(false)}
        onConfirm={onConfirmReadyForPickup}
      />

      <DeliveredDialog
        visible={showDeliveredDialog}
        onDismiss={() => setShowDeliveredDialog(false)}
        onConfirm={onConfirmDelivered}
      />
    </>
  );
};

export default ContainerDialogs;
