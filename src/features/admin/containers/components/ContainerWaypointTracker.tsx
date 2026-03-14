/**
 * ContainerWaypointTracker - Comprehensive waypoint tracker for admin use
 * Visual timeline showing all waypoints with status indicators and expandable cards
 * Updated: Port-specific status actions for different locations
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { Card, Button, Divider } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import {
  ContainerWaypoint,
  WAYPOINT_STATUS_COLORS,
  WAYPOINT_STATUS_LABELS,
  SEGMENT_TYPE_ICONS,
  SEGMENT_TYPE_LABELS,
  FinalDestination,
  ConsigneeInfo,
} from '../types';
import {
  ExtendedWaypointStatus,
  getLocationCategory,
  getExtendedStatusLabel,
  getExtendedStatusColor,
  getExtendedStatusIcon,
  getQuickActions,
  isValidStatusTransition,
  LocationCategory,
} from '../types/waypointStatus';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface ContainerWaypointTrackerProps {
  waypoints: ContainerWaypoint[];
  currentWaypointIndex: number;
  onMarkArrived?: (waypointIndex: number, status?: ExtendedWaypointStatus) => void;
  onMarkDeparted?: (waypointIndex: number, status?: ExtendedWaypointStatus) => void;
  onAddNotes?: (waypointIndex: number) => void;
  onUpdateInfo?: (waypointIndex: number) => void;
  onUpdateStatus?: (waypointIndex: number, status: ExtendedWaypointStatus) => void;
  containerNumber: string;
  finalDestination?: FinalDestination;
  consignee?: ConsigneeInfo;
}

export const ContainerWaypointTracker: React.FC<ContainerWaypointTrackerProps> = ({
  waypoints,
  currentWaypointIndex,
  onMarkArrived,
  onMarkDeparted,
  onAddNotes,
  onUpdateInfo,
  onUpdateStatus,
  containerNumber,
  finalDestination,
  consignee,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const formatDateTime = (dateString?: string): string => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const callConsignee = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  // Check if waypoint is Dakar (main port)
  const isDakarPort = (waypoint: ContainerWaypoint): boolean => {
    const portCode = waypoint.location?.portCode || '';
    const city = waypoint.location?.city || '';
    return portCode === 'SNDKR' || city.toLowerCase().includes('dakar');
  };

  // Check if waypoint is a border crossing
  const isBorder = (waypoint: ContainerWaypoint): boolean => {
    const portCode = waypoint.location?.portCode || '';
    const city = waypoint.location?.city || '';
    return getLocationCategory(portCode) === 'BORDER' || 
           city.toLowerCase().includes('diboli') ||
           city.toLowerCase().includes('border');
  };

  // Check if waypoint is warehouse
  const isWarehouse = (waypoint: ContainerWaypoint): boolean => {
    const portCode = waypoint.location?.portCode || '';
    const city = waypoint.location?.city || '';
    return getLocationCategory(portCode) === 'WAREHOUSE' || 
           city.toLowerCase().includes('bamako');
  };

  // Get location category display
  const getLocationCategoryDisplay = (waypoint: ContainerWaypoint): { label: string; color: string; icon: string } | null => {
    const portCode = waypoint.location?.portCode || '';
    const category = getLocationCategory(portCode);
    
    switch (category) {
      case 'DISCHARGE_PORT':
        return { label: 'PORT', color: '#0EA5E9', icon: 'boat' };
      case 'BORDER':
        return { label: 'FRONTIÈRE', color: '#F59E0B', icon: 'flag' };
      case 'WAREHOUSE':
        return { label: 'ENTREPÔT', color: '#8B5CF6', icon: 'warehouse' };
      case 'LOADING_PORT':
        return { label: 'CHARGEMENT', color: '#10B981', icon: 'cube' };
      case 'TRANSIT_PORT':
        return { label: 'TRANSIT', color: '#6366F1', icon: 'git-branch' };
      default:
        return null;
    }
  };

  // Get route display info
  const getRouteDisplay = (waypoint: ContainerWaypoint, index: number): { icon: string; label: string } | null => {
    const portCode = waypoint.location?.portCode || '';
    const category = getLocationCategory(portCode);
    
    // Discharge port (Dakar, Lomé, etc.)
    if (category === 'DISCHARGE_PORT') {
      return { icon: 'boat', label: 'Port d\'arrivée - DÉCHARGEMENT' };
    }
    // Border
    if (category === 'BORDER') {
      return { icon: 'flag', label: 'Frontière (Douane)' };
    }
    // Warehouse
    if (category === 'WAREHOUSE') {
      return { icon: 'home', label: 'Destination Finale - Bamako' };
    }
    // Road segment from discharge port
    if (waypoint.segmentType === 'ROAD' && index > 0) {
      const prevWaypoint = waypoints[index - 1];
      if (prevWaypoint && getLocationCategory(prevWaypoint.location?.portCode || '') === 'DISCHARGE_PORT') {
        return { icon: 'car', label: 'Transport Routier' };
      }
    }
    return null;
  };

  // Handle quick action press
  const handleQuickAction = (waypointIndex: number, actionStatus: ExtendedWaypointStatus) => {
    const waypoint = waypoints[waypointIndex];
    const currentStatus = waypoint.status as ExtendedWaypointStatus;
    const portCode = waypoint.location?.portCode || '';

    if (!isValidStatusTransition(portCode, currentStatus, actionStatus)) {
      Alert.alert(
        'Transition non valide',
        `Impossible de passer de ${getExtendedStatusLabel(currentStatus)} à ${getExtendedStatusLabel(actionStatus)}`
      );
      return;
    }

    if (onUpdateStatus) {
      onUpdateStatus(waypointIndex, actionStatus);
    } else if (actionStatus === 'ARRIVED_AT_PORT' && onMarkArrived) {
      onMarkArrived(waypointIndex, actionStatus);
    } else if ((actionStatus === 'DEPARTED' || actionStatus === 'COMPLETED') && onMarkDeparted) {
      onMarkDeparted(waypointIndex, actionStatus);
    }
  };

  // Render port-specific action buttons
  const renderPortSpecificActions = (waypoint: ContainerWaypoint, index: number) => {
    const portCode = waypoint.location?.portCode || '';
    const currentStatus = waypoint.status as ExtendedWaypointStatus;
    const quickActions = getQuickActions(portCode, currentStatus);

    if (quickActions.length === 0) return null;

    return (
      <View style={styles.portActionsContainer}>
        <Text style={styles.portActionsTitle}>Actions disponibles:</Text>
        <View style={styles.portActionsGrid}>
          {quickActions.slice(0, 3).map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.portActionButton, { backgroundColor: action.color }]}
              onPress={() => {
                if (action.confirmationMessage) {
                  Alert.alert(
                    'Confirmer',
                    action.confirmationMessage,
                    [
                      { text: 'Annuler', style: 'cancel' },
                      { 
                        text: 'Confirmer', 
                        onPress: () => handleQuickAction(index, action.targetStatus)
                      },
                    ]
                  );
                } else {
                  handleQuickAction(index, action.targetStatus);
                }
              }}
            >
              <Ionicons name={action.icon as any} size={16} color="#FFF" />
              <Text style={styles.portActionText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Animated.View entering={FadeInUp.delay(100)} style={styles.header}>
        <LinearGradient
          colors={[Theme.primary[600], Theme.primary[800]]}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name="map" size={28} color="#FFF" />
          <Text style={styles.headerTitle}>Suivi du Parcours</Text>
          <Text style={styles.headerSubtitle}>{containerNumber}</Text>
        </LinearGradient>
      </Animated.View>

      {/* Progress Summary */}
      <Animated.View entering={FadeInUp.delay(200)} style={styles.progressSummary}>
        <View style={styles.progressItem}>
          <Text style={styles.progressNumber}>{currentWaypointIndex + 1}</Text>
          <Text style={styles.progressLabel}>Étape Actuelle</Text>
        </View>
        <View style={styles.progressDivider} />
        <View style={styles.progressItem}>
          <Text style={styles.progressNumber}>{waypoints.length}</Text>
          <Text style={styles.progressLabel}>Total Étapes</Text>
        </View>
        <View style={styles.progressDivider} />
        <View style={styles.progressItem}>
          <Text style={styles.progressNumber}>
            {Math.round(((currentWaypointIndex + 1) / waypoints.length) * 100)}%
          </Text>
          <Text style={styles.progressLabel}>Complété</Text>
        </View>
      </Animated.View>

      {/* Timeline */}
      <View style={styles.timelineContainer}>
        {waypoints.map((waypoint, index) => {
          const isExpanded = expandedIndex === index;
          const isCurrent = index === currentWaypointIndex;
          const isCompleted = index < currentWaypointIndex;
          const isFuture = index > currentWaypointIndex;
          const statusColor = getExtendedStatusColor(waypoint.status as ExtendedWaypointStatus);
          const segmentIcon = SEGMENT_TYPE_ICONS[waypoint.segmentType];
          const routeDisplay = getRouteDisplay(waypoint, index);
          const isDakar = isDakarPort(waypoint);
          const isBorderPoint = isBorder(waypoint);
          const isWarehousePoint = isWarehouse(waypoint);
          const locationCategory = getLocationCategoryDisplay(waypoint);

          return (
            <Animated.View
              key={`${waypoint.location?.portCode || index}-${index}`}
              entering={FadeInUp.delay(300 + index * 50)}
              style={styles.waypointWrapper}
            >
              {/* Timeline Connector */}
              {index > 0 && (
                <View
                  style={[
                    styles.connector,
                    isCompleted && styles.connectorCompleted,
                    isCurrent && styles.connectorCurrent,
                  ]}
                />
              )}

              {/* Waypoint Card */}
              <TouchableOpacity
                style={[
                  styles.waypointCard,
                  isCurrent && styles.waypointCardCurrent,
                  isCompleted && styles.waypointCardCompleted,
                  isDakar && styles.waypointCardDakar,
                  isBorderPoint && styles.waypointCardBorder,
                  isWarehousePoint && styles.waypointCardWarehouse,
                ]}
                onPress={() => toggleExpand(index)}
                activeOpacity={0.9}
              >
                {/* Status Bar */}
                <View
                  style={[
                    styles.statusBar,
                    { backgroundColor: statusColor },
                    isDakar && styles.statusBarDakar,
                    isBorderPoint && styles.statusBarBorder,
                  ]}
                />

                <View style={styles.waypointContent}>
                  {/* Header Row */}
                  <View style={styles.waypointHeader}>
                    <View style={[styles.waypointNumber, isDakar && styles.waypointNumberDakar]}>
                      <Text style={[styles.waypointNumberText, isDakar && styles.waypointNumberTextDakar]}>
                        {index + 1}
                      </Text>
                    </View>

                    <View style={styles.waypointTitleContainer}>
                      <Text style={[styles.waypointLocation, isDakar && styles.waypointLocationDakar]}>
                        {waypoint.location?.city || waypoint.location?.toString() || 'Unknown'}
                        {isDakar && ' 🚢'}
                        {isBorderPoint && ' 🛂'}
                        {isWarehousePoint && ' 📦'}
                      </Text>
                      <Text style={styles.waypointCode}>
                        {waypoint.location?.portCode || waypoint.location?.countryCode || ''}
                      </Text>
                      {routeDisplay && (
                        <View style={styles.routeDisplayBadge}>
                          <Ionicons name={routeDisplay.icon as any} size={12} color="#FFF" />
                          <Text style={styles.routeDisplayText}>{routeDisplay.label}</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.waypointBadges}>
                      <View
                        style={[
                          styles.statusBadge,
                          { backgroundColor: `${statusColor}20` },
                        ]}
                      >
                        <Ionicons
                          name={getExtendedStatusIcon(waypoint.status as ExtendedWaypointStatus) as any}
                          size={14}
                          color={statusColor}
                        />
                        <Text style={[styles.statusBadgeText, { color: statusColor }]} numberOfLines={1}>
                          {getExtendedStatusLabel(waypoint.status as ExtendedWaypointStatus)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Type & Transport Row */}
                  <View style={styles.typeRow}>
                    <View style={styles.typeBadge}>
                      <Ionicons name={segmentIcon as any} size={12} color={Theme.neutral[500]} />
                      <Text style={styles.typeBadgeText}>
                        {SEGMENT_TYPE_LABELS[waypoint.segmentType]}
                      </Text>
                    </View>
                    {locationCategory && (
                      <View style={[styles.categoryBadge, { backgroundColor: locationCategory.color + '20' }]}>
                        <Ionicons name={locationCategory.icon as any} size={10} color={locationCategory.color} />
                        <Text style={[styles.categoryBadgeText, { color: locationCategory.color }]}>
                          {locationCategory.label}
                        </Text>
                      </View>
                    )}
                    {isCurrent && (
                      <View style={styles.currentIndicator}>
                        <Text style={styles.currentIndicatorText}>POSITION ACTUELLE</Text>
                      </View>
                    )}
                  </View>

                  {/* Quick Info */}
                  <View style={styles.quickInfo}>
                    {waypoint.actualArrival && (
                      <View style={styles.infoItem}>
                        <Ionicons name="calendar" size={12} color={Theme.status.success} />
                        <Text style={styles.infoText}>
                          Arrivé: {formatDate(waypoint.actualArrival)}
                        </Text>
                      </View>
                    )}
                    {!waypoint.actualArrival && waypoint.estimatedArrival && (
                      <View style={styles.infoItem}>
                        <Ionicons name="time-outline" size={12} color={Theme.status.warning} />
                        <Text style={styles.infoText}>
                          Est. arrivée: {formatDate(waypoint.estimatedArrival)}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Expand Indicator */}
                  <View style={styles.expandIndicator}>
                    <Ionicons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color={Theme.neutral[400]}
                    />
                  </View>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <Animated.View entering={FadeIn} style={styles.expandedContent}>
                      <View style={styles.divider} />

                      {/* Times Section */}
                      <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Horaires</Text>
                        <View style={styles.timesGrid}>
                          <View style={styles.timeItem}>
                            <Text style={styles.timeLabel}>Arrivée Estimée</Text>
                            <Text style={styles.timeValue}>
                              {formatDateTime(waypoint.estimatedArrival)}
                            </Text>
                          </View>
                          <View style={styles.timeItem}>
                            <Text style={styles.timeLabel}>Arrivée Réelle</Text>
                            <Text
                              style={[
                                styles.timeValue,
                                !waypoint.actualArrival && styles.timePending,
                              ]}
                            >
                              {waypoint.actualArrival
                                ? formatDateTime(waypoint.actualArrival)
                                : 'En attente'}
                            </Text>
                          </View>
                          <View style={styles.timeItem}>
                            <Text style={styles.timeLabel}>Départ Estimé</Text>
                            <Text style={styles.timeValue}>
                              {formatDateTime(waypoint.estimatedDeparture)}
                            </Text>
                          </View>
                          <View style={styles.timeItem}>
                            <Text style={styles.timeLabel}>Départ Réel</Text>
                            <Text
                              style={[
                                styles.timeValue,
                                !waypoint.actualDeparture && styles.timePending,
                              ]}
                            >
                              {waypoint.actualDeparture
                                ? formatDateTime(waypoint.actualDeparture)
                                : 'En attente'}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* Port-specific Details */}
                      {waypoint.seaDetails && (
                        <View style={styles.section}>
                          <Text style={styles.sectionTitle}>Détails Maritime</Text>
                          {waypoint.seaDetails.vesselName && (
                            <View style={styles.detailRow}>
                              <Ionicons name="boat" size={16} color={Theme.neutral[500]} />
                              <Text style={styles.detailLabel}>Navire:</Text>
                              <Text style={styles.detailValue}>{waypoint.seaDetails.vesselName}</Text>
                            </View>
                          )}
                          {waypoint.seaDetails.carrier && (
                            <View style={styles.detailRow}>
                              <Ionicons name="business" size={16} color={Theme.neutral[500]} />
                              <Text style={styles.detailLabel}>Compagnie:</Text>
                              <Text style={styles.detailValue}>{waypoint.seaDetails.carrier}</Text>
                            </View>
                          )}
                          {waypoint.seaDetails.terminal && (
                            <View style={styles.detailRow}>
                              <Ionicons name="location" size={16} color={Theme.neutral[500]} />
                              <Text style={styles.detailLabel}>Terminal:</Text>
                              <Text style={styles.detailValue}>{waypoint.seaDetails.terminal}</Text>
                            </View>
                          )}
                        </View>
                      )}

                      {waypoint.roadDetails && (
                        <View style={styles.section}>
                          <Text style={styles.sectionTitle}>Détails Routier</Text>
                          {waypoint.roadDetails.transporterName && (
                            <View style={styles.detailRow}>
                              <Ionicons name="car" size={16} color={Theme.neutral[500]} />
                              <Text style={styles.detailLabel}>Transporteur:</Text>
                              <Text style={styles.detailValue}>{waypoint.roadDetails.transporterName}</Text>
                            </View>
                          )}
                          {waypoint.roadDetails.truckPlateNumber && (
                            <View style={styles.detailRow}>
                              <Ionicons name="card" size={16} color={Theme.neutral[500]} />
                              <Text style={styles.detailLabel}>Plaque:</Text>
                              <Text style={styles.detailValue}>{waypoint.roadDetails.truckPlateNumber}</Text>
                            </View>
                          )}
                          {waypoint.roadDetails.borderCrossing && (
                            <View style={styles.detailRow}>
                              <Ionicons name="flag" size={16} color={Theme.neutral[500]} />
                              <Text style={styles.detailLabel}>Frontière:</Text>
                              <Text style={styles.detailValue}>{waypoint.roadDetails.borderCrossing}</Text>
                            </View>
                          )}
                        </View>
                      )}

                      {/* Notes */}
                      {waypoint.notes && (
                        <View style={styles.section}>
                          <Text style={styles.sectionTitle}>Notes</Text>
                          <View style={styles.notesContainer}>
                            <Ionicons
                              name="document-text-outline"
                              size={16}
                              color={Theme.neutral[500]}
                            />
                            <Text style={styles.notesText}>{waypoint.notes}</Text>
                          </View>
                        </View>
                      )}

                      {/* Port-Specific Quick Actions */}
                      {renderPortSpecificActions(waypoint, index)}

                      {/* Legacy Action Buttons (fallback) */}
                      <View style={styles.actionButtons}>
                        {(waypoint.status === 'PENDING' || waypoint.status === 'IN_PROGRESS') && onMarkArrived && (
                          <TouchableOpacity
                            style={[styles.actionButton, styles.actionButtonPrimary]}
                            onPress={() => onMarkArrived(index)}
                          >
                            <Ionicons name="checkmark-circle" size={18} color="#FFF" />
                            <Text style={styles.actionButtonTextPrimary}>
                              Marquer comme Arrivé
                            </Text>
                          </TouchableOpacity>
                        )}
                        {(waypoint.status === 'ARRIVED' || waypoint.status === 'ARRIVED_AT_PORT') && onMarkDeparted && (
                          <TouchableOpacity
                            style={[styles.actionButton, styles.actionButtonPrimary]}
                            onPress={() => onMarkDeparted(index)}
                          >
                            <Ionicons name="rocket" size={18} color="#FFF" />
                            <Text style={styles.actionButtonTextPrimary}>
                              Marquer comme Départ
                            </Text>
                          </TouchableOpacity>
                        )}
                        {onAddNotes && (
                          <TouchableOpacity
                            style={[styles.actionButton, styles.actionButtonSecondary]}
                            onPress={() => onAddNotes(index)}
                          >
                            <Ionicons name="create" size={18} color={Theme.primary[600]} />
                            <Text style={styles.actionButtonTextSecondary}>
                              Ajouter des Notes
                            </Text>
                          </TouchableOpacity>
                        )}
                        {onUpdateInfo && (
                          <TouchableOpacity
                            style={[styles.actionButton, styles.actionButtonSecondary]}
                            onPress={() => onUpdateInfo(index)}
                          >
                            <Ionicons name="refresh" size={18} color={Theme.primary[600]} />
                            <Text style={styles.actionButtonTextSecondary}>
                              Mettre à jour
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </Animated.View>
                  )}
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      {/* Consignee Card */}
      {consignee && (
        <Animated.View entering={FadeInUp.delay(800)}>
          <Card style={styles.consigneeCard}>
            <LinearGradient
              colors={['#8B5CF6', '#7C3AED']}
              style={styles.consigneeGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Card.Content>
                <View style={styles.consigneeHeader}>
                  <Ionicons name="person-circle" size={32} color="#FFF" />
                  <Text style={styles.consigneeTitle}>👤 Consigné pour le retrait</Text>
                </View>
                
                <View style={styles.consigneeDetails}>
                  <Text style={styles.consigneeName}>{consignee.name}</Text>
                  <View style={styles.consigneeRow}>
                    <Ionicons name="call" size={16} color="rgba(255,255,255,0.8)" />
                    <Text style={styles.consigneePhone}>{consignee.phone}</Text>
                  </View>
                  <View style={styles.consigneeRow}>
                    <Ionicons name="location" size={16} color="rgba(255,255,255,0.8)" />
                    <Text style={styles.consigneeAddress}>{consignee.warehouseAddress}</Text>
                  </View>
                </View>

                <Button
                  mode="contained"
                  onPress={() => callConsignee(consignee.phone)}
                  style={styles.callButton}
                  labelStyle={styles.callButtonLabel}
                  icon="phone"
                >
                  Appeler le consigné
                </Button>
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
  header: {
    marginHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.lg,
    borderRadius: Theme.radius['2xl'],
    overflow: 'hidden',
    ...Theme.shadows.md,
  },
  headerGradient: {
    padding: Theme.spacing.xl,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    marginTop: Theme.spacing.sm,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: Theme.spacing.xs,
  },
  progressSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Theme.neutral.white,
    marginHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.lg,
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    ...Theme.shadows.sm,
  },
  progressItem: {
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: Theme.primary[600],
  },
  progressLabel: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: Theme.spacing.xs,
  },
  progressDivider: {
    width: 1,
    height: 40,
    backgroundColor: Theme.neutral[200],
  },
  timelineContainer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
  },
  waypointWrapper: {
    position: 'relative',
  },
  connector: {
    position: 'absolute',
    left: 35,
    top: -20,
    width: 2,
    height: 30,
    backgroundColor: Theme.neutral[300],
    zIndex: 0,
  },
  connectorCompleted: {
    backgroundColor: Theme.status.success,
  },
  connectorCurrent: {
    backgroundColor: Theme.status.info,
  },
  waypointCard: {
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius.xl,
    marginBottom: Theme.spacing.md,
    overflow: 'hidden',
    ...Theme.shadows.sm,
  },
  waypointCardCurrent: {
    borderWidth: 2,
    borderColor: Theme.status.info,
    ...Theme.shadows.md,
  },
  waypointCardCompleted: {
    opacity: 0.9,
  },
  waypointCardDakar: {
    borderWidth: 2,
    borderColor: '#0EA5E9',
    ...Theme.shadows.md,
  },
  waypointCardBorder: {
    borderWidth: 2,
    borderColor: '#F59E0B',
    ...Theme.shadows.md,
  },
  waypointCardWarehouse: {
    borderWidth: 2,
    borderColor: '#8B5CF6',
    ...Theme.shadows.md,
  },
  statusBar: {
    height: 4,
    width: '100%',
  },
  statusBarDakar: {
    height: 6,
    backgroundColor: '#0EA5E9',
  },
  statusBarBorder: {
    height: 6,
    backgroundColor: '#F59E0B',
  },
  waypointContent: {
    padding: Theme.spacing.lg,
  },
  waypointHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.md,
  },
  waypointNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Theme.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  waypointNumberDakar: {
    backgroundColor: '#0EA5E9',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  waypointNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.primary[600],
  },
  waypointNumberTextDakar: {
    color: '#FFF',
    fontSize: 18,
  },
  waypointTitleContainer: {
    flex: 1,
  },
  waypointLocation: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  waypointLocationDakar: {
    fontSize: 18,
    color: '#0284C7',
  },
  waypointCode: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  waypointBadges: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.full,
    gap: 4,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  routeDisplayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.primary[600],
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.radius.full,
    marginTop: Theme.spacing.xs,
    alignSelf: 'flex-start',
    gap: 4,
  },
  routeDisplayText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFF',
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
    flexWrap: 'wrap',
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral[100],
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.full,
    gap: 4,
  },
  typeBadgeText: {
    fontSize: 11,
    color: Theme.neutral[600],
    fontWeight: '500',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: Theme.radius.full,
    gap: 4,
  },
  categoryBadgeText: {
    fontSize: 9,
    fontWeight: '700',
  },
  currentIndicator: {
    backgroundColor: Theme.status.info,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: 2,
    borderRadius: Theme.radius.full,
  },
  currentIndicatorText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFF',
  },
  quickInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: Theme.neutral[600],
  },
  expandIndicator: {
    alignItems: 'center',
    marginTop: Theme.spacing.sm,
  },
  expandedContent: {
    marginTop: Theme.spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.neutral[200],
    marginVertical: Theme.spacing.md,
  },
  section: {
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
  timesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
  },
  timeItem: {
    flex: 1,
    minWidth: '45%',
  },
  timeLabel: {
    fontSize: 11,
    color: Theme.neutral[500],
    marginBottom: 2,
  },
  timeValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  timePending: {
    color: Theme.neutral[400],
    fontStyle: 'italic',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
    gap: Theme.spacing.sm,
  },
  detailLabel: {
    fontSize: 12,
    color: Theme.neutral[500],
    width: 80,
  },
  detailValue: {
    flex: 1,
    fontSize: 13,
    color: Theme.neutral[800],
    fontWeight: '500',
  },
  notesContainer: {
    flexDirection: 'row',
    backgroundColor: Theme.neutral[50],
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    gap: Theme.spacing.sm,
  },
  notesText: {
    flex: 1,
    fontSize: 13,
    color: Theme.neutral[700],
  },
  portActionsContainer: {
    backgroundColor: Theme.primary[50],
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.md,
  },
  portActionsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Theme.primary[700],
    marginBottom: Theme.spacing.sm,
  },
  portActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
  },
  portActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radius.lg,
    gap: Theme.spacing.xs,
  },
  portActionText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    gap: Theme.spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    gap: Theme.spacing.sm,
  },
  actionButtonPrimary: {
    backgroundColor: Theme.primary[600],
  },
  actionButtonSecondary: {
    backgroundColor: Theme.primary[50],
    borderWidth: 1,
    borderColor: Theme.primary[200],
  },
  actionButtonTextPrimary: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  actionButtonTextSecondary: {
    color: Theme.primary[600],
    fontSize: 14,
    fontWeight: '600',
  },
  consigneeCard: {
    marginHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
  },
  consigneeGradient: {
    padding: Theme.spacing.md,
  },
  consigneeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  consigneeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    marginLeft: Theme.spacing.sm,
  },
  consigneeDetails: {
    marginBottom: Theme.spacing.md,
  },
  consigneeName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: Theme.spacing.sm,
  },
  consigneeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  consigneePhone: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginLeft: Theme.spacing.sm,
  },
  consigneeAddress: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: Theme.spacing.sm,
    flex: 1,
  },
  callButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'rgba(255,255,255,0.3)',
  },
  callButtonLabel: {
    color: '#FFF',
    fontWeight: '600',
  },
  footerSpacer: {
    height: Theme.spacing['2xl'],
  },
});

export default ContainerWaypointTracker;
