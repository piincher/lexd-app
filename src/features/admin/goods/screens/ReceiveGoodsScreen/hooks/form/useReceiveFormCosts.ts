import { useMemo } from 'react';
import { ReceiveGoodsFormData } from '../../types';

export const useReceiveFormCosts = (
  watchedValues: ReceiveGoodsFormData,
  isAirShipping: boolean,
  calculatedCBM: number
) => {
  const totalCost = useMemo(() => {
    const unitPrice =
      parseFloat(watchedValues.unitPrice?.replace(',', '.') || '0') || 0;
    const weight =
      parseFloat(watchedValues.weight?.replace(',', '.') || '0') || 0;

    if (isAirShipping) {
      return weight * unitPrice;
    }

    return calculatedCBM * unitPrice;
  }, [isAirShipping, calculatedCBM, watchedValues.unitPrice, watchedValues.weight]);

  return { totalCost };
};
