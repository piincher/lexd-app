import { useCallback } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useEditGoods } from '../../hooks/useEditGoods';

export const useEditGoodsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { goodsId } = (route.params || {}) as { goodsId: string };

  const {
    status,
    isSaving,
    error,
    isAdmin,
    formData,
    calculatedCBM,
    calculatedTotalCost,
    updateField,
    handleSaveWithHaptic,
    photoUris,
    onPhotoSelected,
    onPhotoRemoved,
  } = useEditGoods(goodsId);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleNotifications = useCallback(() => {
    navigation.navigate('Notifications' as never);
  }, [navigation]);

  return {
    goodsId,
    status,
    isSaving,
    error,
    isAdmin,
    formData,
    calculatedCBM,
    calculatedTotalCost,
    updateField,
    handleSaveWithHaptic,
    photoUris,
    onPhotoSelected,
    onPhotoRemoved,
    handlers: {
      handleBack,
      handleNotifications,
    },
  };
};
