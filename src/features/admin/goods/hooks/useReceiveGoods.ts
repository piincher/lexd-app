import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
// Direct import from useGoods.ts to get the mutation hook
import { useReceiveGoods as useReceiveGoodsMutationFn } from './useGoods';
import { useReceiveGoodsForm } from './useReceiveGoodsForm';

type AdminV2StackParamList = {
  GoodsList: undefined;
  ReceiveGoods: undefined;
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

export const useReceiveGoods = () => {
  const navigation = useNavigation<NavigationProp>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const form = useReceiveGoodsForm({ initialQuantity: 1 });
  const receiveGoodsMutation = useReceiveGoodsMutationFn();

  const handleSubmit = async () => {
    if (!form.validateForm()) {
      Alert.alert('Erreur', 'Veuillez corriger les erreurs avant de continuer');
      return;
    }

    const submitData = form.buildSubmitData();
    if (!submitData) return;

    try {
      await receiveGoodsMutation.mutateAsync({
        data: submitData,
        photoUri: form.photoUri || undefined,
      });
      setShowSuccessDialog(true);
    } catch (error: any) {
      console.error('[useReceiveGoods] Error:', error);
      // ApiClientError has the message directly
      const serverMessage = error?.message || error?.response?.data?.message;
      setErrorMessage(serverMessage || 'Une erreur inattendue est survenue');
    }
  };

  const handleSuccessDismiss = () => {
    setShowSuccessDialog(false);
    form.resetForm();
    navigation.navigate('AdminGoodsList' as never);
  };

  const handleBack = () => {
    if (receiveGoodsMutation.isPending) return;
    navigation.goBack();
  };

  return {
    form,
    errorMessage,
    setErrorMessage,
    showSuccessDialog,
    setShowSuccessDialog,
    isSubmitting: receiveGoodsMutation.isPending,
    handleSubmit,
    handleSuccessDismiss,
    handleBack,
  };
};
