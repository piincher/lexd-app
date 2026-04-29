/**
 * RouteListLoading - Loading state component
 */

import React from 'react';
import { View } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { styles } from './RouteListLoading.styles';

export const RouteListLoading: React.FC = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Theme.primary[600]} />
      <Text style={styles.loadingText}>Chargement des routes...</Text>
    </View>
  );
};

export default RouteListLoading;
