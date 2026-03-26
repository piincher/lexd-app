/**
 * OrderInfoCard - Displays order information and goods/items list
 * SRP: Show order code and associated goods
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';

interface GoodsItem {
  goodsId: string;
  description: string;
}

interface OrderInfoCardProps {
  orderCode: string;
  goodsIds?: GoodsItem[];
}

export const OrderInfoCard: React.FC<OrderInfoCardProps> = ({
  orderCode,
  goodsIds,
}) => {
  return (
    <Surface style={styles.card}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name="package-variant" size={24} color={COLORS.blue} />
        <Text style={styles.cardTitle}>Order Information</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Order Code</Text>
        <Text style={[styles.infoValue, styles.orderCode]}>{orderCode || 'N/A'}</Text>
      </View>

      {goodsIds && goodsIds.length > 0 && (
        <>
          <Divider style={styles.divider} />
          <Text style={styles.goodsTitle}>Goods/Items ({goodsIds.length})</Text>
          {goodsIds.map((item, index) => (
            <View key={item.goodsId || index} style={styles.goodsItem}>
              <MaterialCommunityIcons name="cube-outline" size={16} color={COLORS.grey} />
              <Text style={styles.goodsText} numberOfLines={2}>
                {item.description || `Item ${index + 1}`}
              </Text>
            </View>
          ))}
        </>
      )}
    </Surface>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    backgroundColor: '#FFF',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    marginLeft: 8,
    color: '#1A1A2E',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.grey,
    fontFamily: Fonts.regular,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    color: '#1A1A2E',
    flex: 1,
    textAlign: 'right',
    marginLeft: 16,
  },
  orderCode: {
    color: COLORS.blue,
  },
  divider: {
    marginVertical: 12,
  },
  goodsTitle: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    color: '#1A1A2E',
    marginBottom: 12,
  },
  goodsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  goodsText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#1A1A2E',
    marginLeft: 8,
    flex: 1,
  },
});
