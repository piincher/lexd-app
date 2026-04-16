/**
 * OutstandingCard
 * SRP: Displays outstanding/overdue payment summary from v2 dashboard
 */

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Fonts } from '@src/constants/Fonts';
import { OutstandingData } from '../../types';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface OutstandingCardProps {
  outstanding?: OutstandingData;
}

const formatAmount = (amount: number | undefined | null): string => {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('fr-FR').format(Math.round(num));
};

export const OutstandingCard: React.FC<OutstandingCardProps> = ({ outstanding }) => {
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginHorizontal: 20,
          backgroundColor: colors.feedback.errorBg,
          borderRadius: 16,
          padding: 16,
          borderWidth: 1,
          borderColor: colors.status.error + '40',
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
          backgroundColor: colors.background.card,
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
          color: colors.status.error,
        },
        subtitle: {
          fontSize: 11,
          fontFamily: Fonts.regular,
          color: colors.status.error,
          marginTop: 1,
          opacity: 0.8,
        },
        totalAmount: {
          fontSize: 15,
          fontFamily: Fonts.bold,
          fontWeight: '700',
          color: colors.status.error,
        },
        overdueRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          marginTop: 10,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: colors.status.error + '30',
        },
        overdueText: {
          fontSize: 11,
          fontFamily: Fonts.medium,
          color: colors.status.warning,
        },
      }),
    [colors]
  );

  if (!outstanding || (outstanding.count === 0 && outstanding.overdueCount === 0)) {
    return null;
  }

  const hasOverdue = outstanding.overdueCount > 0;

  return (
    <Animated.View entering={FadeInUp.delay(300).springify().damping(15)} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="alert-circle" size={18} color={colors.status.error} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>Creances</Text>
          <Text style={styles.subtitle}>{outstanding.count} paiement(s) en attente</Text>
        </View>
        <Text style={styles.totalAmount}>{formatAmount(outstanding.totalFCFA)} F</Text>
      </View>

      {hasOverdue && (
        <View style={styles.overdueRow}>
          <Ionicons name="time-outline" size={14} color={colors.status.warning} />
          <Text style={styles.overdueText}>
            {outstanding.overdueCount} en retard · {formatAmount(outstanding.overdueAmountFCFA)} FCFA
          </Text>
        </View>
      )}
    </Animated.View>
  );
};
