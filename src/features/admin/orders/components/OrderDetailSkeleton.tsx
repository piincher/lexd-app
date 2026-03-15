/**
 * OrderDetailSkeleton - Loading skeleton for order detail screen
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { lightTheme } from '@src/constants/Theme';

export const OrderDetailSkeleton: React.FC = () => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: lightTheme.spacing.lg,
  },
  card: {
    backgroundColor: lightTheme.colors.neutral[200],
    borderRadius: lightTheme.borderRadius.lg,
    padding: lightTheme.spacing.lg,
    marginBottom: lightTheme.spacing.lg,
  },
  titleSkeleton: {
    height: 24,
    backgroundColor: lightTheme.colors.neutral[300],
    borderRadius: lightTheme.borderRadius.sm,
    marginBottom: lightTheme.spacing.md,
    width: '60%',
  },
  lineSkeleton: {
    height: 16,
    backgroundColor: lightTheme.colors.neutral[300],
    borderRadius: lightTheme.borderRadius.sm,
    marginBottom: lightTheme.spacing.sm,
    width: '100%',
  },
});

export default OrderDetailSkeleton;
