/**
 * useReceiveFormValidation - Form validation logic wrapper
 */

import { GoodsFormData } from '../../types';
import { userData } from '@src/shared/types/user';
import { useGoodsFormValidation } from '../useGoods';

export const useReceiveFormValidation = () => {
  const { validate, isValid } = useGoodsFormValidation();

  const runValidation = (
    formData: GoodsFormData,
    selectedClient: userData | null,
    useDimensions: boolean
  ) => {
    const validationErrors = validate(formData, useDimensions);
    if (!selectedClient) {
      validationErrors.clientPhone = 'Veuillez sélectionner un client';
    }
    return { validationErrors, isFormValid: isValid(validationErrors) };
  };

  return { runValidation };
};
