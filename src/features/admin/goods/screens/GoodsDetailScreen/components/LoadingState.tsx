import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { styles } from '../GoodsDetailScreen.styles';

export const LoadingState: React.FC = () => (
  <SafeAreaView style={[styles.container, styles.centered]}>
    <ActivityIndicator size="large" color={Theme.primary[600]} />
  </SafeAreaView>
);
