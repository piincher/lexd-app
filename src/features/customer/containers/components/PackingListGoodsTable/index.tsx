/**
 * PackingListGoodsTable Component
 * Table with goods list
 * SRP: Display goods items in a table format
 */

import React from 'react';
import { View } from 'react-native';
import { Card, Divider, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { styles } from './PackingListGoodsTable.styles';

interface GoodsItem {
  goodsId: string;
  description: string;
  actualCBM: number;
  weight: number;
}

interface PackingListGoodsTableProps {
  items: GoodsItem[];
}

export const PackingListGoodsTable: React.FC<PackingListGoodsTableProps> = ({
  items,
}) => {
  const theme = useTheme();

  return (
    <Card style={styles.sectionCard}>
      <Card.Content>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons
            name="package-variant-closed"
            size={24}
            color={theme.colors.primary}
          />
          <Text style={styles.sectionTitle}>
            Vos Marchandises ({items.length})
          </Text>
        </View>
        <Divider style={styles.sectionDivider} />

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { flex: 0.4 }]}>N°</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>ID / Description</Text>
          <Text style={[styles.tableHeaderCell, { flex: 0.6, textAlign: 'right' }]}>CBM</Text>
          <Text style={[styles.tableHeaderCell, { flex: 0.6, textAlign: 'right' }]}>Poids</Text>
        </View>

        {/* Table Rows */}
        {items.map((item, index) => (
          <View
            key={item.goodsId}
            style={[
              styles.tableRow,
              index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
              index === items.length - 1 && styles.tableRowLast,
            ]}
          >
            <Text style={[styles.tableCell, { flex: 0.4, fontWeight: '700' }]}>
              {index + 1}
            </Text>
            <View style={{ flex: 1.5 }}>
              <Text style={styles.goodsId} numberOfLines={1}>
                {item.goodsId}
              </Text>
              <Text style={styles.goodsDescription} numberOfLines={2}>
                {item.description || '-'}
              </Text>
            </View>
            <Text style={[styles.tableCell, { flex: 0.6, textAlign: 'right' }]}>
              {item.actualCBM.toFixed(2)}
            </Text>
            <Text style={[styles.tableCell, { flex: 0.6, textAlign: 'right' }]}>
              {item.weight || 0}kg
            </Text>
          </View>
        ))}
      </Card.Content>
    </Card>
  );
};

export default PackingListGoodsTable;
