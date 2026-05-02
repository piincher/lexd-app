import { useMemo } from 'react';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createWavePaymentFormStyles } from './WavePaymentForm.styles';

export const useWavePaymentFormStyles = () => {
  const { colors } = useAppTheme();

  return useMemo(() => createWavePaymentFormStyles(colors), [colors]);
};
