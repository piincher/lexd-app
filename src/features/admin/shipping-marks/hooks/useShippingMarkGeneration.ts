import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchShippingMarkGenerationJob,
  generateBulkShippingMarks,
} from '../api/shippingMarkAdminApi';

const TERMINAL = new Set(['COMPLETED', 'PARTIAL', 'FAILED']);

export const useShippingMarkGeneration = () => {
  const [jobId, setJobId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: generateBulkShippingMarks,
    onSuccess: (job) => setJobId(job.id),
  });
  const jobQuery = useQuery({
    queryKey: ['shipping-mark-generation-job', jobId],
    queryFn: () => fetchShippingMarkGenerationJob(jobId!),
    enabled: Boolean(jobId),
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status && TERMINAL.has(status) ? false : 2000;
    },
  });

  useEffect(() => {
    const status = jobQuery.data?.status;
    if (status && TERMINAL.has(status)) {
      void queryClient.invalidateQueries({ queryKey: ['shipping-mark-clients'] });
    }
  }, [jobQuery.data?.status, queryClient]);

  const job = jobQuery.data ?? mutation.data;
  return {
    generateBulk: mutation.mutateAsync,
    generationJob: job,
    generationError: mutation.error ?? jobQuery.error,
    isGeneratingBulk: mutation.isPending || Boolean(job && !TERMINAL.has(job.status)),
  };
};
