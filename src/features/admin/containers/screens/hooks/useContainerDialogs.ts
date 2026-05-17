import { useState, useCallback } from 'react';

export interface ContainerDialogsState {
  statusMenuVisible: boolean;
  setStatusMenuVisible: (v: boolean) => void;
  showDeleteDialog: boolean;
  setShowDeleteDialog: (v: boolean) => void;
  showRemoveGoodsDialog: boolean;
  setShowRemoveGoodsDialog: (v: boolean) => void;
  showReadyForPickupDialog: boolean;
  setShowReadyForPickupDialog: (v: boolean) => void;
  showDeliveredDialog: boolean;
  setShowDeliveredDialog: (v: boolean) => void;
  showReconcileModal: boolean;
  setShowReconcileModal: (v: boolean) => void;
  selectedGoodsId: string | null;
  setSelectedGoodsId: (v: string | null) => void;
  handleRemoveGoods: (goodsId: string) => void;
  handleMarkReadyForPickup: () => void;
  handleMarkDelivered: () => void;
}

export const useContainerDialogs = (): ContainerDialogsState => {
  const [statusMenuVisible, setStatusMenuVisible] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRemoveGoodsDialog, setShowRemoveGoodsDialog] = useState(false);
  const [showReadyForPickupDialog, setShowReadyForPickupDialog] = useState(false);
  const [showDeliveredDialog, setShowDeliveredDialog] = useState(false);
  const [showReconcileModal, setShowReconcileModal] = useState(false);
  const [selectedGoodsId, setSelectedGoodsId] = useState<string | null>(null);

  const handleRemoveGoods = useCallback((goodsId: string) => {
    setSelectedGoodsId(goodsId);
    setShowRemoveGoodsDialog(true);
  }, []);

  const handleMarkReadyForPickup = useCallback(() => setShowReadyForPickupDialog(true), []);
  const handleMarkDelivered = useCallback(() => setShowDeliveredDialog(true), []);

  return {
    statusMenuVisible, setStatusMenuVisible,
    showDeleteDialog, setShowDeleteDialog,
    showRemoveGoodsDialog, setShowRemoveGoodsDialog,
    showReadyForPickupDialog, setShowReadyForPickupDialog,
    showDeliveredDialog, setShowDeliveredDialog,
    showReconcileModal, setShowReconcileModal,
    selectedGoodsId, setSelectedGoodsId,
    handleRemoveGoods,
    handleMarkReadyForPickup,
    handleMarkDelivered,
  };
};
