/**
 * CostSummary - Component displaying cost calculation summary
 * Supports both AIR (weight-based) and SEA (CBM-based) shipping modes
 */

import React from 'react';
import { Card, Text, Divider } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './CostSummary.styles';
import { CostRow } from './CostRow';
import { CostTotalRow } from './CostTotalRow';

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
  const { colors } = useAppTheme();
  const isAirShipping = shippingMode === 'AIR';
  
  const hasRequiredValues = isAirShipping 
    ? (weight > 0 && unitPrice > 0)
    : (cbm > 0 && unitPrice > 0);
    
  if (!hasRequiredValues) {
    return null;
  }

  const styles = createStyles(colors);

  return (
    <Card style={styles.card} elevation={2}>
      <Card.Content style={styles.cardContent}>
        <Text style={styles.sectionLabel}>Récapitulatif des coûts</Text>
        
        {isAirShipping ? (
          <CostRow label="Poids" value={`${weight.toFixed(2)} kg`} />
        ) : (
          <CostRow label="Volume (CBM)" value={`${cbm.toFixed(4)} m³`} />
        )}
        
        <CostRow 
          label="Prix unitaire" 
          value={`${formatCurrency(unitPrice)} FCFA/${isAirShipping ? 'kg' : 'm³'}`} 
        />
        
        <Divider style={styles.divider} />
        
        <CostTotalRow totalCost={totalCost} formatCurrency={formatCurrency} />
      </Card.Content>
    </Card>
  );
};

export default CostSummary;
