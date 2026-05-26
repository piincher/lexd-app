import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

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
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

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

const createStyles = (colors: any, _isDark?: boolean) => StyleSheet.create({
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
    backgroundColor: colors.divider,
  },
  statValue: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: colors.text.primary,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: colors.text.secondary,
    marginTop: 2,
  },
});
