import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useContainerCardStyles } from './ContainerCard.styles';
import { CustomerContainer } from '../../types';
import { formatDate } from './ContainerCard';

interface StatusBannerProps {
  container: CustomerContainer;
}

export const StatusBanner: React.FC<StatusBannerProps> = ({ container }) => {
  const { colors } = useAppTheme();
  const styles = useContainerCardStyles();
  const isAirShipment = container.trackingType === 'AIRWAY_BILL' || container.shippingMode === 'AIR';

  if (container.status === 'READY_FOR_PICKUP') {
    return (
      <View style={styles.readyBanner}>
        <MaterialCommunityIcons name="truck-delivery-outline" size={16} color={colors.text.inverse} />
        <Text style={styles.readyBannerText}>{"Prêt pour retrait à l'entrepôt ChinaLink"}</Text>
      </View>
    );
  }

  if (isAirShipment && container.status === 'LOADED') {
    return (
      <View style={styles.infoBanner}>
        <MaterialCommunityIcons name="airplane-takeoff" size={14} color={colors.primary.main} />
        <Text style={styles.infoBannerText}>Prêt pour embarquement aérien</Text>
      </View>
    );
  }

  if (isAirShipment && container.status === 'IN_TRANSIT') {
    return (
      <View style={styles.infoBanner}>
        <MaterialCommunityIcons name="airplane" size={14} color={colors.primary.main} />
        <Text style={styles.infoBannerText}>Expédition aérienne en cours</Text>
      </View>
    );
  }

  if (isAirShipment && container.status === 'ARRIVED') {
    return (
      <View style={[styles.infoBanner, styles.arrivedBanner]}>
        <MaterialCommunityIcons name="airplane-landing" size={14} color={colors.status.success} />
        <Text style={[styles.infoBannerText, styles.arrivedBannerText]}>Arrivé à destination</Text>
      </View>
    );
  }

  if (container.status === 'GATE_IN_FULL' && container.timeline?.gateInFullAt) {
    return (
      <View style={styles.infoBanner}>
        <MaterialCommunityIcons name="gate" size={14} color={colors.primary.main} />
        <Text style={styles.infoBannerText}>Au port de départ depuis le {formatDate(container.timeline.gateInFullAt)}</Text>
      </View>
    );
  }

  if (container.status === 'LOADED_ON_VESSEL' && container.timeline?.loadedOnVesselAt) {
    return (
      <View style={styles.infoBanner}>
        <MaterialCommunityIcons name="ferry" size={14} color={colors.primary.main} />
        <Text style={styles.infoBannerText}>Chargé sur navire le {formatDate(container.timeline.loadedOnVesselAt)}</Text>
      </View>
    );
  }

  if (container.status === 'IN_TRANSIT' && container.timeline?.departedAt) {
    return (
      <View style={styles.infoBanner}>
        <MaterialCommunityIcons name="information-outline" size={14} color={colors.primary.main} />
        <Text style={styles.infoBannerText}>En transit depuis le {formatDate(container.timeline.departedAt)}</Text>
      </View>
    );
  }

  if (container.status === 'ARRIVED' && container.timeline?.arrivedAt) {
    return (
      <View style={[styles.infoBanner, styles.arrivedBanner]}>
        <MaterialCommunityIcons name="check-circle-outline" size={14} color={colors.status.success} />
        <Text style={[styles.infoBannerText, styles.arrivedBannerText]}>Arrivé le {formatDate(container.timeline.arrivedAt)}</Text>
      </View>
    );
  }

  return null;
};
