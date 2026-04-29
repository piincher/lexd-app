/**
 * useReceiveFormState - Manages form data state
 */

import { useState } from 'react';
import { GoodsFormData } from '../../types';

const INITIAL_FORM_DATA: GoodsFormData = {
  clientPhone: '',
  description: '',
  length: '',
  width: '',
  height: '',
  cbm: '',
  weight: '',
  quantity: '1',
  unitPrice: '',
  location: '',
  receivedByName: '',
  expressTrackingNumber: '',
  receivedDate: '',
};

export const useReceiveFormState = (initialQuantity: number) => {
  const [formData, setFormData] = useState<GoodsFormData>({
    ...INITIAL_FORM_DATA,
    quantity: initialQuantity.toString(),
  });

  const setFormField = (field: keyof GoodsFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      ...INITIAL_FORM_DATA,
      quantity: initialQuantity.toString(),
    });
  };

  return { formData, setFormData, setFormField, resetForm };
};
