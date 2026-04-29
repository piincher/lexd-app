/**
 * Analytics Export Hook
 * React Query mutation for exporting analytics data
 */

import { useMutation } from '@tanstack/react-query';
import * as analyticsApi from '../../api/analyticsApi';

export const useExportAnalytics = () => {
  return useMutation({
    mutationFn: analyticsApi.exportAnalytics,
  });
};
