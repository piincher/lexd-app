import React from 'react';
import { View, Text } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { Container } from '../types';
import { styles } from './ContainerCard.styles';

interface Props {
  timeline: Container['timeline'];
}

export const ContainerTimeline: React.FC<Props> = ({ timeline }) => {
  if (!timeline) return null;
  const steps = [
    { label: 'Réservé', active: !!timeline.bookedAt },
    { label: 'Gate-in', active: !!timeline.gateInFullAt },
    { label: 'Navire', active: !!timeline.loadedOnVesselAt },
    { label: 'Expédié', active: !!timeline.departedAt },
    { label: 'Arrivé', active: !!timeline.arrivedAt },
    { label: 'Déchargé', active: !!timeline.dischargedAt },
    { label: 'Retrait', active: !!timeline.readyForPickupAt },
  ];

  return (
    <View style={styles.timeline}>
      {steps.map((step, index) => (
        <React.Fragment key={step.label}>
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, { backgroundColor: step.active ? Theme.status.success : Theme.neutral[300] }]} />
            <Text style={styles.timelineLabel}>{step.label}</Text>
          </View>
          {index < steps.length - 1 && <View style={styles.timelineLine} />}
        </React.Fragment>
      ))}
    </View>
  );
};
