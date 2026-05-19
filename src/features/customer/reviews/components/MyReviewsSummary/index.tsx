import React from "react";
import { View, Text } from "react-native";
import type { ReviewStats } from "../../api";
import { StarRating } from "../StarRating";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./MyReviewsSummary.styles";

interface MyReviewsSummaryProps {
  stats: ReviewStats;
}

export const MyReviewsSummary: React.FC<MyReviewsSummaryProps> = ({
  stats,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={styles.summaryCard}>
      <StarRating rating={Math.round(stats.averageRating)} size={24} />
      <Text style={styles.summaryAverage}>
        {stats.averageRating.toFixed(1)} / 5
      </Text>
      <Text style={styles.summaryCount}>{stats.totalReviews} avis</Text>
    </View>
  );
};
