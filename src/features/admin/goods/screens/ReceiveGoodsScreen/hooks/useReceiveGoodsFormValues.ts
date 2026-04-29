/**
 * useReceiveGoodsFormValues - Computed form values hook
 * Extracts and parses numeric values from form watch
 */

export const useReceiveGoodsFormValues = (watch: any) => {
  const unitPrice = watch('unitPrice');
  const unitPriceValue = parseFloat(unitPrice?.replace(',', '.') || '0') || 0;
  const shippingMode = watch('shippingMode');
  const weight = watch('weight');
  const weightValue = parseFloat(weight?.replace(',', '.') || '0') || 0;

  return { unitPrice, unitPriceValue, shippingMode, weight, weightValue };
};
