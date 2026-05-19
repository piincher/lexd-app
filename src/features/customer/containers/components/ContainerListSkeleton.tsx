/**
 * ContainerListSkeleton
 * Skeleton loading placeholder matching ContainerCard layout
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ShimmerBlock } from '@src/shared/ui';

const ContainerSkeletonItem: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.background.card,
          borderColor: isDark ? colors.action.hover : colors.border,
        },
      ]}
    >
      {/* Header Row: icon circle + container number/shipping line + status badge */}
      <View style={styles.headerRow}>
        <ShimmerBlock width={40} height={40} borderRadius={20} />
        <View style={styles.headerInfo}>
          <ShimmerBlock width={140} height={16} borderRadius={4} />
          <View style={{ height: 6 }} />
          <ShimmerBlock width={100} height={12} borderRadius={3} />
        </View>
        <ShimmerBlock width={72} height={28} borderRadius={6} />
      </View>

      {/* Route Row */}
      <View style={styles.routeRow}>
        <View style={styles.routeLocation}>
          <ShimmerBlock width={50} height={10} borderRadius={3} />
          <View style={{ height: 4 }} />
          <ShimmerBlock width={80} height={14} borderRadius={4} />
        </View>
        <View style={styles.routeArrow}>
          <ShimmerBlock width={24} height={18} borderRadius={4} />
        </View>
        <View style={[styles.routeLocation, styles.routeLocationRight]}>
          <ShimmerBlock width={60} height={10} borderRadius={3} />
          <View style={{ height: 4 }} />
          <ShimmerBlock width={80} height={14} borderRadius={4} />
        </View>
      </View>

      {/* Footer Row */}
      <View style={[styles.footerRow, { borderTopColor: colors.border }]}>
        <View style={styles.footerItem}>
          <ShimmerBlock width={16} height={16} borderRadius={4} />
          <ShimmerBlock width={100} height={12} borderRadius={3} style={{ marginLeft: 6 }} />
        </View>
        <View style={styles.footerItem}>
          <ShimmerBlock width={16} height={16} borderRadius={4} />
          <ShimmerBlock width={90} height={12} borderRadius={3} style={{ marginLeft: 6 }} />
        </View>
      </View>
    </View>
  );
};

export const ContainerListSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.list}>
      {Array.from({ length: count }).map((_, i) => (
        <ContainerSkeletonItem key={i} />
      ))}
    </Animated.View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  list: {
    flex: 1,
    paddingVertical: 8,
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  routeLocation: {
    flex: 1,
  },
  routeLocationRight: {
    alignItems: 'flex-end',
  },
  routeArrow: {
    paddingHorizontal: 16,
    minWidth: 60,
    alignItems: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
