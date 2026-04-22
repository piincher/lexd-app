import React, { useMemo } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import {  createStyles  } from '../GoodsDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const ErrorState: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
  <SafeAreaView style={[styles.container, styles.centered]}>
    <MaterialCommunityIcons name="package-variant-remove" size={64} color={Theme.neutral[400]} />
    <Text style={styles.emptyText}>Marchandise non trouvée</Text>
  </SafeAreaView>
);
};
