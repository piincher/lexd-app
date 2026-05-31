import React, { useCallback, useRef, useState } from 'react';
import { Linking, Pressable, Share, View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { createStyles } from './OrderDetailHeader.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { buildOrderShareMessage, telUrl, whatsappUrl } from '../../utils/orderContact';

interface OrderDetailHeaderProps {
  order: any;
}

const parsePrice = (value: any): number => {
  if (value === null || value === undefined || value === '') return 0;
  const num = parseFloat(String(value));
  return isNaN(num) ? 0 : num;
};

const getStatusConfig = (colors: any, status: string) => {
  const configs: Record<string, { color: string; icon: string; label: string }> = {
    PENDING: { color: colors.status.warning, icon: 'clock-outline', label: 'En attente' },
    Active: { color: colors.status.success, icon: 'check-circle', label: 'Active' },
    'In Transit': { color: colors.status.warning, icon: 'truck-delivery', label: 'En transit' },
    Delivered: { color: colors.status.info, icon: 'package-check', label: 'Livrée' },
    Inactive: { color: colors.text.disabled, icon: 'archive', label: 'Inactive' },
  };
  return configs[status] || configs.Inactive;
};

export const OrderDetailHeader: React.FC<OrderDetailHeaderProps> = ({ order }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [copied, setCopied] = useState<'code' | 'phone' | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const statusConfig = getStatusConfig(colors, order?.status);
  const initials = order?.clientName?.split(' ').map((n: string) => n[0]).join('') || '?';
  const orderPrice =
    parsePrice(order?.calculatedTotal) || parsePrice(order?.priceTotal) || parsePrice(order?.totalCost) || 0;
  const unitPrice = parsePrice(order?.unitPrice);
  const isAir = order?.shippingMode === 'air';
  const isPaid = order?.paymentStatus === 'Paid' || order?.paymentStatus === 'PAID';

  const primaryContainer = order?.containerSummaries?.[0];
  const containerLabel =
    primaryContainer?.virtualContainerNumber || primaryContainer?.containerNumber || order?.contenairNumber;
  const extraContainers = Math.max((order?.containerSummaries?.length || 0) - 1, 0);

  const flashCopied = useCallback((key: 'code' | 'phone') => {
    setCopied(key);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(null), 1500);
  }, []);

  const handleCopyCode = useCallback(async () => {
    if (!order?.code) return;
    await Clipboard.setStringAsync(String(order.code));
    flashCopied('code');
  }, [order?.code, flashCopied]);

  const handleCopyPhone = useCallback(async () => {
    if (!order?.clientPhone) return;
    await Clipboard.setStringAsync(String(order.clientPhone));
    flashCopied('phone');
  }, [order?.clientPhone, flashCopied]);

  const handleCall = useCallback(() => {
    if (order?.clientPhone) Linking.openURL(telUrl(order.clientPhone)).catch(() => {});
  }, [order?.clientPhone]);

  const handleWhatsApp = useCallback(() => {
    if (order?.clientPhone) Linking.openURL(whatsappUrl(order.clientPhone)).catch(() => {});
  }, [order?.clientPhone]);

  const handleShare = useCallback(() => {
    Share.share({ message: buildOrderShareMessage(order) }).catch(() => {});
  }, [order]);

  const handleOpenContainer = useCallback(() => {
    if (primaryContainer?._id) {
      navigation.navigate('ContainerDetail', { containerId: primaryContainer._id });
    }
  }, [navigation, primaryContainer?._id]);

  const hasPhone = Boolean(order?.clientPhone);

  return (
    <Surface style={styles.container}>
      {/* Identity */}
      <View style={styles.topRow}>
        <View style={styles.clientSection}>
          <View style={[styles.avatar, { backgroundColor: statusConfig.color + '1A' }]}>
            <Text style={[styles.avatarText, { color: statusConfig.color }]}>{initials}</Text>
          </View>
          <View style={styles.clientInfo}>
            <Text style={styles.clientName} numberOfLines={1}>
              {order?.clientName || 'Client inconnu'}
            </Text>
            <Pressable onPress={handleCopyCode} style={styles.codeRow} hitSlop={6}>
              <Text style={styles.orderCode}>{order?.code || '—'}</Text>
              <MaterialCommunityIcons
                name={copied === 'code' ? 'check' : 'content-copy'}
                size={13}
                color={copied === 'code' ? colors.status.success : colors.text.secondary}
              />
            </Pressable>
          </View>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: statusConfig.color + '1A' }]}>
          <MaterialCommunityIcons name={statusConfig.icon as any} size={14} color={statusConfig.color} />
          <Text style={[styles.statusText, { color: statusConfig.color }]}>{statusConfig.label}</Text>
        </View>
      </View>

      {/* Shipping mode + total */}
      <View style={styles.middleRow}>
        <View
          style={[
            styles.shippingBadge,
            { backgroundColor: isAir ? colors.status.info + '15' : colors.status.success + '15' },
          ]}
        >
          <MaterialCommunityIcons
            name={isAir ? 'airplane' : 'ferry'}
            size={14}
            color={isAir ? colors.status.info : colors.status.success}
          />
          <Text style={[styles.shippingText, { color: isAir ? colors.status.info : colors.status.success }]}>
            {isAir ? 'Fret aérien' : 'Fret maritime'}
          </Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Montant total</Text>
          <Text style={styles.priceValue}>
            {orderPrice > 0 ? `${orderPrice.toLocaleString('fr-FR')} FCFA` : 'Non défini'}
          </Text>
          {unitPrice > 0 && (
            <Text style={styles.unitPriceText}>
              {unitPrice.toLocaleString('fr-FR')} FCFA/{isAir ? 'kg' : 'm³'}
            </Text>
          )}
        </View>
      </View>

      {/* Payment status + linked badge */}
      <View style={styles.paymentRow}>
        <View style={styles.paymentLabel}>
          <MaterialCommunityIcons
            name={isPaid ? 'check-circle' : 'clock-outline'}
            size={16}
            color={isPaid ? colors.status.success : colors.status.warning}
          />
          <Text style={[styles.paymentStatusText, { color: isPaid ? colors.status.success : colors.status.warning }]}>
            {isPaid ? 'Payée' : 'Paiement en attente'}
          </Text>
        </View>
        {order?.isGoodsLinked && (
          <View style={styles.linkedBadge}>
            <MaterialCommunityIcons name="link-variant" size={12} color={colors.text.inverse} />
            <Text style={styles.linkedText}>Liée aux marchandises</Text>
          </View>
        )}
      </View>

      {/* Container jump */}
      {containerLabel && (
        <Pressable
          onPress={handleOpenContainer}
          disabled={!primaryContainer?._id}
          android_ripple={{ color: colors.action.hover }}
          style={({ pressed }) => [styles.containerChip, pressed && { opacity: 0.7 }]}
          accessibilityRole="button"
          accessibilityLabel={`Ouvrir le conteneur ${containerLabel}`}
        >
          <MaterialCommunityIcons name="shipping-pallet" size={16} color={colors.primary.main} />
          <Text style={styles.containerChipText} numberOfLines={1}>
            {containerLabel}{extraContainers ? ` +${extraContainers}` : ''}
          </Text>
          {primaryContainer?._id ? (
            <MaterialCommunityIcons name="chevron-right" size={18} color={colors.text.secondary} />
          ) : null}
        </Pressable>
      )}

      {/* Advanced quick actions */}
      {hasPhone && (
        <View style={styles.quickActions}>
          <QuickAction icon="phone" label="Appeler" color={colors.status.success} onPress={handleCall} styles={styles} />
          <QuickAction icon="whatsapp" label="WhatsApp" color="#25D366" onPress={handleWhatsApp} styles={styles} />
          <QuickAction
            icon={copied === 'phone' ? 'check' : 'content-copy'}
            label={copied === 'phone' ? 'Copié' : 'Copier'}
            color={copied === 'phone' ? colors.status.success : colors.text.secondary}
            onPress={handleCopyPhone}
            styles={styles}
          />
          <QuickAction icon="share-variant" label="Partager" color={colors.primary.main} onPress={handleShare} styles={styles} />
        </View>
      )}
      {!hasPhone && (
        <View style={styles.quickActions}>
          <QuickAction icon="share-variant" label="Partager" color={colors.primary.main} onPress={handleShare} styles={styles} />
        </View>
      )}
    </Surface>
  );
};

interface QuickActionProps {
  icon: string;
  label: string;
  color: string;
  onPress: () => void;
  styles: ReturnType<typeof createStyles>;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, label, color, onPress, styles }) => (
  <Pressable
    onPress={onPress}
    android_ripple={{ color: color + '20', borderless: false }}
    style={({ pressed }) => [styles.quickAction, pressed && { opacity: 0.6 }]}
    accessibilityRole="button"
    accessibilityLabel={label}
  >
    <MaterialCommunityIcons name={icon as any} size={20} color={color} />
    <Text style={[styles.quickActionLabel, { color }]}>{label}</Text>
  </Pressable>
);

export default OrderDetailHeader;
