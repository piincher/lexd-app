import React from 'react';
import { View, Pressable } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { WaypointCard } from '../WaypointCard';
import { useWaypointJourneySectionStyles } from './WaypointJourneySection.styles';
import { ContainerWaypoint } from '@src/shared/types/containerWaypoints';

interface WaypointJourneySectionProps {
  waypoints: ContainerWaypoint[];
  currentWaypointIndex: number;
  expandedWaypoint: number | null;
  showWaypointJourney: boolean;
  onToggleSection: () => void;
  onToggleWaypoint: (idx: number) => void;
}

export const WaypointJourneySection: React.FC<WaypointJourneySectionProps> = ({
  waypoints,
  currentWaypointIndex,
  expandedWaypoint,
  showWaypointJourney,
  onToggleSection,
  onToggleWaypoint,
}) => {
  const styles = useWaypointJourneySectionStyles();

  return (
    <Card style={styles.sectionCard}>
      <Card.Content>
        <Pressable onPress={onToggleSection} style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Parcours du Container</Text>
          <MaterialCommunityIcons
            name={showWaypointJourney ? 'chevron-up' : 'chevron-down'}
            size={24}
            color={styles.chevronColor}
          />
        </Pressable>
        {showWaypointJourney && (
          <View style={styles.waypointsList}>
            {waypoints.map((wp, idx) => (
              <WaypointCard
                key={wp._id || idx}
                waypoint={wp}
                index={idx}
                currentWaypointIndex={currentWaypointIndex}
                isExpanded={expandedWaypoint === idx}
                onToggle={() => onToggleWaypoint(idx)}
              />
            ))}
          </View>
        )}
      </Card.Content>
    </Card>
  );
};
