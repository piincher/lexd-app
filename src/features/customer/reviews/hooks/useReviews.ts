import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reviewApi, Review, ReviewStats, PaginatedReviews } from "../api";

const REVIEWS_KEY = "customer_reviews";
const REVIEW_STATS_KEY = "customer_review_stats";
const GOODS_REVIEW_KEY = "customer_goods_review";

export const useMyReviews = (page = 1) => {
  return useQuery<PaginatedReviews, Error>({
    queryKey: [REVIEWS_KEY, page],
    queryFn: () =>
      reviewApi.getMyReviews(page).then((res) => res.data.data),
  });
};

export const useGoodsReview = (goodsId: string | undefined) => {
  return useQuery<Review, Error>({
    queryKey: [GOODS_REVIEW_KEY, goodsId],
    queryFn: () =>
      reviewApi.getGoodsReview(goodsId!).then((res) => res.data.data),
    enabled: !!goodsId,
  });
};

export const useSubmitReview = () => {
  const queryClient = useQueryClient();

  return useMutation<Review, Error, { goodsId: string; rating: number; comment?: string }>({
    mutationFn: (data) =>
      reviewApi.submitReview(data).then((res) => res.data.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [REVIEWS_KEY] });
      queryClient.invalidateQueries({ queryKey: [GOODS_REVIEW_KEY, variables.goodsId] });
      queryClient.invalidateQueries({ queryKey: [REVIEW_STATS_KEY] });
    },
  });
};

export const useReviewStats = () => {
  return useQuery<ReviewStats, Error>({
    queryKey: [REVIEW_STATS_KEY],
    queryFn: () =>
      reviewApi.getStats().then((res) => res.data.data),
  });
};
