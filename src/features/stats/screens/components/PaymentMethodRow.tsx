import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { createPaymentOverviewStyles } from './PaymentOverview.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface PaymentMethodRowProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  iconColor: string;
  label: string;
  amount: number | undefined | null;
  percentage: number | undefined | null;
}

const formatAmount = (amount: number | undefined | null): string => {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('fr-FR').format(Math.round(num));
};

export const PaymentMethodRow: React.FC<PaymentMethodRowProps> = ({
  icon,
  iconColor,
  label,
  amount,
  percentage,
}) => {
  const { colors } = useAppTheme();
  const styles = createPaymentOverviewStyles(colors);

  return (
    <View style={styles.methodRow}>
      <View style={[styles.methodIcon, { backgroundColor: `${iconColor}15` }]}>
        <Ionicons name={icon} size={14} color={iconColor} />
      </View>
      <Text style={styles.methodLabel}>{label}</Text>
      <Text style={styles.methodAmount}>{formatAmount(amount)} F</Text>
      <Text style={styles.methodPercent}>{(Number(percentage) || 0).toFixed(0)}%</Text>
    </View>
  );
};
