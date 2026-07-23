/**
 * OutstandingCard
 * SRP: Displays outstanding/overdue payment summary from v2 dashboard
 * Hallmark: full-width alert banner with left accent border
 */

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Fonts } from '@src/constants/Fonts';
import { RADIUS } from '@src/shared/ui/designLanguage';
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
          marginTop: 16,
          backgroundColor: colors.feedback.errorBg,
          borderRadius: RADIUS.card,
          borderLeftWidth: 4,
          borderLeftColor: colors.status.error,
          padding: 14,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        },
        iconContainer: {
          width: 36,
          height: 36,
          borderRadius: RADIUS.control,
          backgroundColor: colors.background.card,
          justifyContent: 'center',
          alignItems: 'center',
        },
        textContainer: {
          flex: 1,
        },
        title: {
          fontSize: 13,
          fontFamily: Fonts.bold,
          fontWeight: '700',
          color: colors.status.error,
        },
        subtitle: {
          fontSize: 11,
          fontFamily: Fonts.regular,
          color: colors.status.error,
          marginTop: 1,
          opacity: 0.85,
        },
        amount: {
          fontSize: 15,
          fontFamily: Fonts.bold,
          fontWeight: '700',
          color: colors.status.error,
        },
        overdueRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          marginTop: 6,
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
    <Animated.View entering={FadeInUp.delay(240).springify().damping(15)} style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="alert-circle" size={18} color={colors.status.error} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Créances · {outstanding.count} paiement(s) en attente</Text>
        {hasOverdue && (
          <View style={styles.overdueRow}>
            <Ionicons name="time-outline" size={12} color={colors.status.warning} />
            <Text style={styles.overdueText}>
              {outstanding.overdueCount} en retard · {formatAmount(outstanding.overdueAmountFCFA)} FCFA
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.amount}>{formatAmount(outstanding.totalFCFA)} F</Text>
    </Animated.View>
  );
};
