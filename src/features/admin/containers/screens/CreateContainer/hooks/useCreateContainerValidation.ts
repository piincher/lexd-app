import { useCallback } from 'react';
import { ContainerFormData } from '../../../types';
import { FormErrors } from './useCreateContainerForm';

export const useCreateContainerValidation = (
  formData: ContainerFormData,
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
) => {
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
  }, [formData, setErrors]);

  return { validateForm };
};
