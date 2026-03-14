/**
 * GoodsDetailLoading - Loading state for goods detail
 */

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { styles } from './GoodsDetailScreen.styles';

export const GoodsDetailLoading: React.FC = () => (
  <SafeAreaView style={[styles.container, styles.centered]}>
    <ActivityIndicator size="large" color={Theme.primary[600]} />
  </SafeAreaView>
);
