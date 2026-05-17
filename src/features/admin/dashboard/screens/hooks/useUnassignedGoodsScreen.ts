import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthenticatedStackParamList } from '@src/navigation/types';
import { useUnassignedGoods } from '../../hooks/useUnassignedGoods';

type NavigationProp = NativeStackNavigationProp<AuthenticatedStackParamList>;

export const useUnassignedGoodsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { sortedGoods, isLoading, handleRefresh } = useUnassignedGoods();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleNotificationPress = useCallback(() => {
    navigation.navigate('Notifications');
  }, [navigation]);

  const handleItemPress = useCallback((goodsId: string) => {
    navigation.navigate('GoodsDetail', { goodsId });
  }, [navigation]);

  return {
    sortedGoods,
    isLoading,
    handleRefresh,
    handlers: {
      handleBack,
      handleNotificationPress,
      handleItemPress,
    },
  };
};
