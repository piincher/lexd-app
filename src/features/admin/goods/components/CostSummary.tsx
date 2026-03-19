/**
 * CostSummary - Component displaying cost calculation summary
 * Supports both AIR (weight-based) and SEA (CBM-based) shipping modes
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';
import { COLORS } from '@src/constants/Colors';

interface CostSummaryProps {
  cbm: number;
  weight?: number;
  unitPrice: number;
  totalCost: number;
  shippingMode?: 'AIR' | 'SEA';
}

const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('fr-FR');
};

export const CostSummary: React.FC<CostSummaryProps> = ({
  cbm,
  weight = 0,
  unitPrice,
  totalCost,
  shippingMode = 'SEA',
}) => {
  const isAirShipping = shippingMode === 'AIR';
  
  // For AIR: need weight and unitPrice
  // For SEA: need cbm and unitPrice
  const hasRequiredValues = isAirShipping 
    ? (weight > 0 && unitPrice > 0)
    : (cbm > 0 && unitPrice > 0);
    
  if (!hasRequiredValues) {
    return null;
  }

  return (
    <Card style={styles.card} elevation={2}>
      <Card.Content style={styles.cardContent}>
        <Text style={styles.sectionLabel}>Récapitulatif des coûts</Text>
        
        {isAirShipping ? (
          // AIR shipping - show weight
          <View style={styles.row}>
            <Text style={styles.label}>Poids</Text>
            <Text style={styles.value}>{weight.toFixed(2)} kg</Text>
          </View>
        ) : (
          // SEA shipping - show CBM
          <View style={styles.row}>
            <Text style={styles.label}>Volume (CBM)</Text>
            <Text style={styles.value}>{cbm.toFixed(4)} m³</Text>
          </View>
        )}
        
        <View style={styles.row}>
          <Text style={styles.label}>Prix unitaire</Text>
          <Text style={styles.value}>
            {formatCurrency(unitPrice)} FCFA/{isAirShipping ? 'kg' : 'm³'}
          </Text>
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Coût total</Text>
          <View style={styles.totalValueContainer}>
            <Text style={styles.totalValue}>
              {formatCurrency(totalCost)}
            </Text>
            <Text style={styles.totalCurrency}>FCFA</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#fff8f8',
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  cardContent: {
    padding: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 16,
    color: '#333',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#ffcdd2',
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  totalValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.Crimson || '#dc3545',
  },
  totalCurrency: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.Crimson || '#dc3545',
    marginLeft: 4,
  },
});

export default CostSummary;
