import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { ContainerProfitSummary } from '../../../api/statsApi';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { fmtProfitAmount } from '../ProfitOverviewCard.utils';

interface Props {
  containers: ContainerProfitSummary['containers'];
}

export const ProfitOverviewBreakdown: React.FC<Props> = ({ containers }) => {
  const { colors } = useAppTheme();

  const sortedContainers = React.useMemo(
    () => containers.sort((a, b) => b.profit - a.profit).slice(0, 5),
    [containers]
  );

  if (sortedContainers.length === 0) return null;

  return (
    <View style={[styles.breakdown, { borderTopColor: colors.border }]}>
      <Text style={[styles.breakdownTitle, { color: colors.text.disabled }]}>
        Par conteneur
      </Text>
      {sortedContainers.map((c) => (
        <View key={c.containerId} style={styles.containerRow}>
          <View style={styles.containerLeft}>
            <Text style={[styles.containerNumber, { color: colors.text.primary }]} numberOfLines={1}>
              {c.containerNumber}
            </Text>
            <Text style={[styles.containerMeta, { color: colors.text.disabled }]}>
              {c.totalCBM.toFixed(2)} CBM · {c.goodsCount} colis
            </Text>
          </View>
          <View style={styles.containerRight}>
            <Text
              style={[
                styles.containerProfit,
                { color: c.profit >= 0 ? colors.status.success : colors.status.error },
              ]}
            >
              {c.profit >= 0 ? '+' : ''}{fmtProfitAmount(c.profit)}
            </Text>
            <Text style={[styles.containerMargin, { color: colors.text.disabled }]}>
              {c.profitMargin.toFixed(1)}%
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  breakdown: {
    borderTopWidth: 1,
    paddingTop: 14,
    gap: 10,
  },
  breakdownTitle: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerLeft: {
    flex: 1,
  },
  containerNumber: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    fontWeight: '600',
  },
  containerMeta: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    marginTop: 1,
  },
  containerRight: {
    alignItems: 'flex-end',
  },
  containerProfit: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
  containerMargin: {
    fontSize: 11,
    fontFamily: Fonts.regular,
  },
});
