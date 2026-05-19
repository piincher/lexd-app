import { useAppTheme } from '@src/providers/ThemeProvider';
/**
 * NotificationListFooter
 * SRP: Loading indicator for infinite scroll pagination
 */

import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const NotificationListFooter: React.FC = () => {
  const { colors } = useAppTheme();
  return (
  <View style={styles.container}>
    <ActivityIndicator size="small" color={colors.primary[500]} />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
