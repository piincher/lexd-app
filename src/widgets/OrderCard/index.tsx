import React, { memo, useMemo } from 'react';
import { Pressable, View, Text } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './OrderCard.styles';

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

const STEP_PROGRESS: Record<StepIndex, number> = { 0: 5, 1: 25, 2: 50, 3: 75, 4: 100 };

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
  const styles = useMemo(() => createStyles(colors), [colors]);

  const statusConfig = useMemo(() => ({
    Active: { label: 'En cours', color: colors.status.info, bg: colors.feedback.infoBg },
    'In Transit': { label: 'En transit', color: colors.status.info, bg: colors.feedback.infoBg },
    Delivered: { label: 'Livré', color: colors.status.success, bg: colors.feedback.successBg },
    Inactive: { label: 'En attente', color: colors.text.disabled, bg: colors.background.paper },
    Arrived: { label: 'Arrivé', color: colors.status.warning, bg: colors.feedback.warningBg },
  }), [colors]);

  const stepStatusConfig: Record<StepIndex, typeof statusConfig['Active']> = {
    0: statusConfig.Inactive,
    1: statusConfig.Active,
    2: statusConfig['In Transit'],
    3: statusConfig.Arrived,
    4: statusConfig.Delivered,
  };

  const step = getStep(order.status, order.currentStatus);
  const statusCfg = stepStatusConfig[step];
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
