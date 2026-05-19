import { useAppTheme } from '@src/providers/ThemeProvider';
import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { ShimmerBlock } from '@src/shared/ui';

interface ReviewsListSkeletonProps {
  count?: number;
}

const StarRowSkeleton: React.FC = () => (
  <View style={styles.starRow}>
    {Array.from({ length: 5 }).map((_, i) => (
      <ShimmerBlock key={i} width={16} height={16} borderRadius={8} />
    ))}
  </View>
);

const ReviewCardSkeleton: React.FC = () => (
  <View style={styles.card}>
    {/* Header: Goods ID + shipping mode badge */}
    <View style={styles.cardHeader}>
      <ShimmerBlock width={120} height={16} borderRadius={4} />
      <ShimmerBlock width={70} height={22} borderRadius={10} />
    </View>

    {/* Star rating */}
    <StarRowSkeleton />

    {/* Comment */}
    <View style={styles.commentBlock}>
      <ShimmerBlock width="100%" height={14} borderRadius={4} />
      <ShimmerBlock width="80%" height={14} borderRadius={4} />
    </View>

    {/* Date row */}
    <View style={styles.dateRow}>
      <ShimmerBlock width={14} height={14} borderRadius={7} />
      <ShimmerBlock width={100} height={12} borderRadius={4} />
    </View>
  </View>
);

export const ReviewsListSkeleton: React.FC<ReviewsListSkeletonProps> = ({
  count = 4,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.container}>
      {/* Summary card */}
      <View style={styles.summaryCard}>
        <StarRowSkeleton />
        <ShimmerBlock width={80} height={24} borderRadius={4} />
        <ShimmerBlock width={60} height={14} borderRadius={4} />
      </View>

      {/* Review cards */}
      {Array.from({ length: count }).map((_, i) => (
        <ReviewCardSkeleton key={i} />
      ))}
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    padding: 16,
  },
  summaryCard: {
    backgroundColor: colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    gap: 8,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  card: {
    backgroundColor: colors.background.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  starRow: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 8,
  },
  commentBlock: {
    gap: 6,
    marginTop: 8,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
});
