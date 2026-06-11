import { useState } from 'react';
import type { userData } from '@src/shared/types/user';

export const useGoodsDetailUI = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [assignDialogVisible, setAssignDialogVisible] = useState(false);
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);
  const [selectedAirwayBillId, setSelectedAirwayBillId] = useState<string | null>(null);
  // When true, the assignment is a correction → the client is NOT notified.
  const [isCorrection, setIsCorrection] = useState(false);

  // Assign-client (for previously-unidentified goods).
  const [assignClientDialogVisible, setAssignClientDialogVisible] = useState(false);
  const [selectedOwnerClient, setSelectedOwnerClient] = useState<userData | null>(null);
  const [ownerAssignmentNotes, setOwnerAssignmentNotes] = useState('');

  return {
    menuVisible,
    setMenuVisible,
    assignDialogVisible,
    setAssignDialogVisible,
    selectedContainerId,
    setSelectedContainerId,
    selectedAirwayBillId,
    setSelectedAirwayBillId,
    isCorrection,
    setIsCorrection,
    assignClientDialogVisible,
    setAssignClientDialogVisible,
    selectedOwnerClient,
    setSelectedOwnerClient,
    ownerAssignmentNotes,
    setOwnerAssignmentNotes,
  };
};
