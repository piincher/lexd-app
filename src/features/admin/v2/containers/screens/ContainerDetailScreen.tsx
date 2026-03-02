/**
 * ContainerDetailScreen - Complete container details with goods management
 * Phase 2: Container System
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Menu, Divider, Portal, Dialog, Button } from 'react-native-paper';
import Animated, {
  FadeInUp,
  FadeIn,
  Layout,
  SlideInRight,
  SlideOutLeft,
} from 'react-native-reanimated';
import {
  useGetContainerById,
  useUpdateContainerStatus,
  useRemoveGoodsFromContainer,
  useDeleteContainer,
  useMarkReadyForPickup,
  useMarkGoodsDelivered,
  containerQueryKeys,
} from '../hooks';
import {
  useGetWaypoints,
  useUpdateWaypointStatus,
  waypointQueryKeys,
} from '../hooks/useWaypoints';
import { ContainerWaypointTracker } from '../components/ContainerWaypointTracker';
import {
  Container,
  ContainerStatus,
  CONTAINER_STATUS_LABELS,
  CONTAINER_STATUS_COLORS,
  SHIPPING_LINE_LABELS,
  SHIPPING_MODE_ICONS,
  SHIPPING_MODE_COLORS,
  SHIPPING_MODE_LABELS,
} from '../types';
import { Goods } from '../../goods/types';
import { Theme } from '@src/constants/Theme';
import { useQueryClient } from '@tanstack/react-query';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_CBM = 67; // Standard 40ft container capacity

// Phase 3: Added PackingList route, Phase 4: Added LoadingList route
type AdminV2StackParamList = {
  ContainerList: undefined;
  ContainerDetail: { containerId: string };
  AssignGoods: { containerId: string };
  PackingList: { containerId: string };
  LoadingList: { containerId: string };
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

// Phase 3: Added READY_FOR_PICKUP to timeline
const TIMELINE_STEPS: { status: ContainerStatus; label: string; icon: string }[] = [
  { status: 'BOOKED', label: 'Réservé', icon: 'bookmark' },
  { status: 'EMPTY_TO_WAREHOUSE', label: 'Vide vers Entrepôt', icon: 'cube-outline' },
  { status: 'LOADING', label: 'Chargement', icon: 'hammer' },
  { status: 'LOADED', label: 'Chargé', icon: 'cube' },
  { status: 'IN_TRANSIT', label: 'Transit', icon: 'airplane' },
  { status: 'ARRIVED', label: 'Arrivé', icon: 'flag' },
  { status: 'READY_FOR_PICKUP', label: 'Retrait', icon: 'checkmark-done' },
];

// Sub-component for waypoint tracker section
interface ContainerWaypointTrackerSectionProps {
  containerId: string;
}

const ContainerWaypointTrackerSection: React.FC<ContainerWaypointTrackerSectionProps> = ({ 
  containerId 
}) => {
  const queryClient = useQueryClient();
  const [selectedWaypointIndex, setSelectedWaypointIndex] = useState<number | null>(null);
  const { data: waypointsData, isLoading } = useGetWaypoints(containerId);
  const updateWaypointMutation = useUpdateWaypointStatus();

  const handleUpdateStatus = async (waypointIndex: number, status: string) => {
    try {
      await updateWaypointMutation.mutateAsync({
        containerId,
        waypointIndex,
        status: status as any,
      });
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: waypointQueryKeys.list(containerId) });
      queryClient.invalidateQueries({ queryKey: containerQueryKeys.detail(containerId) });
      setSelectedWaypointIndex(null);
    } catch (error) {
      console.error('Failed to update waypoint status:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.card, styles.loadingCard]}>
        <ActivityIndicator size="small" color={Theme.primary[500]} />
        <Text style={styles.loadingText}>Chargement du suivi...</Text>
      </View>
    );
  }

  if (!waypointsData?.data?.waypoints || waypointsData.data.waypoints.length === 0) {
    return null; // Don't show if no waypoints
  }

  const { waypoints, currentWaypointIndex, containerNumber, finalDestination, consignee } = waypointsData.data;

  return (
    <Animated.View entering={FadeInUp.delay(350)} style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="location" size={20} color={Theme.primary[600]} />
        <Text style={styles.cardTitle}>Suivi du Transit</Text>
      </View>
      <ContainerWaypointTracker
        waypoints={waypoints}
        currentWaypointIndex={currentWaypointIndex}
        containerNumber={containerNumber}
        finalDestination={finalDestination}
        consignee={consignee}
        onUpdateStatus={handleUpdateStatus}
      />
    </Animated.View>
  );
};

export const ContainerDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const queryClient = useQueryClient();
  const { containerId } = route.params as { containerId: string };

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [statusMenuVisible, setStatusMenuVisible] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRemoveGoodsDialog, setShowRemoveGoodsDialog] = useState(false);
  const [showReadyForPickupDialog, setShowReadyForPickupDialog] = useState(false);
  const [selectedGoodsId, setSelectedGoodsId] = useState<string | null>(null);

  const {
    data: containerResponse,
    isLoading,
    isRefetching,
    refetch,
  } = useGetContainerById(containerId);

  const updateStatusMutation = useUpdateContainerStatus();
  const removeGoodsMutation = useRemoveGoodsFromContainer();
  const deleteContainerMutation = useDeleteContainer();
  const markReadyForPickupMutation = useMarkReadyForPickup();
  const markGoodsDeliveredMutation = useMarkGoodsDelivered();

  const container: Container | undefined = containerResponse?.data?.container || containerResponse?.data;
  // Backend populates goodsIds, but we also check for goods (virtual) for compatibility
  const goodsList: Goods[] = (() => {
    if (!container) return [];
    // Use goodsIds if populated (array of Goods objects), otherwise fall back to goods virtual
    const goodsIds = (container as any).goodsIds;
    if (Array.isArray(goodsIds) && goodsIds.length > 0 && typeof goodsIds[0] === 'object') {
      return goodsIds as Goods[];
    }
    return container?.goods || [];
  })();

  const fillPercentage = (() => {
    if (!container) return 0;
    return Math.min(((container.totalCBM || 0) / MAX_CBM) * 100, 100);
  })();

  const getFillColor = (percentage: number) => {
    if (percentage >= 90) return Theme.status.error;
    if (percentage >= 70) return Theme.status.warning;
    return Theme.status.success;
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries({
      queryKey: containerQueryKeys.detail(containerId),
    });
    await refetch();
    setIsRefreshing(false);
  };

  const handleUpdateStatus = async (newStatus: ContainerStatus) => {
    setStatusMenuVisible(false);
    if (newStatus === container?.status) return;

    try {
      await updateStatusMutation.mutateAsync({
        id: containerId,
        data: { status: newStatus },
      });
      Alert.alert('Succès', `Statut mis à jour: ${CONTAINER_STATUS_LABELS[newStatus]}`);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de mettre à jour le statut');
    }
  };

  const handleRemoveGoods = async (goodsId: string) => {
    setSelectedGoodsId(goodsId);
    setShowRemoveGoodsDialog(true);
  };

  const confirmRemoveGoods = async () => {
    if (!selectedGoodsId) return;

    try {
      await removeGoodsMutation.mutateAsync({
        containerId,
        goodsId: selectedGoodsId,
      });
      setShowRemoveGoodsDialog(false);
      setSelectedGoodsId(null);
      Alert.alert('Succès', 'Marchandise retirée du container');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de retirer la marchandise');
    }
  };

  const handleDeleteContainer = () => {
    if (goodsList.length > 0) {
      Alert.alert(
        'Impossible',
        'Veuillez d\'abord retirer toutes les marchandises avant de supprimer le container.'
      );
      return;
    }
    setShowDeleteDialog(true);
  };

  const confirmDeleteContainer = async () => {
    try {
      await deleteContainerMutation.mutateAsync(containerId);
      setShowDeleteDialog(false);
      navigation.navigate('ContainerList');
    } catch (error: any) {
      // Extract specific error message from API response
      const errorMessage = error?.response?.data?.message 
        || error?.message 
        || 'Une erreur est survenue lors de la suppression';
      
      Alert.alert(
        'Impossible de supprimer',
        errorMessage,
        [{ text: 'Compris', style: 'default' }]
      );
    }
  };

  const handleAssignGoods = () => {
    navigation.navigate('AssignGoods', { containerId });
  };

  const handleGeneratePackingList = () => {
    if (goodsList.length === 0) {
      Alert.alert('Info', 'Aucune marchandise à inclure dans la liste de colisage');
      return;
    }
    // Phase 3: Navigate to packing list screen
    navigation.navigate('PackingList', { containerId });
  };

  // Phase 4: Navigate to loading list screen
  const handleGoToLoadingList = () => {
    if (goodsList.length === 0) {
      Alert.alert('Info', 'Aucune marchandise dans le plan de chargement');
      return;
    }
    navigation.navigate('LoadingList', { containerId });
  };

  // Phase 3: Handle mark ready for pickup
  const handleMarkReadyForPickup = () => {
    setShowReadyForPickupDialog(true);
  };

  const confirmMarkReadyForPickup = async () => {
    try {
      await markReadyForPickupMutation.mutateAsync(containerId);
      setShowReadyForPickupDialog(false);
      Alert.alert('Succès', 'Container marqué comme prêt pour le retrait');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de marquer le container comme prêt pour le retrait');
    }
  };

  // Phase 3: Handle mark goods delivered
  const handleMarkGoodsDelivered = async (goodsId: string) => {
    Alert.alert(
      'Confirmer la livraison',
      'Êtes-vous sûr de vouloir marquer cette marchandise comme livrée ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Marquer Livré',
          style: 'default',
          onPress: async () => {
            try {
              await markGoodsDeliveredMutation.mutateAsync(goodsId);
              Alert.alert('Succès', 'Marchandise marquée comme livrée');
            } catch (error) {
              Alert.alert('Erreur', 'Impossible de marquer la marchandise comme livrée');
            }
          },
        },
      ]
    );
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Theme.primary[500]} />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!container) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={64} color={Theme.status.error} />
          <Text style={styles.errorText}>Container non trouvé</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const statusColor = CONTAINER_STATUS_COLORS[container.status];
  const statusLabel = CONTAINER_STATUS_LABELS[container.status];
  const currentStatusIndex = TIMELINE_STEPS.findIndex(
    (step) => step.status === container.status
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={[Theme.primary[600], Theme.primary[800]]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backIconButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Menu
            visible={statusMenuVisible}
            onDismiss={() => setStatusMenuVisible(false)}
            anchor={
              <TouchableOpacity
                style={[styles.statusBadge, { backgroundColor: statusColor }]}
                onPress={() => setStatusMenuVisible(true)}
              >
                <Text style={styles.statusText}>{statusLabel}</Text>
                <Ionicons name="chevron-down" size={16} color="#FFF" />
              </TouchableOpacity>
            }
          >
            {TIMELINE_STEPS.map((step) => (
              <Menu.Item
                key={step.status}
                onPress={() => handleUpdateStatus(step.status)}
                title={step.label}
                leadingIcon={() => (
                  <Ionicons
                    name={step.icon as any}
                    size={20}
                    color={CONTAINER_STATUS_COLORS[step.status]}
                  />
                )}
                style={
                  container.status === step.status ? styles.menuItemActive : undefined
                }
              />
            ))}
          </Menu>
        </View>

        <Animated.View entering={FadeInUp.delay(100)} style={styles.headerContent}>
          <View style={styles.containerNumberContainer}>
            <Ionicons name="cube" size={32} color="#FFF" />
            <Text style={styles.containerNumber}>
              {container.virtualContainerNumber}
            </Text>
          </View>

          <View style={styles.shippingLineContainer}>
            <Ionicons 
              name={SHIPPING_MODE_ICONS[container.shippingMode] as any} 
              size={16} 
              color="rgba(255,255,255,0.8)" 
            />
            <Text style={styles.shippingLineText}>
              {SHIPPING_LINE_LABELS[container.shippingLine]}
            </Text>
          </View>

          {container.actualContainerNumber && (
            <Text style={styles.actualNumber}>
              N° Réel: {container.actualContainerNumber}
            </Text>
          )}
        </Animated.View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching || isRefreshing}
            onRefresh={handleRefresh}
            tintColor={Theme.primary[500]}
          />
        }
      >
        {/* Phase 3: Route Info Card */}
        {container.route && (
          <Animated.View entering={FadeInUp.delay(150)} style={styles.routeCard}>
            <LinearGradient
              colors={[
                `${SHIPPING_MODE_COLORS[container.shippingMode]}20`,
                `${SHIPPING_MODE_COLORS[container.shippingMode]}10`,
              ]}
              style={styles.routeGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.routeHeader}>
                <View style={[
                  styles.routeModeBadge,
                  { backgroundColor: SHIPPING_MODE_COLORS[container.shippingMode] }
                ]}>
                  <Ionicons 
                    name={SHIPPING_MODE_ICONS[container.shippingMode] as any} 
                    size={14} 
                    color="#FFF" 
                  />
                  <Text style={styles.routeModeText}>
                    {SHIPPING_MODE_LABELS[container.shippingMode]}
                  </Text>
                </View>
                <Text style={styles.routeName}>{container.route.name}</Text>
              </View>

              <View style={styles.routePath}>
                <View style={styles.routeLocation}>
                  <Text style={styles.routeLocationLabel}>Origine</Text>
                  <Text style={styles.routeLocationValue}>
                    {typeof container.route.origin === 'string' 
                      ? container.route.origin 
                      : container.route.origin?.city || 'N/A'}
                  </Text>
                </View>
                <View style={styles.routeArrow}>
                  <Ionicons name="arrow-forward" size={20} color={Theme.neutral[400]} />
                </View>
                <View style={styles.routeLocation}>
                  <Text style={styles.routeLocationLabel}>Destination</Text>
                  <Text style={styles.routeLocationValue}>
                    {typeof container.route.destination === 'string' 
                      ? container.route.destination 
                      : container.route.destination?.city || 'N/A'}
                  </Text>
                </View>
              </View>

              <View style={styles.routeDetails}>
                <View style={styles.routeDetailItem}>
                  <Ionicons name="time-outline" size={16} color={Theme.neutral[500]} />
                  <Text style={styles.routeDetailText}>
                    {container.route.estimatedTransitDays} jours de transit
                  </Text>
                </View>
                <View style={styles.routeDetailItem}>
                  <Ionicons name="business-outline" size={16} color={Theme.neutral[500]} />
                  <Text style={styles.routeDetailText}>
                    {container.route.shippingLine}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
        )}

        {/* Capacity Card */}
        <Animated.View entering={FadeInUp.delay(200)} style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="speedometer" size={20} color={Theme.primary[600]} />
            <Text style={styles.cardTitle}>Capacité</Text>
          </View>

          <View style={styles.capacityInfo}>
            <Text style={styles.capacityValue}>
              {(container.totalCBM || 0).toFixed(2)}{' '}
              <Text style={styles.capacityUnit}>m³</Text>
            </Text>
            <Text style={styles.capacityMax}>sur {MAX_CBM} m³</Text>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <LinearGradient
                colors={[
                  getFillColor(fillPercentage),
                  `${getFillColor(fillPercentage)}80`,
                ]}
                style={[styles.progressFill, { width: `${fillPercentage}%` }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </View>
            <Text
              style={[styles.progressPercentage, { color: getFillColor(fillPercentage) }]}
            >
              {(fillPercentage || 0).toFixed(1)}%
            </Text>
          </View>

          <View style={styles.capacityStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{goodsList.length}</Text>
              <Text style={styles.statLabel}>Marchandises</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {(MAX_CBM - (container.totalCBM || 0)).toFixed(2)} m³
              </Text>
              <Text style={styles.statLabel}>Disponible</Text>
            </View>
          </View>
        </Animated.View>

        {/* Timeline Card */}
        <Animated.View entering={FadeInUp.delay(300)} style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="time" size={20} color={Theme.primary[600]} />
            <Text style={styles.cardTitle}>Chronologie</Text>
          </View>

          <View style={styles.timeline}>
            {TIMELINE_STEPS.map((step, index) => {
              const isCompleted = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;

              return (
                <View key={step.status} style={styles.timelineStep}>
                  <View
                    style={[
                      styles.timelineDot,
                      isCompleted && { backgroundColor: CONTAINER_STATUS_COLORS[step.status] },
                      isCurrent && styles.timelineDotCurrent,
                    ]}
                  >
                    {isCompleted && (
                      <Ionicons name="checkmark" size={12} color="#FFF" />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.timelineLabel,
                      isCompleted && styles.timelineLabelActive,
                      isCurrent && styles.timelineLabelCurrent,
                    ]}
                  >
                    {step.label}
                  </Text>
                  {index < TIMELINE_STEPS.length - 1 && (
                    <View
                      style={[
                        styles.timelineConnector,
                        index < currentStatusIndex && {
                          backgroundColor: CONTAINER_STATUS_COLORS[step.status],
                        },
                      ]}
                    />
                  )}
                </View>
              );
            })}
          </View>

          {/* Timeline Dates */}
          <View style={styles.datesContainer}>
            {container.timeline?.bookedAt && (
              <View style={styles.dateItem}>
                <Text style={styles.dateLabel}>Réservé le</Text>
                <Text style={styles.dateValue}>
                  {new Date(container.timeline.bookedAt).toLocaleDateString('fr-FR')}
                </Text>
              </View>
            )}
            {container.timeline?.departedAt && (
              <View style={styles.dateItem}>
                <Text style={styles.dateLabel}>Départ le</Text>
                <Text style={styles.dateValue}>
                  {new Date(container.timeline.departedAt).toLocaleDateString('fr-FR')}
                </Text>
              </View>
            )}
            {container.route && container.timeline?.departedAt && !container.timeline?.arrivedAt && (
              <View style={styles.dateItem}>
                <Text style={styles.dateLabel}>Arrivée estimée</Text>
                <Text style={[styles.dateValue, { color: Theme.status.info }]}>
                  {(() => {
                    const departedDate = new Date(container.timeline.departedAt!);
                    const estimatedArrival = new Date(departedDate);
                    estimatedArrival.setDate(
                      departedDate.getDate() + container.route.estimatedTransitDays
                    );
                    return estimatedArrival.toLocaleDateString('fr-FR');
                  })()}
                </Text>
              </View>
            )}
            {container.timeline?.arrivedAt && (
              <View style={styles.dateItem}>
                <Text style={styles.dateLabel}>Arrivé le</Text>
                <Text style={styles.dateValue}>
                  {new Date(container.timeline.arrivedAt).toLocaleDateString('fr-FR')}
                </Text>
              </View>
            )}
          </View>
        </Animated.View>

        {/* Waypoint Tracker - Port-specific status updates */}
        {container.status !== 'BOOKED' && container.status !== 'EMPTY_TO_WAREHOUSE' && (
          <ContainerWaypointTrackerSection containerId={containerId} />
        )}

        {/* Assigned Goods Card */}
        <Animated.View entering={FadeInUp.delay(400)} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Ionicons name="cube" size={20} color={Theme.primary[600]} />
              <Text style={styles.cardTitle}>Marchandises Assignées</Text>
            </View>
            <View style={styles.goodsCountBadge}>
              <Text style={styles.goodsCountText}>{goodsList.length}</Text>
            </View>
          </View>

          {goodsList.length === 0 ? (
            <View style={styles.emptyGoods}>
              <LinearGradient
                colors={['#F3F0FF', '#EDE9FE']}
                style={styles.emptyIconBg}
              >
                <Ionicons name="cube-outline" size={48} color={Theme.primary[400]} />
              </LinearGradient>
              <Text style={styles.emptyTitle}>Aucune marchandise</Text>
              <Text style={styles.emptySubtitle}>
                Ce container est vide. Assignez des marchandises pour commencer.
              </Text>
            </View>
          ) : (
            <View style={styles.goodsList}>
              {goodsList.map((goods, index) => (
                <Animated.View
                  key={goods._id}
                  entering={SlideInRight.delay(index * 50)}
                  exiting={SlideOutLeft}
                  layout={Layout.springify()}
                  style={styles.goodsItem}
                >
                  <View style={styles.goodsIcon}>
                    <Ionicons name="cube" size={20} color={Theme.primary[500]} />
                  </View>
                  <View style={styles.goodsInfo}>
                    <View style={styles.goodsIdRow}>
                      <Text style={styles.goodsId}>{goods.goodsId}</Text>
                      {/* Phase 3: Status Badge */}
                      {goods.status === 'READY_FOR_PICKUP' && (
                        <View style={[styles.statusBadge, { backgroundColor: '#FEF3C7' }]}>
                          <Text style={[styles.statusBadgeText, { color: '#D97706' }]}>
                            Prêt
                          </Text>
                        </View>
                      )}
                      {goods.status === 'DELIVERED' && (
                        <View style={[styles.statusBadge, { backgroundColor: '#D1FAE5' }]}>
                          <Ionicons name="checkmark" size={10} color="#059669" />
                          <Text style={[styles.statusBadgeText, { color: '#059669' }]}>
                            Livré
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.goodsDescription} numberOfLines={1}>
                      {goods.description}
                    </Text>
                    <View style={styles.goodsMeta}>
                      <Text style={styles.goodsMetaText}>
                        {(goods.actualCBM || 0).toFixed(2)} m³
                      </Text>
                      <Text style={styles.goodsMetaDot}>•</Text>
                      <Text style={styles.goodsMetaText}>{goods.weight} kg</Text>
                    </View>
                    {/* Phase 3: Show pickedUpBy if delivered */}
                    {goods.status === 'DELIVERED' && (goods as any).pickedUpBy && (
                      <Text style={styles.pickedUpByText}>
                        Retiré par: {(goods as any).pickedUpBy}
                      </Text>
                    )}
                  </View>
                  <View style={styles.goodsActions}>
                    {/* Phase 3: Mark Delivered Button */}
                    {container.status === 'READY_FOR_PICKUP' && goods.status === 'READY_FOR_PICKUP' && (
                      <TouchableOpacity
                        style={styles.deliverButton}
                        onPress={() => handleMarkGoodsDelivered(goods._id)}
                        disabled={markGoodsDeliveredMutation.isPending}
                      >
                        <Ionicons name="checkmark-done" size={20} color={Theme.status.success} />
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveGoods(goods._id)}
                      disabled={removeGoodsMutation.isPending}
                    >
                      <Ionicons name="close-circle" size={24} color={Theme.status.error} />
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              ))}
            </View>
          )}
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View entering={FadeInUp.delay(500)} style={styles.actionsCard}>
          {/* Phase 3: Ready for Pickup Button (only when status is ARRIVED) */}
          {container.status === 'ARRIVED' && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleMarkReadyForPickup}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[Theme.status.warning, '#EA580C']}
                style={styles.actionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="checkmark-done-circle" size={20} color="#FFF" />
                <Text style={styles.actionButtonText}>
                  Marquer Prêt pour Retrait
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleAssignGoods}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={Theme.gradients.primary}
              style={styles.actionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name="add-circle" size={20} color="#FFF" />
              <Text style={styles.actionButtonText}>Assigner des Marchandises</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Phase 4: List View Buttons Row */}
          <View style={styles.listButtonsRow}>
            <TouchableOpacity
              style={[styles.listButton, styles.packingListButton]}
              onPress={handleGeneratePackingList}
              activeOpacity={0.9}
              disabled={goodsList.length === 0}
            >
              <LinearGradient
                colors={[Theme.primary[50], '#FFFFFF']}
                style={styles.listButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={[styles.listButtonIcon, { backgroundColor: Theme.primary[100] }]}>
                  <Ionicons name="document-text" size={20} color={Theme.primary[600]} />
                </View>
                <View style={styles.listButtonTextContainer}>
                  <Text style={[styles.listButtonTitle, { color: Theme.primary[700] }]}>
                    📋 Packing List
                  </Text>
                  <Text style={styles.listButtonSubtitle}>
                    Liste de colisage détaillée
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={Theme.primary[400]} />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.listButton, styles.loadingListButton]}
              onPress={handleGoToLoadingList}
              activeOpacity={0.9}
              disabled={goodsList.length === 0}
            >
              <LinearGradient
                colors={['#FFFBEB', '#FFFFFF']}
                style={styles.listButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={[styles.listButtonIcon, { backgroundColor: '#FEF3C7' }]}>
                  <Ionicons name="list" size={20} color="#D97706" />
                </View>
                <View style={styles.listButtonTextContainer}>
                  <Text style={[styles.listButtonTitle, { color: '#92400E' }]}>
                    🚛 Loading List
                  </Text>
                  <Text style={styles.listButtonSubtitle}>
                    Plan de chargement
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#D97706" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonDanger]}
            onPress={handleDeleteContainer}
            activeOpacity={0.9}
            disabled={goodsList.length > 0 || deleteContainerMutation.isPending}
          >
            <Ionicons
              name="trash"
              size={20}
              color={goodsList.length > 0 ? Theme.neutral[400] : Theme.status.error}
            />
            <Text
              style={[
                styles.actionButtonTextDanger,
                goodsList.length > 0 && styles.actionButtonTextDisabled,
              ]}
            >
              Supprimer le Container
            </Text>
          </TouchableOpacity>

          {goodsList.length > 0 && (
            <Text style={styles.deleteHint}>
              * Veuillez retirer toutes les marchandises avant de supprimer
            </Text>
          )}
        </Animated.View>
      </ScrollView>

      {/* Delete Confirmation Dialog */}
      <Portal>
        <Dialog visible={showDeleteDialog} onDismiss={() => setShowDeleteDialog(false)}>
          <Dialog.Icon icon="alert" color={Theme.status.error} />
          <Dialog.Title style={styles.dialogTitle}>Confirmer la suppression</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>
              Êtes-vous sûr de vouloir supprimer ce container ? Cette action est
              irréversible.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDeleteDialog(false)}>Annuler</Button>
            <Button
              onPress={confirmDeleteContainer}
              textColor={Theme.status.error}
              loading={deleteContainerMutation.isPending}
            >
              Supprimer
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Remove Goods Confirmation Dialog */}
      <Portal>
        <Dialog
          visible={showRemoveGoodsDialog}
          onDismiss={() => setShowRemoveGoodsDialog(false)}
        >
          <Dialog.Icon icon="cube-remove" color={Theme.status.warning} />
          <Dialog.Title style={styles.dialogTitle}>
            Retirer la marchandise
          </Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>
              Êtes-vous sûr de vouloir retirer cette marchandise du container ?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowRemoveGoodsDialog(false)}>Annuler</Button>
            <Button
              onPress={confirmRemoveGoods}
              textColor={Theme.status.warning}
              loading={removeGoodsMutation.isPending}
            >
              Retirer
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Phase 3: Ready for Pickup Confirmation Dialog */}
      <Portal>
        <Dialog
          visible={showReadyForPickupDialog}
          onDismiss={() => setShowReadyForPickupDialog(false)}
        >
          <Dialog.Icon icon="checkmark-done-circle" color={Theme.status.warning} />
          <Dialog.Title style={styles.dialogTitle}>
            Marquer Prêt pour Retrait
          </Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>
              Êtes-vous sûr de vouloir marquer ce container comme prêt pour le retrait ?{'\n\n'}
              Cela notifiera tous les clients que leurs marchandises sont disponibles.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowReadyForPickupDialog(false)}>Annuler</Button>
            <Button
              onPress={confirmMarkReadyForPickup}
              textColor={Theme.status.warning}
              loading={markReadyForPickupMutation.isPending}
            >
              Confirmer
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: Theme.spacing.md,
    fontSize: 16,
    color: Theme.neutral[500],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing['2xl'],
  },
  errorText: {
    marginTop: Theme.spacing.lg,
    fontSize: 18,
    fontWeight: '600',
    color: Theme.neutral[700],
  },
  backButton: {
    marginTop: Theme.spacing.xl,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    backgroundColor: Theme.primary[500],
    borderRadius: Theme.radius.lg,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing['2xl'],
    paddingHorizontal: Theme.spacing.lg,
    borderBottomLeftRadius: Theme.radius['3xl'],
    borderBottomRightRadius: Theme.radius['3xl'],
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  backIconButton: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radius.full,
    gap: Theme.spacing.sm,
  },
  statusText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  headerContent: {
    alignItems: 'center',
  },
  containerNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.md,
  },
  containerNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: -0.5,
  },
  shippingLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  shippingLineText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  actualNumber: {
    marginTop: Theme.spacing.sm,
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Theme.spacing.lg,
    paddingBottom: Theme.spacing['4xl'],
  },
  card: {
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius['2xl'],
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Theme.spacing.sm,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  goodsCountBadge: {
    backgroundColor: Theme.primary[100],
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.full,
  },
  goodsCountText: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.primary[600],
  },
  capacityInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Theme.spacing.md,
  },
  capacityValue: {
    fontSize: 36,
    fontWeight: '800',
    color: Theme.neutral[800],
  },
  capacityUnit: {
    fontSize: 18,
    fontWeight: '600',
    color: Theme.neutral[500],
  },
  capacityMax: {
    marginLeft: Theme.spacing.sm,
    fontSize: 15,
    color: Theme.neutral[400],
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.md,
  },
  progressBackground: {
    flex: 1,
    height: 10,
    backgroundColor: Theme.neutral[100],
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: Theme.radius.full,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '700',
    minWidth: 50,
    textAlign: 'right',
  },
  capacityStats: {
    flexDirection: 'row',
    marginTop: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[100],
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.neutral[400],
    marginTop: Theme.spacing.xs,
  },
  statDivider: {
    width: 1,
    backgroundColor: Theme.neutral[200],
  },
  timeline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: Theme.spacing.md,
  },
  timelineStep: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  timelineDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Theme.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  timelineDotCurrent: {
    transform: [{ scale: 1.2 }],
    ...Theme.shadows.md,
  },
  timelineConnector: {
    position: 'absolute',
    top: 14,
    right: '50%',
    left: '50%',
    height: 2,
    backgroundColor: Theme.neutral[200],
    marginLeft: 14,
    marginRight: -14,
    zIndex: -1,
  },
  timelineLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: Theme.neutral[400],
    textAlign: 'center',
  },
  timelineLabelActive: {
    color: Theme.neutral[600],
    fontWeight: '600',
  },
  timelineLabelCurrent: {
    color: Theme.primary[600],
    fontWeight: '700',
  },
  datesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[100],
  },
  dateItem: {
    flex: 1,
    minWidth: 100,
  },
  dateLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: Theme.neutral[400],
    marginBottom: Theme.spacing.xs,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[700],
  },
  emptyGoods: {
    alignItems: 'center',
    paddingVertical: Theme.spacing['2xl'],
  },
  emptyIconBg: {
    width: 80,
    height: 80,
    borderRadius: Theme.radius['2xl'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
  emptySubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[400],
    textAlign: 'center',
    paddingHorizontal: Theme.spacing.xl,
  },
  goodsList: {
    gap: Theme.spacing.md,
  },
  goodsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    backgroundColor: Theme.neutral[50],
    borderRadius: Theme.radius.lg,
  },
  goodsIcon: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.md,
    backgroundColor: Theme.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  goodsInfo: {
    flex: 1,
  },
  goodsId: {
    fontSize: 15,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  goodsDescription: {
    fontSize: 13,
    fontWeight: '500',
    color: Theme.neutral[500],
    marginTop: Theme.spacing.xs,
  },
  goodsMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.xs,
  },
  goodsMetaText: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.primary[600],
  },
  goodsMetaDot: {
    fontSize: 12,
    color: Theme.neutral[300],
    marginHorizontal: Theme.spacing.sm,
  },
  removeButton: {
    padding: Theme.spacing.sm,
  },
  // Phase 3: Goods status and action styles
  goodsIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: Theme.radius.sm,
    gap: 2,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  pickedUpByText: {
    fontSize: 11,
    fontWeight: '500',
    color: Theme.neutral[500],
    marginTop: 2,
  },
  goodsActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  deliverButton: {
    padding: Theme.spacing.sm,
    backgroundColor: '#ECFDF5',
    borderRadius: Theme.radius.md,
  },
  actionsCard: {
    gap: Theme.spacing.md,
  },
  actionButton: {
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
    ...Theme.shadows.md,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  actionButtonSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.lg,
    backgroundColor: Theme.neutral.white,
    borderWidth: 1,
    borderColor: Theme.primary[200],
    gap: Theme.spacing.sm,
  },
  actionButtonTextSecondary: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.primary[600],
  },
  actionButtonDanger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.lg,
    backgroundColor: Theme.neutral.white,
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    gap: Theme.spacing.sm,
  },
  actionButtonTextDanger: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.status.error,
  },
  actionButtonTextDisabled: {
    color: Theme.neutral[400],
  },
  deleteHint: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.neutral[400],
    textAlign: 'center',
    fontStyle: 'italic',
  },
  menuItemActive: {
    backgroundColor: Theme.primary[50],
  },
  dialogTitle: {
    textAlign: 'center',
    fontWeight: '700',
  },
  dialogText: {
    textAlign: 'center',
    color: Theme.neutral[600],
    lineHeight: 20,
  },
  // Phase 4: List Buttons (Packing List & Loading List)
  listButtonsRow: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  listButton: {
    flex: 1,
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
    ...Theme.shadows.sm,
  },
  packingListButton: {
    borderWidth: 1,
    borderColor: Theme.primary[200],
  },
  loadingListButton: {
    borderWidth: 1,
    borderColor: '#FCD34D',
  },
  listButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  listButtonIcon: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listButtonTextContainer: {
    flex: 1,
  },
  listButtonTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  listButtonSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    color: Theme.neutral[500],
  },
  // Phase 3: Route Card Styles
  routeCard: {
    borderRadius: Theme.radius['2xl'],
    marginHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.lg,
    overflow: 'hidden',
    ...Theme.shadows.md,
  },
  routeGradient: {
    padding: Theme.spacing.lg,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  routeModeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.full,
  },
  routeModeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
  },
  routeName: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
    flex: 1,
  },
  routePath: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.sm,
  },
  routeLocation: {
    flex: 1,
    alignItems: 'center',
  },
  routeLocationLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: Theme.neutral[400],
    marginBottom: Theme.spacing.xs,
  },
  routeLocationValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[700],
    textAlign: 'center',
  },
  routeArrow: {
    paddingHorizontal: Theme.spacing.md,
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[200],
  },
  routeDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  routeDetailText: {
    fontSize: 13,
    fontWeight: '500',
    color: Theme.neutral[600],
  },
});

export default ContainerDetailScreen;
