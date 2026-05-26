import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthenticatedStackParamList } from '@src/navigation/types';
import { useUnassignedGoods } from '../../hooks/useUnassignedGoods';

type NavigationProp = NativeStackNavigationProp<AuthenticatedStackParamList>;

export const useUnassignedGoodsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {
    sortedGoods,
    groupedGoods,
    totalCount,
    oldestDays,
    isLoading,
    handleRefresh,
  } = useUnassignedGoods();

  // Mode breakdown — needed by the bento triage panel; the data hook already groups by
  // mode, so we just pull the per-mode counts out of it.
  const { airCount, seaCount } = useMemo(() => {
    let air = 0;
    let sea = 0;
    for (const group of groupedGoods) {
      if (group.mode === 'AIR') air = group.goods.length;
      else sea = group.goods.length;
    }
    return { airCount: air, seaCount: sea };
  }, [groupedGoods]);

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
    stats: {
      total: totalCount,
      oldestDays,
      airCount,
      seaCount,
    },
    handlers: {
      handleBack,
      handleNotificationPress,
      handleItemPress,
    },
  };
};
