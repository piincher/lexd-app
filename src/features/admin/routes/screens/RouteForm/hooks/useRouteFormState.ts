import { useState, useCallback } from 'react';
import {
  ShippingMode,
  ShippingLine,
  SHIPPING_LINES_BY_MODE,
  RouteFormData,
} from '@src/features/admin/routes/types';
import { FormErrors } from './useRouteFormValidation';

const initialFormData: RouteFormData = {
  name: '',
  shippingMode: '',
  origin: '',
  destination: '',
  shippingLine: '',
  estimatedTransitDays: '',
  waypoints: [],
  description: '',
  isActive: true,
};

interface UseRouteFormStateParams {
  errors: FormErrors;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}

export const useRouteFormState = ({ errors, setErrors }: UseRouteFormStateParams) => {
  const [formData, setFormData] = useState<RouteFormData>(initialFormData);
  const [modeMenuVisible, setModeMenuVisible] = useState(false);
  const [lineMenuVisible, setLineMenuVisible] = useState(false);
  const [originMenuVisible, setOriginMenuVisible] = useState(false);
  const [destinationMenuVisible, setDestinationMenuVisible] = useState(false);

  const availableShippingLines = formData.shippingMode
    ? SHIPPING_LINES_BY_MODE[formData.shippingMode]
    : [];

  const updateField = useCallback(<K extends keyof RouteFormData>(field: K, value: RouteFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }, [errors, setErrors]);

  const handleSelectMode = useCallback((mode: ShippingMode) => {
    updateField('shippingMode', mode);
    updateField('shippingLine', '');
    setModeMenuVisible(false);
  }, [updateField]);

  const handleSelectLine = useCallback((line: ShippingLine) => {
    updateField('shippingLine', line);
    setLineMenuVisible(false);
  }, [updateField]);

  const handleSelectOrigin = useCallback((origin: string) => {
    updateField('origin', origin);
    setOriginMenuVisible(false);
  }, [updateField]);

  const handleSelectDestination = useCallback((destination: string) => {
    updateField('destination', destination);
    setDestinationMenuVisible(false);
  }, [updateField]);

  return {
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
  };
};
