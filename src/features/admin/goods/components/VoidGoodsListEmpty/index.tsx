/**
 * VoidGoodsListEmpty - Empty state for void goods list
 * SRP: Renders empty state when no goods are found
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

export const VoidGoodsListEmpty: React.FC = () => (
  <View style={styles.emptyContainer}>
    <MaterialCommunityIcons
      name="package-variant-off"
      size={64}
      color={Theme.neutral[300]}
    />
    <Text style={styles.emptyText}>No goods found</Text>
  </View>
);

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: Theme.neutral[500],
  },
});
