import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Goods } from '../../../goods/types';

type AdminV2StackParamList = {
  AssignGoods: { containerId: string };
  PackingList: { containerId: string; initialClientId?: string; clientId?: string; autoPrint?: boolean };
  LoadingList: { containerId: string };
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

export const useContainerNavigation = (containerId: string, goodsList: Goods[]) => {
  const navigation = useNavigation<NavigationProp>();

  const handleAssignGoods = useCallback(() =>
    navigation.navigate('AssignGoods', { containerId }),
  [navigation, containerId]);

  const handleGeneratePackingList = useCallback(() => {
    if (goodsList.length === 0) { Alert.alert('Info', 'Aucune marchandise'); return; }
    navigation.navigate('PackingList', { containerId });
  }, [goodsList, navigation, containerId]);

  const handleSharePackingList = useCallback(() => {
    if (goodsList.length === 0) { Alert.alert('Info', 'Aucune marchandise à partager'); return; }
    navigation.navigate('PackingList', { containerId, autoPrint: true });
  }, [goodsList, navigation, containerId]);

  const handleGoToLoadingList = useCallback(() => {
    if (goodsList.length === 0) { Alert.alert('Info', 'Aucune marchandise'); return; }
    navigation.navigate('LoadingList', { containerId });
  }, [goodsList, navigation, containerId]);

  return { navigation, handleAssignGoods, handleGeneratePackingList, handleSharePackingList, handleGoToLoadingList };
};
