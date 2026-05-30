import { useReceiveFormCore } from './form/useReceiveFormCore';
import { useReceiveFormExtras } from './form/useReceiveFormExtras';
import { useReceiveFormDimensions } from './form/useReceiveFormDimensions';
import { useReceiveFormCosts } from './form/useReceiveFormCosts';
import { useReceiveFormValidation } from './form/useReceiveFormValidation';
import { useReceiveFormActions } from './form/useReceiveFormActions';
import { useReceiveSessionDefaults } from './useReceiveSessionDefaults';
import { useApplyLastReceiveLocation } from './useApplyLastReceiveLocation';
import { useReceiveIdempotencyKey } from './useReceiveIdempotencyKey';
import { useReceiveDraftPersistence } from './useReceiveDraftPersistence';
import { UseReceiveGoodsFormReturn } from './form/types';

interface UseReceiveGoodsFormOptions {
  initialQuantity?: number;
}

export const useReceiveGoodsForm = (
  options: UseReceiveGoodsFormOptions = {}
): UseReceiveGoodsFormReturn => {
  const {
    defaultReceivedByName,
    defaultReceivedDate,
    lastLocation,
    locationLoaded,
    persistLocation,
  } = useReceiveSessionDefaults();

  const core = useReceiveFormCore({
    ...options,
    defaults: {
      receivedByName: defaultReceivedByName,
      receivedDate: defaultReceivedDate,
    },
  });

  useApplyLastReceiveLocation({
    locationLoaded,
    lastLocation,
    currentLocation: core.watchedValues.location,
    setValue: core.setValue,
  });

  const extras = useReceiveFormExtras();
  // Idempotency key — one per form session, regenerated after a successful save so each
  // batch-intake parcel gets its own. The backend short-circuits a duplicate submit by
  // matching this key (within 30 min) and returning the original goods.
  const { idempotencyKey, regenerateIdempotencyKey, setIdempotencyKey } = useReceiveIdempotencyKey();

  // Draft persistence — auto-saves the form to AsyncStorage on change so a forced logout
  // (session-expired) or app kill doesn't lose mid-intake work. Auto-restores on next
  // mount if the form is empty. The idempotency key is included in the draft so a retried
  // submit hits the backend dedupe and won't create a duplicate.
  const { clearDraft } = useReceiveDraftPersistence({
    watchedValues: core.watchedValues,
    selectedClient: extras.selectedClient,
    photoUris: extras.photoUris,
    useDimensions: extras.useDimensions,
    idempotencyKey,
    setValue: core.setValue,
    setSelectedClient: extras.setSelectedClient,
    setPhotoUris: extras.setPhotoUris,
    setUseDimensions: extras.setUseDimensions,
    setIdempotencyKey,
  });

  const { calculatedCBM, handleToggleDimensions } = useReceiveFormDimensions(
    core.watchedValues,
    core.isAirShipping,
    extras.useDimensions,
    extras.setUseDimensions,
    core.setValue
  );

  const { totalCost } = useReceiveFormCosts(
    core.watchedValues,
    core.isAirShipping,
    calculatedCBM
  );

  const { isFormValid } = useReceiveFormValidation(
    core.formState,
    extras.selectedClient,
    core.watchedValues.exceptionReasons,
  );

  const { buildSubmitData, resetForm, resetForNext } = useReceiveFormActions({
    selectedClient: extras.selectedClient,
    watchedValues: core.watchedValues,
    useDimensions: extras.useDimensions,
    calculatedCBM,
    reset: core.reset,
    initialQuantity: core.initialQuantity,
    setSelectedClient: extras.setSelectedClient,
    setPhotoUris: extras.setPhotoUris,
    setUseDimensions: extras.setUseDimensions,
    idempotencyKey,
    notifyWhatsapp: extras.notifyWhatsapp,
  });

  return {
    ...core,
    ...extras,
    setUseDimensions: handleToggleDimensions,
    calculatedCBM,
    totalCost,
    isFormValid,
    buildSubmitData,
    resetForm,
    resetForNext,
    persistLocation,
    idempotencyKey,
    regenerateIdempotencyKey,
    clearDraft,
  };
};
