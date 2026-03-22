/**
 * OutstandingCard
 * SRP: Displays outstanding/overdue payment summary from v2 dashboard
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { OutstandingData } from '../../types';

interface OutstandingCardProps {
  outstanding?: OutstandingData;
}

const formatAmount = (amount: number | undefined | null): string => {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('fr-FR').format(Math.round(num));
};

export const OutstandingCard: React.FC<OutstandingCardProps> = ({ outstanding }) => {
  if (!outstanding || (outstanding.count === 0 && outstanding.overdueCount === 0)) {
    return null;
  }

  const hasOverdue = outstanding.overdueCount > 0;

  return (
    <Animated.View entering={FadeInUp.delay(300).springify().damping(15)} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="alert-circle" size={18} color="#EF4444" />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>Creances</Text>
          <Text style={styles.subtitle}>{outstanding.count} paiement(s) en attente</Text>
        </View>
        <Text style={styles.totalAmount}>{formatAmount(outstanding.totalFCFA)} F</Text>
      </View>

      {hasOverdue && (
        <View style={styles.overdueRow}>
          <Ionicons name="time-outline" size={14} color="#F59E0B" />
          <Text style={styles.overdueText}>
            {outstanding.overdueCount} en retard · {formatAmount(outstanding.overdueAmountFCFA)} FCFA
          </Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconContainer: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: '#991B1B',
  },
  subtitle: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: '#B91C1C',
    marginTop: 1,
  },
  totalAmount: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: '#991B1B',
  },
  overdueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#FECACA',
  },
  overdueText: {
    fontSize: 11,
    fontFamily: Fonts.medium,
    color: '#92400E',
  },
});
