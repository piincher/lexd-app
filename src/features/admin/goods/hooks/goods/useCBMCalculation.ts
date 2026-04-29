/**
 * CBM Calculation Hook
 */

export const useCBMCalculation = () => {
  const calculateFromDimensions = (length: string, width: string, height: string): number => {
    const l = parseFloat(length.replace(',', '.')) || 0;
    const w = parseFloat(width.replace(',', '.')) || 0;
    const h = parseFloat(height.replace(',', '.')) || 0;
    return (l * w * h) / 1000000;
  };

  const calculateDirect = (cbm: string): number => {
    return parseFloat(cbm.replace(',', '.')) || 0;
  };

  return { calculateFromDimensions, calculateDirect };
};
