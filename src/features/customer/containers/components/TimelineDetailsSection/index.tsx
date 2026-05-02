import React from 'react';
import { View, Pressable } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTimelineDetailsSectionStyles } from './TimelineDetailsSection.styles';
import { ContainerTimeline } from '../../types';

interface TimelineDetailsSectionProps {
  timeline: ContainerTimeline;
  showTimelineDetails: boolean;
  onToggleSection: () => void;
  formatDateTime: (dateString?: string) => string;
}

export const TimelineDetailsSection: React.FC<TimelineDetailsSectionProps> = ({
  timeline,
  showTimelineDetails,
  onToggleSection,
  formatDateTime,
}) => {
  const styles = useTimelineDetailsSectionStyles();

  const rows: { label: string; value?: string }[] = [
    { label: 'Réservé le', value: timeline.bookedAt },
    { label: 'Vide vers entrepôt', value: timeline.emptyDispatchedAt },
    { label: 'Chargement commencé', value: timeline.loadingStartedAt },
    { label: 'Chargement terminé', value: timeline.loadingCompletedAt },
    { label: 'Entré au port', value: timeline.gateInFullAt },
    { label: 'Chargé à bord', value: timeline.loadedOnVesselAt },
    { label: 'Départ', value: timeline.departedAt },
    { label: 'Arrivé le', value: timeline.arrivedAt },
    { label: 'Déchargé le', value: timeline.dischargedAt },
    { label: 'Prêt pour retrait', value: timeline.readyForPickupAt },
    { label: 'Livré le', value: timeline.deliveredAt },
  ];

  return (
    <Card style={styles.sectionCard}>
      <Card.Content>
        <Pressable onPress={onToggleSection} style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Détails Chronologiques</Text>
          <MaterialCommunityIcons
            name={showTimelineDetails ? 'chevron-up' : 'chevron-down'}
            size={24}
            color={styles.chevronColor}
          />
        </Pressable>
        {showTimelineDetails && (
          <View style={styles.detailsList}>
            {rows.map(
              (row, idx) =>
                row.value && (
                  <View key={idx} style={styles.timelineDetailRow}>
                    <Text style={styles.timelineDetailLabel}>{row.label}</Text>
                    <Text style={styles.timelineDetailValue}>
                      {formatDateTime(row.value)}
                    </Text>
                  </View>
                )
            )}
          </View>
        )}
      </Card.Content>
    </Card>
  );
};
