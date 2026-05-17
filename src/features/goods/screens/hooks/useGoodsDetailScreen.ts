import { useCallback } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '@src/store/Auth';
import { useGetGoodsDetail } from '../../hooks';

export const useGoodsDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { goodsId } = (route.params || {}) as { goodsId: string };
  const isAdmin = useAuth((state) => state.user?.role) === 'admin';
  const { data: goods, isLoading, isError, error, refetch } = useGetGoodsDetail(goodsId);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleEdit = useCallback(() => {
    navigation.navigate('EditGoods' as never, { goodsId } as never);
  }, [navigation, goodsId]);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

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
    },
  };
};
