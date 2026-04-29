import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCreateContainerForm } from './useCreateContainerForm';
import { useCreateContainerConsignee } from './useCreateContainerConsignee';
import { useCreateContainerRoute } from './useCreateContainerRoute';
import { useCreateContainerData } from './useCreateContainerData';
import { useCreateContainerValidation } from './useCreateContainerValidation';
import { useCreateContainerSubmit } from './useCreateContainerSubmit';

type AdminV2StackParamList = {
  ContainerList: undefined;
  CreateContainer: undefined;
  ContainerDetail: { containerId: string };
  RouteForm: { routeId?: string };
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

export const useCreateContainerScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const { formData, errors, setErrors, updateField, clearError } = useCreateContainerForm();
  const consignee = useCreateContainerConsignee(updateField);
  const route = useCreateContainerRoute(updateField, clearError);
  const data = useCreateContainerData(formData.shippingMode, consignee.consigneeSearchQuery);
  const { validateForm } = useCreateContainerValidation(formData, setErrors);
  const { handleSubmit } = useCreateContainerSubmit(formData, validateForm, data.createMutation, setErrors);

  return {
    formData,
    errors,
    selectedConsigneeName: consignee.selectedConsigneeName,
    selectedRoute: route.selectedRoute,
    consigneeSearchQuery: consignee.consigneeSearchQuery,
    showConsigneeDropdown: consignee.showConsigneeDropdown,
    showRouteMenu: route.showRouteMenu,
    availableShippingLines: data.availableShippingLines,
    consignees: data.consignees,
    routes: data.routes,
    filteredConsignees: data.filteredConsignees,
    isLoadingConsignees: data.isLoadingConsignees,
    isLoadingRoutes: data.isLoadingRoutes,
    isRoutesError: data.isRoutesError,
    createMutation: data.createMutation,
    isSubmitting: data.createMutation.isPending,
    navigation,
    handleSelectRoute: route.handleSelectRoute,
    handleClearRoute: route.handleClearRoute,
    handleSelectConsignee: consignee.handleSelectConsignee,
    handleClearConsignee: consignee.handleClearConsignee,
    handleSubmit,
    updateField,
    setConsigneeSearchQuery: consignee.setConsigneeSearchQuery,
    setShowConsigneeDropdown: consignee.setShowConsigneeDropdown,
    setShowRouteMenu: route.setShowRouteMenu,
  };
};
