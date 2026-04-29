import { useState } from 'react';

export const useGoodsDetailUI = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [assignDialogVisible, setAssignDialogVisible] = useState(false);
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);
  const [selectedAirwayBillId, setSelectedAirwayBillId] = useState<string | null>(null);

  return {
    menuVisible,
    setMenuVisible,
    assignDialogVisible,
    setAssignDialogVisible,
    selectedContainerId,
    setSelectedContainerId,
    selectedAirwayBillId,
    setSelectedAirwayBillId,
  };
};
