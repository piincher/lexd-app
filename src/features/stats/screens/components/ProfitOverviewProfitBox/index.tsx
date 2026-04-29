import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { ContainerProfitSummary } from '../../../api/statsApi';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { fmtProfitAmount } from '../ProfitOverviewCard.utils';

interface Props {
  summary: ContainerProfitSummary['summary'];
  isProfit: boolean;
  profitColor: string;
}

export const ProfitOverviewProfitBox: React.FC<Props> = ({
  summary,
  isProfit,
  profitColor,
}) => {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.profitBox,
        { backgroundColor: isProfit ? colors.feedback.successBg : colors.feedback.errorBg },
      ]}
    >
      <Text style={[styles.profitLabel, { color: colors.text.secondary }]}>
        {isProfit ? 'Bénéfice Total' : 'Perte Totale'}
      </Text>
      <Text style={[styles.profitValue, { color: profitColor }]}>
        {isProfit ? '+' : ''}{fmtProfitAmount(summary.totalProfit)}
      </Text>
      <Text style={[styles.profitSub, { color: colors.text.disabled }]}>
        {summary.containerCount} conteneur{summary.containerCount > 1 ? 's' : ''} · {summary.totalCBM.toFixed(2)} CBM total
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profitBox: {
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 14,
  },
  profitLabel: {
    fontSize: 11,
    fontFamily: Fonts.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  profitValue: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    fontWeight: '800',
  },
  profitSub: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    marginTop: 4,
  },
});
