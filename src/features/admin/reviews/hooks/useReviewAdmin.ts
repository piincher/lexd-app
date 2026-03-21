import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  reviewAdminApi,
  AdminPaginatedReviews,
  AdminReviewStats,
  AdminReview,
  RespondToReviewInput,
} from "../api/reviewAdminApi";

const ADMIN_REVIEWS_KEY = "admin_reviews";
const ADMIN_REVIEW_STATS_KEY = "admin_review_stats";

export const useAdminReviews = (
  filters?: { rating?: number; hasResponse?: boolean },
  page = 1
) => {
  return useQuery<AdminPaginatedReviews, Error>({
    queryKey: [ADMIN_REVIEWS_KEY, filters, page],
    queryFn: () =>
      reviewAdminApi
        .getReviews({ page, ...filters })
        .then((res) => res.data.data),
  });
};

export const useAdminReviewStats = () => {
  return useQuery<AdminReviewStats, Error>({
    queryKey: [ADMIN_REVIEW_STATS_KEY],
    queryFn: () =>
      reviewAdminApi.getStats().then((res) => res.data.data),
  });
};

export const useAdminRespondToReview = () => {
  const queryClient = useQueryClient();

  return useMutation<AdminReview, Error, RespondToReviewInput>({
    mutationFn: (data) =>
      reviewAdminApi.respondToReview(data).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_REVIEWS_KEY] });
      queryClient.invalidateQueries({ queryKey: [ADMIN_REVIEW_STATS_KEY] });
    },
  });
};
