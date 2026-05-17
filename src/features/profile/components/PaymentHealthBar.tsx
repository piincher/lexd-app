import React from 'react';
import { View, Text } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './FinancialSummaryCards.styles';

interface PaymentHealthBarProps {
  paymentHealth: number;
}

export const PaymentHealthBar: React.FC<PaymentHealthBarProps> = ({ paymentHealth }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const healthColor = paymentHealth >= 80 ? colors.status.success : paymentHealth >= 50 ? colors.status.warning : colors.status.error;

  return (
    <View style={styles.healthContainer}>
      <View style={styles.healthHeader}>
        <Text style={[styles.healthLabel, { color: colors.text.secondary }]}>Sante des paiements</Text>
        <Text style={[styles.healthValue, { color: healthColor }]}>
          {paymentHealth}%
        </Text>
      </View>
      <View style={[styles.track, { backgroundColor: colors.background.overlay }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${paymentHealth}%`,
              backgroundColor: healthColor,
            },
          ]}
        />
      </View>
    </View>
  );
};
