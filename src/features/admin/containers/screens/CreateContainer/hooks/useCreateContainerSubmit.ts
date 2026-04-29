import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Container, CreateContainerInput, ShippingLine, ShippingMode } from '../../../types';
import { FormErrors } from './useCreateContainerForm';

type AdminV2StackParamList = {
  ContainerList: undefined;
  CreateContainer: undefined;
  ContainerDetail: { containerId: string };
  RouteForm: { routeId?: string };
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

type CreateContainerMutation = {
  mutate: (data: CreateContainerInput, options: {
    onSuccess: (response: Container) => void;
    onError: (error: any) => void;
  }) => void;
  isPending: boolean;
};

export const useCreateContainerSubmit = (
  formData: { shippingLine: string; routeId: string; consigneeId: string; actualContainerNumber: string; bookingReference: string },
  validateForm: () => boolean,
  createMutation: CreateContainerMutation,
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
) => {
  const navigation = useNavigation<NavigationProp>();

  const handleSubmit = useCallback(() => {
    if (!validateForm()) return;

    const submitData = {
      shippingMode: 'SEA' as ShippingMode,
      shippingLine: formData.shippingLine as ShippingLine,
      routeId: formData.routeId,
      consigneeId: formData.consigneeId,
      actualContainerNumber: formData.actualContainerNumber.trim() || undefined,
      bookingReference: formData.bookingReference.trim() || undefined,
    };

    console.log('[CreateContainer] Submitting:', submitData);

    createMutation.mutate(submitData, {
      onSuccess: (response) => {
        console.log('[CreateContainer] Success:', response);
        navigation.goBack();
      },
      onError: (error: any) => {
        console.error('[CreateContainer] Error:', error);
        setErrors((prev) => ({
          ...prev,
          submit: error?.response?.data?.message || error?.message || 'Erreur lors de la création du container',
        }));
      },
    });
  }, [formData, validateForm, createMutation, navigation, setErrors]);

  return { handleSubmit };
};
