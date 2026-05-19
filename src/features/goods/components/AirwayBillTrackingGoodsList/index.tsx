import React from 'react';
import { View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { AirwayBillGoodsItem } from '../../api/types';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './AirwayBillTrackingGoodsList.styles';

interface Props {
  goodsIds?: (string | AirwayBillGoodsItem)[];
}

const STATUS_LABELS: Record<string, string> = {
  RECEIVED_AT_WAREHOUSE: 'Reçu',
  PACKED: 'Préparé',
  ASSIGNED_TO_CONTAINER: 'Assigné',
  LOADED_IN_CONTAINER: 'Chargé',
  IN_TRANSIT: 'En route',
  ARRIVED_DESTINATION: 'Arrivé',
  READY_FOR_PICKUP: 'Prêt',
  DELIVERED: 'Livré',
};

export const AirwayBillTrackingGoodsList: React.FC<Props> = ({ goodsIds }) => {
  const items = goodsIds || [];
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <>
      <Text style={styles.sectionTitle}>Vos colis ({items.length})</Text>
      <Card style={styles.card}>
        <Card.Content>
          {items.map((goods) => (
            <View key={typeof goods === 'string' ? goods : goods._id} style={styles.goodsItem}>
              <MaterialCommunityIcons name="package-variant" size={20} color={colors.primary[500]} />
              <Text style={styles.goodsText}>
                {typeof goods === 'string' ? goods : goods.goodsId}
              </Text>
              {typeof goods !== 'string' && goods.status && (
                <Text style={styles.goodsStatus}>{STATUS_LABELS[goods.status] || goods.status}</Text>
              )}
            </View>
          ))}
          {items.length === 0 && (
            <Text style={styles.emptyText}>Aucun colis</Text>
          )}
        </Card.Content>
      </Card>
    </>
  );
};
