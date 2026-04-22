/**
 * WaypointCard - Individual waypoint card for container tracking journey
 * Extracted from ContainerTrackingScreen to follow SRP
 */

import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';

import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ContainerWaypoint, SEGMENT_TYPE_LABELS, SEGMENT_TYPE_ICONS } from '@src/shared/types/containerWaypoints';
import {
  getExtendedStatusLabel,
  getExtendedStatusColor,
  getExtendedStatusIcon,
  getLocationCategory,
  ExtendedWaypointStatus,
} from '@src/shared/types/waypointStatus';

interface WaypointCardProps {
  waypoint: ContainerWaypoint;
  index: number;
  currentWaypointIndex: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const formatDateShort = (dateString?: string): string => {
  if (!dateString) return '-';
  try {
    return format(new Date(dateString), 'dd MMM yyyy', { locale: fr });
  } catch {
    return dateString;
  }
};

export const WaypointCard: React.FC<WaypointCardProps> = ({
  waypoint,
  index,
  currentWaypointIndex,
  isExpanded,
  onToggle,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => StyleSheet.create({
    timelineConnector: {
      alignItems: 'center',
      height: 24,
    },
    connectorLine: {
      width: 3,
      height: 24,
      borderRadius: 2,
    },
    waypointCard: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    waypointCardCurrent: {
      borderWidth: 2,
      borderColor: '#3B82F6',
      shadowColor: '#3B82F6',
      shadowOpacity: 0.15,
      elevation: 4,
    },
    waypointCardCompleted: {
      opacity: 0.85,
    },
    waypointCardDakar: {
      borderWidth: 2,
      borderColor: '#0EA5E9',
      elevation: 4,
    },
    waypointCardBorder: {
      borderWidth: 2,
      borderColor: '#F59E0B',
      elevation: 4,
    },
    waypointCardWarehouse: {
      borderWidth: 2,
      borderColor: '#8B5CF6',
      elevation: 4,
    },
    wpStatusBar: {
      height: 4,
      width: '100%',
    },
    wpContent: {
      padding: 16,
    },
    wpHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 10,
    },
    wpNumber: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: isDark ? 'rgba(16, 185, 129, 0.2)' : '#DCFCE7',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    wpNumberText: {
      fontSize: 16,
      fontFamily: Fonts.bold,
      color: '#16A34A',
    },
    wpTitleContainer: {
      flex: 1,
    },
    wpLocation: {
      fontSize: 16,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    wpCode: {
      fontSize: 12,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      marginTop: 2,
    },
    wpStatusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 20,
      gap: 4,
    },
    wpStatusText: {
      fontSize: 10,
      fontFamily: Fonts.bold,
    },
    wpTypeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8,
      flexWrap: 'wrap',
    },
    wpTypeBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background.paper,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
      gap: 4,
    },
    wpTypeBadgeText: {
      fontSize: 11,
      fontFamily: Fonts.meduim,
      color: colors.text.secondary,
    },
    currentBadge: {
      backgroundColor: '#3B82F6',
      paddingHorizontal: 10,
      paddingVertical: 2,
      borderRadius: 20,
    },
    currentBadgeText: {
      fontSize: 9,
      fontFamily: Fonts.bold,
      color: colors.text.inverse,
    },
    wpQuickInfo: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    wpInfoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    wpInfoText: {
      fontSize: 12,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
    },
    wpExpandIndicator: {
      alignItems: 'center',
      marginTop: 6,
    },
    wpDetails: {
      marginTop: 8,
    },
    wpDetailDivider: {
      height: 1,
      backgroundColor: colors.border,
      marginBottom: 10,
    },
    wpDetailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 6,
    },
    wpDetailLabel: {
      fontSize: 13,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
    },
    wpDetailValue: {
      fontSize: 13,
      fontFamily: Fonts.meduim,
      color: colors.text.primary,
    },
    wpNotes: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 6,
      backgroundColor: colors.background.paper,
      padding: 10,
      borderRadius: 8,
      marginTop: 8,
    },
    wpNotesText: {
      fontSize: 12,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      flex: 1,
    },
  }), [colors, isDark]);
  const rotation = useSharedValue(isExpanded ? '180deg' : '0deg');

  useEffect(() => {
    rotation.value = withTiming(isExpanded ? '180deg' : '0deg', { duration: 200 });
  }, [isExpanded]);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: rotation.value }],
  }));

  const isCurrent = index === currentWaypointIndex;
  const isCompleted = waypoint.status === 'COMPLETED';
  const rawStatusColor = getExtendedStatusColor(waypoint.status as ExtendedWaypointStatus);
  const statusColor = typeof rawStatusColor === 'string' ? rawStatusColor : '#9CA3AF';
  const locationCode = waypoint.location?.portCode || waypoint.location?.countryCode || '';
  const category = getLocationCategory(locationCode);
  const isDakar = category === 'DISCHARGE_PORT';
  const isBorder = category === 'BORDER';
  const isWarehouse = category === 'WAREHOUSE';

  const getLocationSuffix = () => {
    if (isDakar) return ' (Port de déchargement)';
    if (isBorder) return ' (Frontière)';
    if (isWarehouse) return ' (Entrepôt)';
    return '';
  };

  return (
    <View>
      {/* Timeline connector */}
      {index > 0 && (
        <View style={styles.timelineConnector}>
          <View
            style={[
              styles.connectorLine,
              isCompleted || index <= currentWaypointIndex
                ? { backgroundColor: '#10B981' }
                : isCurrent
                ? { backgroundColor: '#3B82F6' }
                : { backgroundColor: '#D1D5DB' },
            ]}
          />
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.waypointCard,
          isCurrent && styles.waypointCardCurrent,
          isCompleted && styles.waypointCardCompleted,
          isDakar && styles.waypointCardDakar,
          isBorder && styles.waypointCardBorder,
          isWarehouse && styles.waypointCardWarehouse,
        ]}
        onPress={onToggle}
        activeOpacity={0.9}
      >
        {/* Status color bar */}
        <View
          style={[
            styles.wpStatusBar,
            { backgroundColor: statusColor },
            (isDakar || isBorder) && { height: 6 },
          ]}
        />

        <View style={styles.wpContent}>
          {/* Header */}
          <View style={styles.wpHeader}>
            <View
              style={[
                styles.wpNumber,
                isDakar && { backgroundColor: '#0EA5E9', width: 40, height: 40, borderRadius: 20 },
              ]}
            >
              <Text
                style={[
                  styles.wpNumberText,
                  isDakar && { color: '#FFF', fontSize: 18 },
                ]}
              >
                {index + 1}
              </Text>
            </View>

            <View style={styles.wpTitleContainer}>
              <Text style={[styles.wpLocation, isDakar && { color: '#0284C7', fontSize: 18 }]}>
                {waypoint.location?.city || 'Unknown'}
                {getLocationSuffix()}
              </Text>
              <Text style={styles.wpCode}>
                {waypoint.location?.countryCode || ''}
              </Text>
            </View>

            {/* Status badge */}
            <View style={[styles.wpStatusBadge, { backgroundColor: `${statusColor}${isDark ? '35' : '15'}` }]}>
              <Ionicons
                name={getExtendedStatusIcon(waypoint.status as ExtendedWaypointStatus) as any}
                size={14}
                color={statusColor}
              />
              <Text style={[styles.wpStatusText, { color: statusColor }]} numberOfLines={1}>
                {getExtendedStatusLabel(waypoint.status as ExtendedWaypointStatus)}
              </Text>
            </View>
          </View>

          {/* Transport type & current indicator */}
          <View style={styles.wpTypeRow}>
            <View style={styles.wpTypeBadge}>
              <Ionicons
                name={(waypoint.segmentType === 'SEA' ? 'boat' :
                      waypoint.segmentType === 'AIR' ? 'airplane' :
                      waypoint.segmentType === 'ROAD' ? 'car' : 'cube') as any}
                size={12}
                color={colors.text.secondary}
              />
              <Text style={styles.wpTypeBadgeText}>
                {waypoint.segmentType || 'Transport'}
              </Text>
            </View>

            {isCurrent && (
              <View style={styles.currentBadge}>
                <Text style={styles.currentBadgeText}>POSITION ACTUELLE</Text>
              </View>
            )}
          </View>

          {/* Date info */}
          <View style={styles.wpQuickInfo}>
            {waypoint.actualArrival ? (
              <View style={styles.wpInfoItem}>
                <Ionicons name="calendar" size={12} color="#10B981" />
                <Text style={styles.wpInfoText}>
                  Arrivé: {formatDateShort(waypoint.actualArrival)}
                </Text>
              </View>
            ) : waypoint.estimatedArrival ? (
              <View style={styles.wpInfoItem}>
                <Ionicons name="time-outline" size={12} color="#F59E0B" />
                <Text style={styles.wpInfoText}>
                  Est. arrivée: {formatDateShort(waypoint.estimatedArrival)}
                </Text>
              </View>
            ) : null}
          </View>

          {/* Expand indicator */}
          <View style={styles.wpExpandIndicator}>
            <Animated.View style={chevronStyle}>
              <Ionicons
                name="chevron-down"
                size={18}
                color={colors.text.secondary}
              />
            </Animated.View>
          </View>

          {/* Expanded details */}
          {isExpanded && (
            <View style={styles.wpDetails}>
              <View style={styles.wpDetailDivider} />

              {waypoint.estimatedDeparture && (
                <View style={styles.wpDetailRow}>
                  <Text style={styles.wpDetailLabel}>Départ estimé</Text>
                  <Text style={styles.wpDetailValue}>
                    {formatDateShort(waypoint.estimatedDeparture)}
                  </Text>
                </View>
              )}
              {waypoint.actualDeparture && (
                <View style={styles.wpDetailRow}>
                  <Text style={styles.wpDetailLabel}>Départ réel</Text>
                  <Text style={styles.wpDetailValue}>
                    {formatDateShort(waypoint.actualDeparture)}
                  </Text>
                </View>
              )}
              {waypoint.estimatedArrival && (
                <View style={styles.wpDetailRow}>
                  <Text style={styles.wpDetailLabel}>Arrivée estimée</Text>
                  <Text style={styles.wpDetailValue}>
                    {formatDateShort(waypoint.estimatedArrival)}
                  </Text>
                </View>
              )}
              {waypoint.actualArrival && (
                <View style={styles.wpDetailRow}>
                  <Text style={styles.wpDetailLabel}>Arrivée réelle</Text>
                  <Text style={styles.wpDetailValue}>
                    {formatDateShort(waypoint.actualArrival)}
                  </Text>
                </View>
              )}
              {waypoint.seaDetails?.vesselName && (
                <View style={styles.wpDetailRow}>
                  <Text style={styles.wpDetailLabel}>Navire</Text>
                  <Text style={styles.wpDetailValue}>
                    {waypoint.seaDetails.vesselName}
                  </Text>
                </View>
              )}
              {waypoint.seaDetails?.carrier && (
                <View style={styles.wpDetailRow}>
                  <Text style={styles.wpDetailLabel}>Transporteur</Text>
                  <Text style={styles.wpDetailValue}>
                    {waypoint.seaDetails.carrier}
                  </Text>
                </View>
              )}
              {waypoint.seaDetails?.terminal && (
                <View style={styles.wpDetailRow}>
                  <Text style={styles.wpDetailLabel}>Terminal</Text>
                  <Text style={styles.wpDetailValue}>
                    {waypoint.seaDetails.terminal}
                  </Text>
                </View>
              )}
              {waypoint.roadDetails?.transporterName && (
                <View style={styles.wpDetailRow}>
                  <Text style={styles.wpDetailLabel}>Transporteur</Text>
                  <Text style={styles.wpDetailValue}>
                    {waypoint.roadDetails.transporterName}
                  </Text>
                </View>
              )}
              {waypoint.roadDetails?.borderCrossing && (
                <View style={styles.wpDetailRow}>
                  <Text style={styles.wpDetailLabel}>Frontière</Text>
                  <Text style={styles.wpDetailValue}>
                    {waypoint.roadDetails.borderCrossing}
                  </Text>
                </View>
              )}
              {waypoint.description ? (
                <View style={styles.wpDetailRow}>
                  <Text style={styles.wpDetailLabel}>Description</Text>
                  <Text style={[styles.wpDetailValue, { flex: 1, textAlign: 'right' }]}>
                    {waypoint.description}
                  </Text>
                </View>
              ) : null}
              {waypoint.notes ? (
                <View style={styles.wpNotes}>
                  <Ionicons name="chatbubble-outline" size={12} color={colors.text.secondary} />
                  <Text style={styles.wpNotesText}>{waypoint.notes}</Text>
                </View>
              ) : null}
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
