import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import type { productType } from '@src/api/order';
import { createStyles } from './OrderCard.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { OrderCardCheckbox } from './OrderCardCheckbox';
import { OrderCardHeader } from './OrderCardHeader';
import { OrderCardShipping } from './OrderCardShipping';
import { OrderCardDetails } from './OrderCardDetails';
import { OrderCardProgress } from './OrderCardProgress';
import { OrderCardContainerMeta } from './OrderCardContainerMeta';
import { OrderCardFinance } from './OrderCardFinance';
import { getPaymentSummary } from './OrderCard.utils';

interface OrderCardColors {
  status: { warning: string; success: string; info: string; error: string };
  background: { paper: string };
  text: { disabled: string };
}

const getStatusConfig = (colors: OrderCardColors, status?: string) => {
  const configs: Record<string, { color: string; bgColor: string; icon: string; label: string }> = {
    PENDING: { color: colors.status.warning, bgColor: colors.background.paper, icon: 'clock-outline', label: 'Pending' },
    Active: { color: colors.status.success, bgColor: colors.background.paper, icon: 'check-circle', label: 'Active' },
    'In Transit': { color: colors.status.warning, bgColor: colors.background.paper, icon: 'truck-delivery', label: 'In Transit' },
    Delivered: { color: colors.status.info, bgColor: colors.background.paper, icon: 'package-check', label: 'Delivered' },
    Inactive: { color: colors.text.disabled, bgColor: colors.background.paper, icon: 'archive', label: 'Inactive' },
  };
  return status ? configs[status] || configs.Inactive : configs.Inactive;
};

interface OrderCardProps {
  order: productType;
  isSelected?: boolean;
  isSelectionMode?: boolean;
  onToggleSelect?: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, isSelected, isSelectionMode, onToggleSelect }) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  if (!order) {
    console.log('[OrderCard] Received undefined order');
    return null;
  }

  const statusConfig = getStatusConfig(colors, order.status);
  const initials = order.clientName?.split(' ').map((n: string) => n[0]).join('') || '?';
  const isAir = order.shippingMode === 'air';
  const payment = getPaymentSummary(order);
  const hasHighValue = payment.total > 500000;
  const handlePress = () => {
    if (isSelectionMode) {
      onToggleSelect?.();
      return;
    }
    if (order._id) {
      navigation.navigate('OrderDetailScreen', { id: order._id });
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {isSelectionMode && <OrderCardCheckbox isSelected={!!isSelected} />}

      <View style={[styles.statusBar, { backgroundColor: statusConfig.color }]} />

      <View style={styles.content}>
        <OrderCardHeader
          clientName={order.clientName}
          initials={initials}
          orderCode={order.code || 'N/A'}
          statusConfig={statusConfig}
          hasHighValue={hasHighValue}
        />

        <OrderCardFinance
          total={payment.total}
          paid={payment.paid}
          balance={payment.balance}
          status={payment.status}
        />

        <OrderCardShipping isAir={isAir} destination={order.destination} />

        <OrderCardContainerMeta
          containerSummaries={order.containerSummaries}
          legacyContainerNumber={order.contenairNumber}
          goodsCount={order.goodsCount}
        />

        <OrderCardDetails
          clientPhone={order.clientPhone}
          departureDate={order.departureDate}
          createdAt={order.createdAt}
          isGoodsLinked={order.isGoodsLinked}
          isManual={order.isManual}
        />

        {(order.status === 'Active' || order.status === 'In Transit') && (
          <OrderCardProgress status={order.status} statusColor={statusConfig.color} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;
