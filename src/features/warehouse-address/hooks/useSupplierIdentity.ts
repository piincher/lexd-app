import { getAuthStoreRef } from '@src/shared/api/authStoreRef';
import type { userData } from '@src/shared/types/user';

export interface SupplierIdentity {
  clientId: string;
  customerName: string;
  phone: string;
}

export const useSupplierIdentity = (): SupplierIdentity => {
  const user = getAuthStoreRef()?.getState().user as Partial<userData> | undefined;
  return {
    clientId: user?.shippingClientId || '',
    customerName: [user?.firstName, user?.lastName].filter(Boolean).join(' '),
    phone: user?.phoneNumber || '',
  };
};
