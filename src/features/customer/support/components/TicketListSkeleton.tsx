/**
 * TicketListSkeleton
 * Skeleton loading placeholder matching TicketCard layout
 */

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ShimmerBlock } from '@src/shared/ui';
import { useAppTheme } from '@src/providers/ThemeProvider';

const TicketSkeletonItem: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.background.card,
          borderColor: colors.border,
        },
      ]}
    >
      {/* Header Row: Icon + Number + Status */}
      <View style={styles.headerRow}>
        <View style={styles.numberContainer}>
          <ShimmerBlock width={18} height={18} borderRadius={9} />
          <View style={{ width: 8 }} />
          <ShimmerBlock width={100} height={14} borderRadius={4} />
        </View>
        <ShimmerBlock width={72} height={24} borderRadius={6} />
      </View>

      {/* Type Label */}
      <ShimmerBlock width={80} height={12} borderRadius={3} style={{ marginTop: 8 }} />

      {/* Subject */}
      <ShimmerBlock
        width={'90%' as any}
        height={15}
        borderRadius={4}
        style={{ marginTop: 8 }}
      />

      {/* Preview Block */}
      <ShimmerBlock
        width={'100%' as any}
        height={40}
        borderRadius={8}
        style={{ marginTop: 8 }}
      />

      {/* Footer: Date + Message Count */}
      <View style={styles.footer}>
        <ShimmerBlock width={80} height={12} borderRadius={3} />
        <View style={{ width: 8 }} />
        <ShimmerBlock width={60} height={12} borderRadius={3} />
      </View>
    </View>
  );
};

interface TicketListSkeletonProps {
  count?: number;
}

export const TicketListSkeleton: React.FC<TicketListSkeletonProps> = ({ count = 5 }) => (
  <Animated.View entering={FadeIn.duration(300)} style={styles.list}>
    {Array.from({ length: count }).map((_, i) => (
      <TicketSkeletonItem key={i} />
    ))}
  </Animated.View>
);

const createStyles = (colors: any) => StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: 4,
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
});
