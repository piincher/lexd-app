/**
 * QuickActions Component
 * Horizontal scrollable quick action buttons for the dashboard
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';
import { QuickAction, DashboardData } from '../types';

export interface QuickActionsProps {
  /**
   * List of quick actions to display
   */
  actions: QuickAction[];
  /**
   * Dashboard data for conditional rendering
   */
  dashboardData?: DashboardData;
  /**
   * Handler for action press
   */
  onActionPress: (action: QuickAction) => void;
  /**
   * Optional test ID
   */
  testID?: string;
}

const getActionGradient = (actionId: string): readonly [string, string] => {
  switch (actionId) {
    case 'view-goods':
      return ['#8B5CF6', '#7C3AED'] as const; // Purple
    case 'view-containers':
      return ['#0EA5E9', '#0284C7'] as const; // Ocean blue
    case 'pay-debt':
      return ['#10B981', '#059669'] as const; // Success green
    case 'contact-support':
      return ['#F59E0B', '#D97706'] as const; // Amber
    default:
      return [Theme.primary[500], Theme.primary[600]] as const;
  }
};

const ActionButton: React.FC<{
  action: QuickAction;
  onPress: () => void;
}> = ({ action, onPress }) => {
  const theme = useTheme();
  const gradientColors = getActionGradient(action.id);

  return (
    <Pressable onPress={onPress} style={styles.actionButton}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={action.icon as keyof typeof MaterialCommunityIcons.glyphMap}
            size={28}
            color={Theme.neutral.white}
          />
        </View>
        <Text style={styles.label} numberOfLines={2} ellipsizeMode="tail">
          {action.label}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};

export const QuickActions: React.FC<QuickActionsProps> = ({
  actions,
  dashboardData,
  onActionPress,
  testID,
}) => {
  // Filter actions based on showIf condition
  const visibleActions = actions.filter((action) => {
    if (!action.showIf || !dashboardData) return true;
    return action.showIf(dashboardData);
  });

  if (visibleActions.length === 0) return null;

  return (
    <View style={styles.container} testID={testID}>
      {/* Header */}
      <Text style={[styles.headerTitle, { color: Theme.neutral[800] }]}>
        Actions Rapides
      </Text>

      {/* Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToAlignment="start"
      >
        {visibleActions.map((action) => (
          <ActionButton
            key={action.id}
            action={action}
            onPress={() => onActionPress(action)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.lg,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  scrollContent: {
    paddingHorizontal: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  actionButton: {
    width: 100,
    height: 100,
    borderRadius: Theme.radius.lg,
    overflow: 'hidden',
    ...Theme.shadows.md,
  },
  gradient: {
    flex: 1,
    padding: Theme.spacing.md,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: Theme.neutral.white,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
});

export default QuickActions;
