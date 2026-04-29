import { useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { ContainerWaypoint, SeaSegment, RoadSegment, RouteTemplate, WaypointStatus, SegmentType } from '../../../types';
import type { NewWaypointForm } from './types';

const MOCK_WAYPOINTS: ContainerWaypoint[] = [
  { order: 1, location: { city: 'Shanghai Port', country: 'China', countryCode: 'CN', portCode: 'CNSHA', coordinates: { latitude: 31.2304, longitude: 121.4737 } }, segmentType: 'SEA' as SegmentType, status: 'COMPLETED' as WaypointStatus, estimatedArrival: '2024-01-15T08:00:00Z', actualArrival: '2024-01-15T07:30:00Z', estimatedDeparture: '2024-01-16T18:00:00Z', actualDeparture: '2024-01-16T19:30:00Z', seaDetails: { vesselName: 'MSC OSCAR', vesselIMO: '9703291', carrier: 'MSC' }, description: 'Shanghai Port - Departure', shortName: 'Shanghai' },
  { order: 2, location: { city: 'Singapore Port', country: 'Singapore', countryCode: 'SG', portCode: 'SGSIN', coordinates: { latitude: 1.29027, longitude: 103.851959 } }, segmentType: 'SEA' as SegmentType, status: 'COMPLETED' as WaypointStatus, estimatedArrival: '2024-01-25T06:00:00Z', actualArrival: '2024-01-25T05:45:00Z', estimatedDeparture: '2024-01-26T12:00:00Z', seaDetails: { carrier: 'MSC' }, description: 'Singapore Port - Transit', shortName: 'Singapore', notes: 'Transhipment port' },
  { order: 3, location: { city: 'Lomé Port', country: 'Togo', countryCode: 'TG', portCode: 'TGLFW', coordinates: { latitude: 6.1319, longitude: 1.2228 } }, segmentType: 'SEA' as SegmentType, status: 'IN_PROGRESS' as WaypointStatus, estimatedArrival: '2024-02-15T08:00:00Z', seaDetails: { carrier: 'MSC' }, description: 'Lomé Port - Arrival', shortName: 'Lomé' },
  { order: 4, location: { city: 'Border Togo-Benin', country: 'Togo', countryCode: 'TG', coordinates: { latitude: 6.3, longitude: 1.5 } }, segmentType: 'ROAD' as SegmentType, status: 'PENDING' as WaypointStatus, roadDetails: { transporterName: 'Transit Logistics', driverName: 'Amadou Diallo', driverPhone: '+228 90 12 34 56', truckPlateNumber: 'TG-1234-AB' }, description: 'Border Crossing', shortName: 'Border TG-BJ' },
  { order: 5, location: { city: 'Cotonou Warehouse', country: 'Benin', countryCode: 'BJ', coordinates: { latitude: 6.3654, longitude: 2.4183 } }, segmentType: 'WAREHOUSE' as SegmentType, status: 'PENDING' as WaypointStatus, roadDetails: { transporterName: 'Local Transport' }, description: 'Final Destination', shortName: 'Cotonou' },
];

const MOCK_SEA_SEGMENTS: SeaSegment[] = [
  { fromPort: 'CNSHA', toPort: 'SGSIN', vesselName: 'MSC OSCAR', vesselIMO: '9703291', carrier: 'MSC', departureDate: '2024-01-16T19:30:00Z', estimatedArrival: '2024-01-25T05:45:00Z' },
  { fromPort: 'SGSIN', toPort: 'TGLFW', vesselName: 'MSC GULSUN', vesselIMO: '9839430', carrier: 'MSC', departureDate: '2024-01-26T12:00:00Z', estimatedArrival: '2024-02-15T08:00:00Z' },
];

const MOCK_ROAD_SEGMENTS: RoadSegment[] = [
  { fromLocation: 'TGLFW', toLocation: 'BJCOO', truckPlate: 'TG-1234-AB', driverName: 'Amadou Diallo', driverPhone: '+228 90 12 34 56', carrier: 'Transit Logistics', estimatedTransitHours: 12 },
];

export const useWaypointData = () => {
  const [waypoints, setWaypoints] = useState<ContainerWaypoint[]>(MOCK_WAYPOINTS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const currentWaypointIndex = useMemo(() => {
    const i = waypoints.findIndex((w) => w.status === 'IN_PROGRESS' || w.status === 'COMPLETED');
    return i >= 0 ? i : waypoints.findIndex((w) => w.status === 'PENDING') || 0;
  }, [waypoints]);
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  }, []);
  const handleMarkArrived = useCallback((index: number) => {
    setWaypoints((prev) => prev.map((w, i) => i === index ? { ...w, status: 'COMPLETED' as WaypointStatus, actualArrival: new Date().toISOString() } : w));
    Alert.alert('Succès', 'Waypoint marqué comme arrivé');
  }, []);
  const handleMarkDeparted = useCallback((index: number) => {
    setWaypoints((prev) => prev.map((w, i) => i === index ? { ...w, actualDeparture: new Date().toISOString() } : w));
    Alert.alert('Succès', 'Waypoint marqué comme départ');
  }, []);
  const handleSaveWaypointUpdate = useCallback((index: number, updates: Partial<ContainerWaypoint>) => {
    setWaypoints((prev) => prev.map((w, i) => (i === index ? { ...w, ...updates } : w)));
    Alert.alert('Succès', 'Waypoint mis à jour');
  }, []);
  const addWaypoint = useCallback((form: NewWaypointForm) => {
    if (!form.locationCity || !form.locationCode) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return false;
    }
    const waypoint: ContainerWaypoint = {
      order: 0,
      location: { city: form.locationCity, country: '', countryCode: form.locationCode.slice(0, 2) || 'XX' },
      segmentType: form.segmentType || 'SEA',
      status: 'PENDING',
      description: form.locationCity,
      shortName: form.locationCity,
    };
    setWaypoints((prev) => [...prev, { ...waypoint, order: prev.length + 1 }]);
    return true;
  }, []);
  const handleImportTemplate = useCallback((template: RouteTemplate) => {
    const newWaypoints: ContainerWaypoint[] = template.waypoints.map((wp: any, idx: number) => ({
      order: idx + 1,
      location: { city: wp.location || '', country: '', countryCode: wp.locationCode?.slice(0, 2) || 'XX' },
      segmentType: (wp.type === 'PORT' ? 'SEA' : wp.type === 'WAREHOUSE' ? 'WAREHOUSE' : 'ROAD') as SegmentType,
      description: wp.location || '',
      shortName: wp.location || '',
      status: 'PENDING' as WaypointStatus,
    }));
    setWaypoints(newWaypoints);
    Alert.alert('Succès', `Template "${template.name}" importé`);
  }, []);
  const handleDeleteWaypoint = useCallback((index: number) => {
    Alert.alert('Confirmer la suppression', 'Êtes-vous sûr de vouloir supprimer ce waypoint ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: () => setWaypoints((prev) => prev.filter((_, i) => i !== index).map((w, i) => ({ ...w, order: i + 1 }))) }
    ]);
  }, []);
  return {
    waypoints,
    seaSegments: MOCK_SEA_SEGMENTS,
    roadSegments: MOCK_ROAD_SEGMENTS,
    isRefreshing,
    currentWaypointIndex,
    handleRefresh,
    handleMarkArrived,
    handleMarkDeparted,
    handleSaveWaypointUpdate,
    addWaypoint,
    handleImportTemplate,
    handleDeleteWaypoint,
  };
};
