import React from "react";
import { View, Text } from "react-native";
import { StarRating } from "../StarRating";
import { DistributionBar } from "../DistributionBar";
import { createStyles } from './ReviewStats.styles';
import type { AdminReviewStats } from "../../api/reviewAdminApi";
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ReviewStatsProps {
  stats: AdminReviewStats;
}

export const ReviewStats: React.FC<ReviewStatsProps> = ({ stats }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
    <View style={styles.statsCard}>
      <View style={styles.statsTop}>
        <View style={styles.statsLeft}>
          <Text style={styles.statsAverage}>{stats.averageRating.toFixed(1)}</Text>
          <StarRating rating={Math.round(stats.averageRating)} size={18} />
          <Text style={styles.statsTotal}>{stats.totalReviews} avis</Text>
        </View>
        <View style={styles.statsRight}>
          {[5, 4, 3, 2, 1].map((star) => (
            <DistributionBar
              key={star}
              star={star}
              count={stats.distribution[star] || 0}
              total={stats.totalReviews}
            />
          ))}
        </View>
      </View>
    </View>
  );
};
