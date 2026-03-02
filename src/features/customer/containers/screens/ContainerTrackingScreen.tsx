/**
 * Container Tracking Screen
 * Maersk-style detailed tracking view with timeline
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Pressable,
  Linking,
} from 'react-native';
import {
  Appbar,
  ActivityIndicator,
  Text,
  Button,
  Card,
  Divider,
  Chip,
  useTheme,
  List,
  Portal,
  Dialog,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { RootStackScreenProps } from '@src/navigations/type';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { useGetContainerDetails } from '../hooks/useCustomerContainers';
import { ContainerTimeline } from '../components';
import {
  CUSTOMER_STATUS_LABELS,
  CUSTOMER_STATUS_COLORS,
  CUSTOMER_STATUS_BG_COLORS,
  SHIPPING_MODE_LABELS,
  SHIPPING_LINE_LABELS,
  CustomerGoodsInContainer,
} from '../types';

const ContainerTrackingScreen: React.FC<RootStackScreenProps<'ContainerTracking'>> = ({
  navigation,
  route,
}) => {
  const { containerId } = route.params;
  const theme = useTheme();
  const [contactDialogVisible, setContactDialogVisible] = React.useState(false);

  const {
    data: container,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetContainerDetails(containerId);

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
            {goods.status.replace(/_/g, ' ')}
          </Chip>
        </View>
      )}
      style={styles.goodsItem}
    />
  );

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

  const statusColor = CUSTOMER_STATUS_COLORS[container.status];
  const statusBgColor = CUSTOMER_STATUS_BG_COLORS[container.status];

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

        {/* Timeline Section */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Parcours du Container</Text>
            <ContainerTimeline
              timeline={container.timeline}
              currentStatus={container.status}
              estimatedArrival={container.estimatedArrival}
            />
          </Card.Content>
        </Card>

        {/* Route Info Card */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Itinéraire</Text>
            <View style={styles.routeContainer}>
              <View style={styles.routeItem}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={24}
                  color={theme.colors.primary}
                />
                <View style={styles.routeTextContainer}>
                  <Text style={styles.routeLabel}>Origine</Text>
                  <Text style={styles.routeValue}>
                    {typeof container.route.origin === 'string' 
                      ? container.route.origin 
                      : container.route.origin?.city || 'N/A'}
                  </Text>
                </View>
              </View>

              <View style={styles.routeDivider}>
                <View style={styles.routeLine} />
                <MaterialCommunityIcons
                  name="arrow-down"
                  size={20}
                  color={COLORS.SlateGray}
                />
                <Text style={styles.transitDays}>
                  ~{container.route.estimatedTransitDays} jours
                </Text>
              </View>

              <View style={styles.routeItem}>
                <MaterialCommunityIcons
                  name="flag-checkered"
                  size={24}
                  color={COLORS.green}
                />
                <View style={styles.routeTextContainer}>
                  <Text style={styles.routeLabel}>Destination</Text>
                  <Text style={styles.routeValue}>
                    {typeof container.route.destination === 'string' 
                      ? container.route.destination 
                      : container.route.destination?.city || 'N/A'}
                  </Text>
                </View>
              </View>
            </View>

            {container.estimatedArrival && (
              <View style={styles.estimatedArrivalContainer}>
                <MaterialCommunityIcons
                  name="calendar-clock"
                  size={18}
                  color={theme.colors.primary}
                />
                <Text style={styles.estimatedArrivalText}>
                  Arrivée estimée:{' '}
                  <Text style={{ fontFamily: Fonts.bold }}>
                    {formatDate(container.estimatedArrival)}
                  </Text>
                </Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Timeline Details */}
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
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('SelectAdminToChatWith')}
            icon="chat"
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
  routeContainer: {
    paddingVertical: 8,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeTextContainer: {
    marginLeft: 12,
  },
  routeLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: COLORS.SlateGray,
  },
  routeValue: {
    fontFamily: Fonts.meduim,
    fontSize: 16,
    color: COLORS.DarkGrey,
  },
  routeDivider: {
    alignItems: 'center',
    marginVertical: 8,
    paddingLeft: 12,
  },
  routeLine: {
    width: 2,
    height: 24,
    backgroundColor: COLORS.Silver,
    marginBottom: 4,
  },
  transitDays: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: COLORS.DimGray,
    marginTop: 4,
  },
  estimatedArrivalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.Silver,
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
    borderBottomColor: COLORS.Silver,
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
