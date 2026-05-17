import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const useContainerNavigation = (containerId: string, goodsList: any[]) => {
  const navigation = useNavigation();

  const handleAssignGoods = useCallback(() =>
    navigation.navigate('AssignGoods' as never, { containerId } as never),
  [navigation, containerId]);

  const handleGeneratePackingList = useCallback(() => {
    if (goodsList.length === 0) { Alert.alert('Info', 'Aucune marchandise'); return; }
    navigation.navigate('PackingList' as never, { containerId } as never);
  }, [goodsList, navigation, containerId]);

  const handleGoToLoadingList = useCallback(() => {
    if (goodsList.length === 0) { Alert.alert('Info', 'Aucune marchandise'); return; }
    navigation.navigate('LoadingList' as never, { containerId } as never);
  }, [goodsList, navigation, containerId]);

  return { navigation, handleAssignGoods, handleGeneratePackingList, handleGoToLoadingList };
};
