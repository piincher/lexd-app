/**
 * DashboardSkeleton
 * Loading skeleton for dashboard
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';

export const DashboardSkeleton: React.FC = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {/* Header Skeleton */}
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: theme.colors.surfaceVariant }]} />
        <View style={styles.headerText}>
          <View style={[styles.line, { width: 120, backgroundColor: theme.colors.surfaceVariant }]} />
          <View style={[styles.line, { width: 180, marginTop: 8, backgroundColor: theme.colors.surfaceVariant }]} />
        </View>
      </View>

      {/* Stats Grid Skeleton */}
      <View style={styles.statsGrid}>
        {[1, 2, 3, 4].map((i) => (
          <View
            key={i}
            style={[styles.card, { backgroundColor: theme.colors.surfaceVariant }]}
          />
        ))}
      </View>

      {/* Quick Actions Skeleton */}
      <View style={styles.section}>
        <View style={[styles.line, { width: 150, backgroundColor: theme.colors.surfaceVariant }]} />
        <View style={styles.actionsRow}>
          {[1, 2, 3, 4].map((i) => (
            <View
              key={i}
              style={[styles.actionButton, { backgroundColor: theme.colors.surfaceVariant }]}
            />
          ))}
        </View>
      </View>

      {/* Activity Feed Skeleton */}
      <View style={styles.section}>
        <View style={[styles.line, { width: 150, backgroundColor: theme.colors.surfaceVariant }]} />
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.activityItem}>
            <View style={[styles.icon, { backgroundColor: theme.colors.surfaceVariant }]} />
            <View style={styles.activityContent}>
              <View style={[styles.line, { width: '60%', backgroundColor: theme.colors.surfaceVariant }]} />
              <View style={[styles.line, { width: '80%', marginTop: 8, backgroundColor: theme.colors.surfaceVariant }]} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Theme.spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    marginLeft: Theme.spacing.md,
    flex: 1,
  },
  line: {
    height: 12,
    borderRadius: 6,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  card: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.md,
  },
  section: {
    marginTop: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.lg,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.md,
  },
  actionButton: {
    width: 100,
    height: 100,
    borderRadius: Theme.radius.lg,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.md,
    padding: Theme.spacing.md,
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius.md,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.md,
  },
  activityContent: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
});

export default DashboardSkeleton;
