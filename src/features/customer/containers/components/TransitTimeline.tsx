/**
 * TransitTimeline - Customer-facing transit timeline
 * Simplified view showing journey progress with current location highlighted
 * Updated: Shows Dakar as main port with road route and prominent consignee section
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Card, Divider } from 'react-native-paper';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import {
  ContainerWaypoint,
  WAYPOINT_STATUS_COLORS,
  WAYPOINT_TYPE_ICONS,
  TRANSPORT_MODE_ICONS,
} from '../types';
import { WaypointCard } from './WaypointCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface TransitTimelineProps {
  waypoints: ContainerWaypoint[];
  currentWaypointIndex: number;
  containerNumber: string;
  lastUpdateTimestamp?: string;
  consignee?: {
    name: string;
    phone: string;
    warehouseAddress: string;
    businessHours?: string;
  };
}

export const TransitTimeline: React.FC<TransitTimelineProps> = ({
  waypoints,
  currentWaypointIndex,
  containerNumber,
  lastUpdateTimestamp,
  consignee,
}) => {
  // Split waypoints into categories
  const { completedWaypoints, currentWaypoint, upcomingWaypoints } = (() => {
    const completed = waypoints.slice(0, currentWaypointIndex);
    const current = waypoints[currentWaypointIndex] || null;
    const upcoming = waypoints.slice(currentWaypointIndex + 1);
    return { completedWaypoints: completed, currentWaypoint: current, upcomingWaypoints: upcoming };
  })();

  // Calculate progress percentage
  const progressPercentage = (() => {
    if (waypoints.length === 0) return 0;
    return ((currentWaypointIndex + 1) / waypoints.length) * 100;
  })();

  // Get final destination
  const finalDestination = (() => {
    return waypoints[waypoints.length - 1];
  })();

  // Get Dakar waypoint (main port)
  const dakarWaypoint = (() => {
    return waypoints.find(w => 
      w.locationCode === 'DKR' || w.location.toLowerCase().includes('dakar')
    );
  })();

  // Format timestamp
  const formatTimestamp = (timestamp?: string): string => {
    if (!timestamp) return '';
    try {
      return format(new Date(timestamp), 'dd MMM yyyy, HH:mm', { locale: fr });
    } catch {
      return timestamp;
    }
  };

  // Get estimated arrival at final destination
  const getEstimatedArrival = (): string => {
    if (finalDestination?.estimatedArrival) {
      return formatTimestamp(finalDestination.estimatedArrival);
    }
    if (finalDestination?.actualArrival) {
      return formatTimestamp(finalDestination.actualArrival);
    }
    return 'Non disponible';
  };

  const callNumber = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Card */}
      <Animated.View entering={FadeInUp.delay(100)} style={styles.headerCard}>
        <LinearGradient
          colors={[Theme.primary[600], Theme.primary[800]]}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerTop}>
            <View style={styles.headerIcon}>
              <Ionicons name="navigate" size={24} color={Theme.primary[600]} />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerLabel}>Container</Text>
              <Text style={styles.headerTitle}>{containerNumber}</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progressPercentage}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>{Math.round(progressPercentage)}% complété</Text>
          </View>

          {/* Journey Stats */}
          <View style={styles.journeyStats}>
            <View style={styles.statItem}>
              <Ionicons name="location" size={16} color="rgba(255,255,255,0.8)" />
              <Text style={styles.statText}>
                {completedWaypoints.length + (currentWaypoint ? 1 : 0)} / {waypoints.length} étapes
              </Text>
            </View>
            {lastUpdateTimestamp && (
              <View style={styles.statItem}>
                <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.statText}>
                  Mis à jour: {formatTimestamp(lastUpdateTimestamp)}
                </Text>
              </View>
            )}
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Route Flow - Dakar Route */}
      <Animated.View entering={FadeInUp.delay(150)} style={styles.routeFlowCard}>
        <LinearGradient
          colors={['#E0F2FE', '#F0F9FF']}
          style={styles.routeFlowGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.routeFlowHeader}>
            <Ionicons name="trail-sign" size={20} color="#0284C7" />
            <Text style={styles.routeFlowTitle}>Parcours de votre conteneur</Text>
          </View>
          
          {/* Route Flow: Nansha → [Transit] → DAKAR → Diboli → Bamako */}
          <View style={styles.routeFlowVisual}>
            {/* Nansha */}
            <View style={styles.routeFlowItem}>
              <View style={[styles.routeFlowDot, { backgroundColor: '#0EA5E9' }]} />
              <Text style={styles.routeFlowText}>Nansha</Text>
              <Text style={styles.routeFlowSubtext}>Chine</Text>
            </View>
            
            <View style={styles.routeFlowArrow}>
              <Ionicons name="arrow-forward" size={14} color="#94A3B8" />
            </View>
            
            {/* Transit Icon */}
            <View style={styles.routeFlowTransit}>
              <Ionicons name="boat" size={18} color="#64748B" />
              <Text style={styles.routeFlowTransitText}>[Transit]</Text>
            </View>
            
            <View style={styles.routeFlowArrow}>
              <Ionicons name="arrow-forward" size={14} color="#94A3B8" />
            </View>
            
            {/* Dakar - Highlighted */}
            <View style={[styles.routeFlowItem, styles.routeFlowHighlight]}>
              <View style={[styles.routeFlowDot, styles.routeFlowDotDakar]}>
                <Ionicons name="boat" size={12} color="#FFF" />
              </View>
              <Text style={[styles.routeFlowText, styles.routeFlowTextHighlight]}>DAKAR</Text>
              <Text style={styles.routeFlowSubtext}>Port d'arrivée</Text>
              <View style={styles.mainPortTag}>
                <Text style={styles.mainPortTagText}>PRINCIPAL</Text>
              </View>
            </View>
            
            <View style={styles.routeFlowArrow}>
              <Ionicons name="arrow-forward" size={14} color="#94A3B8" />
            </View>
            
            {/* Diboli */}
            <View style={styles.routeFlowItem}>
              <View style={[styles.routeFlowDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={styles.routeFlowText}>Diboli</Text>
              <Text style={styles.routeFlowSubtext}>Frontière</Text>
            </View>
            
            <View style={styles.routeFlowArrow}>
              <Ionicons name="arrow-forward" size={14} color="#94A3B8" />
            </View>
            
            {/* Bamako */}
            <View style={[styles.routeFlowItem, styles.routeFlowFinal]}>
              <View style={[styles.routeFlowDot, { backgroundColor: '#8B5CF6' }]}>
                <Ionicons name="home" size={10} color="#FFF" />
              </View>
              <Text style={styles.routeFlowText}>Bamako</Text>
              <Text style={styles.routeFlowSubtext}>Retrait</Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Current Location Section */}
      {currentWaypoint && (
        <Animated.View entering={FadeInUp.delay(200)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.currentLocationBadge}>
              <Ionicons name="radio-button-on" size={16} color={Theme.status.info} />
              <Text style={styles.currentLocationText}>POSITION ACTUELLE</Text>
            </View>
          </View>
          <WaypointCard
            waypoint={currentWaypoint}
            isCurrent={true}
            isCompleted={false}
          />
        </Animated.View>
      )}

      {/* Journey Map Visualization */}
      {waypoints.some((w) => w.coordinates) && (
        <Animated.View entering={FadeInUp.delay(300)} style={styles.mapSection}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="map-outline" size={18} color={Theme.neutral[600]} />
            <Text style={styles.sectionTitle}>Aperçu du Parcours</Text>
          </View>
          <View style={styles.mapPlaceholder}>
            <LinearGradient
              colors={['#E0F2FE', '#F0F9FF']}
              style={styles.mapGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="map" size={48} color={Theme.status.info} />
              <Text style={styles.mapPlaceholderText}>Carte du Trajet</Text>
              <Text style={styles.mapPlaceholderSubtext}>
                {waypoints.filter((w) => w.coordinates).length} points de localisation disponibles
              </Text>
            </LinearGradient>
          </View>
        </Animated.View>
      )}

      {/* Upcoming Waypoints Section */}
      {upcomingWaypoints.length > 0 && (
        <Animated.View entering={FadeInUp.delay(400)} style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="time-outline" size={18} color={Theme.neutral[600]} />
            <Text style={styles.sectionTitle}>Prochaines Étapes</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{upcomingWaypoints.length}</Text>
            </View>
          </View>
          {upcomingWaypoints.slice(0, 3).map((waypoint, index) => (
            <WaypointCard
              key={`upcoming-${waypoint.locationCode}-${index}`}
              waypoint={waypoint}
              isCurrent={false}
              isCompleted={false}
            />
          ))}
          {upcomingWaypoints.length > 3 && (
            <View style={styles.moreWaypoints}>
              <Text style={styles.moreWaypointsText}>
                +{upcomingWaypoints.length - 3} étapes supplémentaires
              </Text>
            </View>
          )}
        </Animated.View>
      )}

      {/* Completed Waypoints Section (Collapsed) */}
      {completedWaypoints.length > 0 && (
        <Animated.View entering={FadeInUp.delay(500)} style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="checkmark-circle" size={18} color={Theme.status.success} />
            <Text style={styles.sectionTitle}>Étapes Complétées</Text>
            <View style={[styles.badge, styles.badgeSuccess]}>
              <Text style={[styles.badgeText, styles.badgeTextSuccess]}>
                {completedWaypoints.length}
              </Text>
            </View>
          </View>
          {/* Show only the last completed waypoint */}
          {completedWaypoints.length > 0 && (
            <WaypointCard
              waypoint={completedWaypoints[completedWaypoints.length - 1]}
              isCurrent={false}
              isCompleted={true}
            />
          )}
          {completedWaypoints.length > 1 && (
            <View style={styles.moreWaypoints}>
              <Text style={styles.moreWaypointsText}>
                +{completedWaypoints.length - 1} étapes précédentes complétées
              </Text>
            </View>
          )}
        </Animated.View>
      )}

      {/* Estimated Arrival Card */}
      <Animated.View entering={FadeInUp.delay(600)} style={styles.arrivalCard}>
        <LinearGradient
          colors={['#FEF3C7', '#FFFBEB']}
          style={styles.arrivalGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.arrivalIconContainer}>
            <Ionicons name="flag" size={28} color={COLORS.orange} />
          </View>
          <View style={styles.arrivalContent}>
            <Text style={styles.arrivalLabel}>Arrivée Estimée à Destination</Text>
            <Text style={styles.arrivalValue}>{getEstimatedArrival()}</Text>
            {finalDestination?.location && (
              <Text style={styles.arrivalDestination}>
                {finalDestination.location} ({finalDestination.locationCode})
              </Text>
            )}
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Journey Summary */}
      <Animated.View entering={FadeInUp.delay(700)} style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Résumé du Voyage</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Ionicons name="navigate-outline" size={20} color={Theme.primary[500]} />
            <Text style={styles.summaryLabel}>Départ</Text>
            <Text style={styles.summaryValue}>
              {waypoints[0]?.location || 'N/A'}
            </Text>
          </View>
          <Ionicons name="arrow-forward" size={20} color={Theme.neutral[400]} />
          <View style={styles.summaryItem}>
            <Ionicons name="flag-outline" size={20} color={Theme.status.success} />
            <Text style={styles.summaryLabel}>Arrivée</Text>
            <Text style={styles.summaryValue}>
              {finalDestination?.location || 'N/A'}
            </Text>
          </View>
        </View>
      </Animated.View>

      {/* Dakar Port Info Card */}
      {dakarWaypoint && (
        <Animated.View entering={FadeInUp.delay(750)} style={styles.dakarInfoCard}>
          <LinearGradient
            colors={['#D1FAE5', '#ECFDF5']}
            style={styles.dakarInfoGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.dakarInfoHeader}>
              <Ionicons name="boat" size={24} color="#059669" />
              <Text style={styles.dakarInfoTitle}>Port d'Arrivée Principal</Text>
            </View>
            <Text style={styles.dakarInfoText}>
              Votre conteneur arrive à <Text style={styles.dakarInfoHighlight}>Dakar, Sénégal</Text>. 
              Après le dédouanement, il continuera par route vers le Mali.
            </Text>
            {dakarWaypoint.estimatedArrival && (
              <Text style={styles.dakarInfoETA}>
                Arrivée estimée à Dakar: {formatTimestamp(dakarWaypoint.estimatedArrival)}
              </Text>
            )}
          </LinearGradient>
        </Animated.View>
      )}

      {/* Pickup Card with Purple Gradient */}
      {consignee && (
        <Animated.View entering={FadeInUp.delay(800)}>
          <Card style={styles.pickupCard}>
            <LinearGradient 
              colors={['#8B5CF6', '#7C3AED']}
              style={styles.pickupGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Card.Content>
                <View style={styles.pickupHeader}>
                  <Ionicons name="location" size={28} color="#FFF" />
                  <Text style={styles.pickupTitle}>📍 POINT DE RETRAIT</Text>
                </View>
                
                {/* Warehouse Address */}
                <Text style={styles.warehouseName}>ChinaLink Express Warehouse</Text>
                <Text style={styles.warehouseAddress}>Bamako, Mali</Text>
                
                <Divider style={styles.divider} />
                
                {/* Consignee Info */}
                <View style={styles.consigneeSection}>
                  <Text style={styles.consigneeLabel}>👤 Votre consigné:</Text>
                  <Text style={styles.consigneeName}>{consignee.name}</Text>
                  
                  {/* Call Button */}
                  <TouchableOpacity 
                    style={styles.phoneButton}
                    onPress={() => callNumber(consignee.phone)}
                  >
                    <Ionicons name="call" size={20} color="#7C3AED" />
                    <Text style={styles.phoneText}>{consignee.phone}</Text>
                  </TouchableOpacity>
                  
                  {/* Business Hours */}
                  <View style={styles.hoursRow}>
                    <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.8)" />
                    <Text style={styles.hours}>
                      {consignee.businessHours || 'Lun-Ven: 8h-17h | Sam: 9h-13h'}
                    </Text>
                  </View>
                  
                  {/* Warehouse Address */}
                  <View style={styles.addressRow}>
                    <Ionicons name="map-marker" size={16} color="rgba(255,255,255,0.8)" />
                    <Text style={styles.addressText}>{consignee.warehouseAddress}</Text>
                  </View>
                </View>
              </Card.Content>
            </LinearGradient>
          </Card>
        </Animated.View>
      )}

      {/* Footer Spacer */}
      <View style={styles.footerSpacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
  },
  headerCard: {
    marginHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.lg,
    borderRadius: Theme.radius['2xl'],
    overflow: 'hidden',
    ...Theme.shadows.md,
  },
  headerGradient: {
    padding: Theme.spacing.xl,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  headerText: {
    flex: 1,
  },
  headerLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    marginTop: 2,
  },
  progressContainer: {
    marginBottom: Theme.spacing.lg,
  },
  progressBackground: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: Theme.radius.full,
  },
  progressText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginTop: Theme.spacing.sm,
    fontWeight: '600',
  },
  journeyStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  statText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  routeFlowCard: {
    marginHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
    ...Theme.shadows.sm,
  },
  routeFlowGradient: {
    padding: Theme.spacing.lg,
  },
  routeFlowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  routeFlowTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0369A1',
    marginLeft: Theme.spacing.sm,
  },
  routeFlowVisual: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.sm,
  },
  routeFlowItem: {
    alignItems: 'center',
    paddingHorizontal: 4,
    minWidth: 55,
  },
  routeFlowHighlight: {
    backgroundColor: '#D1FAE5',
    borderRadius: Theme.radius.md,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  routeFlowFinal: {
    backgroundColor: '#EDE9FE',
    borderRadius: Theme.radius.md,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  routeFlowDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 2,
  },
  routeFlowDotDakar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeFlowText: {
    fontSize: 11,
    fontWeight: '600',
    color: Theme.neutral[700],
    marginTop: 2,
  },
  routeFlowTextHighlight: {
    color: '#059669',
    fontSize: 13,
    fontWeight: '700',
  },
  routeFlowSubtext: {
    fontSize: 9,
    color: Theme.neutral[500],
  },
  routeFlowTransit: {
    alignItems: 'center',
  },
  routeFlowTransitText: {
    fontSize: 8,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  routeFlowArrow: {
    paddingHorizontal: 2,
  },
  mainPortTag: {
    backgroundColor: '#10B981',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: Theme.radius.full,
    marginTop: 2,
  },
  mainPortTagText: {
    fontSize: 7,
    fontWeight: '800',
    color: '#FFF',
  },
  section: {
    marginTop: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.lg,
  },
  sectionHeader: {
    marginBottom: Theme.spacing.md,
  },
  currentLocationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Theme.status.info}15`,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radius.full,
    alignSelf: 'flex-start',
    gap: Theme.spacing.xs,
  },
  currentLocationText: {
    fontSize: 12,
    fontWeight: '700',
    color: Theme.status.info,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[700],
    flex: 1,
  },
  badge: {
    backgroundColor: Theme.neutral[200],
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.full,
  },
  badgeSuccess: {
    backgroundColor: `${Theme.status.success}20`,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Theme.neutral[600],
  },
  badgeTextSuccess: {
    color: Theme.status.success,
  },
  mapSection: {
    marginTop: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.lg,
  },
  mapPlaceholder: {
    height: 160,
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
  },
  mapGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  mapPlaceholderText: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.status.info,
  },
  mapPlaceholderSubtext: {
    fontSize: 12,
    color: Theme.neutral[500],
  },
  moreWaypoints: {
    backgroundColor: Theme.neutral[100],
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: Theme.radius.lg,
    alignItems: 'center',
    marginTop: Theme.spacing.sm,
  },
  moreWaypointsText: {
    fontSize: 13,
    color: Theme.neutral[500],
    fontWeight: '500',
  },
  arrivalCard: {
    marginHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
    ...Theme.shadows.sm,
  },
  arrivalGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  arrivalIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrivalContent: {
    flex: 1,
  },
  arrivalLabel: {
    fontSize: 12,
    color: COLORS.orange,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  arrivalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.DarkGrey,
    marginTop: 2,
  },
  arrivalDestination: {
    fontSize: 13,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  summaryCard: {
    backgroundColor: Theme.neutral.white,
    marginHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.lg,
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    ...Theme.shadows.sm,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.neutral[600],
    marginBottom: Theme.spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontSize: 11,
    color: Theme.neutral[500],
    marginTop: Theme.spacing.xs,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginTop: 2,
  },
  dakarInfoCard: {
    marginHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
    ...Theme.shadows.sm,
  },
  dakarInfoGradient: {
    padding: Theme.spacing.lg,
  },
  dakarInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  dakarInfoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
    marginLeft: Theme.spacing.sm,
  },
  dakarInfoText: {
    fontSize: 13,
    color: Theme.neutral[700],
    lineHeight: 18,
  },
  dakarInfoHighlight: {
    fontWeight: '700',
    color: '#059669',
  },
  dakarInfoETA: {
    fontSize: 12,
    color: Theme.neutral[600],
    marginTop: Theme.spacing.sm,
    fontStyle: 'italic',
  },
  pickupCard: {
    marginHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
    ...Theme.shadows.md,
  },
  pickupGradient: {
    padding: Theme.spacing.lg,
  },
  pickupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  pickupTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFF',
    marginLeft: Theme.spacing.sm,
    letterSpacing: 0.5,
  },
  warehouseName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFF',
  },
  warehouseAddress: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  divider: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginVertical: Theme.spacing.md,
  },
  consigneeSection: {
    marginTop: Theme.spacing.sm,
  },
  consigneeLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  consigneeName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: Theme.spacing.md,
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radius.lg,
    alignSelf: 'flex-start',
    marginBottom: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  phoneText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#7C3AED',
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.xs,
  },
  hours: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Theme.spacing.sm,
  },
  addressText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    flex: 1,
  },
  footerSpacer: {
    height: Theme.spacing['4xl'],
  },
});

export default TransitTimeline;
