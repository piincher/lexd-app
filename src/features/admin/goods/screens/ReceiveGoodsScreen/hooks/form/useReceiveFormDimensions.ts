import { useMemo, useCallback } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { ReceiveGoodsFormData } from '../../types';

export const useReceiveFormDimensions = (
  watchedValues: ReceiveGoodsFormData,
  isAirShipping: boolean,
  useDimensions: boolean,
  setUseDimensions: (v: boolean) => void,
  setValue: UseFormSetValue<ReceiveGoodsFormData>
) => {
  const calculatedCBM = useMemo(() => {
    if (isAirShipping) {
      return 0;
    }

    if (useDimensions) {
      const l = parseFloat(watchedValues.length?.replace(',', '.') || '0') || 0;
      const w = parseFloat(watchedValues.width?.replace(',', '.') || '0') || 0;
      const h = parseFloat(watchedValues.height?.replace(',', '.') || '0') || 0;
      return (l * w * h) / 1000000;
    }

    return parseFloat(watchedValues.cbm?.replace(',', '.') || '0') || 0;
  }, [isAirShipping, useDimensions, watchedValues.length, watchedValues.width, watchedValues.height, watchedValues.cbm]);

  const handleToggleDimensions = useCallback(
    (use: boolean) => {
      setUseDimensions(use);
      if (use) {
        setValue('cbm', '');
      } else {
        setValue('length', '');
        setValue('width', '');
        setValue('height', '');
      }
    },
    [setUseDimensions, setValue]
  );

  return { calculatedCBM, handleToggleDimensions };
};
