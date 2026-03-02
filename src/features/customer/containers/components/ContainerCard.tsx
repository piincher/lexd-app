/**
 * Container Card Component
 * Card displaying container summary for customer list view
 */

import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Card, Text, useTheme, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  CustomerContainer,
  CUSTOMER_STATUS_LABELS,
  CUSTOMER_STATUS_COLORS,
  CUSTOMER_STATUS_BG_COLORS,
  SHIPPING_MODE_LABELS,
  SHIPPING_LINE_LABELS,
} from '../types';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

interface ContainerCardProps {
  container: CustomerContainer;
  onPress?: () => void;
}

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

export const ContainerCard: React.FC<ContainerCardProps> = ({
  container,
  onPress,
}) => {
  const theme = useTheme();
  const statusColor = CUSTOMER_STATUS_COLORS[container.status];
  const statusBgColor = CUSTOMER_STATUS_BG_COLORS[container.status];
  const statusLabel = CUSTOMER_STATUS_LABELS[container.status];

  const goodsCount = container.myGoods?.length || 0;
  const hasMultipleGoods = goodsCount > 1;

  return (
    <Pressable onPress={onPress}>
      <Card style={styles.card} mode="elevated">
        <Card.Content style={styles.content}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <View style={styles.containerNumberContainer}>
              <MaterialCommunityIcons
                name={getShippingModeIcon(container.shippingMode)}
                size={20}
                color={theme.colors.primary}
                style={styles.modeIcon}
              />
              <Text style={styles.containerNumber}>
                {container.virtualContainerNumber}
              </Text>
            </View>
            <Chip
              style={[styles.statusChip, { backgroundColor: statusBgColor }]}
              textStyle={{ color: statusColor, fontSize: 12 }}
              compact
            >
              {statusLabel}
            </Chip>
          </View>

          {/* Shipping Line */}
          <Text style={styles.shippingLine}>
            {SHIPPING_LINE_LABELS[container.shippingLine]}
          </Text>

          {/* Route Row */}
          <View style={styles.routeRow}>
            <View style={styles.routeLocation}>
              <Text style={styles.routeLabel}>Origine</Text>
              <Text style={styles.routeValue}>
                {typeof container.route.origin === 'string' 
                  ? container.route.origin 
                  : container.route.origin?.city || 'N/A'}
              </Text>
            </View>

            <View style={styles.routeArrow}>
              <MaterialCommunityIcons
                name="arrow-right"
                size={20}
                color={COLORS.SlateGray}
              />
              <Text style={styles.transitDays}>
                ~{container.route.estimatedTransitDays} j
              </Text>
            </View>

            <View style={styles.routeLocation}>
              <Text style={styles.routeLabel}>Destination</Text>
              <Text style={styles.routeValue}>
                {typeof container.route.destination === 'string' 
                  ? container.route.destination 
                  : container.route.destination?.city || 'N/A'}
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

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
                  color={theme.colors.primary}
                />
                <Text style={[styles.footerText, { color: theme.colors.primary }]}>
                  Arrivée estimée: {formatDate(container.estimatedArrival)}
                </Text>
              </View>
            )}
          </View>

          {/* Current Status Info */}
          {container.timeline.departedAt && container.status === 'IN_TRANSIT' && (
            <View style={styles.statusInfoRow}>
              <MaterialCommunityIcons
                name="information-outline"
                size={14}
                color={COLORS.DimGray}
              />
              <Text style={styles.statusInfoText}>
                En transit depuis le {formatDate(container.timeline.departedAt)}
              </Text>
            </View>
          )}

          {container.timeline.arrivedAt && container.status === 'ARRIVED' && (
            <View style={styles.statusInfoRow}>
              <MaterialCommunityIcons
                name="information-outline"
                size={14}
                color={COLORS.green}
              />
              <Text style={[styles.statusInfoText, { color: COLORS.green }]}>
                Arrivé le {formatDate(container.timeline.arrivedAt)}
              </Text>
            </View>
          )}

          {container.status === 'READY_FOR_PICKUP' && (
            <View style={[styles.statusInfoRow, styles.readyForPickupRow]}>
              <MaterialCommunityIcons
                name="truck-delivery"
                size={14}
                color={COLORS.orange}
              />
              <Text style={[styles.statusInfoText, { color: COLORS.orange }]}>
                Prêt pour retrait - Contactez l'entrepôt
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  containerNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeIcon: {
    marginRight: 8,
  },
  containerNumber: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: COLORS.DarkGrey,
  },
  statusChip: {
    height: 28,
  },
  shippingLine: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    color: COLORS.DimGray,
    marginBottom: 16,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  routeLocation: {
    flex: 1,
  },
  routeLabel: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: COLORS.SlateGray,
    marginBottom: 2,
  },
  routeValue: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    color: COLORS.DarkGrey,
  },
  routeArrow: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  transitDays: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    color: COLORS.DimGray,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.Silver,
    marginVertical: 12,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  statusInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.Silver,
  },
  readyForPickupRow: {
    backgroundColor: '#FEF3C7',
    padding: 8,
    borderRadius: 8,
    borderTopWidth: 0,
  },
  statusInfoText: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
    color: COLORS.DimGray,
    marginLeft: 6,
  },
});
