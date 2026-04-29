/**
 * useReceiveGoodsForm - Composes focused form sub-hooks
 * Single Responsibility: Orchestrate form behavior
 */

import { useReceiveFormCore } from './form/useReceiveFormCore';
import { useReceiveFormExtras } from './form/useReceiveFormExtras';
import { useReceiveFormDimensions } from './form/useReceiveFormDimensions';
import { useReceiveFormCosts } from './form/useReceiveFormCosts';
import { useReceiveFormValidation } from './form/useReceiveFormValidation';
import { useReceiveFormActions } from './form/useReceiveFormActions';
import { UseReceiveGoodsFormReturn } from './form/types';

interface UseReceiveGoodsFormOptions {
  initialQuantity?: number;
}

export const useReceiveGoodsForm = (
  options: UseReceiveGoodsFormOptions = {}
): UseReceiveGoodsFormReturn => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState,
    watchedValues,
    isAirShipping,
    initialQuantity,
  } = useReceiveFormCore(options);

  const {
    selectedClient,
    setSelectedClient,
    photoUris,
    setPhotoUris,
    addPhotoUri,
    removePhotoUri,
    useDimensions,
    setUseDimensions,
  } = useReceiveFormExtras();

  const { calculatedCBM, handleToggleDimensions } = useReceiveFormDimensions(
    watchedValues,
    isAirShipping,
    useDimensions,
    setUseDimensions,
    setValue
  );

  const { totalCost } = useReceiveFormCosts(
    watchedValues,
    isAirShipping,
    calculatedCBM
  );

  const { isFormValid } = useReceiveFormValidation(formState, selectedClient);

  const { buildSubmitData, resetForm } = useReceiveFormActions({
    selectedClient,
    watchedValues,
    useDimensions,
    calculatedCBM,
    reset,
    initialQuantity,
    setSelectedClient,
    setPhotoUris,
    setUseDimensions,
  });

  return {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState,
    selectedClient,
    setSelectedClient,
    photoUris,
    setPhotoUris,
    addPhotoUri,
    removePhotoUri,
    useDimensions,
    setUseDimensions: handleToggleDimensions,
    calculatedCBM,
    totalCost,
    isFormValid,
    buildSubmitData,
    resetForm,
  };
};
