import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { ContainerProfitSummary } from '../../api/statsApi';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ProfitOverviewHeader } from './ProfitOverviewHeader';
import { ProfitOverviewSkeleton } from './ProfitOverviewSkeleton';
import { ProfitOverviewProfitBox } from './ProfitOverviewProfitBox';
import { ProfitOverviewMetrics } from './ProfitOverviewMetrics';
import { ProfitOverviewBreakdown } from './ProfitOverviewBreakdown';

interface ProfitOverviewCardProps {
  profitSummary: ContainerProfitSummary | null;
  isLoading: boolean;
}

export const ProfitOverviewCard: React.FC<ProfitOverviewCardProps> = ({
  profitSummary,
  isLoading,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const s = profitSummary?.summary;
  const containers = profitSummary?.containers ?? [];

  const isProfit = (s?.totalProfit ?? 0) >= 0;
  const profitColor = isProfit ? colors.status.success : colors.status.error;

  return (
    <View style={[styles.card, { backgroundColor: colors.background.card }]}>
      <ProfitOverviewHeader
        overallMargin={s?.overallMargin}
        isLoading={isLoading}
        isProfit={isProfit}
        profitColor={profitColor}
      />

      {isLoading ? (
        <ProfitOverviewSkeleton />
      ) : !s ? (
        <Text style={[styles.emptyText, { color: colors.text.disabled }]}>
          Aucune donnée disponible
        </Text>
      ) : (
        <>
          <ProfitOverviewProfitBox
            summary={s}
            isProfit={isProfit}
            profitColor={profitColor}
          />
          <ProfitOverviewMetrics summary={s} />
          <ProfitOverviewBreakdown containers={containers} />
        </>
      )}
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    paddingVertical: 16,
  },
});
