import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStyles } from './OrderCard.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { OrderCardCheckbox } from './OrderCardCheckbox';
import { OrderCardHeader } from './OrderCardHeader';
import { OrderCardShipping } from './OrderCardShipping';
import { OrderCardDetails } from './OrderCardDetails';
import { OrderCardProgress } from './OrderCardProgress';

const getStatusConfig = (colors: any, status: string) => {
  const configs: Record<string, { color: string; bgColor: string; icon: string; label: string }> = {
    PENDING: { color: colors.status.warning, bgColor: colors.background.paper, icon: 'clock-outline', label: 'Pending' },
    Active: { color: colors.status.success, bgColor: colors.background.paper, icon: 'check-circle', label: 'Active' },
    'In Transit': { color: colors.status.warning, bgColor: colors.background.paper, icon: 'truck-delivery', label: 'In Transit' },
    Delivered: { color: colors.status.info, bgColor: colors.background.paper, icon: 'package-check', label: 'Delivered' },
    Inactive: { color: colors.text.disabled, bgColor: colors.background.paper, icon: 'archive', label: 'Inactive' },
  };
  return configs[status] || configs.Inactive;
};

interface OrderCardProps {
  order: any;
  isSelected?: boolean;
  isSelectionMode?: boolean;
  onToggleSelect?: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, isSelected, isSelectionMode, onToggleSelect }) => {
  const navigation = useNavigation();
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  if (!order) {
    console.log('[OrderCard] Received undefined order');
    return null;
  }

  const statusConfig = getStatusConfig(colors, order.status);
  const initials = order.clientName?.split(' ').map((n: string) => n[0]).join('') || '?';
  const isAir = order.shippingMode === 'air';
  const orderPrice = parseFloat(String(order.calculatedTotal || 0)) || parseFloat(String(order.priceTotal || 0)) || parseFloat(String(order.totalCost || 0)) || 0;
  const hasHighValue = orderPrice > 500000;

  return (
    <TouchableOpacity 
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={isSelectionMode ? onToggleSelect : () => navigation.navigate('OrderDetailScreen' as never, { id: order._id })}
      activeOpacity={0.7}
    >
      {isSelectionMode && <OrderCardCheckbox isSelected={!!isSelected} />}

      <View style={[styles.statusBar, { backgroundColor: statusConfig.color }]} />

      <View style={styles.content}>
        <OrderCardHeader
          clientName={order.clientName}
          initials={initials}
          orderCode={order.code}
          statusConfig={statusConfig}
          hasHighValue={hasHighValue}
        />

        <OrderCardShipping isAir={isAir} destination={order.destination} />

        <OrderCardDetails
          clientPhone={order.clientPhone}
          departureDate={order.departureDate}
          orderPrice={orderPrice}
        />

        {(order.status === 'Active' || order.status === 'In Transit') && (
          <OrderCardProgress status={order.status} statusColor={statusConfig.color} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;
