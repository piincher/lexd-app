import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { DualLedger } from '../../types/containerProfit';

interface ContainerProfitCardStatusProps {
  dualLedger: DualLedger;
}

export const ContainerProfitCardStatus: React.FC<ContainerProfitCardStatusProps> = ({ dualLedger }) => {
  const { colors } = useAppTheme();
  const isReconciled = dualLedger.reconciliationStatus === 'RECONCILED';

  return (
    <View style={[styles.statusPill, { backgroundColor: isReconciled ? colors.feedback.successBg : colors.feedback.warningBg }]}>
      <Ionicons
        name={isReconciled ? 'checkmark-circle' : 'time'}
        size={14}
        color={isReconciled ? colors.status.success : colors.status.warning}
      />
      <Text style={[styles.statusText, { color: isReconciled ? colors.status.success : colors.status.warning }]}>
        {isReconciled ? 'Réconcilié' : 'En attente de réconciliation'}
      </Text>
      {dualLedger.reconciledAt && (
        <Text style={[styles.statusDate, { color: colors.text.secondary }]}>
          {' '}(le {new Date(dualLedger.reconciledAt).toLocaleDateString('fr-FR')})
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statusDate: {
    fontSize: 11,
    fontWeight: '500',
  },
});
