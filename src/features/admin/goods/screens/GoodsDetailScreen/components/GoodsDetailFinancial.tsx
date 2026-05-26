/* Hallmark · macrostructure: Narrative Workflow · component: cost-composition panel
 * genre: modern-minimal · theme: brand-aligned app theme
 * Owns how the total is BUILT (unit price × quantity → total). Payment progress (paid /
 * balance / status) lives in GoodsDetailSummary — no shared numbers between the two.
 * pre-emit critique: P5 H4 E5 S5 R5 V5
 */
import React from 'react';
import { View } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from '../GoodsDetailScreen.styles';
import { formatCurrency } from '@src/shared/lib/currency';
import { Goods } from '../../../types';

interface GoodsDetailFinancialProps {
  goods: Goods;
}

export const GoodsDetailFinancial: React.FC<GoodsDetailFinancialProps> = ({ goods }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  const unitPrice = goods.unitPrice || 0;
  const quantity = goods.quantity ?? 1;
  const totalCost = goods.totalCost || 0;

  return (
    <Card style={styles.sectionCard}>
      <Card.Content>
        <View style={styles.sectionHeader}>
          <Ionicons name="receipt-outline" size={20} color={colors.primary.main} />
          <Text style={styles.sectionTitle}>Détail des coûts</Text>
        </View>

        <View style={styles.financialRow}>
          <Text style={styles.financialLabel}>Prix unitaire</Text>
          <Text style={styles.financialValue}>{formatCurrency(unitPrice)}</Text>
        </View>

        <View style={styles.financialRow}>
          <Text style={styles.financialLabel}>Quantité</Text>
          <Text style={styles.financialValue}>{`× ${quantity}`}</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.financialRowHighlight}>
          <Text style={styles.financialLabelHighlight}>Coût total</Text>
          <Text style={styles.financialValueTotal}>{formatCurrency(totalCost)}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};
