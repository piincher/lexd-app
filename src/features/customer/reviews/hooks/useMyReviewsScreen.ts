import { useState, useCallback } from "react";
import { useMyReviews, useReviewStats } from "./useReviews";
import type { Review, ReviewStats } from "../api";

type UseMyReviewsScreenReturn = {
  page: number;
  totalPages: number;
  totalReviews: number;
  reviews: Review[];
  stats: ReviewStats | undefined;
  isLoading: boolean;
  isRefetching: boolean;
  handlers: {
    handleNextPage: () => void;
    handlePrevPage: () => void;
    refetch: () => void;
  };
};

export const useMyReviewsScreen = (): UseMyReviewsScreenReturn => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isRefetching, refetch } = useMyReviews(page);
  const { data: stats } = useReviewStats();

  const reviews = data?.reviews ?? [];
  const totalPages = data?.totalPages ?? 1;
  const totalReviews = data?.total ?? 0;

  const handleNextPage = useCallback(() => {
    if (page < totalPages) {
      setPage((p) => p + 1);
    }
  }, [page, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (page > 1) {
      setPage((p) => p - 1);
    }
  }, [page]);

  return {
    page,
    totalPages,
    totalReviews,
    reviews,
    stats,
    isLoading,
    isRefetching,
    handlers: {
      handleNextPage,
      handlePrevPage,
      refetch,
    },
  };
};
