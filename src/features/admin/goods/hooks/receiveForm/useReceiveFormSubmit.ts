/**
 * useReceiveFormSubmit - Builds submit payload from form state
 */

import { GoodsFormData, ReceiveGoodsInput } from '../../types';
import { userData } from '@src/shared/types/user';

interface UseReceiveFormSubmitOptions {
  formData: GoodsFormData;
  selectedClient: userData | null;
  calculatedCBM: number;
  useDimensions: boolean;
  validateForm: () => boolean;
}

export const useReceiveFormSubmit = (options: UseReceiveFormSubmitOptions) => {
  const { formData, selectedClient, calculatedCBM, useDimensions, validateForm } = options;

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
      expressTrackingNumber: formData.expressTrackingNumber?.trim() || undefined,
      receivedDate: formData.receivedDate || undefined,
    };

    if (useDimensions) {
      input.dimensions = {
        length: parseFloat(formData.length.replace(',', '.')),
        width: parseFloat(formData.width.replace(',', '.')),
        height: parseFloat(formData.height.replace(',', '.')),
      };
    }

    return input;
  };

  return { buildSubmitData };
};
