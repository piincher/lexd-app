/**
 * LoadingState Component
 * Displays loading indicator for ticket detail screen
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';

export const LoadingState: React.FC = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text style={styles.text}>Chargement...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  text: {
    marginTop: 16,
    fontFamily: Fonts.meduim,
    color: COLORS.DimGray,
  },
});
