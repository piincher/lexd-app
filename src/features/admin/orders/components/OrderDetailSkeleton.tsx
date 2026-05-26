/**
 * OrderDetailSkeleton - Loading skeleton for order detail screen
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';

const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: colors.neutral[200],
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  titleSkeleton: {
    height: 24,
    backgroundColor: colors.neutral[300],
    borderRadius: 4,
    marginBottom: 12,
    width: '60%',
  },
  lineSkeleton: {
    height: 16,
    backgroundColor: colors.neutral[300],
    borderRadius: 4,
    marginBottom: 8,
    width: '100%',
  },
});

export const OrderDetailSkeleton: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.titleSkeleton} />
        <View style={styles.lineSkeleton} />
        <View style={styles.lineSkeleton} />
      </View>
      <View style={styles.card}>
        <View style={styles.titleSkeleton} />
        <View style={styles.lineSkeleton} />
        <View style={styles.lineSkeleton} />
      </View>
    </View>
  );
};

export default OrderDetailSkeleton;
