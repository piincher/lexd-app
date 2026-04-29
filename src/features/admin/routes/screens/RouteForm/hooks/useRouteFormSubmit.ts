import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCreateRoute, useUpdateRoute } from '@src/features/admin/routes/hooks/useRoutes';
import {
  ShippingMode,
  CreateRouteInput,
  RouteFormData,
} from '@src/features/admin/routes/types';

type AdminV2StackParamList = {
  RouteList: undefined;
  RouteForm: { routeId?: string };
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

interface UseRouteFormSubmitParams {
  formData: RouteFormData;
  isEditMode: boolean;
  routeId?: string;
  validateForm: (formData: RouteFormData) => boolean;
}

export const useRouteFormSubmit = ({ formData, isEditMode, routeId, validateForm }: UseRouteFormSubmitParams) => {
  const navigation = useNavigation<NavigationProp>();
  const createMutation = useCreateRoute();
  const updateMutation = useUpdateRoute();
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = useCallback(() => {
    if (!validateForm(formData)) return;

    const submitData: CreateRouteInput = {
      name: formData.name.trim(),
      shippingMode: formData.shippingMode as ShippingMode,
      origin: formData.origin.trim(),
      destination: formData.destination.trim(),
      shippingLine: formData.shippingMode === 'SEA'
        ? formData.shippingLine
        : undefined,
      estimatedTransitDays: parseInt(formData.estimatedTransitDays, 10),
      waypoints: formData.waypoints,
      description: formData.description.trim() || undefined,
      isActive: formData.isActive,
    };

    if (isEditMode && routeId) {
      updateMutation.mutate(
        { id: routeId, data: submitData },
        {
          onSuccess: () => {
            navigation.goBack();
          },
        }
      );
    } else {
      createMutation.mutate(submitData, {
        onSuccess: () => {
          navigation.goBack();
        },
      });
    }
  }, [formData, isEditMode, routeId, validateForm, createMutation, updateMutation, navigation]);

  return {
    isSubmitting,
    handleSubmit,
    mutationError: createMutation.error || updateMutation.error,
  };
};
