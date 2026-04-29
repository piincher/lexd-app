import React, { memo } from 'react';
import { Pressable, View, Text } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './OrderCard.styles';

interface OrderCardProps {
  order: {
    code?: string;
    departureDate?: string;
    quantity?: number;
    shippingMode?: string;
    status?: string;
    currentStatus?: string;
  };
  onPress: () => void;
}

type StepIndex = 0 | 1 | 2 | 3 | 4;

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  Active: { label: 'En cours', color: '#1B365D', bg: '#E8EEF4' },
  'In Transit': { label: 'En transit', color: '#2D8FDB', bg: '#E8F4FD' },
  Delivered: { label: 'Livré', color: '#1AAE7E', bg: '#E6F7F1' },
  Inactive: { label: 'En attente', color: '#8E99A4', bg: '#F0F2F4' },
  Arrived: { label: 'Arrivé', color: '#F59E0B', bg: '#FEF3C7' },
};

const STEP_PROGRESS: Record<StepIndex, number> = { 0: 5, 1: 25, 2: 50, 3: 75, 4: 100 };

const STEP_STATUS_CONFIG: Record<StepIndex, typeof STATUS_CONFIG['Active']> = {
  0: STATUS_CONFIG.Inactive,
  1: STATUS_CONFIG.Active,
  2: STATUS_CONFIG['In Transit'],
  3: STATUS_CONFIG.Arrived,
  4: STATUS_CONFIG.Delivered,
};

const CURRENT_STATUS_MAP: Record<string, StepIndex> = {
  'Order arrived at warehouse': 1,
  'Order in Processing': 1,
  'Order in Transit': 2,
  'Order in Arrived': 3,
  Delivered: 4,
};

const getStep = (status?: string, currentStatus?: string): StepIndex => {
  if (currentStatus && currentStatus in CURRENT_STATUS_MAP) {
    return CURRENT_STATUS_MAP[currentStatus];
  }
  switch (status) {
    case 'Delivered': return 4;
    case 'In Transit': return 2;
    case 'Active': return 1;
    default: return 0;
  }
};

const formatShortDate = (dateStr?: string): string => {
  if (!dateStr) return '--';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '--';
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

const OrderCardInner: React.FC<OrderCardProps> = ({ order, onPress }) => {
  const { colors } = useAppTheme();
  const step = getStep(order.status, order.currentStatus);
  const statusCfg = STEP_STATUS_CONFIG[step];
  const progress = STEP_PROGRESS[step];
  const isSea = order.shippingMode === 'sea';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.background.card,
          borderColor: colors.border,
          opacity: pressed ? 0.95 : 1,
        },
      ]}
    >
      <View style={styles.topRow}>
        <View style={[styles.iconBox, { backgroundColor: colors.background.paper }]}>
          <MaterialCommunityIcons
            name={isSea ? 'ferry' : 'airplane'}
            size={20}
            color={colors.primary.dark}
          />
        </View>
        <View style={styles.topInfo}>
          <Text style={[styles.orderCode, { color: colors.text.primary }]} numberOfLines={1}>
            {order.code || '---'}
          </Text>
          <View style={styles.metaRow}>
            <Feather name="calendar" size={12} color={colors.text.disabled} />
            <Text style={[styles.metaText, { color: colors.text.secondary }]}>
              {formatShortDate(order.departureDate)}
            </Text>
            <View style={[styles.metaDot, { backgroundColor: colors.border }]} />
            <MaterialCommunityIcons name="package-variant" size={12} color={colors.text.disabled} />
            <Text style={[styles.metaText, { color: colors.text.secondary }]}>
              {order.quantity ?? 1} colis
            </Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusCfg.bg }]}>
          <Text style={[styles.statusText, { color: statusCfg.color }]}>{statusCfg.label}</Text>
        </View>
        <Feather name="chevron-right" size={18} color={colors.text.disabled} style={styles.chevron} />
      </View>

      <View style={styles.progressRow}>
        <View style={[styles.progressTrack, { backgroundColor: colors.border }]}>
          <View style={[styles.progressFill, { backgroundColor: statusCfg.color, width: `${progress}%` }]} />
        </View>
        <Text style={[styles.progressLabel, { color: colors.text.disabled }]}>{progress}%</Text>
      </View>
    </Pressable>
  );
};

export const OrderCard = memo(OrderCardInner);
