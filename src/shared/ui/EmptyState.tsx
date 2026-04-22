/**
 * EmptyState - Component for displaying empty/loading states
 * 
 * Used when there's no data to display or during loading states.
 * Shows an icon, title, optional message, and optional action button.
 */

import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from './Button';
import { useAppTheme } from '@src/providers/ThemeProvider';

export interface EmptyStateProps {
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  loading?: boolean;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'archive-off',
  iconSize = 64,
  iconColor,
  title,
  message,
  actionLabel,
  onAction,
  loading = false,
  style,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, style]}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary.main}
          testID="empty-state-loading"
        />
      ) : (
        <MaterialCommunityIcons
          name={icon as any}
          size={iconSize}
          color={iconColor || colors.text.secondary}
          testID="empty-state-icon"
        />
      )}

      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            { color: colors.text.primary },
          ]}
        >
          {title}
        </Text>

        {message && (
          <Text
            style={[
              styles.message,
              { color: colors.text.secondary },
            ]}
          >
            {message}
          </Text>
        )}
      </View>

      {actionLabel && onAction && !loading && (
        <Button
          title={actionLabel}
          onPress={onAction}
          variant="primary"
          size="medium"
          testID="empty-state-action"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.1,
    lineHeight: 26,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default EmptyState;
