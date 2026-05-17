/**
 * ContainerGoodsSection - Displays customer's goods within a container
 * Extracted from ContainerTrackingScreen to follow SRP
 */

import React from 'react';
import { View } from 'react-native';
import { Text, Button, Chip, List, useTheme } from 'react-native-paper';

import { useAppTheme } from '@src/providers/ThemeProvider';
import { CustomerGoodsInContainer } from '../types';
import { styles } from './ContainerGoodsSection.styles';

interface ContainerGoodsSectionProps {
  goods: CustomerGoodsInContainer[];
  containerId: string;
  onViewPackingList: (containerId: string) => void;
}

const GoodsItem: React.FC<{ goods: CustomerGoodsInContainer }> = ({ goods }) => {
  const theme = useTheme();
  const { colors } = useAppTheme();

  const chipBg =
    goods.status === 'DELIVERED'
      ? colors.feedback.successBg
      : goods.status === 'READY_FOR_PICKUP'
      ? colors.feedback.warningBg
      : colors.feedback.infoBg;

  const chipText =
    goods.status === 'DELIVERED'
      ? colors.status.success
      : goods.status === 'READY_FOR_PICKUP'
      ? colors.status.warning
      : colors.status.info;

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
            style={{ backgroundColor: chipBg }}
            textStyle={{ color: chipText, fontSize: 10 }}
          >
            {goods.status?.replace(/_/g, ' ') || 'N/A'}
          </Chip>
        </View>
      )}
      style={styles.goodsItem}
    />
  );
};

const summarizeGoods = (goods: CustomerGoodsInContainer[]) => {
  const totalCBM = goods.reduce((sum, item) => sum + (item.actualCBM || 0), 0);
  const totalWeight = goods.reduce((sum, item) => sum + (item.weight || 0), 0);
  const preview = goods
    .map((item) => item.description || item.goodsId)
    .filter(Boolean)
    .slice(0, 3)
    .join(', ');

  return { totalCBM, totalWeight, preview };
};

export const ContainerGoodsSection: React.FC<ContainerGoodsSectionProps> = ({
  goods,
  containerId,
  onViewPackingList,
}) => {
  const { colors } = useAppTheme();
  const summary = summarizeGoods(goods || []);

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
        Une seule expédition, {goods?.length || 0} marchandise{(goods?.length || 0) > 1 ? 's' : ''} dans ce container
      </Text>
      <View style={[styles.summaryBox, { backgroundColor: colors.background.paper }]}>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: colors.text.primary }]}>{summary.totalCBM.toFixed(2)}</Text>
          <Text style={[styles.summaryLabel, { color: colors.text.secondary }]}>CBM total</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: colors.text.primary }]}>{summary.totalWeight.toFixed(0)}</Text>
          <Text style={[styles.summaryLabel, { color: colors.text.secondary }]}>kg total</Text>
        </View>
      </View>
      {!!summary.preview && (
        <Text style={[styles.previewText, { color: colors.text.secondary }]} numberOfLines={2}>
          Aperçu: {summary.preview}{goods.length > 3 ? ` +${goods.length - 3} autres` : ''}
        </Text>
      )}
      {goods?.map((item) => (
        <GoodsItem key={item._id} goods={item} />
      ))}
    </View>
  );
};
