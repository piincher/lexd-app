import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './SMSBalanceCard.styles';

interface SMSBalanceValueProps {
  totalUnits: number;
  progressWidth: number;
  progressColor: string;
}

export const SMSBalanceValue: React.FC<SMSBalanceValueProps> = ({
  totalUnits,
  progressWidth,
  progressColor,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <>
      <View style={styles.valueRow}>
        <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>
          {totalUnits.toLocaleString()}
        </Text>
        <Text style={styles.valueLabel}>SMS restants</Text>
      </View>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${progressWidth}%`, backgroundColor: progressColor },
          ]}
        />
      </View>
    </>
  );
};
