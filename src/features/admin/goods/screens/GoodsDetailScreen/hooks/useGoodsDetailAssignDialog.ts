import { useCallback } from 'react';
import { Alert } from 'react-native';

export const useGoodsDetailAssignDialog = (data: any, ui: any, navigation: any) => {
  const { isAirShipping, hasContainers, hasAirwayBills } = data;
  const { setMenuVisible, setAssignDialogVisible } = ui;

  const handleAssignPress = useCallback(() => {
    setMenuVisible(false);
    if (isAirShipping && !hasAirwayBills) {
      Alert.alert('Aucune lettre de transport disponible', 'Veuillez d\'abord créer une lettre de transport pour assigner cette marchandise.', [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Créer AWB', onPress: () => navigation.navigate('CreateAirwayBill' as never) },
      ]);
      return;
    }
    if (!isAirShipping && !hasContainers) {
      Alert.alert('Aucun container disponible', 'Veuillez d\'abord créer un container pour assigner cette marchandise.', [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Créer Container', onPress: () => navigation.navigate('CreateContainer' as never) },
      ]);
      return;
    }
    setAssignDialogVisible(true);
  }, [isAirShipping, hasAirwayBills, hasContainers, navigation, setMenuVisible, setAssignDialogVisible]);

  return { handleAssignPress };
};
