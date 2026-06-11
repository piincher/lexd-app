import { useCallback } from 'react';
import { Alert } from 'react-native';

export const useGoodsDetailAssignDialog = (data: any, ui: any, navigation: any) => {
  const { isAirShipping, hasContainers, hasAirwayBills, goods } = data;
  const { setMenuVisible, setAssignDialogVisible, setIsCorrection } = ui;

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
    // Default the "correction" flag ON when the good is already in a container
    // (this assignment is a move/fix → don't notify the client).
    setIsCorrection?.(!!goods?.containerId);
    // Defer opening the dialog by a frame: the three-dot Menu and this Dialog are
    // both react-native-paper Portals. Toggling them in the same tick leaves the
    // Portal host wedged so the Dialog won't reopen until the screen is remounted.
    // Closing the menu first, then opening on the next frame, avoids that race.
    requestAnimationFrame(() => setAssignDialogVisible(true));
  }, [isAirShipping, hasAirwayBills, hasContainers, navigation, setMenuVisible, setAssignDialogVisible, setIsCorrection, goods]);

  return { handleAssignPress };
};
