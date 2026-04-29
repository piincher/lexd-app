import React from "react";
import { View, Text } from "react-native";
import type { ReviewStats } from "../../api";
import { StarRating } from "../StarRating";
import { styles } from "./MyReviewsSummary.styles";

interface MyReviewsSummaryProps {
  stats: ReviewStats;
}

export const MyReviewsSummary: React.FC<MyReviewsSummaryProps> = ({
  stats,
}) => {
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
