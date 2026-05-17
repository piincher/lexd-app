import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './GoodsListContent.styles';

export const GoodsListLoadingState: React.FC = () => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color={colors.primary.main} />
      <Text style={styles.loadingText}>Chargement des marchandises...</Text>
    </View>
  );
};
