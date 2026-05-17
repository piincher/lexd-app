import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { fmt } from '../../lib/formatCurrency';
import { DualLedger } from '../../types/containerProfit';

interface ContainerProfitCardProfitBoxProps {
  isProfit: boolean;
  profitColor: string;
  profit: number;
  totalCBM: number;
  dualLedger?: DualLedger;
}

export const ContainerProfitCardProfitBox: React.FC<ContainerProfitCardProfitBoxProps> = ({
  isProfit,
  profitColor,
  profit,
  totalCBM,
  dualLedger,
}) => {
  const { colors } = useAppTheme();
  return (
  <View style={[styles.profitBox, { backgroundColor: isProfit ? colors.feedback.successBg : colors.feedback.errorBg, borderColor: profitColor + '40' }]}>
    <Text style={[styles.profitLabel, { color: colors.text.secondary }]}>{isProfit ? 'Bénéfice' : 'Perte'}</Text>
    <Text style={[styles.profitValue, { color: profitColor }]}>
      {isProfit ? '+' : ''}{fmt(profit)}
    </Text>
    {dualLedger && (
      <Text style={[styles.profitSub, { color: colors.text.secondary }]}>
        Client: {(dualLedger.clientTotalCBM ?? 0).toFixed(2)} CBM × {fmt(300000)}
        {'  ·  '}
        Agent: {((dualLedger.agentTotalCBM ?? totalCBM) ?? 0).toFixed(2)} CBM × {fmt((dualLedger.agentUnitCost ?? 0) || 278000)}
      </Text>
    )}
  </View>
);
}

const styles = StyleSheet.create({
  profitBox: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    alignItems: 'center',
    marginBottom: 14,
  },
  profitLabel: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  profitValue: {
    fontSize: 26,
    fontWeight: '800',
  },
  profitSub: {
    fontSize: 11,
    marginTop: 6,
    textAlign: 'center',
  },
});
