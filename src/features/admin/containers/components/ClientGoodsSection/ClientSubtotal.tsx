import React from 'react';
import { View, Text } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { ClientGoodsGroup } from '../../types/packingList';
import { styles } from './ClientGoodsSection.styles';

interface ClientSubtotalProps {
  clientGroup: ClientGoodsGroup;
}

export const ClientSubtotal: React.FC<ClientSubtotalProps> = ({ clientGroup }) => {
  const { summary } = clientGroup;
  const balance = summary.balanceDue || 0;
  const isPaid = balance <= 0;

  return (
    <View style={styles.subtotalContainer}>
      <View style={styles.subtotalRow}>
        <Text style={styles.subtotalLabel}>Total Articles:</Text>
        <Text style={styles.subtotalValue}>{summary.totalQuantity}</Text>
      </View>
      <View style={styles.subtotalRow}>
        <Text style={styles.subtotalLabel}>Volume Total:</Text>
        <Text style={styles.subtotalValue}>{summary.totalCBM.toFixed(2)} m³</Text>
      </View>
      <View style={styles.subtotalRow}>
        <Text style={styles.subtotalLabel}>Poids Total:</Text>
        <Text style={styles.subtotalValue}>{summary.totalWeight.toFixed(0)} kg</Text>
      </View>
      <View style={[styles.subtotalRow, { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: Theme.primary[200] }]}>
        <Text style={[styles.subtotalLabel, { fontWeight: '700' }]}>Montant Total:</Text>
        <Text style={[styles.subtotalValue, { color: Theme.primary[600], fontWeight: '700' }]}>
          {(summary.totalCost || 0).toLocaleString()} FCFA
        </Text>
      </View>
      {(summary.totalPaid || 0) > 0 && (
        <View style={styles.subtotalRow}>
          <Text style={styles.subtotalLabel}>Déjà Payé:</Text>
          <Text style={[styles.subtotalValue, { color: '#10B981' }]}>{(summary.totalPaid || 0).toLocaleString()} FCFA</Text>
        </View>
      )}
      {!isPaid && (
        <View style={styles.subtotalRow}>
          <Text style={[styles.subtotalLabel, { color: '#DC2626', fontWeight: '700' }]}>SOLDE À PAYER:</Text>
          <Text style={[styles.subtotalValue, { color: '#DC2626', fontWeight: '800' }]}>{(summary.balanceDue || 0).toLocaleString()} FCFA</Text>
        </View>
      )}
    </View>
  );
};
