/**
 * Container Card Component
 * Card displaying container summary for customer list view
 */

import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { CustomerContainer, CUSTOMER_STATUS_LABELS, CUSTOMER_STATUS_COLORS, CUSTOMER_STATUS_BG_COLORS, SHIPPING_LINE_LABELS } from '../types';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

interface ContainerCardProps {
  container: CustomerContainer;
  onPress?: () => void;
}

// Primary color constant (matching the app's primary green)
const PRIMARY_COLOR = '#16A34A';
const PRIMARY_LIGHT = '#DCFCE7';

/**
 * Format date for display
 */
const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  try {
    return format(new Date(dateString), 'dd MMM', { locale: fr });
  } catch {
    return '';
  }
};

/**
 * Get shipping mode icon
 */
const getShippingModeIcon = (
  mode: CustomerContainer['shippingMode']
): React.ComponentProps<typeof MaterialCommunityIcons>['name'] => {
  return mode === 'SEA' ? 'ferry' : 'airplane';
};

/**
 * Get shipping mode label
 */
const getShippingModeLabel = (mode: CustomerContainer['shippingMode']): string => {
  return mode === 'SEA' ? 'Maritime' : 'Aérien';
};

export const ContainerCard: React.FC<ContainerCardProps> = ({
  container,
  onPress,
}) => {
  const statusColor = CUSTOMER_STATUS_COLORS[container.status];
  const statusBgColor = CUSTOMER_STATUS_BG_COLORS[container.status];
  const statusLabel = CUSTOMER_STATUS_LABELS[container.status];

  const goodsCount = container.myGoods?.length || 0;
  const hasMultipleGoods = goodsCount > 1;

  // Extract route data with fallbacks
  const origin = container.route?.origin || '—';
  const destination = container.route?.destination || '—';
  const transitDays = container.route?.estimatedTransitDays;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}>
      <Card style={styles.card} mode="elevated">
        <Card.Content style={styles.content}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <View style={styles.titleSection}>
              <View style={styles.containerNumberContainer}>
                <MaterialCommunityIcons
                  name={getShippingModeIcon(container.shippingMode)}
                  size={20}
                  color={PRIMARY_COLOR}
                  style={styles.modeIcon}
                />
                <Text style={styles.containerNumber}>
                  {container.virtualContainerNumber}
                </Text>
              </View>
              <Text style={styles.shippingLine}>
                {SHIPPING_LINE_LABELS[container.shippingLine]} • {getShippingModeLabel(container.shippingMode)}
              </Text>
            </View>
            <Chip
              style={[styles.statusChip, { backgroundColor: statusBgColor }]}
              textStyle={{ color: statusColor, fontFamily: Fonts.bold, fontSize: 11 }}
            >
              {statusLabel}
            </Chip>
          </View>

          {/* Route Row */}
          <View style={styles.routeRow}>
            <View style={styles.routeLocation}>
              <Text style={styles.routeLabel}>Origine</Text>
              <Text style={styles.routeValue} numberOfLines={1}>
                {origin}
              </Text>
            </View>

            <View style={styles.routeArrow}>
              <View style={styles.arrowLine}>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={18}
                  color={PRIMARY_COLOR}
                />
              </View>
              {transitDays ? (
                <Text style={styles.transitDays}>~{transitDays}j</Text>
              ) : null}
            </View>

            <View style={[styles.routeLocation, styles.routeLocationRight]}>
              <Text style={styles.routeLabel}>Destination</Text>
              <Text style={styles.routeValue} numberOfLines={1}>
                {destination}
              </Text>
            </View>
          </View>

          {/* Status Info / Call to Action */}
          {container.status === 'READY_FOR_PICKUP' && (
            <View style={styles.readyBanner}>
              <MaterialCommunityIcons
                name="truck-delivery-outline"
                size={16}
                color={COLORS.white}
              />
              <Text style={styles.readyBannerText}>
                Prêt pour retrait - Contactez l'entrepôt
              </Text>
            </View>
          )}

          {container.status === 'IN_TRANSIT' && container.timeline?.departedAt && (
            <View style={styles.infoBanner}>
              <MaterialCommunityIcons
                name="information-outline"
                size={14}
                color={PRIMARY_COLOR}
              />
              <Text style={styles.infoBannerText}>
                En transit depuis le {formatDate(container.timeline.departedAt)}
              </Text>
            </View>
          )}

          {container.status === 'ARRIVED' && container.timeline?.arrivedAt && (
            <View style={[styles.infoBanner, styles.arrivedBanner]}>
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={14}
                color={COLORS.success}
              />
              <Text style={[styles.infoBannerText, styles.arrivedBannerText]}>
                Arrivé le {formatDate(container.timeline.arrivedAt)}
              </Text>
            </View>
          )}

          {/* Footer Info */}
          <View style={styles.footerRow}>
            <View style={styles.footerItem}>
              <MaterialCommunityIcons
                name="package-variant"
                size={16}
                color={COLORS.DimGray}
              />
              <Text style={styles.footerText}>
                {goodsCount} marchandise{hasMultipleGoods ? 's' : ''}
              </Text>
            </View>

            {container.estimatedArrival && container.status !== 'DELIVERED' && (
              <View style={styles.footerItem}>
                <MaterialCommunityIcons
                  name="calendar-clock"
                  size={16}
                  color={PRIMARY_COLOR}
                />
                <Text style={[styles.footerText, styles.footerTextPrimary]}>
                  Arrivée: {formatDate(container.estimatedArrival)}
                </Text>
              </View>
            )}
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleSection: {
    flex: 1,
    marginRight: 12,
  },
  containerNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  modeIcon: {
    marginRight: 8,
  },
  containerNumber: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: COLORS.DarkGrey,
  },
  shippingLine: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: COLORS.DimGray,
  },
  statusChip: {
    height: 28,
    borderRadius: 6,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  routeLocation: {
    flex: 1,
  },
  routeLocationRight: {
    alignItems: 'flex-end',
  },
  routeLabel: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: COLORS.SlateGray,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  routeValue: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: COLORS.DarkGrey,
  },
  routeArrow: {
    alignItems: 'center',
    paddingHorizontal: 16,
    minWidth: 60,
  },
  arrowLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transitDays: {
    fontFamily: Fonts.meduim,
    fontSize: 11,
    color: PRIMARY_COLOR,
    marginTop: 2,
  },
  readyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  readyBannerText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: COLORS.white,
    marginLeft: 8,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  infoBannerText: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
    color: PRIMARY_COLOR,
    marginLeft: 6,
  },
  arrivedBanner: {
    backgroundColor: '#D1FAE5',
  },
  arrivedBannerText: {
    color: COLORS.success,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.Silver,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: COLORS.DimGray,
    marginLeft: 6,
  },
  footerTextPrimary: {
    color: PRIMARY_COLOR,
  },
});
