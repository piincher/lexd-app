import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from '@src/shared/ui';
import { COLORS } from '@src/constants/Colors';
import { styles, MAP_HEIGHT } from './TrackingMapView.styles';

interface Location { lat: number; lng: number; }

export interface TrackingMapViewProps {
  currentLocation?: Location;
  destination?: Location;
  route?: Location[];
  isLoading?: boolean;
  error?: string | null;
}

export const TrackingMapView: React.FC<TrackingMapViewProps> = ({
  currentLocation, destination, route, isLoading = false, error = null,
}) => {
  const [zoom, setZoom] = useState(1);

  if (isLoading) return (
    <Card style={styles.container}>
      <View style={styles.centerContainer}>
        <MaterialCommunityIcons name="map-clock" size={48} color={COLORS.SlateGray} />
        <Text style={styles.loadingText}>Chargement de la carte...</Text>
      </View>
    </Card>
  );

  if (error) return (
    <Card style={styles.container}>
      <View style={styles.centerContainer}>
        <MaterialCommunityIcons name="map-marker-off" size={48} color={COLORS.danger} />
        <Text style={styles.errorTitle}>Carte indisponible</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    </Card>
  );

  if (!currentLocation) return (
    <Card style={styles.container}>
      <View style={styles.centerContainer}>
        <MaterialCommunityIcons name="map-marker-question" size={48} color={COLORS.grey} />
        <Text style={styles.emptyTitle}>Position non disponible</Text>
        <Text style={styles.emptyText}>La localisation sera affichée ici</Text>
      </View>
    </Card>
  );

  return (
    <Card style={styles.container} padding="none">
      <View style={[styles.mapContainer, { height: MAP_HEIGHT * zoom }]}>
        <View style={styles.gridBackground} />
        {destination && (
          <View style={styles.routeContainer}>
            <View style={styles.routeLine} />
            {route?.map((p, i) => (
              <View key={i} style={[styles.waypoint, { left: `${20 + i * 15}%`, top: `${30 + (i % 2) * 20}%` }]} />
            ))}
          </View>
        )}
        <View style={[styles.marker, styles.currentMarker]}>
          <MaterialCommunityIcons name="truck-delivery" size={24} color="#FFF" />
          <View style={styles.markerPulse} />
        </View>
        {destination && (
          <View style={[styles.marker, styles.destinationMarker]}>
            <MaterialCommunityIcons name="flag-checkered" size={24} color="#FFF" />
          </View>
        )}
        <View style={styles.zoomControls}>
          <IconButton icon="plus" size={20} onPress={() => setZoom(z => Math.min(z + 0.2, 2))} style={styles.zoomButton} iconColor={COLORS.DarkGrey} />
          <IconButton icon="minus" size={20} onPress={() => setZoom(z => Math.max(z - 0.2, 0.6))} style={styles.zoomButton} iconColor={COLORS.DarkGrey} />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.locationRow}>
          <MaterialCommunityIcons name="map-marker" size={18} color={COLORS.green} />
          <Text style={styles.locationLabel}>Position:</Text>
          <Text style={styles.locationValue}>{currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}</Text>
        </View>
        {destination && (
          <View style={styles.locationRow}>
            <MaterialCommunityIcons name="flag" size={18} color={COLORS.gold} />
            <Text style={styles.locationLabel}>Destination:</Text>
            <Text style={styles.locationValue}>{destination.lat.toFixed(4)}, {destination.lng.toFixed(4)}</Text>
          </View>
        )}
      </View>
    </Card>
  );
};

export default TrackingMapView;
