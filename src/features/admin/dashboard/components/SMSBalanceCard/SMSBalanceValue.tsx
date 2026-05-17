import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './SMSBalanceCard.styles';

interface SMSBalanceValueProps {
  totalUnits: number;
  progressWidth: number;
}

export const SMSBalanceValue: React.FC<SMSBalanceValueProps> = ({ totalUnits, progressWidth }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <>
      <View style={styles.valueRow}>
        <Text style={styles.value}>{totalUnits.toLocaleString()}</Text>
        <Text style={styles.valueLabel}>SMS restants</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progressWidth}%` }]} />
      </View>
    </>
  );
};
