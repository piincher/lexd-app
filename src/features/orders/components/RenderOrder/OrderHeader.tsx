import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import {
  normalizePaymentStatus,
  PAYMENT_STATUS,
  PAYMENT_STATUS_LABELS,
} from '@src/shared/constants/paymentStatus';
import { useRenderOrderStyles } from './RenderOrder.styles';
import { productType } from '@src/api/order';

interface OrderHeaderProps {
  item: productType;
  orderStatus: string | undefined;
  formattedLastUpdate: string;
}

const BADGE_STYLE_BY_STATUS: Record<string, 'paid' | 'partial' | 'unpaid'> = {
  [PAYMENT_STATUS.PAID]: 'paid',
  [PAYMENT_STATUS.PARTIAL]: 'partial',
  [PAYMENT_STATUS.UNPAID]: 'unpaid',
};

export const OrderHeader: React.FC<OrderHeaderProps> = ({ item, orderStatus, formattedLastUpdate }) => {
  const { colors } = useAppTheme();
  const styles = useRenderOrderStyles();
  const paymentStatus = normalizePaymentStatus(item.paymentStatus);
  const badgeStyle = BADGE_STYLE_BY_STATUS[paymentStatus];
  const statusLabel = PAYMENT_STATUS_LABELS[paymentStatus];
  const iconName = paymentStatus === PAYMENT_STATUS.UNPAID ? 'warning' : 'check-circle';

  return (
    <View style={styles.headerCard}>
      <View style={styles.headerContent}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressTitle}>Suivi de la commande</Text>
          <View style={styles.progressTrack}>
            <View style={styles.progressStep}>
              <MaterialIcons name="check" size={20} color={colors.status.success} />
              <Text style={styles.progressText}>Commande passée</Text>
            </View>
            <View style={styles.progressStep}>
              <MaterialIcons
                name={orderStatus === 'In Transit' || orderStatus === 'Delivered' ? 'check' : 'circle'}
                size={20}
                color={
                  orderStatus === 'In Transit' || orderStatus === 'Delivered'
                    ? colors.status.success
                    : colors.text.secondary
                }
              />
              <Text style={styles.progressText}>En transit</Text>
            </View>
            <View style={styles.progressStep}>
              <MaterialIcons
                name={orderStatus === 'Delivered' ? 'check' : 'circle'}
                size={20}
                color={orderStatus === 'Delivered' ? colors.status.success : colors.text.secondary}
              />
              <Text style={styles.progressText}>Livré</Text>
            </View>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusBadge,
              styles[badgeStyle],
            ]}
          >
            <MaterialIcons name={iconName} size={16} color={colors.text.inverse} />
            <Text style={styles.statusText}>{statusLabel}</Text>
          </View>
          <Text style={styles.orderId}>Commande #{item.code}</Text>
        </View>
        <Text style={styles.dateText}>Dernière mise à jour: {formattedLastUpdate}</Text>
      </View>
    </View>
  );
};
