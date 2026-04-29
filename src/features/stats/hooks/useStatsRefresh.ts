/**
 * useStatsRefresh Hook
 * SRP: Pull-to-refresh state management
 */

import { useState, useCallback } from 'react';

export const useStatsRefresh = (refetch: () => void) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return { refreshing, onRefresh };
};
