/**
 * useGlobalPending — Track pending mutations globally
 *
 * Uses TanStack Query's useIsMutating to detect any active mutations.
 * Useful for showing a global loading overlay during form submissions,
 * payments, or any background mutations.
 */

import { useIsMutating } from '@tanstack/react-query';

export const useGlobalPending = (): boolean => {
  const isMutating = useIsMutating();
  return isMutating > 0;
};
