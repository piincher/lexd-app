/**
 * StatusBar Component
 * Auto-adjusts status bar color based on current theme
 */

import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { StatusBar as RNStatusBar, Platform, View, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';

export interface StatusBarProps {
  /** Override the automatic style detection */
  style?: 'auto' | 'inverted' | 'light' | 'dark';
  /** Used for the optional spacer only; Android system bars stay edge-to-edge. */
  backgroundColor?: string;
  /** Whether to add a spacer for the status bar height */
  withSpacer?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  style,
  backgroundColor,
  withSpacer = false,
}) => {
  const { statusBarTheme, isDark } = useAppTheme();

  // Determine status bar style
  const statusBarStyle = style || (isDark ? 'light' : 'dark');
  
  // Determine background color
  const bgColor = backgroundColor || statusBarTheme.backgroundColor;

  return (
    <>
      <ExpoStatusBar
        style={statusBarStyle}
      />
      {withSpacer && <View style={[styles.spacer, { backgroundColor: bgColor }]} />}
    </>
  );
};

/**
 * Fixed Status Bar for use with React Navigation
 * Adds a view with the appropriate background color at the top
 */
export const FixedStatusBar: React.FC<{ backgroundColor?: string }> = ({
  backgroundColor,
}) => {
  const { statusBarTheme } = useAppTheme();
  const bgColor = backgroundColor || statusBarTheme.backgroundColor;

  return (
    <View
      style={[
        styles.fixedStatusBar,
        { backgroundColor: bgColor },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  spacer: {
    height: Platform.OS === 'ios' ? 44 : RNStatusBar.currentHeight || 24,
  },
  fixedStatusBar: {
    height: Platform.OS === 'ios' ? 44 : RNStatusBar.currentHeight || 24,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
});

export default StatusBar;
