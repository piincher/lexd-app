import { useState, useEffect, useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCreateRoute, useUpdateRoute, useGetRoute } from '@src/features/admin/routes/hooks/useRoutes';
import { 
  ShippingMode, 
  ShippingLine, 
  SHIPPING_LINES_BY_MODE,
  RouteFormData,
} from '@src/features/admin/routes/types';

type AdminV2StackParamList = {
  RouteList: undefined;
  RouteForm: { routeId?: string };
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;
type RouteFormRouteProp = RouteProp<AdminV2StackParamList, 'RouteForm'>;

export interface FormErrors {
  name?: string;
  shippingMode?: string;
  origin?: string;
  destination?: string;
  shippingLine?: string;
  estimatedTransitDays?: string;
}

const initialFormData: RouteFormData = {
  name: '',
  shippingMode: '',
  origin: '',
  destination: '',
  shippingLine: '',
  estimatedTransitDays: '',
  description: '',
  isActive: true,
};

export const useRouteForm = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteFormRouteProp>();
  const routeId = route.params?.routeId;
  const isEditMode = !!routeId;

  const [formData, setFormData] = useState<RouteFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [modeMenuVisible, setModeMenuVisible] = useState(false);
  const [lineMenuVisible, setLineMenuVisible] = useState(false);
  const [originMenuVisible, setOriginMenuVisible] = useState(false);
  const [destinationMenuVisible, setDestinationMenuVisible] = useState(false);

  const { data: routeData, isLoading: isLoadingRoute } = useGetRoute(routeId);
  const createMutation = useCreateRoute();
  const updateMutation = useUpdateRoute();
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (isEditMode && routeData?.data) {
      const route = routeData.data;
      setFormData({
        name: route.name || '',
        shippingMode: route.shippingMode || '',
        origin: typeof route.origin === 'string' ? route.origin : route.origin?.city || '',
        destination: typeof route.destination === 'string' ? route.destination : route.destination?.city || '',
        shippingLine: (route.shippingLine as ShippingLine) || '',
        estimatedTransitDays: route.estimatedTransitDays?.toString() || '',
        description: route.description || '',
        isActive: route.isActive ?? true,
      });
    }
  }, [isEditMode, routeData]);

  const availableShippingLines = formData.shippingMode 
    ? SHIPPING_LINES_BY_MODE[formData.shippingMode]
    : [];

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom de la route est requis';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Le nom doit contenir au moins 3 caractères';
    }

    if (!formData.shippingMode) {
      newErrors.shippingMode = 'Le mode de transport est requis';
    }

    if (!formData.origin.trim()) {
      newErrors.origin = 'L\'origine est requise';
    }

    if (!formData.destination.trim()) {
      newErrors.destination = 'La destination est requise';
    }

    if (formData.shippingMode === 'SEA' && !formData.shippingLine) {
      newErrors.shippingLine = 'La compagnie maritime est requise pour le mode maritime';
    }

    if (!formData.estimatedTransitDays.trim()) {
      newErrors.estimatedTransitDays = 'Le délai de transit est requis';
    } else {
      const days = parseInt(formData.estimatedTransitDays, 10);
      if (isNaN(days) || days < 1 || days > 365) {
        newErrors.estimatedTransitDays = 'Veuillez entrer un nombre valide (1-365)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const updateField = useCallback(<K extends keyof RouteFormData>(field: K, value: RouteFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const handleSelectMode = useCallback((mode: ShippingMode) => {
    updateField('shippingMode', mode);
    updateField('shippingLine', '');
    setModeMenuVisible(false);
  }, [updateField]);

  const handleSelectLine = useCallback((line: ShippingLine) => {
    updateField('shippingLine', line);
    setLineMenuVisible(false);
  }, [updateField]);

  const handleSelectOrigin = useCallback((origin: string) => {
    updateField('origin', origin);
    setOriginMenuVisible(false);
  }, [updateField]);

  const handleSelectDestination = useCallback((destination: string) => {
    updateField('destination', destination);
    setDestinationMenuVisible(false);
  }, [updateField]);

  const handleSubmit = useCallback(() => {
    if (!validateForm()) return;

    const submitData = {
      name: formData.name.trim(),
      shippingMode: formData.shippingMode as ShippingMode,
      origin: formData.origin.trim(),
      destination: formData.destination.trim(),
      shippingLine: formData.shippingMode === 'SEA' 
        ? formData.shippingLine 
        : undefined,
      estimatedTransitDays: parseInt(formData.estimatedTransitDays, 10),
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
      createMutation.mutate(submitData as any, {
        onSuccess: () => {
          navigation.goBack();
        },
      });
    }
  }, [formData, isEditMode, routeId, validateForm, createMutation, updateMutation, navigation]);

  return {
    formData,
    errors,
    isEditMode,
    isLoadingRoute,
    isSubmitting,
    modeMenuVisible,
    setModeMenuVisible,
    lineMenuVisible,
    setLineMenuVisible,
    originMenuVisible,
    setOriginMenuVisible,
    destinationMenuVisible,
    setDestinationMenuVisible,
    availableShippingLines,
    updateField,
    handleSelectMode,
    handleSelectLine,
    handleSelectOrigin,
    handleSelectDestination,
    handleSubmit,
    mutationError: createMutation.error || updateMutation.error,
    navigation,
  };
};
