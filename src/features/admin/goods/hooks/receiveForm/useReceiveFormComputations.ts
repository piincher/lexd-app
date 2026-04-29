/**
 * useReceiveFormComputations - CBM and cost calculations
 */

import { GoodsFormData } from '../../types';
import { useCBMCalculation } from '../useGoods';

export const useReceiveFormComputations = (
  formData: GoodsFormData,
  useDimensions: boolean
) => {
  const { calculateFromDimensions, calculateDirect } = useCBMCalculation();

  const calculatedCBM = useDimensions
    ? calculateFromDimensions(formData.length, formData.width, formData.height)
    : calculateDirect(formData.cbm);

  const unitPrice = parseFloat(formData.unitPrice.replace(',', '.')) || 0;
  const totalCost = calculatedCBM * unitPrice;

  return { calculatedCBM, totalCost };
};
