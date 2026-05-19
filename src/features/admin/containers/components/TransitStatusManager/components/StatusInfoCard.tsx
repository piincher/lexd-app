import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './NonTransitView.styles';

export interface StatusInfoCardProps {
  containerNumber: string;
  statusLabel: string;
  statusColor: string;
  statusIcon: keyof typeof Ionicons.glyphMap;
  waypointCount: number;
}

export const StatusInfoCard: React.FC<StatusInfoCardProps> = ({
  containerNumber,
  statusLabel,
  statusColor,
  statusIcon,
  waypointCount,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <Card style={styles.card}>
      <Card.Content>
        {/* Container Number Header */}
        <View style={styles.header}>
          <Text style={styles.containerNumber}>{containerNumber}</Text>
        </View>

        {/* Status Information */}
        <View style={styles.statusSection}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${statusColor}20` },
            ]}
          >
            <Ionicons name={statusIcon} size={32} color={statusColor} />
          </View>

          <View style={styles.statusInfo}>
            <Text style={styles.statusLabel}>{statusLabel}</Text>
            <Text style={styles.currentStatusText}>Statut actuel</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Information Message */}
        <View style={styles.infoSection}>
          <View style={styles.infoIconContainer}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={colors.primary[500]}
            />
          </View>
          <Text style={styles.infoText}>
            Le suivi détaillé du transit sera disponible lorsque le conteneur
            sera en route.
          </Text>
        </View>

        {/* Waypoint Preview Count */}
        {waypointCount > 0 && (
          <View style={styles.waypointPreviewSection}>
            <View style={styles.waypointPreviewHeader}>
              <Ionicons
                name="map-outline"
                size={18}
                color={colors.neutral[600]}
              />
              <Text style={styles.waypointPreviewTitle}>
                Itinéraire prévu
              </Text>
            </View>
            <Text style={styles.waypointCountText}>
              {waypointCount} étape{waypointCount > 1 ? 's' : ''} prévue
              {waypointCount > 1 ? 's' : ''}
            </Text>
          </View>
        )}

        {/* Status Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionText}>
            Le suivi en temps réel des waypoints n&apos;est accessible que
            lorsque le statut du conteneur est &quot;En Transit&quot;.
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default StatusInfoCard;
