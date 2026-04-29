import { useQuery } from '@tanstack/react-query';
import paymentApi from '../../api/paymentApi';
import type { PaymentProviderInfo } from '../../types';
import { PAYMENT_KEYS } from './paymentKeys';

export const usePaymentProviders = (country?: string, currency?: string) => {
  return useQuery<{ providers: PaymentProviderInfo[] }, Error>({
    queryKey: PAYMENT_KEYS.providers(country, currency),
    queryFn: () => paymentApi.getPaymentProviders(country, currency),
    staleTime: 5 * 60 * 1000,
  });
};
