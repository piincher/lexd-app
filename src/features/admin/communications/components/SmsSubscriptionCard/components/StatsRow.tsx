import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

interface StatsRowProps {
  availableUnits: number;
  daysRemaining: number;
  expirationDateShort: string;
}

export const StatsRow: React.FC<StatsRowProps> = ({
  availableUnits,
  daysRemaining,
  expirationDateShort,
}) => {
  return (
    <View style={styles.statsRow}>
      <View style={styles.stat}>
        <Text style={styles.statValue}>{availableUnits.toLocaleString()}</Text>
        <Text style={styles.statLabel}>SMS restants</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.stat}>
        <Text style={styles.statValue}>{daysRemaining}</Text>
        <Text style={styles.statLabel}>Jours restants</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.stat}>
        <Text style={styles.statValue}>{expirationDateShort}</Text>
        <Text style={styles.statLabel}>Expiration</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: Theme.neutral[100],
  },
  statValue: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Theme.neutral[800],
  },
  statLabel: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
    marginTop: 2,
  },
});
