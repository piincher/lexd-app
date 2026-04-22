/**
 * useSharedShipment Hook
 *
 * Fetches shipment data from a share token (public, no auth required).
 * Used by SharedShipmentScreen when opened via deep link.
 */

import { useQuery } from '@tanstack/react-query';
import { shareApi } from '../api/shareApi';

const SHARED_SHIPMENT_QUERY_KEY = 'shared-shipment';

export function useSharedShipment(token: string) {
  return useQuery({
    queryKey: [SHARED_SHIPMENT_QUERY_KEY, token],
    queryFn: () => shareApi.resolveShareToken(token),
    enabled: !!token && token.length >= 16,
    retry: (failureCount, error: any) => {
      // Don't retry on 404 (not found) or 410 (expired/revoked)
      if (error?.response?.status === 404 || error?.response?.status === 410) {
        return false;
      }
      return failureCount < 2;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}
