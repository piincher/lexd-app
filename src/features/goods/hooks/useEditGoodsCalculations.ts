import { useMemo } from 'react';
import type { EditGoodsFormData } from './useEditGoodsForm';

export const useEditGoodsCalculations = (formData: EditGoodsFormData) => {
  const calculatedCBM = useMemo(() => {
    if (!formData.useDimensions) return null;
    const l = parseFloat(formData.length) || 0;
    const w = parseFloat(formData.width) || 0;
    const h = parseFloat(formData.height) || 0;
    if (l > 0 && w > 0 && h > 0) return (l * w * h) / 1000000;
    return null;
  }, [formData.length, formData.width, formData.height, formData.useDimensions]);

  const calculatedTotalCost = useMemo(() => {
    const price = parseFloat(formData.unitPrice) || 0;
    if (formData.shippingMode === 'AIR') {
      const w = parseFloat(formData.weight) || 0;
      return w * price;
    }
    const cbm = formData.useDimensions ? (calculatedCBM || 0) : (parseFloat(formData.cbm) || 0);
    return cbm * price;
  }, [formData.unitPrice, formData.weight, formData.shippingMode, formData.useDimensions, formData.cbm, calculatedCBM]);

  return { calculatedCBM, calculatedTotalCost };
};
