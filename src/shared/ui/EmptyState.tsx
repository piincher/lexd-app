/**
 * EmptyState - Component for displaying empty/loading states
 * 
 * Used when there's no data to display or during loading states.
 * Shows an icon, title, optional message, and optional action button.
 */

import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from './Button';
import { lightTheme } from '@src/constants/Theme';

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
  iconColor = lightTheme.colors.text.secondary,
  title,
  message,
  actionLabel,
  onAction,
  loading = false,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={lightTheme.colors.primary.main}
          testID="empty-state-loading"
        />
      ) : (
        <MaterialCommunityIcons
          name={icon as any}
          size={iconSize}
          color={iconColor}
          testID="empty-state-icon"
        />
      )}

      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            { color: lightTheme.colors.text.primary },
          ]}
        >
          {title}
        </Text>

        {message && (
          <Text
            style={[
              styles.message,
              { color: lightTheme.colors.text.secondary },
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
    paddingHorizontal: lightTheme.spacing['2xl'],
    paddingVertical: lightTheme.spacing['3xl'],
  },
  textContainer: {
    alignItems: 'center',
    marginTop: lightTheme.spacing.lg,
    marginBottom: lightTheme.spacing.xl,
  },
  title: {
    fontSize: lightTheme.typography.h4.fontSize,
    fontWeight: lightTheme.typography.h4.fontWeight as '700',
    letterSpacing: lightTheme.typography.h4.letterSpacing,
    lineHeight: lightTheme.typography.h4.lineHeight,
    textAlign: 'center',
  },
  message: {
    fontSize: lightTheme.typography.bodySmall.fontSize,
    fontWeight: lightTheme.typography.bodySmall.fontWeight as '400',
    letterSpacing: lightTheme.typography.bodySmall.letterSpacing,
    lineHeight: lightTheme.typography.bodySmall.lineHeight,
    textAlign: 'center',
    marginTop: lightTheme.spacing.sm,
  },
});

export default EmptyState;
