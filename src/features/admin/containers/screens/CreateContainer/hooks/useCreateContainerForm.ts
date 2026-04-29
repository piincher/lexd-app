import { useState, useCallback } from 'react';
import { ContainerFormData } from '../../../types';

export interface FormErrors {
  shippingMode?: string;
  shippingLine?: string;
  routeId?: string;
  consigneeId?: string;
  actualContainerNumber?: string;
  bookingReference?: string;
  submit?: string;
}

export const useCreateContainerForm = () => {
  const [formData, setFormData] = useState<ContainerFormData>({
    shippingMode: 'SEA',
    shippingLine: '',
    routeId: '',
    consigneeId: '',
    actualContainerNumber: '',
    bookingReference: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const updateField = useCallback(<K extends keyof ContainerFormData>(field: K, value: ContainerFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const clearError = useCallback((field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    updateField,
    clearError,
  };
};
