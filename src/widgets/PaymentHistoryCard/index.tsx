import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './PaymentHistoryCard.styles';

export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'REFUNDED';

interface PaymentHistoryCardProps {
  item: {
    paymentMethod: string;
    status: PaymentStatus;
    amountFCFA: number;
    currency: string;
    createdAt: string;
    metadata?: {
      phoneNumber?: string;
      cardLast4?: string;
    };
    goodsIds?: string[];
  };
  onPress?: () => void;
  onViewReceipt?: () => void;
}

const STATUS_COLORS: Record<PaymentStatus, string> = {
  PENDING: '#F59E0B',
  PROCESSING: '#3B82F6',
  COMPLETED: '#10B981',
  FAILED: '#EF4444',
  CANCELLED: '#6B7280',
  REFUNDED: '#8B5CF6',
};

const STATUS_LABELS: Record<PaymentStatus, string> = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  CANCELLED: 'Cancelled',
  REFUNDED: 'Refunded',
};

const PROVIDER_ICONS: Record<string, string> = {
  ORANGE_MONEY: 'phone',
  WAVE: 'wave-square',
  STRIPE: 'credit-card',
  CARD: 'credit-card',
};

const PROVIDER_LABELS: Record<string, string> = {
  ORANGE_MONEY: 'Orange Money',
  WAVE: 'Wave',
  STRIPE: 'Card',
  CARD: 'Card',
};

const StatusBadge: React.FC<{ status: PaymentStatus }> = ({ status }) => {
  const color = STATUS_COLORS[status];
  const label = STATUS_LABELS[status];

  return (
    <View style={[styles.statusBadge, { backgroundColor: color + '15' }]}>
      <View style={[styles.statusDot, { backgroundColor: color }]} />
      <Text style={[styles.statusText, { color }]}>{label}</Text>
    </View>
  );
};

export const PaymentHistoryCard: React.FC<PaymentHistoryCardProps> = ({
  item,
  onPress,
  onViewReceipt,
}) => {
  const { colors } = useAppTheme();
  const providerIcon = PROVIDER_ICONS[item.paymentMethod] || 'credit-card';
  const providerLabel = PROVIDER_LABELS[item.paymentMethod] || item.paymentMethod;

  return (
    <TouchableOpacity
      style={[styles.paymentCard, { backgroundColor: colors.background.card, shadowColor: '#000' }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.paymentHeader}>
        <View style={styles.providerInfo}>
          <View style={[styles.providerIcon, { backgroundColor: colors.primary.main + '10' }]}>
            <MaterialCommunityIcons name={providerIcon as any} size={20} color={colors.primary.main} />
          </View>
          <View>
            <Text style={[styles.providerName, { color: colors.text.primary }]}>{providerLabel}</Text>
            <Text style={[styles.paymentDate, { color: colors.text.secondary }]}>
              {new Date(item.createdAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>
        <StatusBadge status={item.status} />
      </View>

      <View style={[styles.paymentBody, { borderTopColor: colors.border }]}>
        <View style={styles.amountContainer}>
          <Text style={[styles.amountLabel, { color: colors.text.secondary }]}>Amount</Text>
          <Text style={[styles.amount, { color: colors.text.primary }]}>
            {item.amountFCFA.toLocaleString()} {item.currency}
          </Text>
        </View>

        {item.metadata?.phoneNumber && (
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="phone" size={14} color={colors.text.secondary} />
            <Text style={[styles.detailText, { color: colors.text.secondary }]}>
              {item.metadata.phoneNumber}
            </Text>
          </View>
        )}

        {item.metadata?.cardLast4 && (
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="credit-card" size={14} color={colors.text.secondary} />
            <Text style={[styles.detailText, { color: colors.text.secondary }]}>
              •••• {item.metadata.cardLast4}
            </Text>
          </View>
        )}

        {item.goodsIds && item.goodsIds.length > 0 && (
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="package-variant" size={14} color={colors.text.secondary} />
            <Text style={[styles.detailText, { color: colors.text.secondary }]}>
              {item.goodsIds.length} item{item.goodsIds.length > 1 ? 's' : ''}
            </Text>
          </View>
        )}
      </View>

      {item.status === 'COMPLETED' && onViewReceipt && (
        <View style={[styles.paymentFooter, { borderTopColor: colors.border }]}>
          <TouchableOpacity style={styles.receiptButton} onPress={onViewReceipt}>
            <MaterialCommunityIcons name="receipt" size={16} color={colors.primary.main} />
            <Text style={[styles.receiptText, { color: colors.primary.main }]}>View Receipt</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};
