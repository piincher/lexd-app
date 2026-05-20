import { useQuery } from '@tanstack/react-query';
import { getAppVersionSettings } from '../api/versionApi';

export const appVersionQueryKeys = {
  settings: ['app-version', 'settings'] as const,
  stats: ['app-version', 'stats'] as const,
};

export const useAppVersionSettings = () => {
  return useQuery({
    queryKey: appVersionQueryKeys.settings,
    queryFn: getAppVersionSettings,
  });
};
