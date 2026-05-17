import { useGetTransitStatus } from './useTransitQueries';
import { TransitProgress } from '../../types/transitStatus';

export const useTransitProgress = (
  containerId: string | undefined,
): TransitProgress & { isLoading: boolean; isError: boolean } => {
  const { data: status, isLoading, isError } = useGetTransitStatus(containerId);
  return {
    progress: status?.progressPercentage || 0,
    currentStatus: status?.currentStatus || null,
    nextStatus: status?.nextStatus || null,
    isComplete: status?.isComplete || false,
    isLoading,
    isError,
  };
};
