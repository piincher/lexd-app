/**
 * useReceiveFormErrors - Manages form validation error state
 */

import { useState } from 'react';
import { GoodsFormErrors } from '../../types';

export const useReceiveFormErrors = () => {
  const [errors, setErrors] = useState<GoodsFormErrors>({});

  const clearFieldError = (field: keyof GoodsFormErrors) => {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  return { errors, setErrors, clearFieldError, clearAllErrors };
};
