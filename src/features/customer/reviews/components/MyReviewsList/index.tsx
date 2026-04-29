import React, { useCallback } from "react";
import { FlashList } from "@shopify/flash-list";
import type { Review, ReviewStats } from "../../api";
import { ReviewCard } from "../ReviewCard";
import { MyReviewsSummary } from "../MyReviewsSummary";
import { MyReviewsEmpty } from "../MyReviewsEmpty";
import { MyReviewsPagination } from "../MyReviewsPagination";
import { styles } from "./MyReviewsList.styles";

interface MyReviewsListProps {
  reviews: Review[];
  stats: ReviewStats | undefined;
  page: number;
  totalPages: number;
  isRefetching: boolean;
  refetch: () => void;
  onNextPage: () => void;
  onPrevPage: () => void;
}

export const MyReviewsList: React.FC<MyReviewsListProps> = ({
  reviews,
  stats,
  page,
  totalPages,
  isRefetching,
  refetch,
  onNextPage,
  onPrevPage,
}) => {
  const renderReview = useCallback(({ item }: { item: Review }) => {
    return <ReviewCard review={item} />;
  }, []);

  return (
    <FlashList
      data={reviews}
      renderItem={renderReview}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      refreshing={isRefetching}
      onRefresh={refetch}
      ListHeaderComponent={
        stats ? <MyReviewsSummary stats={stats} /> : null
      }
      ListEmptyComponent={<MyReviewsEmpty />}
      ListFooterComponent={
        totalPages > 1 ? (
          <MyReviewsPagination
            page={page}
            totalPages={totalPages}
            onNext={onNextPage}
            onPrev={onPrevPage}
          />
        ) : null
      }
    />
  );
};
