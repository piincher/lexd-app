/**
 * WaypointManagementScreen - Full screen for managing container waypoints
 * Includes list of waypoints, sea/road segments, and route template import
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { Portal, Dialog, Button, Menu } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import {
  ContainerWaypoint,
  WAYPOINT_TYPE_OPTIONS,
  WAYPOINT_TYPE_LABELS,
  WAYPOINT_TYPE_ICONS,
  WAYPOINT_STATUS_COLORS,
  WAYPOINT_STATUS_LABELS,
  TRANSPORT_MODE_OPTIONS,
  TRANSPORT_MODE_LABELS,
  TRANSPORT_MODE_ICONS,
  SeaSegment,
  RoadSegment,
  RouteTemplate,
} from '../types';
import { ContainerWaypointTracker } from '../components/ContainerWaypointTracker';
import { WaypointUpdateModal } from '../components/WaypointUpdateModal';

// Navigation types
type AdminV2StackParamList = {
  ContainerList: undefined;
  ContainerDetail: { containerId: string };
  WaypointManagement: { containerId: string; containerNumber: string };
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

// Mock data for demonstration - would come from API
const MOCK_WAYPOINTS: ContainerWaypoint[] = [
  {
    order: 1,
    location: 'Shanghai Port',
    locationCode: 'CNSHA',
    type: 'PORT',
    status: 'DEPARTED',
    coordinates: { lat: 31.2304, lng: 121.4737 },
    estimatedArrival: '2024-01-15T08:00:00Z',
    actualArrival: '2024-01-15T07:30:00Z',
    estimatedDeparture: '2024-01-16T18:00:00Z',
    actualDeparture: '2024-01-16T19:30:00Z',
    vesselName: 'MSC OSCAR',
    vesselIMO: '9703291',
    transportMode: 'SEA',
    carrier: 'MSC',
    notes: 'Container loaded successfully',
  },
  {
    order: 2,
    location: 'Singapore Port',
    locationCode: 'SGSIN',
    type: 'PORT',
    status: 'ARRIVED',
    coordinates: { lat: 1.29027, lng: 103.851959 },
    estimatedArrival: '2024-01-25T06:00:00Z',
    actualArrival: '2024-01-25T05:45:00Z',
    estimatedDeparture: '2024-01-26T12:00:00Z',
    transportMode: 'SEA',
    carrier: 'MSC',
    notes: 'Transhipment port',
  },
  {
    order: 3,
    location: 'Lomé Port',
    locationCode: 'TGLFW',
    type: 'PORT',
    status: 'IN_TRANSIT',
    coordinates: { lat: 6.1319, lng: 1.2228 },
    estimatedArrival: '2024-02-15T08:00:00Z',
    transportMode: 'SEA',
    carrier: 'MSC',
  },
  {
    order: 4,
    location: 'Border Togo-Benin',
    locationCode: 'TGBJN',
    type: 'BORDER',
    status: 'PENDING',
    transportMode: 'ROAD',
    carrier: 'Transit Logistics',
    truckPlate: 'TG-1234-AB',
    driverName: 'Amadou Diallo',
    driverPhone: '+228 90 12 34 56',
  },
  {
    order: 5,
    location: 'Cotonou Warehouse',
    locationCode: 'BJCOO',
    type: 'WAREHOUSE',
    status: 'PENDING',
    coordinates: { lat: 6.3654, lng: 2.4183 },
    transportMode: 'ROAD',
    carrier: 'Local Transport',
  },
];

const MOCK_SEA_SEGMENTS: SeaSegment[] = [
  {
    fromPort: 'CNSHA',
    toPort: 'SGSIN',
    vesselName: 'MSC OSCAR',
    vesselIMO: '9703291',
    carrier: 'MSC',
    departureDate: '2024-01-16T19:30:00Z',
    estimatedArrival: '2024-01-25T05:45:00Z',
  },
  {
    fromPort: 'SGSIN',
    toPort: 'TGLFW',
    vesselName: 'MSC GULSUN',
    vesselIMO: '9839430',
    carrier: 'MSC',
    departureDate: '2024-01-26T12:00:00Z',
    estimatedArrival: '2024-02-15T08:00:00Z',
  },
];

const MOCK_ROAD_SEGMENTS: RoadSegment[] = [
  {
    fromLocation: 'TGLFW',
    toLocation: 'BJCOO',
    truckPlate: 'TG-1234-AB',
    driverName: 'Amadou Diallo',
    driverPhone: '+228 90 12 34 56',
    carrier: 'Transit Logistics',
    estimatedTransitHours: 12,
  },
];

const MOCK_ROUTE_TEMPLATES: RouteTemplate[] = [
  {
    id: 'template-1',
    name: 'Shanghai → Lomé (Standard)',
    description: 'Route maritime classique via Singapour',
    waypoints: [
      { location: 'Shanghai Port', locationCode: 'CNSHA', type: 'PORT' },
      { location: 'Singapore Port', locationCode: 'SGSIN', type: 'PORT' },
      { location: 'Lomé Port', locationCode: 'TGLFW', type: 'PORT' },
    ],
    seaSegments: [
      { fromPort: 'CNSHA', toPort: 'SGSIN', carrier: 'MSC' },
      { fromPort: 'SGSIN', toPort: 'TGLFW', carrier: 'MSC' },
    ],
  },
  {
    id: 'template-2',
    name: 'Shanghai → Bamako (Multi-modal)',
    description: 'Route maritime + terrestre jusqu\'à Bamako',
    waypoints: [
      { location: 'Shanghai Port', locationCode: 'CNSHA', type: 'PORT' },
      { location: 'Lomé Port', locationCode: 'TGLFW', type: 'PORT' },
      { location: 'Border Togo-Benin', locationCode: 'TGBJN', type: 'BORDER' },
      { location: 'Bamako Warehouse', locationCode: 'MLBKO', type: 'WAREHOUSE' },
    ],
    seaSegments: [{ fromPort: 'CNSHA', toPort: 'TGLFW', carrier: 'MSC' }],
    roadSegments: [{ fromLocation: 'TGLFW', toLocation: 'MLBKO', carrier: 'Local' }],
  },
];

export const WaypointManagementScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const { containerId, containerNumber } = route.params as {
    containerId: string;
    containerNumber: string;
  };

  const [waypoints, setWaypoints] = useState<ContainerWaypoint[]>(MOCK_WAYPOINTS);
  const [seaSegments] = useState<SeaSegment[]>(MOCK_SEA_SEGMENTS);
  const [roadSegments] = useState<RoadSegment[]>(MOCK_ROAD_SEGMENTS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'waypoints' | 'sea' | 'road'>('waypoints');

  // Modal states
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedWaypointIndex, setSelectedWaypointIndex] = useState<number>(0);
  const [showAddWaypointDialog, setShowAddWaypointDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  // New waypoint form state
  const [newWaypoint, setNewWaypoint] = useState<Partial<ContainerWaypoint>>({
    type: 'PORT',
    transportMode: 'SEA',
    status: 'PENDING',
  });
  const [typeMenuVisible, setTypeMenuVisible] = useState(false);
  const [transportMenuVisible, setTransportMenuVisible] = useState(false);

  // Calculate current waypoint index
  const currentWaypointIndex = (() => {
    const index = waypoints.findIndex(
      (w) => w.status === 'IN_TRANSIT' || w.status === 'ARRIVED'
    );
    return index >= 0 ? index : waypoints.findIndex((w) => w.status === 'PENDING') || 0;
  })();

  // Handlers
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleMarkArrived = (index: number) => {
    setWaypoints((prev) =>
      prev.map((w, i) =>
        i === index
          ? { ...w, status: 'ARRIVED', actualArrival: new Date().toISOString() }
          : w
      )
    );
    Alert.alert('Succès', 'Waypoint marqué comme arrivé');
  };

  const handleMarkDeparted = (index: number) => {
    setWaypoints((prev) =>
      prev.map((w, i) =>
        i === index
          ? { ...w, status: 'DEPARTED', actualDeparture: new Date().toISOString() }
          : w
      )
    );
    Alert.alert('Succès', 'Waypoint marqué comme départ');
  };

  const handleUpdateInfo = (index: number) => {
    setSelectedWaypointIndex(index);
    setUpdateModalVisible(true);
  };

  const handleSaveWaypointUpdate = (index: number, updates: Partial<ContainerWaypoint>) => {
    setWaypoints((prev) =>
      prev.map((w, i) => (i === index ? { ...w, ...updates } : w))
    );
    Alert.alert('Succès', 'Waypoint mis à jour');
  };

  const handleAddWaypoint = () => {
    if (!newWaypoint.location || !newWaypoint.locationCode) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    const waypoint: ContainerWaypoint = {
      order: waypoints.length + 1,
      location: newWaypoint.location || '',
      locationCode: newWaypoint.locationCode || '',
      type: newWaypoint.type || 'PORT',
      status: 'PENDING',
      transportMode: newWaypoint.transportMode || 'SEA',
    };

    setWaypoints((prev) => [...prev, waypoint]);
    setShowAddWaypointDialog(false);
    setNewWaypoint({ type: 'PORT', transportMode: 'SEA', status: 'PENDING' });
    Alert.alert('Succès', 'Waypoint ajouté');
  };

  const handleImportTemplate = (template: RouteTemplate) => {
    const newWaypoints: ContainerWaypoint[] = template.waypoints.map((wp, index) => ({
      order: index + 1,
      location: wp.location,
      locationCode: wp.locationCode,
      type: wp.type,
      status: 'PENDING',
      transportMode: index < (template.seaSegments?.length || 0) ? 'SEA' : 'ROAD',
    }));

    setWaypoints(newWaypoints);
    setShowTemplateDialog(false);
    Alert.alert('Succès', `Template "${template.name}" importé`);
  };

  const handleSaveChanges = () => {
    // Simulate API save
    setTimeout(() => {
      setShowSaveDialog(false);
      Alert.alert('Succès', 'Modifications enregistrées');
    }, 500);
  };

  const handleDeleteWaypoint = (index: number) => {
    Alert.alert(
      'Confirmer la suppression',
      'Êtes-vous sûr de vouloir supprimer ce waypoint ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            setWaypoints((prev) =>
              prev
                .filter((_, i) => i !== index)
                .map((w, i) => ({ ...w, order: i + 1 }))
            );
          },
        },
      ]
    );
  };

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'waypoints':
        return (
          <ContainerWaypointTracker
            waypoints={waypoints}
            currentWaypointIndex={currentWaypointIndex}
            containerNumber={containerNumber}
            onMarkArrived={handleMarkArrived}
            onMarkDeparted={handleMarkDeparted}
            onUpdateInfo={handleUpdateInfo}
          />
        );
      case 'sea':
        return renderSeaSegments();
      case 'road':
        return renderRoadSegments();
      default:
        return null;
    }
  };

  const renderSeaSegments = () => (
    <ScrollView style={styles.segmentsContainer}>
      <Animated.View entering={FadeInUp.delay(100)} style={styles.segmentsHeader}>
        <Ionicons name="boat" size={32} color={Theme.status.info} />
        <Text style={styles.segmentsTitle}>Segments Maritimes</Text>
        <Text style={styles.segmentsSubtitle}>
          {seaSegments.length} segment{seaSegments.length > 1 ? 's' : ''} maritime
          {seaSegments.length > 1 ? 's' : ''}
        </Text>
      </Animated.View>

      {seaSegments.map((segment, index) => (
        <Animated.View
          key={`sea-${index}`}
          entering={FadeInUp.delay(200 + index * 100)}
          style={styles.segmentCard}
        >
          <View style={styles.segmentHeader}>
            <View style={styles.segmentIcon}>
              <Ionicons name="boat" size={20} color={Theme.status.info} />
            </View>
            <View style={styles.segmentTitleContainer}>
              <Text style={styles.segmentRoute}>
                {segment.fromPort} → {segment.toPort}
              </Text>
              <Text style={styles.segmentVessel}>{segment.vesselName}</Text>
            </View>
            <View style={[styles.segmentBadge, { backgroundColor: `${Theme.status.info}15` }]}>
              <Text style={[styles.segmentBadgeText, { color: Theme.status.info }]}>
                {segment.carrier}
              </Text>
            </View>
          </View>

          <View style={styles.segmentDetails}>
            {segment.vesselIMO && (
              <View style={styles.segmentDetail}>
                <Ionicons name="document-text" size={14} color={Theme.neutral[500]} />
                <Text style={styles.segmentDetailText}>IMO: {segment.vesselIMO}</Text>
              </View>
            )}
            {segment.departureDate && (
              <View style={styles.segmentDetail}>
                <Ionicons name="calendar" size={14} color={Theme.neutral[500]} />
                <Text style={styles.segmentDetailText}>
                  Départ: {new Date(segment.departureDate).toLocaleDateString('fr-FR')}
                </Text>
              </View>
            )}
            {segment.estimatedArrival && (
              <View style={styles.segmentDetail}>
                <Ionicons name="time-outline" size={14} color={Theme.neutral[500]} />
                <Text style={styles.segmentDetailText}>
                  Est. arrivée: {new Date(segment.estimatedArrival).toLocaleDateString('fr-FR')}
                </Text>
              </View>
            )}
          </View>
        </Animated.View>
      ))}
    </ScrollView>
  );

  const renderRoadSegments = () => (
    <ScrollView style={styles.segmentsContainer}>
      <Animated.View entering={FadeInUp.delay(100)} style={styles.segmentsHeader}>
        <Ionicons name="car" size={32} color={Theme.status.warning} />
        <Text style={styles.segmentsTitle}>Segments Routiers</Text>
        <Text style={styles.segmentsSubtitle}>
          {roadSegments.length} segment{roadSegments.length > 1 ? 's' : ''} routier
          {roadSegments.length > 1 ? 's' : ''}
        </Text>
      </Animated.View>

      {roadSegments.map((segment, index) => (
        <Animated.View
          key={`road-${index}`}
          entering={FadeInUp.delay(200 + index * 100)}
          style={styles.segmentCard}
        >
          <View style={styles.segmentHeader}>
            <View style={[styles.segmentIcon, { backgroundColor: `${Theme.status.warning}15` }]}>
              <Ionicons name="car" size={20} color={Theme.status.warning} />
            </View>
            <View style={styles.segmentTitleContainer}>
              <Text style={styles.segmentRoute}>
                {segment.fromLocation} → {segment.toLocation}
              </Text>
              {segment.truckPlate && (
                <Text style={styles.segmentVehicle}>Camion: {segment.truckPlate}</Text>
              )}
            </View>
            <View style={[styles.segmentBadge, { backgroundColor: `${Theme.status.warning}15` }]}>
              <Text style={[styles.segmentBadgeText, { color: Theme.status.warning }]}>
                Route
              </Text>
            </View>
          </View>

          <View style={styles.segmentDetails}>
            {segment.driverName && (
              <View style={styles.segmentDetail}>
                <Ionicons name="person" size={14} color={Theme.neutral[500]} />
                <Text style={styles.segmentDetailText}>Chauffeur: {segment.driverName}</Text>
              </View>
            )}
            {segment.driverPhone && (
              <View style={styles.segmentDetail}>
                <Ionicons name="call" size={14} color={Theme.neutral[500]} />
                <Text style={styles.segmentDetailText}>Tél: {segment.driverPhone}</Text>
              </View>
            )}
            {segment.carrier && (
              <View style={styles.segmentDetail}>
                <Ionicons name="business" size={14} color={Theme.neutral[500]} />
                <Text style={styles.segmentDetailText}>Transporteur: {segment.carrier}</Text>
              </View>
            )}
            {segment.estimatedTransitHours && (
              <View style={styles.segmentDetail}>
                <Ionicons name="time-outline" size={14} color={Theme.neutral[500]} />
                <Text style={styles.segmentDetailText}>
                  Transit estimé: {segment.estimatedTransitHours}h
                </Text>
              </View>
            )}
          </View>
        </Animated.View>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Header */}
      <LinearGradient
        colors={[Theme.primary[600], Theme.primary[800]]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Gestion Waypoints</Text>
          <TouchableOpacity
            style={styles.saveIconButton}
            onPress={() => setShowSaveDialog(true)}
          >
            <Ionicons name="save" size={22} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>{containerNumber}</Text>
      </LinearGradient>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {[
          { key: 'waypoints', icon: 'map', label: 'Waypoints' },
          { key: 'sea', icon: 'boat', label: 'Maritime' },
          { key: 'road', icon: 'car', label: 'Routier' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key as any)}
          >
            <Ionicons
              name={tab.icon as any}
              size={18}
              color={activeTab === tab.key ? Theme.primary[600] : Theme.neutral[500]}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {renderTabContent()}
      </View>

      {/* Floating Action Buttons */}
      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={styles.fabSecondary}
          onPress={() => setShowTemplateDialog(true)}
        >
          <Ionicons name="download" size={20} color={Theme.primary[600]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setShowAddWaypointDialog(true)}
        >
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Update Modal */}
      <WaypointUpdateModal
        visible={updateModalVisible}
        waypoint={waypoints[selectedWaypointIndex] || null}
        waypointIndex={selectedWaypointIndex}
        onDismiss={() => setUpdateModalVisible(false)}
        onSave={handleSaveWaypointUpdate}
      />

      {/* Add Waypoint Dialog */}
      <Portal>
        <Dialog
          visible={showAddWaypointDialog}
          onDismiss={() => setShowAddWaypointDialog(false)}
        >
          <Dialog.Icon icon="map-marker-plus" color={Theme.primary[600]} />
          <Dialog.Title style={styles.dialogTitle}>Ajouter un Waypoint</Dialog.Title>
          <Dialog.Content>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Nom de la Location *</Text>
              <TextInput
                style={styles.formInput}
                value={newWaypoint.location}
                onChangeText={(text) =>
                  setNewWaypoint((prev) => ({ ...prev, location: text }))
                }
                placeholder="Ex: Shanghai Port"
                placeholderTextColor={Theme.neutral[400]}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Code Location *</Text>
              <TextInput
                style={styles.formInput}
                value={newWaypoint.locationCode}
                onChangeText={(text) =>
                  setNewWaypoint((prev) => ({ ...prev, locationCode: text }))
                }
                placeholder="Ex: CNSHA"
                placeholderTextColor={Theme.neutral[400]}
                autoCapitalize="characters"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Type</Text>
              <Menu
                visible={typeMenuVisible}
                onDismiss={() => setTypeMenuVisible(false)}
                anchor={
                  <TouchableOpacity
                    style={styles.formSelect}
                    onPress={() => setTypeMenuVisible(true)}
                  >
                    <Ionicons
                      name={WAYPOINT_TYPE_ICONS[newWaypoint.type || 'PORT'] as any}
                      size={18}
                      color={Theme.neutral[500]}
                    />
                    <Text style={styles.formSelectText}>
                      {WAYPOINT_TYPE_LABELS[newWaypoint.type || 'PORT']}
                    </Text>
                    <Ionicons name="chevron-down" size={18} color={Theme.neutral[500]} />
                  </TouchableOpacity>
                }
              >
                {WAYPOINT_TYPE_OPTIONS.map((type) => (
                  <Menu.Item
                    key={type}
                    onPress={() => {
                      setNewWaypoint((prev) => ({ ...prev, type }));
                      setTypeMenuVisible(false);
                    }}
                    title={WAYPOINT_TYPE_LABELS[type]}
                    leadingIcon={() => (
                      <Ionicons name={WAYPOINT_TYPE_ICONS[type] as any} size={18} />
                    )}
                  />
                ))}
              </Menu>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Mode de Transport</Text>
              <Menu
                visible={transportMenuVisible}
                onDismiss={() => setTransportMenuVisible(false)}
                anchor={
                  <TouchableOpacity
                    style={styles.formSelect}
                    onPress={() => setTransportMenuVisible(true)}
                  >
                    <Ionicons
                      name={TRANSPORT_MODE_ICONS[newWaypoint.transportMode || 'SEA'] as any}
                      size={18}
                      color={Theme.neutral[500]}
                    />
                    <Text style={styles.formSelectText}>
                      {TRANSPORT_MODE_LABELS[newWaypoint.transportMode || 'SEA']}
                    </Text>
                    <Ionicons name="chevron-down" size={18} color={Theme.neutral[500]} />
                  </TouchableOpacity>
                }
              >
                {TRANSPORT_MODE_OPTIONS.map((mode) => (
                  <Menu.Item
                    key={mode}
                    onPress={() => {
                      setNewWaypoint((prev) => ({ ...prev, transportMode: mode }));
                      setTransportMenuVisible(false);
                    }}
                    title={TRANSPORT_MODE_LABELS[mode]}
                    leadingIcon={() => (
                      <Ionicons name={TRANSPORT_MODE_ICONS[mode] as any} size={18} />
                    )}
                  />
                ))}
              </Menu>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowAddWaypointDialog(false)}>Annuler</Button>
            <Button onPress={handleAddWaypoint} mode="contained">
              Ajouter
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Import Template Dialog */}
      <Portal>
        <Dialog
          visible={showTemplateDialog}
          onDismiss={() => setShowTemplateDialog(false)}
        >
          <Dialog.Icon icon="download" color={Theme.primary[600]} />
          <Dialog.Title style={styles.dialogTitle}>Importer un Template</Dialog.Title>
          <Dialog.Content>
            {MOCK_ROUTE_TEMPLATES.map((template) => (
              <TouchableOpacity
                key={template.id}
                style={styles.templateItem}
                onPress={() => handleImportTemplate(template)}
              >
                <View style={styles.templateIcon}>
                  <Ionicons name="map" size={24} color={Theme.primary[500]} />
                </View>
                <View style={styles.templateInfo}>
                  <Text style={styles.templateName}>{template.name}</Text>
                  <Text style={styles.templateDescription}>{template.description}</Text>
                  <Text style={styles.templateStats}>
                    {template.waypoints.length} waypoints •{' '}
                    {template.seaSegments?.length || 0} maritime •{' '}
                    {template.roadSegments?.length || 0} routier
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Theme.neutral[400]} />
              </TouchableOpacity>
            ))}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowTemplateDialog(false)}>Annuler</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Save Changes Dialog */}
      <Portal>
        <Dialog visible={showSaveDialog} onDismiss={() => setShowSaveDialog(false)}>
          <Dialog.Icon icon="content-save" color={Theme.status.success} />
          <Dialog.Title style={styles.dialogTitle}>Enregistrer les Modifications</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>
              Vous êtes sur le point d'enregistrer {waypoints.length} waypoints.
            </Text>
            <View style={styles.saveSummary}>
              <View style={styles.saveSummaryItem}>
                <Text style={styles.saveSummaryValue}>{waypoints.length}</Text>
                <Text style={styles.saveSummaryLabel}>Waypoints</Text>
              </View>
              <View style={styles.saveSummaryItem}>
                <Text style={styles.saveSummaryValue}>{seaSegments.length}</Text>
                <Text style={styles.saveSummaryLabel}>Segments Maritimes</Text>
              </View>
              <View style={styles.saveSummaryItem}>
                <Text style={styles.saveSummaryValue}>{roadSegments.length}</Text>
                <Text style={styles.saveSummaryLabel}>Segments Routiers</Text>
              </View>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowSaveDialog(false)}>Annuler</Button>
            <Button onPress={handleSaveChanges} mode="contained">
              Enregistrer
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
    backgroundColor: Theme.neutral[50],
  },
  header: {
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
    paddingHorizontal: Theme.spacing.lg,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.md,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  saveIconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Theme.neutral.white,
    padding: Theme.spacing.sm,
    gap: Theme.spacing.sm,
    ...Theme.shadows.sm,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    gap: Theme.spacing.xs,
  },
  tabActive: {
    backgroundColor: Theme.primary[50],
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.neutral[500],
  },
  tabTextActive: {
    color: Theme.primary[600],
  },
  content: {
    flex: 1,
  },
  segmentsContainer: {
    flex: 1,
    padding: Theme.spacing.lg,
  },
  segmentsHeader: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  segmentsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginTop: Theme.spacing.sm,
  },
  segmentsSubtitle: {
    fontSize: 14,
    color: Theme.neutral[500],
    marginTop: Theme.spacing.xs,
  },
  segmentCard: {
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  segmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  segmentIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${Theme.status.info}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  segmentTitleContainer: {
    flex: 1,
  },
  segmentRoute: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  segmentVessel: {
    fontSize: 13,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  segmentVehicle: {
    fontSize: 13,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  segmentBadge: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.full,
  },
  segmentBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  segmentDetails: {
    gap: Theme.spacing.sm,
  },
  segmentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  segmentDetailText: {
    fontSize: 13,
    color: Theme.neutral[600],
  },
  fabContainer: {
    position: 'absolute',
    right: Theme.spacing.lg,
    bottom: Theme.spacing.lg,
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Theme.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.lg,
  },
  fabSecondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Theme.neutral.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.md,
  },
  dialogTitle: {
    textAlign: 'center',
    fontWeight: '700',
  },
  formGroup: {
    marginBottom: Theme.spacing.md,
  },
  formLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.neutral[600],
    marginBottom: Theme.spacing.xs,
  },
  formInput: {
    backgroundColor: Theme.neutral[50],
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    borderRadius: Theme.radius.md,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    fontSize: 15,
    color: Theme.neutral[800],
  },
  formSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral[50],
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    borderRadius: Theme.radius.md,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  formSelectText: {
    flex: 1,
    fontSize: 15,
    color: Theme.neutral[800],
  },
  templateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral[50],
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.md,
  },
  templateIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Theme.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 15,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  templateDescription: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  templateStats: {
    fontSize: 11,
    color: Theme.primary[500],
    marginTop: 4,
    fontWeight: '600',
  },
  dialogText: {
    fontSize: 14,
    color: Theme.neutral[600],
    textAlign: 'center',
    marginBottom: Theme.spacing.lg,
  },
  saveSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Theme.neutral[50],
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.lg,
  },
  saveSummaryItem: {
    alignItems: 'center',
  },
  saveSummaryValue: {
    fontSize: 24,
    fontWeight: '800',
    color: Theme.primary[600],
  },
  saveSummaryLabel: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 4,
  },
});

export default WaypointManagementScreen;
