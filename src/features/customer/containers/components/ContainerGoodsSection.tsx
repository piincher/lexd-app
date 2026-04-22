/**
 * ContainerGoodsSection - Displays customer's goods within a container
 * Extracted from ContainerTrackingScreen to follow SRP
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Chip, List, useTheme } from 'react-native-paper';

import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { CustomerGoodsInContainer } from '../types';

interface ContainerGoodsSectionProps {
  goods: CustomerGoodsInContainer[];
  containerId: string;
  onViewPackingList: (containerId: string) => void;
}

const GoodsItem: React.FC<{ goods: CustomerGoodsInContainer }> = ({ goods }) => {
  const theme = useTheme();

  return (
    <List.Item
      key={goods._id}
      title={goods.goodsId}
      description={goods.description}
      left={(props) => (
        <List.Icon
          {...props}
          icon="package-variant"
          color={theme.colors.primary}
        />
      )}
      right={() => (
        <View style={styles.goodsRightContent}>
          <Text style={styles.goodsCbm}>{(goods.actualCBM || 0).toFixed(3)} CBM</Text>
          <Chip
            style={{
              backgroundColor:
                goods.status === 'DELIVERED'
                  ? '#DCFCE7'
                  : goods.status === 'READY_FOR_PICKUP'
                  ? '#FEF3C7'
                  : '#E0F2FE',
            }}
            textStyle={{
              color:
                goods.status === 'DELIVERED'
                  ? '#22C55E'
                  : goods.status === 'READY_FOR_PICKUP'
                  ? '#F59E0B'
                  : '#0EA5E9',
              fontSize: 10,
            }}
          >
            {goods.status?.replace(/_/g, ' ') || 'N/A'}
          </Chip>
        </View>
      )}
      style={styles.goodsItem}
    />
  );
};

export const ContainerGoodsSection: React.FC<ContainerGoodsSectionProps> = ({
  goods,
  containerId,
  onViewPackingList,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.sectionCard, { backgroundColor: colors.background.card }]}>
      <View style={styles.goodsSectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Mes Marchandises ({goods?.length || 0})
        </Text>
        <Button
          mode="text"
          onPress={() => onViewPackingList(containerId)}
          icon="file-document-outline"
          compact
        >
          Liste de Colisage
        </Button>
      </View>
      <Text style={[styles.goodsSubtitle, { color: colors.text.secondary }]}>
        Vos marchandises dans ce container
      </Text>
      {goods?.map((item) => (
        <GoodsItem key={item._id} goods={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionCard: {
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 1,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  goodsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goodsSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    marginBottom: 12,
  },
  goodsItem: {
    paddingVertical: 4,
    paddingHorizontal: 0,
  },
  goodsRightContent: {
    alignItems: 'flex-end',
  },
  goodsCbm: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
    marginBottom: 4,
  },
});
