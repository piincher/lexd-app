import React from 'react';
import { View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { styles } from './AirwayBillTrackingTimeline.styles';

const AWB_STATUS_STEPS = [
  { key: 'CREATED', label: 'Créé', icon: 'file-document' },
  { key: 'PACKING', label: 'Préparation', icon: 'cube-outline' },
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

interface Props {
  currentStepIndex: number;
}

export const AirwayBillTrackingTimeline: React.FC<Props> = ({ currentStepIndex }) => (
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
);
