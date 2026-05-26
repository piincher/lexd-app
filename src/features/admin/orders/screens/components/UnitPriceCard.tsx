/**
 * UnitPriceCard Component
 * Displays the unit price per CBM for the order
 */

import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { createStyles } from '../OrderTotalsBreakdownScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface UnitPriceCardProps {
  unitPrice: number;
}

export const UnitPriceCard: React.FC<UnitPriceCardProps> = ({ unitPrice }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Theme.spacing.md }}>
        <Ionicons name="pricetag" size={20} color={colors.primary[600]} />
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
