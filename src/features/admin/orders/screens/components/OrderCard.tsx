import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { styles } from './OrderCard.styles';

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
    icon: 'package-variant-delivered',
    label: 'Delivered'
  },
  Inactive: { 
    color: '#757575', 
    bgColor: '#F5F5F5',
    icon: 'archive',
    label: 'Inactive'
  },
};

const getStatusConfig = (status: string) => STATUS_CONFIG[status] || STATUS_CONFIG.Inactive;

interface OrderCardProps {
  order: any;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const navigation = useNavigation();
  
  // Defensive check
  if (!order) {
    console.log('[OrderCard] Received undefined order');
    return null;
  }
  
  const statusConfig = getStatusConfig(order.status);
  const initials = order.clientName?.split(' ').map((n: string) => n[0]).join('') || '?';
  
  const isAir = order.shippingMode === 'air';
  // Price can be in priceTotal (string) or calculatedTotal (number)
  const orderPrice = order.calculatedTotal || parseFloat(order.priceTotal) || 0;
  const hasHighValue = orderPrice > 500000;

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => navigation.navigate('OrderDetailScreen' as never, { id: order._id })}
      activeOpacity={0.7}
    >
      {/* Status Indicator Bar */}
      <View style={[styles.statusBar, { backgroundColor: statusConfig.color }]} />
      
      <View style={styles.content}>
        {/* Header Row */}
        <View style={styles.header}>
          <View style={styles.clientSection}>
            <Avatar.Text
              size={44}
              label={initials}
              style={[styles.avatar, { backgroundColor: statusConfig.bgColor }]}
              labelStyle={[styles.avatarLabel, { color: statusConfig.color }]}
            />
            <View style={styles.clientInfo}>
              <Text style={styles.clientName} numberOfLines={1}>
                {order.clientName || 'Unknown'}
              </Text>
              <View style={styles.orderMeta}>
                <Text style={styles.orderCode}>{order.code || 'No code'}</Text>
                {hasHighValue && (
                  <View style={styles.priorityBadge}>
                    <MaterialIcons name="star" size={10} color="#FFF" />
                  </View>
                )}
              </View>
            </View>
          </View>
          
          <View style={[styles.statusBadge, { backgroundColor: statusConfig.bgColor }]}>
            <MaterialCommunityIcons name={statusConfig.icon as any} size={14} color={statusConfig.color} />
            <Text style={[styles.statusText, { color: statusConfig.color }]}>
              {statusConfig.label}
            </Text>
          </View>
        </View>

        {/* Shipping Mode & Route */}
        <View style={styles.shippingRow}>
          <View style={[styles.shippingMode, { backgroundColor: isAir ? '#E3F2FD' : '#E0F2F1' }]}>
            <FontAwesome5 
              name={isAir ? 'plane' : 'ship'} 
              size={12} 
              color={isAir ? '#1976D2' : '#00796B'} 
            />
            <Text style={[styles.shippingText, { color: isAir ? '#1976D2' : '#00796B' }]}>
              {isAir ? 'Air Freight' : 'Sea Shipping'}
            </Text>
          </View>
          
          {order.destination && (
            <View style={styles.routeInfo}>
              <MaterialIcons name="location-on" size={12} color={COLORS.grey} />
              <Text style={styles.routeText}>{order.destination}</Text>
            </View>
          )}
        </View>

        {/* Details Grid */}
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <MaterialIcons name="phone" size={14} color={COLORS.grey} />
            <Text style={styles.detailText}>{order.clientPhone || 'N/A'}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <MaterialIcons name="schedule" size={14} color={COLORS.grey} />
            <Text style={styles.detailText}>
              {order.departureDate ? new Date(order.departureDate).toLocaleDateString('fr-FR') : 'No date'}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <MaterialIcons name="attach-money" size={14} color={COLORS.grey} />
            <Text style={[styles.amountText, { color: orderPrice > 0 ? '#4CAF50' : COLORS.grey }]}>
              {orderPrice.toLocaleString()} FCFA
            </Text>
          </View>
        </View>

        {/* Progress Indicator for Active Orders */}
        {(order.status === 'Active' || order.status === 'In Transit') ? (
          <View style={styles.progressSection}>
            <View style={styles.progressTrack}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: order.status === 'In Transit' ? '70%' : '30%',
                    backgroundColor: statusConfig.color 
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {order.status === 'In Transit' ? 'In Transit to Destination' : 'Processing at Warehouse'}
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;
