import { useCallback } from 'react';
import { UseFormReset } from 'react-hook-form';
import { userData } from '@src/shared/types/user';
import { ReceiveGoodsInput } from '../../../../types';
import { ReceiveGoodsFormData } from '../../types';

const DEFAULT_VALUES: ReceiveGoodsFormData = {
  description: '',
  shippingMode: 'SEA',
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

interface Options {
  selectedClient: userData | null;
  watchedValues: ReceiveGoodsFormData;
  useDimensions: boolean;
  calculatedCBM: number;
  reset: UseFormReset<ReceiveGoodsFormData>;
  initialQuantity: number;
  setSelectedClient: (client: userData | null) => void;
  setPhotoUris: (uris: string[]) => void;
  setUseDimensions: (use: boolean) => void;
}

export const useReceiveFormActions = (options: Options) => {
  const {
    selectedClient,
    watchedValues,
    useDimensions,
    calculatedCBM,
    reset,
    initialQuantity,
    setSelectedClient,
    setPhotoUris,
    setUseDimensions,
  } = options;

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
      expressTrackingNumber:
        watchedValues.expressTrackingNumber?.trim() || undefined,
      receivedDate: watchedValues.receivedDate || undefined,
      shippingMode: watchedValues.shippingMode || 'SEA',
    };

    if (
      useDimensions &&
      watchedValues.length &&
      watchedValues.width &&
      watchedValues.height
    ) {
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

  const resetForm = useCallback(() => {
    reset({
      ...DEFAULT_VALUES,
      quantity: initialQuantity.toString(),
    });
    setSelectedClient(null);
    setPhotoUris([]);
    setUseDimensions(true);
  }, [reset, initialQuantity, setSelectedClient, setPhotoUris, setUseDimensions]);

  return { buildSubmitData, resetForm };
};
