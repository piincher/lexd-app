import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Text, Surface, Button } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createPaymentStatsStyles } from './PaymentStats.styles';

interface PaymentStatsProps {
  paymentsCount: number;
  totalPaid: number;
  hasMissingReceipts: boolean;
  isBackfilling: boolean;
  onBackfill: () => void;
}

export const PaymentStats: React.FC<PaymentStatsProps> = ({
  paymentsCount,
  totalPaid,
  hasMissingReceipts,
  isBackfilling,
  onBackfill,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createPaymentStatsStyles(colors), [colors]);

  return (
    <>
      <Surface style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Paiements</Text>
            <Text style={styles.summaryValue}>{paymentsCount}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total encaissé</Text>
            <Text style={[styles.summaryValue, { color: '#10B981' }]}>
              {totalPaid.toLocaleString('fr-FR')} FCFA
            </Text>
          </View>
        </View>
      </Surface>

      {hasMissingReceipts && (
        <Button
          mode="contained"
          onPress={onBackfill}
          style={styles.backfillButton}
          buttonColor={colors.primary.main}
          icon={isBackfilling ? undefined : 'sync'}
          loading={isBackfilling}
          disabled={isBackfilling}
        >
          {isBackfilling ? 'Synchronisation...' : 'Générer les reçus manquants'}
        </Button>
      )}
    </>
  );
};
