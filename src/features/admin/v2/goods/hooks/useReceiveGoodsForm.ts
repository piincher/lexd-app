/**
 * useReceiveGoodsForm - Custom hook for form state management
 * Follows Single Responsibility Principle - handles only form logic
 */

import { useState } from 'react';
import { GoodsFormData, GoodsFormErrors, ReceiveGoodsInput } from '../types';
import { useGoodsFormValidation, useCBMCalculation } from './useGoods';
import { userData } from '@src/constants/types';

interface UseReceiveGoodsFormOptions {
  initialQuantity?: number;
}

interface UseReceiveGoodsFormReturn {
  // Form state
  formData: GoodsFormData;
  errors: GoodsFormErrors;
  selectedClient: userData | null;
  photoUri: string | null;
  useDimensions: boolean;
  
  // Actions
  setFormField: (field: keyof GoodsFormData, value: string) => void;
  setSelectedClient: (client: userData | null) => void;
  setPhotoUri: (uri: string | null) => void;
  setUseDimensions: (use: boolean) => void;
  clearFieldError: (field: keyof GoodsFormErrors) => void;
  clearAllErrors: () => void;
  resetForm: () => void;
  
  // Validation
  validateForm: () => boolean;
  
  // Computed
  calculatedCBM: number;
  totalCost: number;
  isFormValid: boolean;
  
  // Output
  buildSubmitData: () => ReceiveGoodsInput | null;
}

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
};

/**
 * Custom hook for managing receive goods form state
 */
export const useReceiveGoodsForm = (
  options: UseReceiveGoodsFormOptions = {}
): UseReceiveGoodsFormReturn => {
  const { initialQuantity = 1 } = options;
  
  // Form state
  const [formData, setFormData] = useState<GoodsFormData>({
    ...INITIAL_FORM_DATA,
    quantity: initialQuantity.toString(),
  });
  const [errors, setErrors] = useState<GoodsFormErrors>({});
  const [selectedClient, setSelectedClientState] = useState<userData | null>(null);
  const [photoUri, setPhotoUriState] = useState<string | null>(null);
  const [useDimensions, setUseDimensionsState] = useState(true);
  
  // Validation and calculation hooks
  const { validate, isValid } = useGoodsFormValidation();
  const { calculateFromDimensions, calculateDirect } = useCBMCalculation();
  
  /**
   * Update a form field
   */
  const setFormField = (field: keyof GoodsFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };
  
  /**
   * Set selected client
   */
  const setSelectedClient = (client: userData | null) => {
    setSelectedClientState(client);
    if (client) {
      setFormField('clientPhone', client.phoneNumber || '');
      if (errors.clientPhone) {
        setErrors(prev => ({ ...prev, clientPhone: undefined }));
      }
    }
  };
  
  /**
   * Set photo URI
   */
  const setPhotoUri = (uri: string | null) => {
    setPhotoUriState(uri);
  };
  
  /**
   * Toggle dimension input mode
   */
  const setUseDimensions = (use: boolean) => {
    setUseDimensionsState(prev => {
      if (prev !== use) {
        // Clear relevant fields when switching modes
        setFormData(prevData => ({
          ...prevData,
          cbm: '',
          length: '',
          width: '',
          height: '',
        }));
        setErrors(prevErrors => ({
          ...prevErrors,
          cbm: undefined,
          length: undefined,
          width: undefined,
          height: undefined,
        }));
      }
      return use;
    });
  };
  
  /**
   * Clear error for specific field
   */
  const clearFieldError = (field: keyof GoodsFormErrors) => {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };
  
  /**
   * Clear all errors
   */
  const clearAllErrors = () => {
    setErrors({});
  };
  
  /**
   * Reset form to initial state
   */
  const resetForm = () => {
    setFormData({
      ...INITIAL_FORM_DATA,
      quantity: initialQuantity.toString(),
    });
    setErrors({});
    setSelectedClientState(null);
    setPhotoUriState(null);
    setUseDimensionsState(true);
  };
  
  /**
   * Validate entire form
   */
  const validateForm = (): boolean => {
    const validationErrors = validate(formData, useDimensions);
    if (!selectedClient) {
      validationErrors.clientPhone = 'Veuillez sélectionner un client';
    }
    setErrors(validationErrors);
    return isValid(validationErrors);
  };
  
  /**
   * Calculate CBM based on current input mode
   */
  const calculatedCBM = (() => {
    if (useDimensions) {
      return calculateFromDimensions(formData.length, formData.width, formData.height);
    }
    return calculateDirect(formData.cbm);
  })();
  
  /**
   * Calculate total cost
   */
  const totalCost = (() => {
    const unitPrice = parseFloat(formData.unitPrice.replace(',', '.')) || 0;
    return calculatedCBM * unitPrice;
  })();
  
  /**
   * Check if form is valid (no errors)
   */
  const isFormValid = (() => {
    return Object.keys(errors).length === 0 && selectedClient !== null;
  })();
  
  /**
   * Build submit data from form
   */
  const buildSubmitData = (): ReceiveGoodsInput | null => {
    if (!validateForm() || !selectedClient) {
      return null;
    }
    
    const input: ReceiveGoodsInput = {
      clientId: selectedClient._id,
      description: formData.description.trim(),
      actualCBM: calculatedCBM,
      weight: parseFloat(formData.weight.replace(',', '.')),
      quantity: parseInt(formData.quantity, 10),
      unitPrice: parseFloat(formData.unitPrice.replace(',', '.')),
      location: formData.location.toUpperCase().trim(),
      receivedByName: formData.receivedByName.trim(),
    };
    
    // Add dimensions if using dimension mode
    if (useDimensions) {
      input.dimensions = {
        length: parseFloat(formData.length.replace(',', '.')),
        width: parseFloat(formData.width.replace(',', '.')),
        height: parseFloat(formData.height.replace(',', '.')),
      };
    }
    
    return input;
  };
  
  return {
    formData,
    errors,
    selectedClient,
    photoUri,
    useDimensions,
    setFormField,
    setSelectedClient,
    setPhotoUri,
    setUseDimensions,
    clearFieldError,
    clearAllErrors,
    resetForm,
    validateForm,
    calculatedCBM,
    totalCost,
    isFormValid,
    buildSubmitData,
  };
};
