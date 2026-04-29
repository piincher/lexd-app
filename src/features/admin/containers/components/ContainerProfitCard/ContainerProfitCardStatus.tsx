import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { DualLedger } from '../../types/containerProfit';

interface ContainerProfitCardStatusProps {
  dualLedger: DualLedger;
}

export const ContainerProfitCardStatus: React.FC<ContainerProfitCardStatusProps> = ({ dualLedger }) => {
  const isReconciled = dualLedger.reconciliationStatus === 'RECONCILED';

  return (
    <View style={[styles.statusPill, { backgroundColor: isReconciled ? '#ECFDF5' : '#FEF3C7' }]}>
      <Ionicons
        name={isReconciled ? 'checkmark-circle' : 'time'}
        size={14}
        color={isReconciled ? '#10B981' : '#F59E0B'}
      />
      <Text style={[styles.statusText, { color: isReconciled ? '#10B981' : '#F59E0B' }]}>
        {isReconciled ? 'Réconcilié' : 'En attente de réconciliation'}
      </Text>
      {dualLedger.reconciledAt && (
        <Text style={styles.statusDate}>
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
    color: Theme.colors.text.secondary,
    fontWeight: '500',
  },
});
