/**
 * useTrackOrderScreen Hook
 * Screen-level hook for order tracking state and logic
 */

import { useState, useCallback } from 'react';
import { useTrackOrder } from './useTrackOrder';

export const useTrackOrderScreen = () => {
  const [orderCode, setOrderCode] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const { data, isLoading, isError, refetch } = useTrackOrder(orderCode);

  const handleTrack = useCallback(() => {
    if (orderCode.trim()) {
      setHasSearched(true);
      refetch();
    }
  }, [orderCode, refetch]);

  return {
    orderCode,
    setOrderCode,
    hasSearched,
    data,
    isLoading,
    isError,
    handleTrack,
  };
};
