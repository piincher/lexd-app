/**
 * ComparisonStatusIcon
 * Check / partial / cross status badge for comparison table
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import type { ComparisonStatus } from '../../constants/homeData';

export const ComparisonStatusIcon: React.FC<{ status: ComparisonStatus }> = ({ status }) => {
  if (status === 'yes')
    return (
      <View style={[styles.badge, { backgroundColor: 'rgba(34,197,94,0.12)' }]}>
        <FontAwesome6 name="check" size={11} color="#22C55E" />
      </View>
    );
  if (status === 'partial')
    return (
      <View style={[styles.badge, { backgroundColor: 'rgba(245,158,11,0.12)' }]}>
        <FontAwesome6 name="minus" size={11} color="#F59E0B" />
      </View>
    );
  return (
    <View style={[styles.badge, { backgroundColor: 'rgba(239,68,68,0.1)' }]}>
      <FontAwesome6 name="xmark" size={11} color="#EF4444" />
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
