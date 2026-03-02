/**
 * ActivityFeed Component
 * Displays a vertical list of activity items with icons and timestamps
 */

import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { ActivityItem, ActivityType } from '../types';
import {
  ACTIVITY_TYPE_COLORS,
  ACTIVITY_TYPE_ICONS,
} from '../types';

export interface ActivityFeedProps {
  /**
   * List of activities to display
   */
  activities: ActivityItem[];
  /**
   * Optional empty state message
   */
  emptyMessage?: string;
  /**
   * Whether to show the "Voir tout" button
   */
  showViewAll?: boolean;
  /**
   * Handler for "Voir tout" press
   */
  onViewAll?: () => void;
  /**
   * Maximum number of items to show (default: 5)
   */
  maxItems?: number;
  /**
   * Optional test ID
   */
  testID?: string;
}

const formatTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'À l\'instant';
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays === 1) return 'Hier';
  if (diffDays < 7) return `Il y a ${diffDays} jours`;
  
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  });
};

const ActivityItemComponent: React.FC<{ item: ActivityItem }> = ({ item }) => {
  const theme = useTheme();
  const color = ACTIVITY_TYPE_COLORS[item.type as ActivityType] || theme.colors.primary;
  const icon = ACTIVITY_TYPE_ICONS[item.type as ActivityType] || 'bell';

  return (
    <View style={styles.activityItem}>
      {/* Icon Container */}
      <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
        <MaterialCommunityIcons
          name={icon as keyof typeof MaterialCommunityIcons.glyphMap}
          size={20}
          color={color}
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </Text>
        <Text
          style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.description}
        </Text>
      </View>

      {/* Timestamp */}
      <Text style={[styles.timestamp, { color: theme.colors.onSurfaceDisabled }]}>
        {formatTimeAgo(item.timestamp)}
      </Text>
    </View>
  );
};

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  emptyMessage = 'Aucune activité récente',
  showViewAll = false,
  onViewAll,
  maxItems = 5,
  testID,
}) => {
  const theme = useTheme();
  const displayActivities = activities.slice(0, maxItems);

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons
        name="bell-off-outline"
        size={48}
        color={theme.colors.onSurfaceDisabled}
      />
      <Text style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>
        {emptyMessage}
      </Text>
    </View>
  );

  return (
    <View style={styles.container} testID={testID}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>
          Activité Récente
        </Text>
        {showViewAll && activities.length > 0 && (
          <Text
            style={[styles.viewAll, { color: theme.colors.primary }]}
            onPress={onViewAll}
          >
            Voir tout
          </Text>
        )}
      </View>

      {/* Activity List */}
      {displayActivities.length === 0 ? (
        renderEmptyState()
      ) : (
        <View style={styles.listContainer}>
          {displayActivities.map((item, index) => (
            <View key={item.id}>
              <ActivityItemComponent item={item} />
              {index < displayActivities.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius.lg,
    marginHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: Theme.spacing.md,
    marginRight: Theme.spacing.sm,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
  timestamp: {
    fontSize: 12,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Theme.neutral[100],
    marginLeft: 72,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Theme.spacing['3xl'],
    marginHorizontal: Theme.spacing.lg,
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius.lg,
    ...Theme.shadows.sm,
  },
  emptyText: {
    marginTop: Theme.spacing.md,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ActivityFeed;
