/**
 * AirwayBillStats - Summary statistics cards for the list header
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface AirwayBillStatsProps {
  totalAWBs: number;
  totalPackages: number;
  totalWeight: number;
}

interface StatItemProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
  color: string;
  bgColor: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, label, value, color, bgColor }) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={[styles.statCard, { backgroundColor: colors.background.card }]}>
      <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
        <MaterialCommunityIcons name={icon} size={20} color={color} />
      </View>
      <View style={styles.statTextContainer}>
        <Text style={[styles.statValue, { color: colors.text.primary }]}>{value}</Text>
        <Text style={[styles.statLabel, { color: colors.text.secondary }]}>{label}</Text>
      </View>
    </View>
  );
};

export const AirwayBillStats: React.FC<AirwayBillStatsProps> = ({
  totalAWBs,
  totalPackages,
  totalWeight,
}) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.container}>
      <StatItem
        icon="file-document-multiple-outline"
        label="AWBs"
        value={String(totalAWBs)}
        color={colors.status.success}
        bgColor={colors.feedback.successBg}
      />
      <StatItem
        icon="package-variant"
        label="Colis"
        value={String(totalPackages)}
        color={colors.status.info}
        bgColor={colors.feedback.infoBg}
      />
      <StatItem
        icon="weight-kilogram"
        label="Poids"
        value={`${totalWeight.toFixed(0)} kg`}
        color={colors.accent.gold}
        bgColor={colors.feedback.warningBg}
      />
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    gap: 10,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statTextContainer: {
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 1,
  },
});

export default AirwayBillStats;
