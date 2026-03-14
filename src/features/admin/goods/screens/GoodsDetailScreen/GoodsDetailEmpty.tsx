/**
 * GoodsDetailEmpty - Empty state for goods detail
 */

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { styles } from './GoodsDetailScreen.styles';

export const GoodsDetailEmpty: React.FC = () => (
  <SafeAreaView style={[styles.container, styles.centered]}>
    <MaterialCommunityIcons name="package-variant-remove" size={64} color={Theme.neutral[400]} />
    <Text style={styles.emptyText}>Marchandise non trouvée</Text>
  </SafeAreaView>
);
