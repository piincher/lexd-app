import { useState, useCallback } from "react";
import { Alert } from "react-native";
import {
  useAdminReviews,
  useAdminReviewStats,
  useAdminRespondToReview,
} from "./useReviewAdmin";
import type { FilterChip } from "../components/ReviewFilters";

export const useReviewAdminScreen = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key);
    setPage(1);
  }, []);

  const handleNextPage = useCallback((totalPages: number) => {
    setPage((p) => (p < totalPages ? p + 1 : p));
  }, []);

  const handlePrevPage = useCallback(() => {
    setPage((p) => (p > 1 ? p - 1 : p));
  }, []);

  return {
    activeFilter,
    page,
    setPage,
    handleFilterChange,
    handleNextPage,
    handlePrevPage,
  };
};

export const useReviewAdminData = (
  activeFilter: string,
  page: number,
  selectedChip: FilterChip
) => {
  const filters = (() => {
    if (selectedChip.filterType === "rating") {
      return { rating: selectedChip.value as number };
    }
    if (selectedChip.filterType === "response") {
      return { hasResponse: selectedChip.value as boolean };
    }
    return undefined;
  })();

  const { data, isLoading, isRefetching, refetch } = useAdminReviews(filters, page);
  const { data: stats } = useAdminReviewStats();
  const respondMutation = useAdminRespondToReview();

  const handleRespond = useCallback(
    (reviewId: string, response: string) => {
      respondMutation.mutate(
        { reviewId, response },
        {
          onSuccess: () => {
            Alert.alert("Succès", "Votre réponse a été enregistrée.");
          },
          onError: (error: Error) => {
            Alert.alert("Erreur", error.message || "Impossible d'envoyer la réponse.");
          },
        }
      );
    },
    [respondMutation]
  );

  return {
    data,
    isLoading,
    isRefetching,
    refetch,
    stats,
    handleRespond,
    isResponding: respondMutation.isPending,
  };
};
