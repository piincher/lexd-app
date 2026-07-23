import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { HAIRLINE } from '@src/shared/ui/designLanguage';
import type { PaymentHistoryItem, PaymentProvider, PaymentStatus } from '../../types';
import {
  PAYMENT_STATUS_COLORS,
  PAYMENT_STATUS_LABELS,
  PROVIDER_ICONS,
  PROVIDER_LABELS,
} from '../../types';
import { styles } from './styles';

interface PaymentHistoryListItemProps {
  item: PaymentHistoryItem;
}

const getProviderIcon = (provider: PaymentProvider) => {
  return PROVIDER_ICONS[provider] || 'credit-card';
};

const StatusBadge: React.FC<{ status: PaymentStatus }> = ({ status }) => {
  const color = PAYMENT_STATUS_COLORS[status];
  const label = PAYMENT_STATUS_LABELS[status];

  return (
    <View style={[styles.statusBadge, { backgroundColor: color + '15' }]}>
      <View style={[styles.statusDot, { backgroundColor: color }]} />
      <Text style={[styles.statusText, { color }]}>{label}</Text>
    </View>
  );
};

export const PaymentHistoryListItem: React.FC<PaymentHistoryListItemProps> = ({ item }) => {
  const { colors } = useAppTheme();

  return (
    <TouchableOpacity
      style={[
        styles.paymentCard,
        {
          backgroundColor: colors.background.card,
          borderWidth: HAIRLINE,
          borderColor: colors.border,
        },
      ]}
      onPress={() => {/* Navigate to payment details */}}
      activeOpacity={0.7}
    >
      <View style={styles.paymentHeader}>
        <View style={styles.providerInfo}>
          <View style={[styles.providerIcon, { backgroundColor: colors.primary.main + '10' }]}>
            <MaterialCommunityIcons
              name={getProviderIcon(item.paymentMethod as PaymentProvider) as any}
              size={20}
              color={colors.primary.main}
            />
          </View>
          <View>
            <Text style={[styles.providerName, { color: colors.text.primary }]}>
              {PROVIDER_LABELS[item.paymentMethod as PaymentProvider] || item.paymentMethod}
            </Text>
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

      {item.status === 'COMPLETED' && (
        <View style={[styles.paymentFooter, { borderTopColor: colors.border }]}>
          <TouchableOpacity style={styles.receiptButton}>
            <MaterialCommunityIcons name="receipt" size={16} color={colors.primary.main} />
            <Text style={[styles.receiptText, { color: colors.primary.main }]}>View Receipt</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};
