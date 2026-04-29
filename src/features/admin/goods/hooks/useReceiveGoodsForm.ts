/**
 * useReceiveGoodsForm - Composition hook for receive goods form
 * Delegates to focused sub-hooks under receiveForm/
 */

import { GoodsFormData, GoodsFormErrors, ReceiveGoodsInput, UseReceiveGoodsFormOptions, UseReceiveGoodsFormReturn } from '../types';
import { userData } from '@src/shared/types/user';
import { useReceiveFormState } from './receiveForm/useReceiveFormState';
import { useReceiveFormClient } from './receiveForm/useReceiveFormClient';
import { useReceiveFormPhotos } from './receiveForm/useReceiveFormPhotos';
import { useReceiveFormDimensions } from './receiveForm/useReceiveFormDimensions';
import { useReceiveFormErrors } from './receiveForm/useReceiveFormErrors';
import { useReceiveFormValidation } from './receiveForm/useReceiveFormValidation';
import { useReceiveFormComputations } from './receiveForm/useReceiveFormComputations';
import { useReceiveFormSubmit } from './receiveForm/useReceiveFormSubmit';

export const useReceiveGoodsForm = (
  options: UseReceiveGoodsFormOptions = {}
): UseReceiveGoodsFormReturn => {
  const { initialQuantity = 1 } = options;
  const { formData, setFormData, setFormField: rawSetFormField, resetForm: resetFormData } =
    useReceiveFormState(initialQuantity);
  const { selectedClient, setSelectedClient: rawSetSelectedClient } = useReceiveFormClient();
  const { photoUris, addPhotoUri, removePhotoUri, setPhotoUris } = useReceiveFormPhotos();
  const { useDimensions, setUseDimensions: rawSetUseDimensions } = useReceiveFormDimensions();
  const { errors, setErrors, clearFieldError, clearAllErrors } = useReceiveFormErrors();
  const { runValidation } = useReceiveFormValidation();
  const { calculatedCBM, totalCost } = useReceiveFormComputations(formData, useDimensions);

  const setFormField = (field: keyof GoodsFormData, value: string) => {
    rawSetFormField(field, value);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const setSelectedClient = (client: userData | null) => {
    rawSetSelectedClient(client);
    if (client) {
      rawSetFormField('clientPhone', client.phoneNumber || '');
      if (errors.clientPhone) {
        setErrors(prev => ({ ...prev, clientPhone: undefined }));
      }
    }
  };

  const setUseDimensions = (use: boolean) => {
    rawSetUseDimensions(prev => {
      if (prev !== use) {
        setFormData(prevData => ({ ...prevData, cbm: '', length: '', width: '', height: '' }));
        setErrors(prevErrors => ({ ...prevErrors, cbm: undefined, length: undefined, width: undefined, height: undefined }));
      }
      return use;
    });
  };

  const resetForm = () => {
    resetFormData();
    setErrors({});
    rawSetSelectedClient(null);
    setPhotoUris([]);
    rawSetUseDimensions(true);
  };

  const validateForm = (): boolean => {
    const { validationErrors, isFormValid } = runValidation(formData, selectedClient, useDimensions);
    setErrors(validationErrors);
    return isFormValid;
  };

  const isFormValid = Object.keys(errors).length === 0 && selectedClient !== null;

  const { buildSubmitData } = useReceiveFormSubmit({
    formData, selectedClient, calculatedCBM, useDimensions, validateForm,
  });

  return {
    formData, errors, selectedClient, photoUris, useDimensions,
    setFormField, setSelectedClient, addPhotoUri, removePhotoUri, setUseDimensions,
    clearFieldError, clearAllErrors, resetForm, validateForm,
    calculatedCBM, totalCost, isFormValid, buildSubmitData,
  };
};
