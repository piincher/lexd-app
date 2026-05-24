/* Hallmark · component: goods-card · genre: modern-minimal · theme: brand-aligned app theme
 * states: default · pressed · selected (selection mode)
 * Readability revamp: one status signal, labeled metric strip, clear price/payment footer.
 * pre-emit critique: P4 H5 E4 S5 R4 V4
 */

import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Goods, PaymentStatus } from '../types';
import { normalizePhotos } from '@src/shared/lib';
import { GoodsImage } from '@src/shared/ui/GoodsImage';
import { getStatusConfig } from './GoodsCardStatus';

interface GoodsCardProps {
  goods: Goods;
  onPress?: () => void;
  isSelected?: boolean;
  isSelectionMode?: boolean;
  onToggleSelect?: () => void;
}

type Variant = 'primary' | 'success' | 'warning' | 'info' | 'neutral';

const formatPrice = (n?: number): string => `${(n ?? 0).toLocaleString('fr-FR')} FCFA`;
const formatCbm = (n?: number): string => `${+(n ?? 0).toFixed(3)} m³`;

const PAYMENT_CONFIG: Record<PaymentStatus, { label: string; variant: Variant }> = {
  PAID: { label: 'Payé', variant: 'success' },
  PARTIAL: { label: 'Partiel', variant: 'warning' },
  UNPAID: { label: 'À régler', variant: 'neutral' },
};

const getVariantColors = (variant: Variant, colors: any): { bg: string; fg: string; dot: string } => {
  switch (variant) {
    case 'primary':
      return { bg: colors.primary[100], fg: colors.primary[700], dot: colors.primary.main };
    case 'success':
      return { bg: colors.feedback.successBg, fg: colors.feedback.successDark, dot: colors.status.success };
    case 'warning':
      return { bg: colors.feedback.warningBg, fg: colors.feedback.warningDark, dot: colors.status.warning };
    case 'info':
      return { bg: colors.feedback.infoBg, fg: colors.feedback.infoDark, dot: colors.status.info };
    default:
      return { bg: colors.neutral[100], fg: colors.text.secondary, dot: colors.neutral[400] };
  }
};

const Pill: React.FC<{ label: string; variant: Variant; colors: any }> = ({ label, variant, colors }) => {
  const v = getVariantColors(variant, colors);
  return (
    <View style={[pillStyles.pill, { backgroundColor: v.bg }]}>
      <View style={[pillStyles.dot, { backgroundColor: v.dot }]} />
      <Text style={[pillStyles.label, { color: v.fg }]} numberOfLines={1}>{label}</Text>
    </View>
  );
};

const Metric: React.FC<{ label: string; value: string; colors: any }> = ({ label, value, colors }) => (
  <View style={metricStyles.metric}>
    <Text style={[metricStyles.label, { color: colors.text.secondary }]}>{label}</Text>
    <Text style={[metricStyles.value, { color: colors.text.primary }]} numberOfLines={1}>{value}</Text>
  </View>
);

export const GoodsCard: React.FC<GoodsCardProps> = ({
  goods, onPress, isSelected, isSelectionMode, onToggleSelect,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const photoUrls = normalizePhotos(goods);

  const status = getStatusConfig(goods.status);
  const statusColor = getVariantColors(status.variant, colors);
  const payment = PAYMENT_CONFIG[goods.paymentStatus] ?? PAYMENT_CONFIG.UNPAID;

  const client = typeof goods.clientId === 'string' ? null : goods.clientId;
  const clientName = client ? `${client.firstName} ${client.lastName}`.trim() : 'Non identifié';

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { borderLeftColor: statusColor.dot },
        isSelected && styles.cardSelected,
      ]}
      onPress={isSelectionMode ? onToggleSelect : onPress}
      activeOpacity={0.9}
    >
      {/* Header: thumbnail + identity */}
      <View style={styles.header}>
        <GoodsImage
          uri={photoUrls[0]}
          width={76}
          height={76}
          borderRadius={Theme.radius.lg}
          resizeMode="cover"
          showPlaceholder
          placeholderSize="small"
        />
        <View style={styles.identity}>
          <View style={styles.idRow}>
            <Text style={styles.goodsId} numberOfLines={1}>{goods.goodsId}</Text>
            {isSelectionMode ? (
              <View style={[styles.checkbox, isSelected && styles.checkboxOn]}>
                {isSelected && <Ionicons name="checkmark" size={15} color={colors.text.inverse} />}
              </View>
            ) : (
              <Ionicons name="chevron-forward" size={18} color={colors.text.disabled} />
            )}
          </View>
          <View style={styles.pillRow}>
            <Pill label={status.label} variant={status.variant} colors={colors} />
          </View>
          <Text style={styles.description} numberOfLines={2}>
            {goods.description || 'Sans description'}
          </Text>
        </View>
      </View>

      {/* Owner + location */}
      <View style={styles.subRow}>
        <Ionicons name="person-outline" size={14} color={colors.text.secondary} />
        <Text style={styles.subText} numberOfLines={1}>{clientName}</Text>
        <View style={styles.subDot} />
        <Ionicons name="location-outline" size={14} color={colors.text.secondary} />
        <Text style={styles.subText} numberOfLines={1}>{goods.warehouseLocation || 'N/A'}</Text>
      </View>

      {/* Metric strip */}
      <View style={styles.strip}>
        <Metric label="POIDS" value={`${goods.weight ?? 0} kg`} colors={colors} />
        <View style={styles.stripDivider} />
        <Metric label="CBM" value={formatCbm(goods.actualCBM)} colors={colors} />
        <View style={styles.stripDivider} />
        <Metric label="QTÉ" value={`${goods.quantity ?? 1}`} colors={colors} />
      </View>

      {/* Price + payment */}
      <View style={styles.footer}>
        <View style={styles.priceBlock}>
          <Text style={styles.priceLabel}>COÛT TOTAL</Text>
          <Text style={styles.priceValue} numberOfLines={1}>{formatPrice(goods.totalCost)}</Text>
        </View>
        <Pill label={payment.label} variant={payment.variant} colors={colors} />
      </View>
    </TouchableOpacity>
  );
};

const pillStyles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: Theme.radius.full,
  },
  dot: { width: 6, height: 6, borderRadius: 3 },
  label: { fontSize: 11, fontWeight: '700', letterSpacing: 0.2 },
});

const metricStyles = StyleSheet.create({
  metric: { flex: 1, alignItems: 'center', gap: 3 },
  label: { fontSize: 10, fontWeight: '700', letterSpacing: 0.6 },
  value: { fontSize: 15, fontWeight: '800' },
});

const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    card: {
      marginHorizontal: Theme.spacing.lg,
      marginVertical: Theme.spacing.sm,
      padding: Theme.spacing.lg,
      borderRadius: Theme.radius.xl,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
      borderLeftWidth: 3,
      ...Theme.shadows.sm,
    },
    cardSelected: {
      backgroundColor: colors.primary[100],
      borderColor: colors.primary.main,
    },
    header: {
      flexDirection: 'row',
      gap: Theme.spacing.lg,
    },
    identity: {
      flex: 1,
      justifyContent: 'flex-start',
      gap: 6,
    },
    idRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: Theme.spacing.sm,
    },
    goodsId: {
      flex: 1,
      fontSize: 17,
      fontWeight: '800',
      letterSpacing: -0.2,
      color: colors.text.primary,
    },
    pillRow: {
      flexDirection: 'row',
    },
    description: {
      fontSize: 13,
      lineHeight: 18,
      fontWeight: '500',
      color: colors.text.secondary,
    },
    subRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginTop: Theme.spacing.md,
    },
    subText: {
      fontSize: 12.5,
      fontWeight: '600',
      color: colors.text.secondary,
      flexShrink: 1,
    },
    subDot: {
      width: 3,
      height: 3,
      borderRadius: 1.5,
      backgroundColor: colors.text.disabled,
      marginHorizontal: 3,
    },
    strip: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: Theme.spacing.md,
      paddingVertical: Theme.spacing.md,
      borderRadius: Theme.radius.lg,
      backgroundColor: colors.background.paper,
    },
    stripDivider: {
      width: 1,
      height: 26,
      backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: Theme.spacing.md,
      gap: Theme.spacing.md,
    },
    priceBlock: {
      flex: 1,
      gap: 2,
    },
    priceLabel: {
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 0.6,
      color: colors.text.secondary,
    },
    priceValue: {
      fontSize: 18,
      fontWeight: '800',
      letterSpacing: -0.3,
      color: colors.text.primary,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.neutral[400],
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxOn: {
      backgroundColor: colors.primary.main,
      borderColor: colors.primary.main,
    },
  });

export default GoodsCard;
