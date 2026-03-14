import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import { useReceiveGoods as useReceiveGoodsMutation } from './useGoods';
import { useReceiveGoodsForm } from './useReceiveGoodsForm';
import { ApiClientError } from '@src/api/client';

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
  const receiveGoodsMutation = useReceiveGoodsMutation();

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
    } catch (error) {
      if (error instanceof ApiClientError) {
        setErrorMessage(error.getUserMessage());
      } else {
        setErrorMessage('Une erreur inattendue est survenue');
      }
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
