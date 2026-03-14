/**
 * GoodsDetailError - Error state component for GoodsDetailScreen
 */

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoodsDetailSkeleton } from './GoodsDetailSkeleton';
import { styles } from '../GoodsDetailScreen.styles';

export const GoodsDetailError: React.FC = () => (
  <SafeAreaView style={[styles.container, styles.centered]}>
    <GoodsDetailSkeleton />
  </SafeAreaView>
);
