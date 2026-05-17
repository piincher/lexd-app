import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';

interface ShippingModeDetailProps {
  icon: 'airplane' | 'boat';
  value: number;
  label: string;
  percent: number;
  iconBgColor: string;
  iconColor: string;
  badgeBgColor: string;
  textColor: string;
  valueColor: string;
  labelColor: string;
}

export const ShippingModeDetail: React.FC<ShippingModeDetailProps> = ({
  icon,
  value,
  label,
  percent,
  iconBgColor,
  iconColor,
  badgeBgColor,
  textColor,
  valueColor,
  labelColor,
}) => (
  <View style={styles.modeCard}>
    <View style={[styles.modeIcon, { backgroundColor: iconBgColor }]}>
      <Ionicons name={icon} size={18} color={iconColor} />
    </View>
    <Text style={[styles.modeValue, { color: valueColor }]}>{value}</Text>
    <Text style={[styles.modeLabel, { color: labelColor }]}>{label}</Text>
    <View style={[styles.percentBadge, { backgroundColor: badgeBgColor }]}>
      <Text style={[styles.percentText, { color: textColor }]}>
        {percent.toFixed(0)}%
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  modeCard: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  modeIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeValue: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
  modeLabel: {
    fontSize: 11,
    fontFamily: Fonts.regular,
  },
  percentBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 2,
  },
  percentText: {
    fontSize: 11,
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
});
