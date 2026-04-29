import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useMyReviewsScreen } from "../hooks";
import { MyReviewsHeader, MyReviewsList } from "../components";
import { ReviewsListSkeleton } from "../components/ReviewsListSkeleton";
import { styles } from "./MyReviewsScreen.styles";

export default function MyReviewsScreen({
  navigation,
}: RootStackScreenProps<"MyReviews">) {
  const { colors } = useAppTheme();
  const {
    page,
    totalPages,
    totalReviews,
    reviews,
    stats,
    isLoading,
    isRefetching,
    handlers,
  } = useMyReviewsScreen();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background.default }]}
    >
      <MyReviewsHeader
        totalReviews={totalReviews}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() =>
          navigation.navigate("Notifications" as never)
        }
      />
      {isLoading ? (
        <ReviewsListSkeleton />
      ) : (
        <MyReviewsList
          reviews={reviews}
          stats={stats}
          page={page}
          totalPages={totalPages}
          isRefetching={isRefetching}
          refetch={handlers.refetch}
          onNextPage={handlers.handleNextPage}
          onPrevPage={handlers.handlePrevPage}
        />
      )}
    </SafeAreaView>
  );
}
