/**
 * LoadingState Component
 * Displays loading indicator for ticket detail screen
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { ShimmerBlock } from '@src/shared/ui';

export const LoadingState: React.FC = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', maxWidth: 320, gap: 12 }}>
        <ShimmerBlock width={'100%'} height={80} borderRadius={12} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
          <ShimmerBlock width={'48%'} height={14} borderRadius={3} />
          <ShimmerBlock width={'48%'} height={14} borderRadius={3} />
        </View>
        <ShimmerBlock width={'70%'} height={12} borderRadius={3} />
        <ShimmerBlock width={'90%'} height={12} borderRadius={3} />
        <ShimmerBlock width={'50%'} height={12} borderRadius={3} />
      </View>
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
