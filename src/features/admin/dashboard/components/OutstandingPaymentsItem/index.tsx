import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { OutstandingPaymentItem } from '../../types';
import { createStyles } from './OutstandingPaymentsItem.styles';

interface OutstandingPaymentsItemProps {
  item: OutstandingPaymentItem;
  onPress: (goodsId: string) => void;
}

const formatCurrency = (amount: number) =>
  `${Math.round(amount).toLocaleString('fr-FR')} FCFA`;

const getStatusConfig = (status: string, colors: any, isDark: boolean) => {
  if (status === 'PARTIAL') {
    return { label: 'Partiel', color: colors.status.warning, bg: isDark ? 'rgba(245,158,11,0.15)' : colors.feedback.warningBg };
  }
  return { label: 'Impayé', color: colors.status.error, bg: isDark ? 'rgba(239,68,68,0.15)' : colors.feedback.errorBg };
};

export const OutstandingPaymentsItem: React.FC<OutstandingPaymentsItemProps> = ({
  item,
  onPress,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const statusConfig = getStatusConfig(item.paymentStatus, colors, isDark);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.75}
      onPress={() => onPress(item._id)}
    >
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Ionicons name="cash-outline" size={22} color={colors.status.error} />
        </View>
        <View style={styles.info}>
          <Text style={styles.goodsId}>{item.goodsId}</Text>
          <Text style={styles.description} numberOfLines={1}>
            {item.description || 'Aucune description'}
          </Text>
          <Text style={styles.client}>{item.clientName}</Text>
          {item.phoneNumber ? (
            <Text style={styles.phone}>{item.phoneNumber}</Text>
          ) : null}
        </View>
        <View style={styles.right}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusConfig.bg },
            ]}
          >
            <Text style={[styles.statusText, { color: statusConfig.color }]}>
              {statusConfig.label}
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.text.muted}
            style={styles.chevron}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Total</Text>
          <Text style={styles.metricValue}>
            {formatCurrency(item.totalCost)}
          </Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Payé</Text>
          <Text style={styles.metricValuePaid}>
            {formatCurrency(item.amountPaid)}
          </Text>
        </View>
        <View style={[styles.metric, styles.metricHighlight]}>
          <Text style={styles.metricLabel}>Reste</Text>
          <Text style={styles.metricValueDue}>
            {formatCurrency(item.balanceDue)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
