import { useCallback } from 'react';

export const useAirwayBillDetailRefresh = (
  refetchAwb: () => void,
  refetchWaypoints: () => void,
  refetchCargoBags: () => void
) => {
  const handleRefreshCargoBags = useCallback(() => {
    refetchCargoBags();
    refetchAwb();
    refetchWaypoints();
  }, [refetchCargoBags, refetchAwb, refetchWaypoints]);

  return { handleRefreshCargoBags };
};
