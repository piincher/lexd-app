/**
 * StatsHeader
 * SRP: Admin greeting with current date and quick summary
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';

interface StatsHeaderProps {
  firstName?: string;
  totalOrders: number;
}

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bonjour';
  if (hour < 18) return 'Bon apres-midi';
  return 'Bonsoir';
};

const formatDate = (): string => {
  return new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const StatsHeader: React.FC<StatsHeaderProps> = ({ firstName, totalOrders }) => {
  return (
    <LinearGradient
      colors={Theme.gradients.primary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.topRow}>
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>
            {getGreeting()}, {firstName || 'Admin'}
          </Text>
          <Text style={styles.subtitle}>Tableau de bord</Text>
        </View>
        <View style={styles.summaryPill}>
          <Ionicons name="cube" size={14} color={Theme.primary[600]} />
          <Text style={styles.summaryText}>{totalOrders} commandes</Text>
        </View>
      </View>
      <View style={styles.dateRow}>
        <Ionicons name="calendar-outline" size={13} color="rgba(255,255,255,0.6)" />
        <Text style={styles.dateText}>{formatDate()}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textContainer: {
    gap: 2,
    flex: 1,
  },
  greeting: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: 'rgba(255,255,255,0.8)',
  },
  summaryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  summaryText: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.primary[700],
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  dateText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'capitalize',
  },
});
