/**
 * VoidedGoodsBreakdown Component
 * Displays list of voided goods with strikethrough styling
 */

import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { OrderGoodsItem } from '../../types';
import { createStyles } from '../OrderTotalsBreakdownScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface VoidedGoodsBreakdownProps {
  goods: OrderGoodsItem[];
}

export const VoidedGoodsBreakdown: React.FC<VoidedGoodsBreakdownProps> = ({ goods }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Theme.spacing.md }}>
        <Ionicons name="close-circle" size={20} color={colors.status.error} />
        <Text style={[styles.cardTitle, { marginLeft: Theme.spacing.sm, color: colors.status.error }]}>
          Marchandises Annulées ({goods.length})
        </Text>
      </View>

      {goods.map((item, index) => (
        <View
          key={item.id}
          style={[
            styles.goodsItem,
            index === goods.length - 1 && styles.goodsItemLast,
          ]}
        >
          <Text style={[styles.goodsDescription, styles.voidedCost]} numberOfLines={1}>
            {item.description}
          </Text>
          <View style={styles.goodsMeta}>
            <Text style={[styles.goodsCBM, styles.voidedCost]}>
              {item.cbm.toFixed(3)} m³
            </Text>
            <Text style={[styles.goodsCost, styles.voidedCost]}>
              {item.cost.toLocaleString()} FCFA
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};
