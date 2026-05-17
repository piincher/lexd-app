import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAssignGoodsToAirwayBill } from '../../hooks/useAirwayBills';
import {
  useAddGoodsToCargoBag,
  useCreateCargoBag,
} from '../../hooks/useCargoBags';

interface AssignmentFailure {
  goodsId?: string;
  error?: string;
}

export const useAssignGoodsActions = (airwayBillId: string) => {
  const navigation = useNavigation();
  const assignMutation = useAssignGoodsToAirwayBill();
  const assignToBagMutation = useAddGoodsToCargoBag();
  const createBagMutation = useCreateCargoBag();

  const handleAssign = useCallback(async (selectedIds: string[], selectedBagId: string | null) => {
    if (selectedIds.length === 0) {
      Alert.alert('Erreur', 'Veuillez sélectionner au moins une marchandise');
      return;
    }

    if (selectedBagId) {
      try {
        const response = await assignToBagMutation.mutateAsync({
          id: selectedBagId,
          input: { goodsIds: selectedIds },
          awbId: airwayBillId,
        });
        const payload = response as { data?: { results?: { failed?: AssignmentFailure[]; success?: string[] } } };
        const failed = payload?.data?.results?.failed || [];
        const successCount = payload?.data?.results?.success?.length || 0;

        if (successCount === 0) {
          const errorMessage = failed.map((f) => f.error).filter(Boolean).join('\n');
          Alert.alert('Erreur', errorMessage || 'Aucune marchandise n\'a pu être assignée au sac');
          return;
        }

        if (failed.length > 0) {
          const errorMessage = failed.map((f) => f.error).filter(Boolean).join('\n');
          Alert.alert(
            'Assignation partielle',
            `${successCount} marchandise(s) assignée(s).\n${failed.length} échec(s):\n${errorMessage}`
          );
        } else {
          Alert.alert('Succès', `${successCount} marchandise(s) assignée(s) au sac`);
        }
        navigation.goBack();
      } catch (error: unknown) {
        Alert.alert('Erreur', error instanceof Error ? error.message : 'Échec de l\'assignation au sac');
      }
    } else {
      try {
        await assignMutation.mutateAsync({ id: airwayBillId, input: { goodsIds: selectedIds } });
        Alert.alert('Succès', `${selectedIds.length} marchandise(s) assignée(s)`);
        navigation.goBack();
      } catch (error: unknown) {
        Alert.alert('Erreur', error instanceof Error ? error.message : 'Échec de l\'assignation');
      }
    }
  }, [airwayBillId, assignMutation, assignToBagMutation, navigation]);

  const handleCreateBag = useCallback(async (notes: string, onSuccess?: (bagId: string) => void) => {
    try {
      const result = await createBagMutation.mutateAsync({ awbId: airwayBillId, notes });
      const newBagId = result?.data?.cargoBag?._id;
      if (newBagId) onSuccess?.(newBagId);
    } catch {
      Alert.alert('Erreur', 'Impossible de créer le sac de cargo');
    }
  }, [airwayBillId, createBagMutation]);

  return {
    handleAssign,
    handleCreateBag,
    assignMutation,
    assignToBagMutation,
    createBagMutation,
  };
};
