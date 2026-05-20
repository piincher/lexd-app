import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitFAQFeedback } from '../api/faqApi';

const FAQ_QUERY_KEY = 'faqs';

export function useFAQFeedback() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ faqId, isHelpful }: { faqId: string; isHelpful: boolean }) =>
      submitFAQFeedback(faqId, isHelpful),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FAQ_QUERY_KEY] });
    },
  });

  return {
    submitFeedback: mutation.mutate,
    isPending: mutation.isPending,
  };
}
