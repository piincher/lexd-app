import { useCallback } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '@src/store/Auth';
import { isAdminRole } from '@src/shared/lib/roles';
import type { RootStackParamList } from '@src/navigations/type';
import { useGetGoodsDetail } from '../../hooks';

export const useGoodsDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { goodsId } = (route.params || {}) as { goodsId: string };
  const isAdmin = useAuth((state) => isAdminRole(state.user?.role));
  const { data: goods, isLoading, isError, error, refetch } = useGetGoodsDetail(goodsId);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleEdit = useCallback(() => {
    navigation.navigate('EditGoods', { goodsId });
  }, [navigation, goodsId]);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleViewPayments = useCallback(() => {
    navigation.navigate('MyPaymentHistory');
  }, [navigation]);

  return {
    goods,
    isLoading,
    isError,
    error,
    isAdmin,
    handlers: {
      handleBack,
      handleEdit,
      handleRetry,
      handleViewPayments,
    },
  };
};
