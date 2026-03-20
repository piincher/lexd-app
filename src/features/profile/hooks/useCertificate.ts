/**
 * Certificate Hooks
 * TanStack Query hooks for certificate progress data fetching
 */

import { useQuery } from '@tanstack/react-query';
import { certificateApi } from '../api/certificateApi';

// ============================================
// QUERY KEYS
// ============================================

const QUERY_KEYS = {
  certificate: 'certificate',
  progress: () => [QUERY_KEYS.certificate, 'progress'] as const,
} as const;

// ============================================
// QUERY HOOKS
// ============================================

/**
 * Hook to fetch certificate progress data
 */
export const useCertificateProgress = () => {
  return useQuery({
    queryKey: QUERY_KEYS.progress(),
    queryFn: () => certificateApi.getProgress(),
    select: (response) => response.data.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
