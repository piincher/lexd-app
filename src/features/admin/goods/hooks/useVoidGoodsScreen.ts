import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useVoidGoods } from './useVoidGoods';

/**
 * useVoidGoodsScreen - Screen-level orchestrator hook for VoidGoodsScreen
 * Encapsulates route params, local state, and confirmation handler
 */
export const useVoidGoodsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { goodsId, goodsTrackingCode, cbm } = route.params;
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const voidGoods = useVoidGoods();

  const handleConfirm = () => {
    if (!selectedReason) return;

    Alert.alert(
      'Confirm Void',
      'This action cannot be undone. The goods will be marked as voided.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Void',
          style: 'destructive',
          onPress: () => {
            voidGoods.mutate(
              { id: goodsId, reason: selectedReason },
              { onSuccess: () => navigation.goBack() }
            );
          },
        },
      ]
    );
  };

  return {
    goodsId,
    goodsTrackingCode,
    cbm,
    selectedReason,
    setSelectedReason,
    isPending: voidGoods.isPending,
    handleConfirm,
  };
};
