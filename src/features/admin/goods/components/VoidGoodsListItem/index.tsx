/**
 * VoidGoodsListItem - Card displaying goods details with void action
 * SRP: Renders individual goods item in the void goods list
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Badge, Text, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Goods } from '../../types';
import { getStyles } from './VoidGoodsListItem.styles';

const STATUS_COLORS: Record<string, string> = {
  RECEIVED_AT_WAREHOUSE: Theme.colors.status.info,
  PACKED: Theme.colors.primary.main,
  ASSIGNED_TO_CONTAINER: Theme.colors.status.warning,
  LOADED_IN_CONTAINER: Theme.colors.status.warning,
  IN_TRANSIT: Theme.colors.status.info,
  ARRIVED_DESTINATION: Theme.colors.status.success,
  READY_FOR_PICKUP: Theme.colors.status.success,
  DELIVERED: Theme.colors.text.disabled,
  VOID: Theme.colors.status.error,
};

const STATUS_LABELS: Record<string, string> = {
  RECEIVED_AT_WAREHOUSE: 'In Warehouse',
  PACKED: 'Packed',
  ASSIGNED_TO_CONTAINER: 'Assigned',
  LOADED_IN_CONTAINER: 'Loaded',
  IN_TRANSIT: 'In Transit',
  ARRIVED_DESTINATION: 'Arrived',
  READY_FOR_PICKUP: 'Ready',
  DELIVERED: 'Delivered',
  VOID: 'Voided',
};

interface VoidGoodsListItemProps {
  item: Goods;
  onVoidPress: (goods: Goods) => void;
}

export const VoidGoodsListItem: React.FC<VoidGoodsListItemProps> = ({
  item,
  onVoidPress,
}) => {
  const { colors } = useAppTheme();
  const styles = getStyles(colors);
  return (
  <Card style={styles.goodsCard}>
    <Card.Content>
      <View style={styles.headerRow}>
        <View style={styles.goodsIdContainer}>
          <MaterialCommunityIcons
            name="package-variant"
            size={24}
            color={Theme.primary[600]}
          />
          <Text style={styles.goodsId}>{item.goodsId}</Text>
        </View>
        <Badge
          style={[
            styles.statusBadge,
            { backgroundColor: STATUS_COLORS[item.status] || '#75757520' },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: STATUS_COLORS[item.status] || '#757575' },
            ]}
          >
            {STATUS_LABELS[item.status] || item.status}
          </Text>
        </Badge>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Client</Text>
          <Text style={styles.detailValue}>
            {typeof item.clientId === 'object'
              ? `${item.clientId.firstName} ${item.clientId.lastName}`
              : 'Unknown'}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>CBM</Text>
          <Text style={styles.detailValue}>
            {item.actualCBM?.toFixed(3) || '0'} m³
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Value</Text>
          <Text style={styles.detailValue}>
            {item.totalCost?.toLocaleString() || '0'} FCFA
          </Text>
        </View>
      </View>

      {item.status !== 'VOID' && (
        <TouchableOpacity
          style={styles.voidButton}
          onPress={() => onVoidPress(item)}
        >
          <MaterialCommunityIcons name="cancel" size={20} color={colors.status.error} />
          <Text style={styles.voidButtonText}>Void Goods</Text>
        </TouchableOpacity>
      )}
    </Card.Content>
  </Card>
);}
