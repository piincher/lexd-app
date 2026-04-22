/**
 * useCreateShareToken Hook
 *
 * Creates a share token for a shipment resource.
 * Returns the shareable URL for use with Share.share().
 */

import { useMutation } from '@tanstack/react-query';
import { shareApi, ShareTokenResponse } from '../api/shareApi';

interface CreateShareTokenVariables {
  type: 'order' | 'goods' | 'container';
  resourceReference: string;
  label?: string;
  expiresInDays?: number;
}

export function useCreateShareToken() {
  return useMutation<ShareTokenResponse, Error, CreateShareTokenVariables>({
    mutationFn: (variables) => shareApi.createShareToken(variables),
  });
}
