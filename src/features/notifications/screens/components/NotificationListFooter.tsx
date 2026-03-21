/**
 * NotificationListFooter
 * SRP: Loading indicator for infinite scroll pagination
 */

import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const NotificationListFooter: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator size="small" color={Theme.primary[500]} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
