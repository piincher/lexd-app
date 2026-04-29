import { useCallback } from 'react';
import { Alert } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@src/navigations/type';
import {
  useCreateCargoBag,
  useUpdateCargoBagStatus,
  useAddGoodsToCargoBag,
} from '../../../hooks/useCargoBags';
import { CargoBagStatus } from '../../../types';

export const useCargoBagActions = (
  airwayBillId: string,
  navigation: NativeStackNavigationProp<RootStackParamList>,
  setCreateBagVisible: (visible: boolean) => void
) => {
  const createCargoBagMutation = useCreateCargoBag();
  const updateCargoBagStatusMutation = useUpdateCargoBagStatus();
  const addGoodsToCargoBagMutation = useAddGoodsToCargoBag();

  const handleCreateBag = useCallback(
    async (notes: string) => {
      try {
        await createCargoBagMutation.mutateAsync({ awbId: airwayBillId, notes });
        setCreateBagVisible(false);
      } catch {
        Alert.alert('Erreur', 'Impossible de créer le sac de cargo');
      }
    },
    [airwayBillId, createCargoBagMutation, setCreateBagVisible]
  );

  const handleBagStatusChange = useCallback(
    async (bagId: string, newStatus: CargoBagStatus) => {
      try {
        await updateCargoBagStatusMutation.mutateAsync({ id: bagId, status: newStatus, awbId: airwayBillId });
      } catch {
        Alert.alert('Erreur', 'Impossible de mettre à jour le statut du sac');
      }
    },
    [airwayBillId, updateCargoBagStatusMutation]
  );

  const handleAssignGoodsToBag = useCallback(
    async (bagId: string, goodsIds: string[]) => {
      try {
        await addGoodsToCargoBagMutation.mutateAsync({ id: bagId, input: { goodsIds }, awbId: airwayBillId });
      } catch {
        Alert.alert('Erreur', "Impossible d'assigner les marchandises au sac");
      }
    },
    [airwayBillId, addGoodsToCargoBagMutation]
  );

  const handleBagPress = useCallback(
    (cargoBagId: string) => navigation.navigate('CargoBagDetail', { cargoBagId, airwayBillId }),
    [navigation, airwayBillId]
  );

  return {
    handleCreateBag,
    handleBagStatusChange,
    handleAssignGoodsToBag,
    handleBagPress,
    isCreatingBag: createCargoBagMutation.isPending,
  };
};
