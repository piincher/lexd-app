/**
 * useReceiveGoodsForm - React Hook Form with Zod validation
 * Single Responsibility: Form state management and validation only
 */

import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userData } from '@src/constants/types';
import { ReceiveGoodsInput } from '../../../../types';
import { receiveGoodsSchema, ReceiveGoodsFormData } from '../types';

const DEFAULT_VALUES: ReceiveGoodsFormData = {
  description: '',
  shippingMode: 'SEA', // Default to SEA
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
  condition: 'new',
};

interface UseReceiveGoodsFormOptions {
  initialQuantity?: number;
}

interface UseReceiveGoodsFormReturn {
  // Form control
  control: ReturnType<typeof useForm<ReceiveGoodsFormData>>['control'];
  handleSubmit: ReturnType<typeof useForm<ReceiveGoodsFormData>>['handleSubmit'];
  setValue: ReturnType<typeof useForm<ReceiveGoodsFormData>>['setValue'];
  watch: ReturnType<typeof useForm<ReceiveGoodsFormData>>['watch'];
  reset: ReturnType<typeof useForm<ReceiveGoodsFormData>>['reset'];
  formState: ReturnType<typeof useForm<ReceiveGoodsFormData>>['formState'];
  
  // Additional state
  selectedClient: userData | null;
  setSelectedClient: (client: userData | null) => void;
  photoUris: string[];
  setPhotoUris: (uris: string[]) => void;
  addPhotoUri: (uri: string) => void;
  removePhotoUri: (uri: string) => void;
  useDimensions: boolean;
  setUseDimensions: (use: boolean) => void;
  
  // Computed values
  calculatedCBM: number;
  totalCost: number;
  isFormValid: boolean;
  
  // Actions
  buildSubmitData: () => ReceiveGoodsInput | null;
  resetForm: () => void;
}

export const useReceiveGoodsForm = (
  options: UseReceiveGoodsFormOptions = {}
): UseReceiveGoodsFormReturn => {
  const { initialQuantity = 1 } = options;
  
  // React Hook Form setup
  const { control, handleSubmit, setValue, watch, reset, formState } = useForm<ReceiveGoodsFormData>({
    resolver: zodResolver(receiveGoodsSchema),
    mode: 'onChange',
    defaultValues: {
      ...DEFAULT_VALUES,
      quantity: initialQuantity.toString(),
    },
  });
  
  // Watch form values for calculations
  const watchedValues = watch();
  const shippingMode = watchedValues.shippingMode || 'SEA';
  const isAirShipping = shippingMode === 'AIR';
  
  // Additional UI state
  const [selectedClient, setSelectedClient] = useState<userData | null>(null);
  const [photoUris, setPhotoUris] = useState<string[]>([]);
  const [useDimensions, setUseDimensions] = useState(true);

  const addPhotoUri = useCallback((uri: string) => {
    setPhotoUris((prev) => (prev.includes(uri) ? prev : [...prev, uri]));
  }, []);

  const removePhotoUri = useCallback((uri: string) => {
    setPhotoUris((prev) => prev.filter((u) => u !== uri));
  }, []);
  
  /**
   * Calculate CBM based on current input mode and shipping mode
   * Returns 0 for AIR shipping since CBM doesn't matter for air
   */
  const calculatedCBM = useMemo(() => {
    if (isAirShipping) {
      return 0;
    }
    
    if (useDimensions) {
      const l = parseFloat(watchedValues.length?.replace(',', '.') || '0') || 0;
      const w = parseFloat(watchedValues.width?.replace(',', '.') || '0') || 0;
      const h = parseFloat(watchedValues.height?.replace(',', '.') || '0') || 0;
      return (l * w * h) / 1000000; // Convert cm³ to m³
    }
    return parseFloat(watchedValues.cbm?.replace(',', '.') || '0') || 0;
  }, [isAirShipping, useDimensions, watchedValues.length, watchedValues.width, watchedValues.height, watchedValues.cbm]);
  
  /**
   * Calculate total cost based on shipping mode
   * For AIR: based on weight
   * For SEA: based on CBM
   */
  const totalCost = useMemo(() => {
    const unitPrice = parseFloat(watchedValues.unitPrice?.replace(',', '.') || '0') || 0;
    const weight = parseFloat(watchedValues.weight?.replace(',', '.') || '0') || 0;
    
    if (isAirShipping) {
      return weight * unitPrice;
    }
    return calculatedCBM * unitPrice;
  }, [isAirShipping, calculatedCBM, watchedValues.unitPrice, watchedValues.weight]);
  
  /**
   * Check if form is valid
   */
  const isFormValid = useMemo(() => {
    const hasNoErrors = Object.keys(formState.errors).length === 0;
    const isDirty = formState.isDirty;
    const hasClient = selectedClient !== null;
    return hasNoErrors && isDirty && hasClient;
  }, [formState.errors, formState.isDirty, selectedClient]);
  
  /**
   * Handle dimension mode toggle
   */
  const handleToggleDimensions = useCallback((use: boolean) => {
    setUseDimensions(use);
    // Clear relevant fields when switching modes
    if (use) {
      setValue('cbm', '');
    } else {
      setValue('length', '');
      setValue('width', '');
      setValue('height', '');
    }
  }, [setValue]);
  
  /**
   * Build submit data from form values
   */
  const buildSubmitData = useCallback((): ReceiveGoodsInput | null => {
    if (!selectedClient) return null;
    
    const input: ReceiveGoodsInput = {
      clientId: selectedClient._id,
      description: watchedValues.description.trim(),
      weight: parseFloat(watchedValues.weight.replace(',', '.')),
      quantity: parseInt(watchedValues.quantity, 10),
      unitPrice: parseFloat(watchedValues.unitPrice.replace(',', '.')),
      location: watchedValues.location.toUpperCase().trim(),
      receivedByName: watchedValues.receivedByName.trim(),
      expressTrackingNumber: watchedValues.expressTrackingNumber?.trim() || undefined,
      receivedDate: watchedValues.receivedDate || undefined,
      shippingMode: watchedValues.shippingMode || 'SEA',
    };
    
    // Add CBM (from dimensions or direct input)
    if (useDimensions && watchedValues.length && watchedValues.width && watchedValues.height) {
      input.dimensions = {
        length: parseFloat(watchedValues.length.replace(',', '.')),
        width: parseFloat(watchedValues.width.replace(',', '.')),
        height: parseFloat(watchedValues.height.replace(',', '.')),
      };
    }
    
    if (calculatedCBM > 0) {
      input.actualCBM = calculatedCBM;
    }
    
    return input;
  }, [selectedClient, watchedValues, useDimensions, calculatedCBM]);
  
  /**
   * Reset entire form
   */
  const resetForm = useCallback(() => {
    reset({
      ...DEFAULT_VALUES,
      quantity: initialQuantity.toString(),
    });
    setSelectedClient(null);
    setPhotoUris([]);
    setUseDimensions(true);
  }, [reset, initialQuantity]);
  
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
