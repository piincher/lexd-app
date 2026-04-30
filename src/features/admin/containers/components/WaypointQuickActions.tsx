import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { QuickAction } from '../types/waypointStatus';

interface WaypointQuickActionsProps {
  quickActions: QuickAction[];
  onQuickAction: (action: QuickAction) => void;
  delay?: number;
}

export const WaypointQuickActions: React.FC<WaypointQuickActionsProps> = ({
  quickActions,
  onQuickAction,
  delay = 0,
}) => {
  const { isDark } = useAppTheme();

  if (quickActions.length === 0) return null;

  return (
    <Animated.View entering={FadeIn.delay(delay)} style={styles.section}>
      <Text style={styles.sectionTitle}>Actions Rapides</Text>
      <View style={styles.quickActionsGrid}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={[
              styles.quickActionButton,
              { backgroundColor: action.color + (isDark ? '28' : '12') },
            ]}
            onPress={() => onQuickAction(action)}
          >
            <Ionicons name={action.icon as any} size={20} color={action.color} />
            <Text style={[styles.quickActionText, { color: action.color }]}>
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: Theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radius.lg,
    gap: Theme.spacing.xs,
  },
  quickActionText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
