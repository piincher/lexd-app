/**
 * VoidGoodsListItem - Card displaying goods details with void action
 * SRP: Renders individual goods item in the void goods list
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Badge, Text, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { Goods } from '../../types';
import { styles } from './VoidGoodsListItem.styles';

const STATUS_COLORS: Record<string, string> = {
  RECEIVED_AT_WAREHOUSE: '#2196F3',
  PACKED: '#7C4DFF',
  ASSIGNED_TO_CONTAINER: '#FF9800',
  LOADED_IN_CONTAINER: '#9C27B0',
  IN_TRANSIT: '#3F51B5',
  ARRIVED_DESTINATION: '#009688',
  READY_FOR_PICKUP: '#4CAF50',
  DELIVERED: '#757575',
  VOID: '#DC2626',
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
}) => (
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
          <MaterialCommunityIcons name="cancel" size={20} color="#DC2626" />
          <Text style={styles.voidButtonText}>Void Goods</Text>
        </TouchableOpacity>
      )}
    </Card.Content>
  </Card>
);
