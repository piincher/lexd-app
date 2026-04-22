/**
 * PackingListSummary Component
 * Summary stats (total CBM, weight, value)
 * SRP: Display packing list summary statistics
 */

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

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
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => StyleSheet.create({
    summaryCard: {
      marginBottom: 16,
      elevation: 1,
    },
    summaryHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    summaryTitle: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: colors.text.secondary,
      marginLeft: 12,
    },
    summaryDivider: {
      marginBottom: 16,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    summaryLabel: {
      fontFamily: Fonts.meduim,
      fontSize: 14,
      color: colors.text.secondary,
    },
    summaryValue: {
      fontFamily: Fonts.bold,
      fontSize: 14,
      color: colors.text.secondary,
    },
  }), [colors, isDark]);

  return (
    <Card style={styles.summaryCard}>
      <Card.Content>
        <View style={styles.summaryHeader}>
          <MaterialCommunityIcons name="calculator" size={24} color={colors.primary.main} />
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
