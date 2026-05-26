import type { UseFormWatch } from 'react-hook-form';
import type { ReceiveGoodsFormData } from '../types';

export const useReceiveGoodsFormValues = (watch: UseFormWatch<ReceiveGoodsFormData>) => {
  const unitPrice = watch('unitPrice');
  const unitPriceValue = parseFloat(unitPrice?.replace(',', '.') || '0') || 0;
  const shippingMode = watch('shippingMode');
  const weight = watch('weight');
  const weightValue = parseFloat(weight?.replace(',', '.') || '0') || 0;

  return { unitPrice, unitPriceValue, shippingMode, weight, weightValue };
};
