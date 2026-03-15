/**
 * UnitPriceCard Component
 * Displays the unit price per CBM for the order
 */

import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { styles } from '../OrderTotalsBreakdownScreen.styles';

interface UnitPriceCardProps {
  unitPrice: number;
}

export const UnitPriceCard: React.FC<UnitPriceCardProps> = ({ unitPrice }) => {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Theme.spacing.md }}>
        <Ionicons name="pricetag" size={20} color={Theme.primary[600]} />
        <Text style={[styles.cardTitle, { marginLeft: Theme.spacing.sm }]}>
          Prix Unitaire
        </Text>
      </View>
      <Text style={styles.unitPriceValue}>
        {unitPrice.toLocaleString()} FCFA
      </Text>
      <Text style={styles.unitPriceLabel}>
        par m³ (CBM)
      </Text>
    </View>
  );
};
