import { Alert } from 'react-native';
import { useAssignGoodsToContainer } from '../../../hooks';
import { CONTAINER_STATUS_LABELS, ContainerStatus } from '../../../types';

export const useAssignGoodsMutation = (
  containerId: string,
  selectedGoods: string[],
  isAssignable: boolean,
  isOverCapacity: boolean,
  containerStatus: ContainerStatus,
  isLateAssignment: boolean,
  navigation: { goBack: () => void },
) => {
  const assignMutation = useAssignGoodsToContainer();

  const handleAssign = async () => {
    if (selectedGoods.length === 0) return;
    if (!isAssignable)
      return Alert.alert(
        'Action impossible',
        `Ce container est en statut "${CONTAINER_STATUS_LABELS[containerStatus]}". Aucune marchandise ne peut être assignée pour le moment.`,
        [{ text: 'OK' }],
      );
    if (isOverCapacity)
      return Alert.alert(
        'Capacité dépassée',
        'La sélection dépasse la capacité du container. Veuillez désélectionner des articles.',
        [{ text: 'OK' }],
      );
    try {
      await assignMutation.mutateAsync({
        containerId,
        data: { goodsIds: selectedGoods, isCorrection: isLateAssignment },
      });
      Alert.alert('Succès', `${selectedGoods.length} marchandise(s) assignée(s) au container`, [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      Alert.alert(
        'Erreur',
        error?.message || "Une erreur s'est produite lors de l'assignation.",
      );
    }
  };

  return { assignMutation, handleAssign };
};
