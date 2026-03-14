/**
 * PackingListSummary Component
 * Summary stats (total CBM, weight, value)
 * SRP: Display packing list summary statistics
 */

import React from 'react';
import { View } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { styles } from './PackingListSummary.styles';

interface PackingListSummaryProps {
  totalItems: number;
  totalCBM: number;
  totalWeight: number;
  totalPackages?: number;
}

export const PackingListSummary: React.FC<PackingListSummaryProps> = ({
  totalItems,
  totalCBM,
  totalWeight,
  totalPackages,
}) => {
  return (
    <Card style={styles.summaryCard}>
      <Card.Content>
        <View style={styles.summaryHeader}>
          <MaterialCommunityIcons name="calculator" size={24} color={COLORS.primary} />
          <Text style={styles.summaryTitle}>Résumé</Text>
        </View>
        <Divider style={styles.summaryDivider} />
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Marchandises</Text>
          <Text style={styles.summaryValue}>{totalItems}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Volume Total</Text>
          <Text style={styles.summaryValue}>{totalCBM.toFixed(2)} m³</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Poids Total</Text>
          <Text style={styles.summaryValue}>{totalWeight.toFixed(0)} kg</Text>
        </View>
        {totalPackages > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Nombre de Colis</Text>
            <Text style={styles.summaryValue}>{totalPackages}</Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

export default PackingListSummary;
