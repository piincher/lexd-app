/**
 * Certificate Hooks
 * TanStack Query hooks for certificate progress data fetching
 */

import { useQuery } from '@tanstack/react-query';
import { certificateApi, CertificateProgress } from '../api/certificateApi';

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
 * Returns certificate progress with error handling and automatic retries
 */
export const useCertificateProgress = () => {
  return useQuery<CertificateProgress, Error>({
    queryKey: QUERY_KEYS.progress(),
    queryFn: async () => {
      try {
        const response = await certificateApi.getProgress();
        
        // Debug logging for development
        if (__DEV__) {
          console.log('[useCertificateProgress] API Response:', {
            success: response.data?.success,
            hasData: !!response.data?.data,
            dataKeys: response.data?.data ? Object.keys(response.data.data) : null,
          });
        }
        
        // Handle API error response
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to fetch certificate progress');
        }
        
        // Validate data structure
        const data = response.data.data;
        if (!data || typeof data.currentCBM !== 'number') {
          throw new Error('Invalid certificate data structure received');
        }
        
        return data;
      } catch (error) {
        if (__DEV__) {
          console.error('[useCertificateProgress] Error:', error);
        }
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    // Use global retry config
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
};
