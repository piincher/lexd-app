import { useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCreateContainer } from '../../../hooks';
import { useGetActiveRoutes } from '../../../../routes/hooks/useRoutes';
import { useGetConsignees, Consignee } from '../../../../consignees';
import { ShippingLine, ContainerFormData, ShippingMode, Route } from '../../../types';

type AdminV2StackParamList = {
  ContainerList: undefined;
  CreateContainer: undefined;
  ContainerDetail: { containerId: string };
  RouteForm: { routeId?: string };
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

interface FormErrors {
  shippingMode?: string;
  shippingLine?: string;
  routeId?: string;
  consigneeId?: string;
  actualContainerNumber?: string;
  bookingReference?: string;
  submit?: string;
}

const SEA_SHIPPING_LINES: ShippingLine[] = ['MSC', 'MAERSK', 'CMA_CGM', 'HAPAG_LLOYD'];

export const useCreateContainerScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  // Form state
  const [formData, setFormData] = useState<ContainerFormData>({
    shippingMode: 'SEA',
    shippingLine: '',
    routeId: '',
    consigneeId: '',
    actualContainerNumber: '',
    bookingReference: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedConsigneeName, setSelectedConsigneeName] = useState<string>('');
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [consigneeSearchQuery, setConsigneeSearchQuery] = useState<string>('');
  const [showConsigneeDropdown, setShowConsigneeDropdown] = useState<boolean>(false);
  const [showRouteMenu, setShowRouteMenu] = useState<boolean>(false);

  const consigneeSearchParams = useMemo(() => {
    const search = consigneeSearchQuery.trim();
    // Normalize phone-like searches by removing formatting characters
    // so they match the DB format (phones stored without spaces/dashes/parens)
    const isPhoneLike = /^[\d\s\-+()]+$/.test(search);
    const normalizedSearch = isPhoneLike ? search.replace(/[^\d+]/g, '') : search;

    return {
      isActive: true,
      page: 1,
      limit: 20,
      ...(normalizedSearch.length >= 2 ? { search: normalizedSearch } : {}),
    };
  }, [consigneeSearchQuery]);

  // Data fetching
  const { data: consigneesData, isLoading: isLoadingConsignees } = useGetConsignees(consigneeSearchParams);
  const { 
    data: routesData, 
    isLoading: isLoadingRoutes,
    isError: isRoutesError,
  } = useGetActiveRoutes(formData.shippingMode || undefined);
  const createMutation = useCreateContainer();

  const consignees: Consignee[] = consigneesData || [];
  // Extract routes from response - backend returns { data: { routes: [...] } }
  const routes: Route[] = ((routesData?.data?.routes || []) as unknown as Route[]).filter(
    (route) => route.shippingMode === 'SEA'
  );

  // Filter consignees based on search
  const filteredConsignees = useMemo(() => {
    if (!consigneeSearchQuery.trim()) return consignees;
    const query = consigneeSearchQuery.trim().toLowerCase();
    const phoneQuery = query.replace(/[^\d+]/g, '');

    return consignees.filter((c) => {
      const phone = c.phone?.toLowerCase() || '';
      const normalizedPhone = phone.replace(/[^\d+]/g, '');

      return (
        c.name.toLowerCase().includes(query) ||
        phone.includes(query) ||
        (phoneQuery.length > 0 && normalizedPhone.includes(phoneQuery)) ||
        c.warehouseAddress?.toLowerCase().includes(query) ||
        c._id?.toLowerCase().includes(query)
      );
    });
  }, [consignees, consigneeSearchQuery]);

  // Get available shipping lines based on mode
  const availableShippingLines = useMemo(() => {
    return SEA_SHIPPING_LINES;
  }, []);

  // Validation
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.shippingMode) {
      newErrors.shippingMode = 'Le mode de transport est requis';
    }

    if (!formData.routeId) {
      newErrors.routeId = 'La route est requise';
    }

    if (!formData.shippingLine) {
      newErrors.shippingLine = 'La compagnie est requise';
    }

    if (!formData.consigneeId) {
      newErrors.consigneeId = 'Le destinataire est requis';
    }

    if (formData.actualContainerNumber && formData.actualContainerNumber.length < 4) {
      newErrors.actualContainerNumber = 'Numéro de container invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Form handlers
  const updateField = useCallback(<K extends keyof ContainerFormData>(field: K, value: ContainerFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  // Handle route selection
  const handleSelectRoute = useCallback((route: Route) => {
    updateField('routeId', route._id);
    updateField('shippingLine', route.shippingLine);
    setSelectedRoute(route);
    setShowRouteMenu(false);
    if (errors.routeId) {
      setErrors((prev) => ({ ...prev, routeId: undefined }));
    }
  }, [updateField, errors.routeId]);

  // Handle clear route
  const handleClearRoute = useCallback(() => {
    updateField('routeId', '');
    updateField('shippingLine', '');
    setSelectedRoute(null);
  }, [updateField]);

  const handleSelectConsignee = useCallback((consignee: Consignee) => {
    updateField('consigneeId', consignee._id);
    setSelectedConsigneeName(consignee.name);
    setConsigneeSearchQuery('');
    setShowConsigneeDropdown(false);
  }, [updateField]);

  const handleClearConsignee = useCallback(() => {
    updateField('consigneeId', '');
    setSelectedConsigneeName('');
    setConsigneeSearchQuery('');
  }, [updateField]);

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
  }, [formData, validateForm, createMutation, navigation]);

  return {
    formData,
    errors,
    selectedConsigneeName,
    selectedRoute,
    consigneeSearchQuery,
    showConsigneeDropdown,
    showRouteMenu,
    availableShippingLines,
    consignees,
    routes,
    filteredConsignees,
    isLoadingConsignees,
    isLoadingRoutes,
    isRoutesError,
    createMutation,
    isSubmitting: createMutation.isPending,
    navigation,
    handleSelectRoute,
    handleClearRoute,
    handleSelectConsignee,
    handleClearConsignee,
    handleSubmit,
    updateField,
    setConsigneeSearchQuery,
    setShowConsigneeDropdown,
    setShowRouteMenu,
  };
};
