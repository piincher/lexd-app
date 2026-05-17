import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface GoodsListStatCardProps {
  value: number;
  label: string;
  icon: string;
  gradient: readonly [string, string, ...string[]];
  textPrimaryColor: string;
  textSecondaryColor: string;
  iconColor: string;
  cardBgColor: string;
}

export const GoodsListStatCard: React.FC<GoodsListStatCardProps> = ({
  value,
  label,
  icon,
  gradient,
  textPrimaryColor,
  textSecondaryColor,
  iconColor,
  cardBgColor,
}) => (
  <View style={[styles.statCard, { backgroundColor: cardBgColor }]}>
    <LinearGradient colors={gradient} style={styles.iconContainer}>
      <Ionicons name={icon as any} size={20} color={iconColor} />
    </LinearGradient>
    <View>
      <Text style={[styles.statValue, { color: textPrimaryColor }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: textSecondaryColor }]}>{label}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
});
