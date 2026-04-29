/**
 * Loading - Reusable loading components
 */

import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';

export interface LoadingProps {
  message?: string;
  size?: 'small' | 'large';
  fullScreen?: boolean;
  style?: ViewStyle;
}

export const Loading: React.FC<LoadingProps> = ({
  message,
  size = 'large',
  fullScreen = false,
  style,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={[
      styles.container,
      fullScreen && [styles.fullScreen, { backgroundColor: colors.background.default }],
      style,
    ]}>
      <ActivityIndicator
        size={size}
        color={colors.primary.main}
      />
      {message && (
        <Text style={[styles.message, { color: colors.text.primary }]}>{message}</Text>
      )}
    </View>
  );
};

export interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const { colors, isDark } = useAppTheme();

  const dynamicStyle: ViewStyle = {
    width: width as ViewStyle['width'],
    height,
    borderRadius,
  };

  return (
    <View
      style={[
        styles.skeleton,
        dynamicStyle,
        { backgroundColor: isDark ? colors.neutral[700] : colors.neutral[200] },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullScreen: {
    flex: 1,
  },
  message: {
    marginTop: 12,
    fontSize: 14,
  },
  skeleton: {
    overflow: 'hidden',
  },
});

export default Loading;
