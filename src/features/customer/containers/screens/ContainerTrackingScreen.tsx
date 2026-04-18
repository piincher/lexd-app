/**
 * Container Tracking Screen
 * Maersk-style detailed tracking view with waypoint journey
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {
  Appbar,
  ActivityIndicator,
  Text,
  Button,
  Card,
  Chip,
  useTheme,
  List,
  Portal,
  Dialog,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { RootStackScreenProps } from '@src/navigations/type';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { useGetContainerDetails } from '../hooks/useCustomerContainers';
import { useGetWaypoints } from '@src/shared/hooks/useWaypoints';
import {
  ContainerWaypoint,
  SEGMENT_TYPE_LABELS,
  SEGMENT_TYPE_ICONS,
} from '@src/shared/types/containerWaypoints';
import {
  getExtendedStatusLabel,
  getExtendedStatusColor,
  getExtendedStatusIcon,
  getLocationCategory,
  ExtendedWaypointStatus,
} from '@src/shared/types/waypointStatus';
import { ContainerTimeline } from '../components/ContainerTimeline';
import { CUSTOMER_STATUS_LABELS, CUSTOMER_STATUS_COLORS, CUSTOMER_STATUS_BG_COLORS, SHIPPING_LINE_LABELS, CustomerGoodsInContainer } from '../types';

const ContainerTrackingScreen: React.FC<RootStackScreenProps<'ContainerTracking'>> = ({
  navigation,
  route,
}) => {
  const { containerId } = route.params;
  const theme = useTheme();
  const [contactDialogVisible, setContactDialogVisible] = useState(false);
  const [expandedWaypoint, setExpandedWaypoint] = useState<number | null>(null);

  const {
    data: container,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetContainerDetails(containerId);

  const {
    data: waypointsData,
    isLoading: waypointsLoading,
  } = useGetWaypoints(containerId);

  const handleRefresh = () => {
    refetch();
  };

  const handleCallWarehouse = () => {
    if (container?.pickupContact?.phone) {
      Linking.openURL(`tel:${container.pickupContact.phone}`);
    }
    setContactDialogVisible(false);
  };

  const getShippingModeIcon = (
    mode: 'SEA' | 'AIR'
  ): React.ComponentProps<typeof MaterialCommunityIcons>['name'] => {
    return mode === 'SEA' ? 'ferry' : 'airplane';
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Non disponible';
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
    } catch {
      return dateString;
    }
  };

  const formatDateShort = (dateString?: string): string => {
    if (!dateString) return '-';
    try {
      return format(new Date(dateString), 'dd MMM yyyy', { locale: fr });
    } catch {
      return dateString;
    }
  };

  const formatDateTime = (dateString?: string): string => {
    if (!dateString) return 'Non disponible';
    try {
      return format(new Date(dateString), 'dd MMM yyyy, HH:mm', { locale: fr });
    } catch {
      return dateString;
    }
  };

  const renderGoodsItem = (goods: CustomerGoodsInContainer) => (
    <List.Item
      key={goods._id}
      title={goods.goodsId}
      description={goods.description}
      left={(props) => (
        <List.Icon
          {...props}
          icon="package-variant"
          color={theme.colors.primary}
        />
      )}
      right={() => (
        <View style={styles.goodsRightContent}>
          <Text style={styles.goodsCbm}>{(goods.actualCBM || 0).toFixed(3)} CBM</Text>
          <Chip
            style={{
              backgroundColor:
                goods.status === 'DELIVERED'
                  ? '#DCFCE7'
                  : goods.status === 'READY_FOR_PICKUP'
                  ? '#FEF3C7'
                  : '#E0F2FE',
            }}
            textStyle={{
              color:
                goods.status === 'DELIVERED'
                  ? '#22C55E'
                  : goods.status === 'READY_FOR_PICKUP'
                  ? '#F59E0B'
                  : '#0EA5E9',
              fontSize: 10,
            }}
          >
            {goods.status?.replace(/_/g, ' ') || 'N/A'}
          </Chip>
        </View>
      )}
      style={styles.goodsItem}
    />
  );

  // ============================================
  // Waypoint Journey Renderer
  // ============================================

  const renderWaypointCard = (waypoint: ContainerWaypoint, index: number) => {
    const currentIdx = waypointsData?.currentWaypointIndex ?? -1;
    const isCurrent = index === currentIdx;
    const isCompleted = waypoint.status === 'COMPLETED';
    const isExpanded = expandedWaypoint === index;
    const rawStatusColor = getExtendedStatusColor(waypoint.status as ExtendedWaypointStatus);
    const statusColor = typeof rawStatusColor === 'string' ? rawStatusColor : '#9CA3AF';
    const locationCode = waypoint.location?.portCode || waypoint.location?.countryCode || '';
    const category = getLocationCategory(locationCode);
    const isDakar = category === 'DISCHARGE_PORT';
    const isBorder = category === 'BORDER';
    const isWarehouse = category === 'WAREHOUSE';

    return (
      <View key={waypoint._id || index}>
        {/* Timeline connector */}
        {index > 0 && (
          <View style={styles.timelineConnector}>
            <View
              style={[
                styles.connectorLine,
                isCompleted || index <= currentIdx
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
          onPress={() => setExpandedWaypoint(isExpanded ? null : index)}
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
                  {isDakar ? ' 🚢' : isBorder ? ' 🛂' : isWarehouse ? ' 📦' : ''}
                </Text>
                <Text style={styles.wpCode}>
                  {waypoint.location?.countryCode || ''}
                </Text>
              </View>

              {/* Status badge */}
              <View style={[styles.wpStatusBadge, { backgroundColor: `${statusColor}20` }]}>
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
                  name={(SEGMENT_TYPE_ICONS[waypoint.segmentType] || 'boat') as any}
                  size={12}
                  color="#6B7280"
                />
                <Text style={styles.wpTypeBadgeText}>
                  {SEGMENT_TYPE_LABELS[waypoint.segmentType] || waypoint.segmentType}
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
              <Ionicons
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                size={18}
                color="#9CA3AF"
              />
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
                    <Ionicons name="chatbubble-outline" size={12} color="#6B7280" />
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

  // ============================================
  // Loading & Error States
  // ============================================

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Suivi Container" />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>
            Chargement des détails du container...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError || !container) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Suivi Container" />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={64}
            color={theme.colors.error}
          />
          <Text style={styles.errorTitle}>Erreur de chargement</Text>
          <Text style={styles.errorText}>
            {error?.message || 'Impossible de charger les détails du container.'}
          </Text>
          <Button mode="contained" onPress={() => refetch()} style={styles.retryButton}>
            Réessayer
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const statusColor = CUSTOMER_STATUS_COLORS[container.status] || '#6B7280';
  const statusBgColor = CUSTOMER_STATUS_BG_COLORS[container.status] || '#F3F4F6';
  const waypoints = waypointsData?.waypoints || [];
  const currentWaypointIndex = waypointsData?.currentWaypointIndex ?? -1;
  const progressPercentage = waypointsData?.progressPercentage ?? 0;

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Suivi Container"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={handleRefresh} />
        }
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Card */}
        <Card style={styles.headerCard}>
          <Card.Content>
            <View style={styles.headerRow}>
              <View style={styles.containerIconContainer}>
                <MaterialCommunityIcons
                  name={getShippingModeIcon(container.shippingMode)}
                  size={32}
                  color={theme.colors.primary}
                />
              </View>
              <View style={styles.headerInfo}>
                <Text style={styles.containerNumber}>
                  {container.virtualContainerNumber}
                </Text>
                <Text style={styles.shippingLine}>
                  {SHIPPING_LINE_LABELS[container.shippingLine]}
                </Text>
              </View>
              <Chip
                style={[styles.statusChip, { backgroundColor: statusBgColor }]}
                textStyle={{ color: statusColor, fontWeight: '700' }}
              >
                {CUSTOMER_STATUS_LABELS[container.status]}
              </Chip>
            </View>
          </Card.Content>
        </Card>

        {/* Progress Summary */}
        {waypoints.length > 0 && (
          <Card style={styles.sectionCard}>
            <Card.Content>
              <View style={styles.progressRow}>
                <View style={styles.progressItem}>
                  <Text style={styles.progressValue}>
                    {currentWaypointIndex + 1}
                  </Text>
                  <Text style={styles.progressLabel}>Étape Actuelle</Text>
                </View>
                <View style={styles.progressDivider} />
                <View style={styles.progressItem}>
                  <Text style={styles.progressValue}>{waypoints.length}</Text>
                  <Text style={styles.progressLabel}>Total Étapes</Text>
                </View>
                <View style={styles.progressDivider} />
                <View style={styles.progressItem}>
                  <Text style={[styles.progressValue, { color: '#16A34A' }]}>
                    {Math.round(progressPercentage)}%
                  </Text>
                  <Text style={styles.progressLabel}>Complété</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Waypoint Journey Section */}
        {waypoints.length > 0 && (
          <View style={styles.journeySection}>
            <Text style={styles.journeySectionTitle}>Parcours du Container</Text>
            {waypoints.map((wp, idx) => renderWaypointCard(wp, idx))}
          </View>
        )}

        {/* Estimated Arrival */}
        {container.estimatedArrival && (
          <Card style={styles.sectionCard}>
            <Card.Content>
              <View style={styles.estimatedArrivalContainer}>
                <MaterialCommunityIcons
                  name="calendar-clock"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={styles.estimatedArrivalText}>
                  Arrivée estimée:{' '}
                  <Text style={{ fontFamily: Fonts.bold }}>
                    {formatDate(container.estimatedArrival)}
                  </Text>
                </Text>
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Timeline Details */}
        {container.timeline && (
          <Card style={styles.sectionCard}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Détails Chronologiques</Text>
              {container.timeline.bookedAt && (
                <View style={styles.timelineDetailRow}>
                  <Text style={styles.timelineDetailLabel}>Réservé le</Text>
                  <Text style={styles.timelineDetailValue}>
                    {formatDateTime(container.timeline.bookedAt)}
                  </Text>
                </View>
              )}
              {container.timeline.departedAt && (
                <View style={styles.timelineDetailRow}>
                  <Text style={styles.timelineDetailLabel}>Départ</Text>
                  <Text style={styles.timelineDetailValue}>
                    {formatDateTime(container.timeline.departedAt)}
                  </Text>
                </View>
              )}
              {container.timeline.arrivedAt && (
                <View style={styles.timelineDetailRow}>
                  <Text style={styles.timelineDetailLabel}>Arrivé le</Text>
                  <Text style={styles.timelineDetailValue}>
                    {formatDateTime(container.timeline.arrivedAt)}
                  </Text>
                </View>
              )}
              {container.timeline.readyForPickupAt && (
                <View style={styles.timelineDetailRow}>
                  <Text style={styles.timelineDetailLabel}>Prêt pour retrait</Text>
                  <Text style={styles.timelineDetailValue}>
                    {formatDateTime(container.timeline.readyForPickupAt)}
                  </Text>
                </View>
              )}
              {container.timeline.deliveredAt && (
                <View style={styles.timelineDetailRow}>
                  <Text style={styles.timelineDetailLabel}>Livré le</Text>
                  <Text style={styles.timelineDetailValue}>
                    {formatDateTime(container.timeline.deliveredAt)}
                  </Text>
                </View>
              )}
            </Card.Content>
          </Card>
        )}

        {/* My Goods Section */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.goodsSectionHeader}>
              <Text style={styles.sectionTitle}>
                Mes Marchandises ({container.myGoods?.length || 0})
              </Text>
              <Button
                mode="text"
                onPress={() => navigation.navigate('ClientPackingList', { containerId })}
                icon="file-document-outline"
                compact
              >
                Liste de Colisage
              </Button>
            </View>
            <Text style={styles.goodsSubtitle}>
              Vos marchandises dans ce container
            </Text>
            {container.myGoods?.map(renderGoodsItem)}
          </Card.Content>
        </Card>

        {/* Pickup Info (when ready) */}
        {(container.status === 'READY_FOR_PICKUP' ||
          container.status === 'ARRIVED') && (
          <Card style={[styles.sectionCard, styles.pickupCard]}>
            <Card.Content>
              <View style={styles.pickupHeader}>
                <MaterialCommunityIcons
                  name="information"
                  size={24}
                  color={COLORS.orange}
                />
                <Text style={styles.pickupTitle}>Information de Retrait</Text>
              </View>
              <Text style={styles.pickupText}>
                Votre marchandise est prête pour le retrait. Contactez
                l'entrepôt pour organiser la collecte.
              </Text>
              {container.pickupContact && (
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>
                    Adresse:{' '}
                    <Text style={styles.contactValue}>
                      {container.pickupContact.address}
                    </Text>
                  </Text>
                </View>
              )}
              <Button
                mode="contained"
                onPress={() => setContactDialogVisible(true)}
                style={styles.contactButton}
                icon="phone"
              >
                Contacter l'Entrepôt
              </Button>
            </Card.Content>
          </Card>
        )}

        {/* Help Section */}
        <View style={styles.helpContainer}>
          <Text style={styles.helpText}>
            Une question concernant votre container?
          </Text>
          {/* Chat feature hidden - not in use */}
          {/* <Button
            mode="outlined"
            onPress={() => navigation.navigate('SelectAdminToChatWith')}
            icon="chat"
            style={styles.helpButton}
          >
            Contacter le Support
          </Button> */}
        </View>
      </ScrollView>

      {/* Contact Dialog */}
      <Portal>
        <Dialog
          visible={contactDialogVisible}
          onDismiss={() => setContactDialogVisible(false)}
        >
          <Dialog.Title>Contacter l'Entrepôt</Dialog.Title>
          <Dialog.Content>
            {container?.pickupContact ? (
              <>
                <Text style={styles.dialogText}>
                  <Text style={styles.dialogLabel}>Nom: </Text>
                  {container.pickupContact.name}
                </Text>
                <Text style={styles.dialogText}>
                  <Text style={styles.dialogLabel}>Téléphone: </Text>
                  {container.pickupContact.phone}
                </Text>
                <Text style={styles.dialogText}>
                  <Text style={styles.dialogLabel}>Adresse: </Text>
                  {container.pickupContact.address}
                </Text>
              </>
            ) : (
              <Text>Contactez votre administrateur pour les informations de retrait.</Text>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setContactDialogVisible(false)}>
              Fermer
            </Button>
            {container?.pickupContact?.phone && (
              <Button onPress={handleCallWarehouse} mode="contained">
                Appeler
              </Button>
            )}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 16,
    fontFamily: Fonts.meduim,
    color: COLORS.DimGray,
  },
  errorTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
    marginTop: 16,
  },
  errorText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.DimGray,
    textAlign: 'center',
    marginTop: 8,
  },
  retryButton: {
    marginTop: 24,
  },
  scrollContent: {
    padding: 16,
  },
  headerCard: {
    marginBottom: 16,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  containerNumber: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: COLORS.DarkGrey,
  },
  shippingLine: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: COLORS.DimGray,
    marginTop: 2,
  },
  statusChip: {
    height: 32,
  },

  // Progress summary
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  progressItem: {
    alignItems: 'center',
    flex: 1,
  },
  progressValue: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: COLORS.DarkGrey,
  },
  progressLabel: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: COLORS.DimGray,
    marginTop: 2,
  },
  progressDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
  },

  // Journey section
  journeySection: {
    marginBottom: 16,
  },
  journeySectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: COLORS.DarkGrey,
    marginBottom: 16,
  },

  // Timeline connector
  timelineConnector: {
    alignItems: 'center',
    height: 24,
  },
  connectorLine: {
    width: 3,
    height: 24,
    borderRadius: 2,
  },

  // Waypoint card
  waypointCard: {
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#DCFCE7',
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
    color: COLORS.DarkGrey,
  },
  wpCode: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: COLORS.DimGray,
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
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
  },
  wpTypeBadgeText: {
    fontSize: 11,
    fontFamily: Fonts.meduim,
    color: '#6B7280',
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
    color: '#FFF',
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
    color: '#6B7280',
  },
  wpExpandIndicator: {
    alignItems: 'center',
    marginTop: 6,
  },

  // Expanded waypoint details
  wpDetails: {
    marginTop: 8,
  },
  wpDetailDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
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
    color: COLORS.DimGray,
  },
  wpDetailValue: {
    fontSize: 13,
    fontFamily: Fonts.meduim,
    color: COLORS.DarkGrey,
  },
  wpNotes: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: '#F9FAFB',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  wpNotesText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: '#6B7280',
    flex: 1,
  },

  // Section cards
  sectionCard: {
    marginBottom: 16,
    elevation: 1,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: COLORS.DarkGrey,
    marginBottom: 16,
  },
  goodsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goodsSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: COLORS.DimGray,
    marginBottom: 12,
  },
  goodsItem: {
    paddingVertical: 4,
    paddingHorizontal: 0,
  },
  goodsRightContent: {
    alignItems: 'flex-end',
  },
  goodsCbm: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
    color: COLORS.DimGray,
    marginBottom: 4,
  },
  estimatedArrivalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  estimatedArrivalText: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    color: COLORS.DarkGrey,
    marginLeft: 8,
  },
  timelineDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  timelineDetailLabel: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: COLORS.DimGray,
  },
  timelineDetailValue: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    color: COLORS.DarkGrey,
  },
  pickupCard: {
    backgroundColor: '#FEF3C7',
  },
  pickupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pickupTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: COLORS.orange,
    marginLeft: 8,
  },
  pickupText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: COLORS.DarkGrey,
    marginBottom: 12,
  },
  contactInfo: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  contactLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    color: COLORS.DimGray,
  },
  contactValue: {
    fontFamily: Fonts.regular,
    color: COLORS.DarkGrey,
  },
  contactButton: {
    marginTop: 8,
  },
  helpContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  helpText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: COLORS.DimGray,
    marginBottom: 12,
  },
  helpButton: {
    borderColor: COLORS.SlateGray,
  },
  dialogText: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: Fonts.regular,
  },
  dialogLabel: {
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
  },
});

export default ContainerTrackingScreen;
