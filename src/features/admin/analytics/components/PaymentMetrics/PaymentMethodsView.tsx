import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ProgressBar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { PaymentMetricsData } from '../../types';
import { PaymentMethodChart } from './PaymentMethodChart';
import { useCompactNumberFormat } from '../../hooks';

interface PaymentMethodsViewProps {
  data: PaymentMetricsData;
}

const METHOD_COLORS: Record<string, string> = {
  ORANGE_MONEY: '#FF6600',
  WAVE: '#1E90FF',
  CARD: '#10B981',
  CASH: '#8B5CF6',
};

const METHOD_ICONS: Record<string, string> = {
  ORANGE_MONEY: 'cellphone',
  WAVE: 'wave',
  CARD: 'credit-card',
  CASH: 'cash',
};

export const PaymentMethodsView: React.FC<PaymentMethodsViewProps> = ({ data }) => {
  const { colors } = useAppTheme();
  const formatCompact = useCompactNumberFormat();
  const styles = createStyles(colors);

  return (
    <View style={styles.methodsContent}>
      <View style={styles.methodsRow}>
        <PaymentMethodChart methods={data.paymentMethods} />

        <View style={styles.methodsList}>
          {data.paymentMethods.map((method) => (
            <View key={method.method} style={styles.methodItem}>
              <View style={[styles.methodIcon, { backgroundColor: METHOD_COLORS[method.method] || colors.text.muted }]}>
                <MaterialCommunityIcons
                  name={(METHOD_ICONS[method.method] || 'cash') as any}
                  size={14}
                  color={colors.text.inverse}
                />
              </View>
              <View style={styles.methodInfo}>
                <Text style={styles.methodName}>{method.method.replace('_', ' ')}</Text>
                <ProgressBar
                  progress={method.percentage / 100}
                  color={METHOD_COLORS[method.method] || colors.text.muted}
                  style={styles.methodProgress}
                />
              </View>
              <View style={styles.methodValues}>
                <Text style={styles.methodPercentage}>{method.percentage.toFixed(0)}%</Text>
                <Text style={styles.methodTotal}>
                  {formatCompact(method.totalFCFA)} FCFA
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  methodsContent: {
    marginTop: 8,
  },
  methodsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  methodsList: {
    flex: 1,
    gap: 12,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  methodIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text.secondary,
    marginBottom: 4,
  },
  methodProgress: {
    height: 6,
    borderRadius: 3,
  },
  methodValues: {
    alignItems: 'flex-end',
  },
  methodPercentage: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text.primary,
  },
  methodTotal: {
    fontSize: 10,
    color: colors.text.secondary,
  },
});
