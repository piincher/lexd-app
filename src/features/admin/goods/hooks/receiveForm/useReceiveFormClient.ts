/**
 * useReceiveFormClient - Manages selected client state
 */

import { useState } from 'react';
import { userData } from '@src/shared/types/user';

export const useReceiveFormClient = () => {
  const [selectedClient, setSelectedClient] = useState<userData | null>(null);
  return { selectedClient, setSelectedClient };
};
