/**
 * Container Card Component
 */

import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import * as Haptics from 'expo-haptics';
import { showMessage } from 'react-native-flash-message';
import {
  CustomerContainer,
  CUSTOMER_STATUS_LABELS,
  getCustomerStatusColors,
  SHIPPING_LINE_LABELS,
} from '../../types';
import { useContainerCardStyles } from './ContainerCard.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useCreateShareToken } from '@src/shared/hooks/useCreateShareToken';
import { shareLink } from '@src/shared/lib/shareLink';
import { StatusBanner } from './StatusBanner';

interface ContainerCardProps {
  container: CustomerContainer;
  onPress?: () => void;
}

export const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  try {
    return format(new Date(dateString), 'dd MMM', { locale: fr });
  } catch {
    return '';
  }
};

const getShippingModeIcon = (mode: CustomerContainer['shippingMode']) => (mode === 'SEA' ? 'ferry' : 'airplane');
const getShippingModeLabel = (mode: CustomerContainer['shippingMode']) => (mode === 'SEA' ? 'Maritime' : 'Aérien');

export const ContainerCard: React.FC<ContainerCardProps> = ({ container, onPress }) => {
  const { colors } = useAppTheme();
  const styles = useContainerCardStyles();

  const { mutateAsync: createShareToken, isPending: isSharing } = useCreateShareToken();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  // Public, no-account tracking link for this shipment.
  const handleShare = useCallback(async () => {
    const ref = container.virtualContainerNumber;
    if (!ref) return;
    try {
      const result = await createShareToken({ type: 'container', resourceReference: ref });
      await shareLink({
        message: `Suivez mon expédition LEXD : ${ref}`,
        url: result.url,
        title: `Suivi ${ref}`,
      });
    } catch {
      showMessage({ message: 'Partage impossible pour le moment.', type: 'danger' });
    }
  }, [container.virtualContainerNumber, createShareToken]);

  const statusColor = getCustomerStatusColors(colors)[container.status];
  const statusBgColor = statusColor + '15';
  const statusLabel = CUSTOMER_STATUS_LABELS[container.status];
  const goodsCount = container.myGoods?.length || 0;
  const hasMultipleGoods = goodsCount > 1;
  const origin = container.route?.origin || '—';
  const destination = container.route?.destination || '—';
  const transitDays = container.route?.estimatedTransitDays;
  const isAirShipment = container.trackingType === 'AIRWAY_BILL' || container.shippingMode === 'AIR';
  const carrierLabel = isAirShipment
    ? [container.airline, container.flightNumber].filter(Boolean).join(' • ') || getShippingModeLabel(container.shippingMode)
    : `${SHIPPING_LINE_LABELS[container.shippingLine] || container.shippingLine} • ${getShippingModeLabel(container.shippingMode)}`;

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.95}>
      <Card style={styles.card} mode="elevated">
        <Card.Content style={styles.content}>
          <View style={styles.headerRow}>
            <View style={styles.titleSection}>
              <View style={styles.containerNumberContainer}>
                <MaterialCommunityIcons name={getShippingModeIcon(container.shippingMode)} size={20} color={colors.primary.main} style={styles.modeIcon} />
                <Text style={styles.containerNumber}>{container.virtualContainerNumber}</Text>
              </View>
              <Text style={styles.shippingLine}>
                {carrierLabel}
              </Text>
            </View>
            <Chip style={[styles.statusChip, { backgroundColor: statusBgColor }]} textStyle={{ color: statusColor, fontFamily: 'bold', fontSize: 11 }}>
              {statusLabel}
            </Chip>
          </View>

          <View style={styles.routeRow}>
            <View style={styles.routeLocation}>
              <Text style={styles.routeLabel}>Origine</Text>
              <Text style={styles.routeValue} numberOfLines={1}>{origin}</Text>
            </View>
            <View style={styles.routeArrow}>
              <View style={styles.arrowLine}>
                <MaterialCommunityIcons name={isAirShipment ? 'airplane-takeoff' : 'arrow-right'} size={18} color={colors.primary.main} />
              </View>
              {transitDays && !isAirShipment ? <Text style={styles.transitDays}>~{transitDays}j</Text> : null}
            </View>
            <View style={[styles.routeLocation, styles.routeLocationRight]}>
              <Text style={styles.routeLabel}>Destination</Text>
              <Text style={styles.routeValue} numberOfLines={1}>{destination}</Text>
            </View>
          </View>

          <StatusBanner container={container} />

          <View style={styles.footerRow}>
            <View style={styles.footerItem}>
              <MaterialCommunityIcons name="package-variant" size={16} color={styles.footerText.color} />
              <Text style={styles.footerText}>{goodsCount} marchandise{hasMultipleGoods ? 's' : ''}</Text>
            </View>
            {container.estimatedArrival && container.status !== 'DELIVERED' && (
              <View style={styles.footerItem}>
                <MaterialCommunityIcons name="calendar-clock" size={16} color={colors.primary.main} />
                <Text style={[styles.footerText, styles.footerTextPrimary]}>Arrivée: {formatDate(container.estimatedArrival)}</Text>
              </View>
            )}
            <TouchableOpacity
              onPress={handleShare}
              disabled={isSharing}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginLeft: 'auto', opacity: isSharing ? 0.5 : 1 }}
              accessibilityLabel="Partager le suivi"
            >
              <MaterialCommunityIcons name="share-variant" size={16} color={colors.primary.main} />
              <Text style={[styles.footerText, styles.footerTextPrimary]}>Partager</Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default ContainerCard;
