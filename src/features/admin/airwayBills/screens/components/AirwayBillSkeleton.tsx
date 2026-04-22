/**
 * AirwayBillSkeleton - Loading skeleton for airway bill list
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui/ShimmerBlock';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const AirwayBillSkeleton: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      {/* Header shimmer */}
      <View style={styles.headerSkeleton}>
        <ShimmerBlock width={180} height={28} borderRadius={8} />
        <ShimmerBlock width={40} height={40} borderRadius={20} style={styles.fabSkeleton} />
      </View>

      {/* Stats row shimmer */}
      <View style={styles.statsRow}>
        {[1, 2, 3].map((i) => (
          <View key={i} style={[styles.statCardSkeleton, { backgroundColor: colors.background.card }]}>
            <ShimmerBlock width={36} height={36} borderRadius={10} />
            <View style={styles.statTextSkeleton}>
              <ShimmerBlock width={40} height={18} borderRadius={4} />
              <ShimmerBlock width={30} height={12} borderRadius={4} style={{ marginTop: 4 }} />
            </View>
          </View>
        ))}
      </View>

      {/* Filter chips shimmer */}
      <View style={styles.filterRow}>
        {[1, 2, 3, 4, 5].map((i) => (
          <ShimmerBlock key={i} width={80 + i * 10} height={34} borderRadius={17} />
        ))}
      </View>

      {/* Card skeletons */}
      {[1, 2, 3, 4].map((i) => (
        <View key={i} style={[styles.cardSkeleton, { backgroundColor: colors.background.card }]}>
          <View style={styles.cardHeaderRow}>
            <ShimmerBlock width={140} height={18} borderRadius={6} />
            <ShimmerBlock width={70} height={22} borderRadius={11} />
          </View>
          <ShimmerBlock width={120} height={14} borderRadius={4} style={{ marginTop: 8 }} />
          <View style={styles.routeRow}>
            <ShimmerBlock width={50} height={24} borderRadius={4} />
            <ShimmerBlock width="50%" height={1} borderRadius={1} />
            <ShimmerBlock width={50} height={24} borderRadius={4} />
          </View>
          <View style={styles.footerRow}>
            <ShimmerBlock width={80} height={22} borderRadius={8} />
            <ShimmerBlock width={80} height={22} borderRadius={8} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
  headerSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  fabSkeleton: {
    marginLeft: 'auto',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  statCardSkeleton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    gap: 10,
  },
  statTextSkeleton: {
    flex: 1,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    paddingVertical: 4,
  },
  cardSkeleton: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 14,
  },
  footerRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
});

export default AirwayBillSkeleton;
