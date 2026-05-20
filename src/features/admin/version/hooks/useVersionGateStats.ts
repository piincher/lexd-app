import { useQuery } from '@tanstack/react-query';
import { getVersionGateStats } from '../api/versionApi';
import { appVersionQueryKeys } from './useAppVersionSettings';

export const useVersionGateStats = () => {
  return useQuery({
    queryKey: appVersionQueryKeys.stats,
    queryFn: getVersionGateStats,
  });
};
