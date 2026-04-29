import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

interface CardHeaderProps {
  countryFlag: string;
  countryName: string;
  offerName: string;
  statusLabel: string;
  statusColor: string;
  statusBg: string;
  statusIcon: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  countryFlag,
  countryName,
  offerName,
  statusLabel,
  statusColor,
  statusBg,
  statusIcon,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.countryRow}>
        <Text style={styles.flag}>{countryFlag}</Text>
        <View>
          <Text style={styles.countryName}>{countryName}</Text>
          <Text style={styles.offerName}>{offerName}</Text>
        </View>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
        <Ionicons name={statusIcon as any} size={12} color={statusColor} />
        <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  flag: {
    fontSize: 28,
  },
  countryName: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    color: Theme.neutral[800],
  },
  offerName: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
    marginTop: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 11,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
  },
});
