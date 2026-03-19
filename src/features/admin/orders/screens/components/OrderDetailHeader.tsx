import React from 'react';
import { View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { styles } from './OrderDetailHeader.styles';

interface OrderDetailHeaderProps {
  order: any;
}

const STATUS_CONFIG: Record<string, { 
  color: string; 
  bgColor: string;
  icon: string;
  label: string;
}> = {
  PENDING: { 
    color: '#9C27B0', 
    bgColor: '#F3E5F5',
    icon: 'clock-outline',
    label: 'Pending'
  },
  Active: { 
    color: '#4CAF50', 
    bgColor: '#E8F5E9',
    icon: 'check-circle',
    label: 'Active'
  },
  'In Transit': { 
    color: '#FF9800', 
    bgColor: '#FFF3E0',
    icon: 'truck-delivery',
    label: 'In Transit'
  },
  Delivered: { 
    color: '#2196F3', 
    bgColor: '#E3F2FD',
    icon: 'package-check',
    label: 'Delivered'
  },
  Inactive: { 
    color: '#757575', 
    bgColor: '#F5F5F5',
    icon: 'archive',
    label: 'Inactive'
  },
};

export const OrderDetailHeader: React.FC<OrderDetailHeaderProps> = ({ order }) => {
  const statusConfig = STATUS_CONFIG[order?.status] || STATUS_CONFIG.Inactive;
  const initials = order?.clientName?.split(' ').map((n: string) => n[0]).join('') || '?';
  const orderPrice = order?.calculatedTotal || parseFloat(order?.priceTotal) || 0;
  const isAir = order?.shippingMode === 'air';

  return (
    <Surface style={styles.container}>
      {/* Top Row: Avatar + Client Info + Status */}
      <View style={styles.topRow}>
        <View style={styles.clientSection}>
          <View style={[styles.avatar, { backgroundColor: statusConfig.bgColor }]}>
            <Text style={[styles.avatarText, { color: statusConfig.color }]}>
              {initials}
            </Text>
          </View>
          <View style={styles.clientInfo}>
            <Text style={styles.clientName} numberOfLines={1}>
              {order?.clientName || 'Unknown Client'}
            </Text>
            <Text style={styles.orderCode}>{order?.code}</Text>
          </View>
        </View>
        
        <View style={[styles.statusBadge, { backgroundColor: statusConfig.bgColor }]}>
          <MaterialCommunityIcons name={statusConfig.icon as any} size={14} color={statusConfig.color} />
          <Text style={[styles.statusText, { color: statusConfig.color }]}>
            {statusConfig.label}
          </Text>
        </View>
      </View>

      {/* Middle Row: Shipping Mode + Price */}
      <View style={styles.middleRow}>
        <View style={[styles.shippingBadge, { backgroundColor: isAir ? '#E3F2FD' : '#E0F2F1' }]}>
          <MaterialCommunityIcons 
            name={isAir ? 'airplane' : 'ferry'} 
            size={14} 
            color={isAir ? '#1976D2' : '#00796B'} 
          />
          <Text style={[styles.shippingText, { color: isAir ? '#1976D2' : '#00796B' }]}>
            {isAir ? 'Air Freight' : 'Sea Shipping'}
          </Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total Amount</Text>
          <Text style={styles.priceValue}>
            {orderPrice.toLocaleString()} FCFA
          </Text>
        </View>
      </View>

      {/* Payment Status */}
      <View style={styles.paymentRow}>
        <View style={styles.paymentLabel}>
          <MaterialCommunityIcons 
            name={order?.paymentStatus === 'Paid' ? 'check-circle' : 'clock-outline'} 
            size={16} 
            color={order?.paymentStatus === 'Paid' ? '#4CAF50' : '#FF9800'} 
          />
          <Text style={[
            styles.paymentStatusText,
            { color: order?.paymentStatus === 'Paid' ? '#4CAF50' : '#FF9800' }
          ]}>
            {order?.paymentStatus === 'Paid' ? 'Paid' : 'Payment Pending'}
          </Text>
        </View>
        {order?.isGoodsLinked && (
          <View style={styles.linkedBadge}>
            <MaterialCommunityIcons name="link-variant" size={12} color="#FFF" />
            <Text style={styles.linkedText}>Linked to Goods</Text>
          </View>
        )}
      </View>
    </Surface>
  );
};

export default OrderDetailHeader;
