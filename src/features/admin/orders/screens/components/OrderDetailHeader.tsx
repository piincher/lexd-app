import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStyles } from './OrderDetailHeader.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface OrderDetailHeaderProps {
  order: any;
}

const parsePrice = (value: any): number => {
  if (value === null || value === undefined || value === '') return 0;
  const num = parseFloat(String(value));
  return isNaN(num) ? 0 : num;
};

const getStatusConfig = (colors: any, status: string) => {
  const configs: Record<string, { color: string; bgColor: string; icon: string; label: string }> = {
    PENDING: {
      color: colors.status.warning,
      bgColor: colors.background.paper,
      icon: 'clock-outline',
      label: 'Pending'
    },
    Active: {
      color: colors.status.success,
      bgColor: colors.background.paper,
      icon: 'check-circle',
      label: 'Active'
    },
    'In Transit': {
      color: colors.status.warning,
      bgColor: colors.background.paper,
      icon: 'truck-delivery',
      label: 'In Transit'
    },
    Delivered: {
      color: colors.status.info,
      bgColor: colors.background.paper,
      icon: 'package-check',
      label: 'Delivered'
    },
    Inactive: {
      color: colors.text.disabled,
      bgColor: colors.background.paper,
      icon: 'archive',
      label: 'Inactive'
    },
  };
  return configs[status] || configs.Inactive;
};

export const OrderDetailHeader: React.FC<OrderDetailHeaderProps> = ({ order }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  const statusConfig = getStatusConfig(colors, order?.status);
  const initials = order?.clientName?.split(' ').map((n: string) => n[0]).join('') || '?';
  const orderPrice = parsePrice(order?.calculatedTotal) || 
                     parsePrice(order?.priceTotal) || 
                     parsePrice(order?.totalCost) || 0;
  const unitPrice = parsePrice(order?.unitPrice);
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
        <View style={[styles.shippingBadge, { backgroundColor: isAir ? colors.status.info + '15' : colors.status.success + '15' }]}>
          <MaterialCommunityIcons 
            name={isAir ? 'airplane' : 'ferry'} 
            size={14} 
            color={isAir ? colors.status.info : colors.status.success} 
          />
          <Text style={[styles.shippingText, { color: isAir ? colors.status.info : colors.status.success }]}>
            {isAir ? 'Air Freight' : 'Sea Shipping'}
          </Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total Amount</Text>
          <Text style={styles.priceValue}>
            {orderPrice > 0 ? `${orderPrice.toLocaleString()} FCFA` : 'Non défini'}
          </Text>
          {unitPrice > 0 && (
            <Text style={styles.unitPriceText}>
              {unitPrice.toLocaleString()} FCFA/{isAir ? 'kg' : 'm³'}
            </Text>
          )}
        </View>
      </View>

      {/* Payment Status */}
      <View style={styles.paymentRow}>
        <View style={styles.paymentLabel}>
          <MaterialCommunityIcons 
            name={order?.paymentStatus === 'Paid' ? 'check-circle' : 'clock-outline'} 
            size={16} 
            color={order?.paymentStatus === 'Paid' ? colors.status.success : colors.status.warning} 
          />
          <Text style={[
            styles.paymentStatusText,
            { color: order?.paymentStatus === 'Paid' ? colors.status.success : colors.status.warning }
          ]}>
            {order?.paymentStatus === 'Paid' ? 'Paid' : 'Payment Pending'}
          </Text>
        </View>
        {order?.isGoodsLinked && (
          <View style={styles.linkedBadge}>
            <MaterialCommunityIcons name="link-variant" size={12} color={colors.text.inverse} />
            <Text style={styles.linkedText}>Linked to Goods</Text>
          </View>
        )}
      </View>
    </Surface>
  );
};

export default OrderDetailHeader;
