import { useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
}

const SHIPPING_MODES: ShippingMode[] = ['SEA', 'AIR'];
const SEA_SHIPPING_LINES: ShippingLine[] = ['MSC', 'MAERSK', 'CMA_CGM', 'HAPAG_LLOYD'];

export const useCreateContainerScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  // Form state
  const [formData, setFormData] = useState<ContainerFormData>({
    shippingMode: '',
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

  // Data fetching
  const { data: consigneesData, isLoading: isLoadingConsignees } = useGetConsignees();
  const { 
    data: routesData, 
    isLoading: isLoadingRoutes,
    isError: isRoutesError,
  } = useGetActiveRoutes(formData.shippingMode || undefined);
  const createMutation = useCreateContainer();

  const consignees: Consignee[] = consigneesData || [];
  // Safe extraction of routes data - handle different API response formats
  const routes: Route[] = Array.isArray(routesData?.data) 
    ? routesData?.data 
    : routesData?.data?.routes || [];

  // Filter consignees based on search
  const filteredConsignees = useMemo(() => {
    if (!consigneeSearchQuery.trim()) return consignees;
    const query = consigneeSearchQuery.toLowerCase();
    return consignees.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.phone?.toLowerCase().includes(query) ||
        c.warehouseAddress?.toLowerCase().includes(query) ||
        c.code?.toLowerCase().includes(query)
    );
  }, [consignees, consigneeSearchQuery]);

  // Get available shipping lines based on mode
  const availableShippingLines = useMemo(() => {
    if (formData.shippingMode === 'SEA') return SEA_SHIPPING_LINES;
    if (formData.shippingMode === 'AIR') return ['AIR_STANDARD'];
    return [];
  }, [formData.shippingMode]);

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

  // Handle shipping mode selection
  const handleSelectShippingMode = useCallback((mode: ShippingMode) => {
    updateField('shippingMode', mode);
    updateField('shippingLine', '');
    updateField('routeId', '');
    setSelectedRoute(null);
    setErrors((prev) => ({ ...prev, shippingMode: undefined, routeId: undefined }));
  }, [updateField]);

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
    updateField('consigneeId', consignee._id || consignee.id);
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
      shippingMode: formData.shippingMode as ShippingMode,
      shippingLine: formData.shippingLine as ShippingLine,
      routeId: formData.routeId,
      consigneeId: formData.consigneeId,
      actualContainerNumber: formData.actualContainerNumber.trim() || undefined,
      bookingReference: formData.bookingReference.trim() || undefined,
    };

    createMutation.mutate(submitData, {
      onSuccess: () => {
        navigation.goBack();
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
    shippingModes: SHIPPING_MODES,
    availableShippingLines,
    consignees,
    routes,
    filteredConsignees,
    isLoadingConsignees,
    isLoadingRoutes,
    isRoutesError,
    createMutation,
    navigation,
    handleSelectShippingMode,
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
