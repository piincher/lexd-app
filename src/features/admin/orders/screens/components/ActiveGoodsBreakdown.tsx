/**
 * ActiveGoodsBreakdown Component
 * Displays list of active (non-voided) goods with CBM and cost
 */

import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { OrderGoodsItem } from '../../types';
import { createStyles } from '../OrderTotalsBreakdownScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ActiveGoodsBreakdownProps {
  goods: OrderGoodsItem[];
}

export const ActiveGoodsBreakdown: React.FC<ActiveGoodsBreakdownProps> = ({ goods }) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Theme.spacing.md }}>
        <Ionicons name="cube" size={20} color={Theme.primary[600]} />
        <Text style={[styles.cardTitle, { marginLeft: Theme.spacing.sm }]}>
          Marchandises Actives ({goods.length})
        </Text>
      </View>

      {goods.length === 0 ? (
        <Text style={styles.emptyText}>Aucune marchandise active</Text>
      ) : (
        goods.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.goodsItem,
              index === goods.length - 1 && styles.goodsItemLast,
            ]}
          >
            <Text style={styles.goodsDescription} numberOfLines={1}>
              {item.description}
            </Text>
            <View style={styles.goodsMeta}>
              <Text style={styles.goodsCBM}>{item.cbm.toFixed(3)} m³</Text>
              <Text style={styles.goodsCost}>
                {item.cost.toLocaleString()} FCFA
              </Text>
            </View>
          </View>
        ))
      )}
    </View>
  );
};
