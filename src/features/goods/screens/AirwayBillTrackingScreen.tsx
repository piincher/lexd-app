/**
 * AirwayBillTrackingScreen - Customer view of airway bill tracking
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { RootStackParamList } from '@src/navigations/type';
import { Theme } from '@src/constants/Theme';
import { useGetAirwayBillById } from '@src/features/admin/airwayBills/hooks/useAirwayBills';
import { AirwayBillTrackingWaypoints } from './components/AirwayBillTrackingWaypoints';

const AWB_STATUS_STEPS = [
  { key: 'CREATED', label: 'Créé', icon: 'file-document' },
  { key: 'PACKING', label: 'Préparation', icon: 'cube-send' },
  { key: 'READY_FOR_DEPARTURE', label: 'Prêt au départ', icon: 'clock-check' },
  { key: 'IN_TRANSIT', label: 'En transit', icon: 'airplane' },
  { key: 'ARRIVED', label: 'Arrivé', icon: 'map-marker-check' },
  { key: 'READY_FOR_PICKUP', label: 'Prêt pour retrait', icon: 'hand-wave' },
  { key: 'DELIVERED', label: 'Livré', icon: 'check-circle' },
];

const STATUS_COLORS: Record<string, string> = {
  CREATED: Theme.neutral[400],
  PACKING: Theme.primary[400],
  READY_FOR_DEPARTURE: Theme.accent.gold,
  IN_TRANSIT: Theme.status.info,
  ARRIVED: Theme.status.success,
  READY_FOR_PICKUP: Theme.accent.mint,
  DELIVERED: Theme.status.success,
};

export const AirwayBillTrackingScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'AirwayBillTracking'>>();
  const { airwayBillId } = route.params;

  const { data, isLoading } = useGetAirwayBillById(airwayBillId);
  const awb = data?.data?.airwayBill;

  if (isLoading || !awb) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </SafeAreaView>
    );
  }

  const currentStepIndex = AWB_STATUS_STEPS.findIndex((s) => s.key === awb.status);
  const flightLabel = [awb.airline, awb.flightNumber].filter(Boolean).join(' · ') || 'Vol à confirmer';
  const departureAirport = awb.departureAirport || '---';
  const arrivalAirport = awb.arrivalAirport || '---';
  const waypoints = awb.waypoints || [];
  const activeWaypointIndex = typeof awb.currentWaypointIndex === 'number'
    ? awb.currentWaypointIndex
    : waypoints.findIndex((waypoint: any) => ['IN_PROGRESS', 'DELAYED'].includes(waypoint.status));
  const pendingWaypointIndex = waypoints.findIndex((waypoint: any) => waypoint.status === 'PENDING');
  const currentWaypointIndex = activeWaypointIndex !== -1
    ? activeWaypointIndex
    : pendingWaypointIndex === 0
      ? -1
      : pendingWaypointIndex > 0
        ? pendingWaypointIndex
        : waypoints.length - 1;
  const waypointProgress = typeof awb.waypointProgressPercentage === 'number'
    ? awb.waypointProgressPercentage
    : waypoints.length
      ? Math.round((waypoints.filter((waypoint: any) => waypoint.status === 'COMPLETED').length / waypoints.length) * 100)
      : 0;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <MaterialCommunityIcons name="airplane" size={40} color={Theme.primary[500]} />
          <Text style={styles.awbNumber}>{awb.awbNumber}</Text>
          <Text style={styles.flightInfo}>{flightLabel}</Text>
        </View>

        {/* Route */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.routeRow}>
              <View style={styles.airport}>
                <Text style={styles.airportCode}>{departureAirport}</Text>
                <Text style={styles.airportLabel}>Départ</Text>
              </View>
              <View style={styles.routeLine}>
                <MaterialCommunityIcons name="airplane" size={20} color={Theme.primary[500]} />
              </View>
              <View style={styles.airport}>
                <Text style={styles.airportCode}>{arrivalAirport}</Text>
                <Text style={styles.airportLabel}>Arrivée</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {waypoints.length > 0 ? (
          <AirwayBillTrackingWaypoints
            waypoints={waypoints}
            currentWaypointIndex={currentWaypointIndex}
            progressPercentage={waypointProgress}
          />
        ) : (
          <>
            <Text style={styles.sectionTitle}>Suivi</Text>
            <Card style={styles.card}>
              <Card.Content>
                {AWB_STATUS_STEPS.map((step, index) => {
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;
                  const color = isCompleted ? STATUS_COLORS[step.key] : Theme.neutral[300];

                  return (
                    <View key={step.key} style={styles.timelineItem}>
                      <View style={[styles.timelineIcon, { backgroundColor: isCompleted ? `${color}20` : Theme.neutral[100] }]}>
                        <MaterialCommunityIcons
                          name={step.icon as any}
                          size={20}
                          color={isCompleted ? color : Theme.neutral[400]}
                        />
                      </View>
                      <View style={styles.timelineContent}>
                        <Text style={[styles.timelineLabel, { color: isCompleted ? Theme.neutral[800] : Theme.neutral[400] }]}>
                          {step.label}
                        </Text>
                        {isCurrent && <Text style={styles.timelineCurrent}>En cours</Text>}
                      </View>
                      {index < AWB_STATUS_STEPS.length - 1 && (
                        <View style={[styles.timelineConnector, { backgroundColor: index < currentStepIndex ? color : Theme.neutral[200] }]} />
                      )}
                    </View>
                  );
                })}
              </Card.Content>
            </Card>
          </>
        )}

        {/* Goods List */}
        <Text style={styles.sectionTitle}>Vos colis ({awb.goodsIds?.length || 0})</Text>
        <Card style={styles.card}>
          <Card.Content>
            {(awb.goodsIds || []).map((goods: any) => (
              <View key={goods._id || goods} style={styles.goodsItem}>
                <MaterialCommunityIcons name="package-variant" size={20} color={Theme.primary[500]} />
                <Text style={styles.goodsText}>
                  {typeof goods === 'string' ? goods : goods.goodsId}
                </Text>
                {typeof goods !== 'string' && goods.status && (
                  <Text style={styles.goodsStatus}>{goods.status}</Text>
                )}
              </View>
            ))}
            {(awb.goodsIds || []).length === 0 && (
              <Text style={styles.emptyText}>Aucun colis</Text>
            )}
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.neutral[50] },
  content: { padding: Theme.spacing.lg, paddingBottom: 60 },
  loadingText: { textAlign: 'center', marginTop: 40, color: Theme.neutral[500] },
  header: { alignItems: 'center', marginBottom: Theme.spacing.lg },
  awbNumber: { fontSize: 22, fontWeight: '800', color: Theme.neutral[900], marginTop: Theme.spacing.sm },
  flightInfo: { fontSize: 14, color: Theme.neutral[500], marginTop: 4 },
  card: { borderRadius: Theme.radius.xl, marginBottom: Theme.spacing.md },
  routeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  airport: { alignItems: 'center', flex: 1 },
  airportCode: { fontSize: 24, fontWeight: '800', color: Theme.neutral[900] },
  airportLabel: { fontSize: 12, color: Theme.neutral[400], marginTop: 2 },
  routeLine: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Theme.spacing.md },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Theme.neutral[800], marginBottom: Theme.spacing.md, marginTop: Theme.spacing.sm },
  timelineItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: Theme.spacing.sm },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineContent: { marginLeft: Theme.spacing.md, flex: 1 },
  timelineLabel: { fontSize: 14, fontWeight: '600' },
  timelineCurrent: { fontSize: 12, color: Theme.primary[500], marginTop: 2 },
  timelineConnector: {
    position: 'absolute',
    left: 20,
    top: 48,
    width: 2,
    height: 24,
  },
  goodsItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: Theme.spacing.sm, gap: 10 },
  goodsText: { fontSize: 14, color: Theme.neutral[700], flex: 1 },
  goodsStatus: { fontSize: 12, color: Theme.neutral[400] },
  emptyText: { textAlign: 'center', color: Theme.neutral[400], paddingVertical: 20 },
});

export default AirwayBillTrackingScreen;
