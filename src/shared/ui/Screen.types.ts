import React from 'react';
import type { ViewStyle, StyleProp } from 'react-native';

export type ScreenVariant = 'default' | 'plain' | 'card';

export interface HeaderConfig {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
  showNotificationBell?: boolean;
}

export interface ScreenProps {
  children: React.ReactNode;
  variant?: ScreenVariant;
  scrollable?: boolean;
  safeArea?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  header?: React.ReactNode | HeaderConfig;
  footer?: React.ReactNode;
}
