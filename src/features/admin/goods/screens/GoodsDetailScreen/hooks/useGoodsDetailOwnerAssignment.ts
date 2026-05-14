import { useCallback } from 'react';
import { Alert } from 'react-native';
import type { userData } from '@src/shared/types/user';
import type { AssignClientToGoodsInput, Goods } from '../../../types';

interface MutationError {
  message?: string;
}

interface AssignClientMutation {
  mutate: (
    input: AssignClientToGoodsInput,
    options: {
      onSuccess: () => void;
      onError: (error: MutationError) => void;
    },
  ) => void;
}

interface OwnerAssignmentData {
  goods?: Goods | null;
  refetch: () => void;
  assignClientMutation: AssignClientMutation;
}

interface OwnerAssignmentUI {
  selectedOwnerClient: userData | null;
  setSelectedOwnerClient: (client: userData | null) => void;
  ownerAssignmentNotes: string;
  setOwnerAssignmentNotes: (notes: string) => void;
  setAssignClientDialogVisible: (visible: boolean) => void;
  setMenuVisible: (visible: boolean) => void;
}

export const useGoodsDetailOwnerAssignment = (
  data: OwnerAssignmentData,
  ui: OwnerAssignmentUI,
) => {
  const { goods, refetch, assignClientMutation } = data;
  const {
    selectedOwnerClient,
    setSelectedOwnerClient,
    ownerAssignmentNotes,
    setOwnerAssignmentNotes,
    setAssignClientDialogVisible,
    setMenuVisible,
  } = ui;

  const handleOpenAssignClient = useCallback(() => {
    setMenuVisible(false);
    setAssignClientDialogVisible(true);
  }, [setAssignClientDialogVisible, setMenuVisible]);

  const handleDismissAssignClient = useCallback(() => {
    setAssignClientDialogVisible(false);
    setSelectedOwnerClient(null);
    setOwnerAssignmentNotes('');
  }, [setAssignClientDialogVisible, setOwnerAssignmentNotes, setSelectedOwnerClient]);

  const handleAssignClient = useCallback(() => {
    if (!goods || !selectedOwnerClient) {
      Alert.alert('Erreur', 'Veuillez sélectionner un client');
      return;
    }

    assignClientMutation.mutate(
      {
        goodsId: goods._id,
        clientId: selectedOwnerClient._id,
        notes: ownerAssignmentNotes.trim() || undefined,
      },
      {
        onSuccess: () => {
          Alert.alert('Succès', 'Client assigné à la marchandise');
          handleDismissAssignClient();
          refetch();
        },
        onError: (error) => {
          Alert.alert('Erreur', error?.message || "Impossible d'assigner le client");
        },
      },
    );
  }, [
    assignClientMutation,
    goods,
    handleDismissAssignClient,
    ownerAssignmentNotes,
    refetch,
    selectedOwnerClient,
  ]);

  return {
    handleOpenAssignClient,
    handleDismissAssignClient,
    handleAssignClient,
  };
};
