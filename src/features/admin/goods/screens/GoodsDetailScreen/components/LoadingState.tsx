import React, { useMemo } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import {  createStyles  } from '../GoodsDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const LoadingState: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
  <SafeAreaView style={[styles.container, styles.centered]}>
    <ActivityIndicator size="large" color={colors.primary[600]} />
  </SafeAreaView>
);
};
