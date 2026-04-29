import { useMutation } from '@tanstack/react-query';
import { whatsappRequestApi, SearchCustomerInput } from '../../api/whatsappRequestApi';

export const useSearchCustomer = () => {
  return useMutation({
    mutationFn: (data: SearchCustomerInput) => whatsappRequestApi.searchCustomer(data),
  });
};
