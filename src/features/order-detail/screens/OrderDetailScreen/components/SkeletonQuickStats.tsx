import React from 'react';
import { View } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './OrderDetailSkeleton.styles';

const StatBox: React.FC = () => (
  <View style={styles.statBox}>
    <ShimmerBlock width={22} height={22} borderRadius={11} />
    <ShimmerBlock width={40} height={16} borderRadius={4} style={styles.statGap} />
    <ShimmerBlock width={50} height={11} borderRadius={3} />
  </View>
);

export const SkeletonQuickStats: React.FC = () => {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.statsRow, { backgroundColor: colors.background.card }]}>
      <StatBox />
      <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
      <StatBox />
      <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
      <StatBox />
    </View>
  );
};
