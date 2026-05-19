import { useAppTheme } from '@src/providers/ThemeProvider';
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import {
  ContainerWaypoint,
  WAYPOINT_TYPE_LABELS,
  TRANSPORT_MODE_LABELS,
  WAYPOINT_TYPE_ICONS,
  TRANSPORT_MODE_ICONS,
} from '../../types';

interface WaypointCardMetaProps {
  styles: any;
  waypoint: ContainerWaypoint;
  colors: any;
}

export const WaypointCardMeta: React.FC<WaypointCardMetaProps> = ({ styles, waypoint, colors }) => {
  const typeIcon = WAYPOINT_TYPE_ICONS[waypoint.type];
  const transportIcon = TRANSPORT_MODE_ICONS[waypoint.transportMode];

  return (
    <>
      <View style={styles.infoRow}>
        <View style={styles.infoBadge}>
          <Ionicons name={typeIcon as any} size={12} color={colors.text.secondary} />
          <Text style={styles.infoBadgeText}>{WAYPOINT_TYPE_LABELS[waypoint.type]}</Text>
        </View>
        <View style={styles.transportBadge}>
          <Ionicons name={transportIcon as any} size={12} color={colors.status.info} />
          <Text style={styles.transportBadgeText}>{TRANSPORT_MODE_LABELS[waypoint.transportMode]}</Text>
        </View>
      </View>

      {(waypoint.vesselName || waypoint.truckPlate) && (
        <View style={styles.detailsRow}>
          {waypoint.vesselName && (
            <View style={styles.detailItem}>
              <Ionicons name="boat" size={12} color={colors.text.secondary} />
              <Text style={styles.detailText} numberOfLines={1}>{waypoint.vesselName}</Text>
            </View>
          )}
          {waypoint.truckPlate && (
            <View style={styles.detailItem}>
              <Ionicons name="car" size={12} color={colors.text.secondary} />
              <Text style={styles.detailText} numberOfLines={1}>{waypoint.truckPlate}</Text>
            </View>
          )}
          {waypoint.carrier && (
            <View style={styles.detailItem}>
              <Ionicons name="business" size={12} color={colors.text.secondary} />
              <Text style={styles.detailText} numberOfLines={1}>{waypoint.carrier}</Text>
            </View>
          )}
        </View>
      )}
    </>
  );
};
