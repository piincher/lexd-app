/**
 * Container Tracking Screen
 * Maersk-style detailed tracking view with waypoint journey
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Linking,
} from 'react-native';
import {
  Appbar,
  Text,
  Button,
  Card,
  Chip,
  useTheme,
  Portal,
  Dialog,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import type { RootStackScreenProps } from '@src/navigations/type';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useGetContainerDetails } from '../hooks/useCustomerContainers';
import { useGetWaypoints } from '@src/shared/hooks/useWaypoints';
import { NotificationBell } from '@src/features/notifications';
// Waypoint logic moved to WaypointCard component
import { ContainerTimeline } from '../components/ContainerTimeline';
import { WaypointCard } from '../components/WaypointCard';
import { ContainerGoodsSection } from '../components/ContainerGoodsSection';
import { PickupInfoCard } from '../components/PickupInfoCard';
import { ContainerTrackingSkeleton } from '../components/ContainerTrackingSkeleton';
import { CUSTOMER_STATUS_LABELS, CUSTOMER_STATUS_COLORS, CUSTOMER_STATUS_BG_COLORS, SHIPPING_LINE_LABELS } from '../types';
import * as Haptics from 'expo-haptics';

const ContainerTrackingScreen: React.FC<RootStackScreenProps<'ContainerTracking'>> = ({
  navigation,
  route,
}) => {
  const { containerId } = route.params;
  const theme = useTheme();
  const [contactDialogVisible, setContactDialogVisible] = useState(false);
  const [expandedWaypoint, setExpandedWaypoint] = useState<number | null>(null);
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.paper,
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
      color: colors.text.secondary,
    },
    errorTitle: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: colors.text.secondary,
      marginTop: 16,
    },
    errorText: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
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
      color: colors.text.secondary,
    },
    shippingLine: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.secondary,
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
      color: colors.text.secondary,
    },
    progressLabel: {
      fontFamily: Fonts.regular,
      fontSize: 11,
      color: colors.text.secondary,
      marginTop: 2,
    },
    progressDivider: {
      width: 1,
      height: 40,
      backgroundColor: colors.border,
    },

    // Journey section
    journeySection: {
      marginBottom: 16,
    },
    journeySectionTitle: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: colors.text.secondary,
      marginBottom: 16,
    },

    // Section cards
    sectionCard: {
      marginBottom: 16,
      elevation: 1,
    },
    sectionTitle: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: colors.text.secondary,
      marginBottom: 16,
    },
    estimatedArrivalContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    estimatedArrivalText: {
      fontFamily: Fonts.meduim,
      fontSize: 14,
      color: colors.text.secondary,
      marginLeft: 8,
    },
    timelineDetailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    timelineDetailLabel: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.secondary,
    },
    timelineDetailValue: {
      fontFamily: Fonts.meduim,
      fontSize: 14,
      color: colors.text.secondary,
    },
    pickupCard: {
      backgroundColor: colors.accent.goldLight,
    },
    helpContainer: {
      alignItems: 'center',
      paddingVertical: 24,
    },
    helpText: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.secondary,
      marginBottom: 12,
    },
    helpButton: {
      borderColor: colors.status.success,
    },
    dialogText: {
      fontSize: 14,
      marginBottom: 8,
      fontFamily: Fonts.regular,
    },
    dialogLabel: {
      fontFamily: Fonts.bold,
      color: colors.text.secondary,
    },
  }), [colors, isDark]);

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

  const formatDateTime = (dateString?: string): string => {
    if (!dateString) return 'Non disponible';
    try {
      return format(new Date(dateString), 'dd MMM yyyy, HH:mm', { locale: fr });
    } catch {
      return dateString;
    }
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
          <NotificationBell
            onPress={() => navigation.navigate('Notifications' as never)}
            size={24}
            color={theme.colors.onSurface}
          />
        </Appbar.Header>
        <ContainerTrackingSkeleton />
      </SafeAreaView>
    );
  }

  if (isError || !container) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Suivi Container" />
          <NotificationBell
            onPress={() => navigation.navigate('Notifications' as never)}
            size={24}
            color={theme.colors.onSurface}
          />
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

  const statusColor = CUSTOMER_STATUS_COLORS[container.status] || colors.text.secondary;
  const statusBgColor = CUSTOMER_STATUS_BG_COLORS[container.status] || colors.background.paper;
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
        <NotificationBell
          onPress={() => navigation.navigate('Notifications' as never)}
          size={24}
          color={theme.colors.onSurface}
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
            {waypoints.map((wp, idx) => (
              <WaypointCard
                key={wp._id || idx}
                waypoint={wp}
                index={idx}
                currentWaypointIndex={currentWaypointIndex}
                isExpanded={expandedWaypoint === idx}
                onToggle={() => setExpandedWaypoint(expandedWaypoint === idx ? null : idx)}
              />
            ))}
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
        <ContainerGoodsSection
          goods={container.myGoods || []}
          containerId={containerId}
          onViewPackingList={(id) => navigation.navigate('ClientPackingList', { containerId: id })}
        />

        {/* Pickup Info (when ready) */}
        <PickupInfoCard
          container={container}
          onContactPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            setContactDialogVisible(true);
          }}
        />

        {/* Help Section */}
        <View style={styles.helpContainer}>
          <Text style={styles.helpText}>
            Une question concernant votre container?
          </Text>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('TicketList' as never)}
            icon="headset"
            style={styles.helpButton}
          >
            Contacter le Support
          </Button>
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

export default ContainerTrackingScreen;
