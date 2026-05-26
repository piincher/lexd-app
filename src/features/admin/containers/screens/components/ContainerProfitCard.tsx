import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CbmProfit } from '../../types/containerProfit';
import {
  ContainerProfitCardHeader,
  ContainerProfitCardStatus,
  ContainerProfitCardProfitBox,
  ContainerProfitCardDualLedger,
  ContainerProfitCardLegacyDetails,
  ContainerProfitCardReconcileButton,
} from '../../components/ContainerProfitCard';
import { useAppTheme } from '@src/providers/ThemeProvider';

export type { DualLedger, CbmProfit } from '../../types/containerProfit';

interface ContainerProfitCardProps {
  cbmProfit: CbmProfit;
  onReconcile?: () => void;
}

export const ContainerProfitCard: React.FC<ContainerProfitCardProps> = ({ cbmProfit, onReconcile }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  const { revenue, collected, cost, profit, profitMargin, totalCBM, cbmCostPerUnit, dualLedger } = cbmProfit;
  const isProfit = profit >= 0;
  const profitColor = isProfit ? colors.status.success : colors.status.error;

  const isReconciled = dualLedger?.reconciliationStatus === 'RECONCILED';

  return (
    <View style={styles.card}>
      <ContainerProfitCardHeader isProfit={isProfit} profitColor={profitColor} profitMargin={profitMargin} />

      {dualLedger && <ContainerProfitCardStatus dualLedger={dualLedger} />}

      <ContainerProfitCardProfitBox
        isProfit={isProfit}
        profitColor={profitColor}
        profit={profit}
        totalCBM={totalCBM}
        dualLedger={dualLedger}
      />

      {dualLedger && <ContainerProfitCardDualLedger dualLedger={dualLedger} totalCBM={totalCBM} />}

      {!dualLedger && (
        <ContainerProfitCardLegacyDetails
          revenue={revenue}
          collected={collected}
          cost={cost}
          totalCBM={totalCBM}
          cbmCostPerUnit={cbmCostPerUnit}
        />
      )}

      {dualLedger && !isReconciled && onReconcile && (
        <ContainerProfitCardReconcileButton onReconcile={onReconcile} />
      )}
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
});

export default ContainerProfitCard;
