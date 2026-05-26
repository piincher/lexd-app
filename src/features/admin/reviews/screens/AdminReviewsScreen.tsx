import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { RootStackScreenProps } from "@src/navigations/type";

import { ReviewStats } from "../components/ReviewStats";
import { ReviewFilters, FILTER_CHIPS } from "../components/ReviewFilters";
import { ReviewList } from "../components/ReviewList";
import {
  useReviewAdminScreen,
  useReviewAdminData,
} from "../hooks/useReviewAdminScreen";
import { createStyles } from "./AdminReviewsScreen.styles";

export default function AdminReviewsScreen({
  navigation,
}: RootStackScreenProps<"AdminReviews">) {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const {
    activeFilter,
    page,
    handleFilterChange,
    handleNextPage,
    handlePrevPage,
  } = useReviewAdminScreen();

  const selectedChip = FILTER_CHIPS.find((c) => c.key === activeFilter)!;

  const {
    data,
    isLoading,
    isRefetching,
    refetch,
    stats,
    handleRespond,
    isResponding,
  } = useReviewAdminData(activeFilter, page, selectedChip);

  const reviews = data?.reviews ?? [];
  const totalPages = data?.totalPages ?? 1;
  const totalReviews = data?.total ?? 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Avis Clients</Text>
            <Text style={styles.headerSubtitle}>{totalReviews} avis au total</Text>
          </View>
          <NotificationBell
            onPress={() => navigation.navigate("Notifications" as never)}
            size={24}
            color={colors.text.primary}
          />
        </View>
      </View>

      {stats && <ReviewStats stats={stats} />}

      <ReviewFilters activeFilter={activeFilter} onFilterChange={handleFilterChange} />

      <ReviewList
        reviews={reviews}
        isLoading={isLoading}
        isRefetching={isRefetching}
        refetch={refetch}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        page={page}
        totalPages={totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={() => handleNextPage(totalPages)}
        onRespond={handleRespond}
        isResponding={isResponding}
      />
    </SafeAreaView>
  );
}
