/**
 * ComparisonStatusIcon
 * Check / partial / cross status badge for comparison table
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ComparisonStatus } from '../../constants/homeData';

export const ComparisonStatusIcon: React.FC<{ status: ComparisonStatus }> = ({ status }) => {
  const { colors } = useAppTheme();

  if (status === 'yes')
    return (
      <View style={[styles.badge, { backgroundColor: `${colors.status.success}1E` }]}>
        <FontAwesome6 name="check" size={11} color={colors.status.success} />
      </View>
    );
  if (status === 'partial')
    return (
      <View style={[styles.badge, { backgroundColor: `${colors.status.warning}1E` }]}>
        <FontAwesome6 name="minus" size={11} color={colors.status.warning} />
      </View>
    );
  return (
    <View style={[styles.badge, { backgroundColor: `${colors.status.error}1A` }]}>
      <FontAwesome6 name="xmark" size={11} color={colors.status.error} />
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
