import { useRouteFormInit } from './useRouteFormInit';
import { useRouteFormPopulate } from './useRouteFormPopulate';
import { useRouteFormValidation, FormErrors } from './useRouteFormValidation';
import { useRouteFormState } from './useRouteFormState';
import { useRouteFormSubmit } from './useRouteFormSubmit';

export type { FormErrors };

export const useRouteForm = () => {
  const { navigation, routeId, isEditMode, isLoadingRoute, routeData } = useRouteFormInit();
  const { errors, setErrors, validateForm } = useRouteFormValidation();
  const {
    formData,
    setFormData,
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
  } = useRouteFormState({ errors, setErrors });

  useRouteFormPopulate({ isEditMode, routeData, setFormData });

  const { isSubmitting, handleSubmit, mutationError } = useRouteFormSubmit({
    formData,
    isEditMode,
    routeId,
    validateForm,
  });

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
    mutationError,
    navigation,
  };
};
