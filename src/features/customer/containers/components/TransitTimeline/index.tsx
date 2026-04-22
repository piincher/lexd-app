/**
 * TransitTimeline - Customer-facing transit timeline
 * Refactored: Composed from smaller components, < 150 lines
 */
import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Card, Divider } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ContainerWaypoint } from '../../types';
import { TimelineWaypointCard } from '../TimelineWaypointCard';
import { useTimelineData } from './hooks/useTimelineData';
import { formatTimestamp } from './components/TimelineDateMarker';
import { RouteFlow } from './components/RouteFlow';
import { createStyles } from './TransitTimeline.styles';

interface Props {
  waypoints: ContainerWaypoint[];
  currentWaypointIndex: number;
  containerNumber: string;
  lastUpdateTimestamp?: string;
  consignee?: { name: string; phone: string; warehouseAddress: string; businessHours?: string };
}

export const TransitTimeline: React.FC<Props> = ({
  waypoints, currentWaypointIndex, containerNumber, lastUpdateTimestamp, consignee,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const { completedWaypoints, currentWaypoint, finalDestination, dakarWaypoint } = 
    useTimelineData(waypoints, currentWaypointIndex);

  const getETA = () => finalDestination?.estimatedArrival 
    ? formatTimestamp(finalDestination.estimatedArrival) 
    : finalDestination?.actualArrival 
      ? formatTimestamp(finalDestination.actualArrival) 
      : 'Non disponible';

  const callNumber = (phone: string) => Linking.openURL(`tel:${phone}`);
  const completedCount = completedWaypoints.length + (currentWaypoint ? 1 : 0);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInUp.delay(100)} style={styles.headerCard}>
        <LinearGradient colors={[Theme.primary[600], Theme.primary[800]]} style={styles.headerGradient}>
          <View style={styles.headerTop}>
            <View style={styles.headerIcon}><Ionicons name="navigate" size={24} color={Theme.primary[600]} /></View>
            <View style={styles.headerText}>
              <Text style={styles.headerLabel}>Container</Text>
              <Text style={styles.headerTitle}>{containerNumber}</Text>
            </View>
          </View>
          <View style={styles.journeyStats}>
            <View style={styles.statItem}>
              <Ionicons name="location" size={16} color="rgba(255,255,255,0.8)" />
              <Text style={styles.statText}>{completedCount} / {waypoints.length} étapes</Text>
            </View>
            {lastUpdateTimestamp && (
              <View style={styles.statItem}>
                <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.statText}>Mis à jour: {formatTimestamp(lastUpdateTimestamp)}</Text>
              </View>
            )}
          </View>
        </LinearGradient>
      </Animated.View>

      <RouteFlow />

      {currentWaypoint && (
        <Animated.View entering={FadeInUp.delay(200)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.currentLocationBadge}>
              <Ionicons name="radio-button-on" size={16} color={Theme.status.info} />
              <Text style={styles.currentLocationText}>POSITION ACTUELLE</Text>
            </View>
          </View>
          <TimelineWaypointCard waypoint={currentWaypoint} isCurrent={true} isCompleted={false} />
        </Animated.View>
      )}

      <Animated.View entering={FadeInUp.delay(300)} style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Résumé du Voyage</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Ionicons name="navigate-outline" size={20} color={Theme.primary[500]} />
            <Text style={styles.summaryLabel}>Départ</Text>
            <Text style={styles.summaryValue}>{waypoints[0]?.location || 'N/A'}</Text>
          </View>
          <Ionicons name="arrow-forward" size={20} color={colors.text.secondary} />
          <View style={styles.summaryItem}>
            <Ionicons name="flag-outline" size={20} color={Theme.status.success} />
            <Text style={styles.summaryLabel}>Arrivée</Text>
            <Text style={styles.summaryValue}>{finalDestination?.location || 'N/A'}</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(400)} style={styles.arrivalCard}>
        <LinearGradient colors={['#FEF3C7', '#FFFBEB']} style={styles.arrivalGradient}>
          <View style={styles.arrivalIconContainer}><Ionicons name="flag" size={28} color={colors.accent.goldDark} /></View>
          <View style={styles.arrivalContent}>
            <Text style={styles.arrivalLabel}>Arrivée Estimée</Text>
            <Text style={styles.arrivalValue}>{getETA()}</Text>
            {finalDestination?.location && <Text style={styles.arrivalDestination}>{finalDestination.location}</Text>}
          </View>
        </LinearGradient>
      </Animated.View>

      {dakarWaypoint && (
        <Animated.View entering={FadeInUp.delay(500)} style={styles.dakarInfoCard}>
          <LinearGradient colors={['#D1FAE5', '#ECFDF5']} style={styles.dakarInfoGradient}>
            <View style={styles.dakarInfoHeader}>
              <Ionicons name="boat" size={24} color="#059669" />
              <Text style={styles.dakarInfoTitle}>Port d'Arrivée Principal</Text>
            </View>
            <Text style={styles.dakarInfoText}>Votre conteneur arrive à <Text style={styles.dakarInfoHighlight}>Dakar, Sénégal</Text>.</Text>
            {dakarWaypoint.estimatedArrival && <Text style={styles.dakarInfoETA}>Arrivée estimée: {formatTimestamp(dakarWaypoint.estimatedArrival)}</Text>}
          </LinearGradient>
        </Animated.View>
      )}

      {consignee && (
        <Animated.View entering={FadeInUp.delay(600)}>
          <Card style={styles.pickupCard}>
            <LinearGradient colors={['#8B5CF6', '#7C3AED']} style={styles.pickupGradient}>
              <Card.Content>
                <View style={styles.pickupHeader}>
                  <Ionicons name="location" size={28} color={colors.text.inverse} />
                  <Text style={styles.pickupTitle}>POINT DE RETRAIT</Text>
                </View>
                <Text style={styles.warehouseName}>{consignee.name}</Text>
                <Divider style={styles.divider} />
                <TouchableOpacity style={styles.phoneButton} onPress={() => callNumber(consignee.phone)}>
                  <Ionicons name="call" size={20} color="#7C3AED" />
                  <Text style={styles.phoneText}>{consignee.phone}</Text>
                </TouchableOpacity>
                <Text style={styles.hours}>{consignee.warehouseAddress}</Text>
              </Card.Content>
            </LinearGradient>
          </Card>
        </Animated.View>
      )}
      <View style={styles.footerSpacer} />
    </ScrollView>
  );
};

export default TransitTimeline;
