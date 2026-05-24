/**
 * ServiceShowcase
 * Air and Sea freight service cards with gradient backgrounds,
 * enhanced visual depth, and press feedback.
 */

import React from 'react';
import { View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { SERVICES } from '../../constants/homeData';
import { SectionHeader } from '../SectionHeader';
import { ServiceCard } from './ServiceCard';
import { createServiceShowcaseStyles } from './ServiceShowcase.styles';

interface ServiceShowcaseProps {
  onServicePress: (navigateTo: string) => void;
}

export const ServiceShowcase: React.FC<ServiceShowcaseProps> = ({ onServicePress }) => {
  const { colors } = useAppTheme();
  const styles = createServiceShowcaseStyles(colors);
  const serviceAccent = (id: string) =>
    id === 'air' ? colors.status.info : colors.primary.main;

  return (
    <View style={styles.container}>
      <SectionHeader
        eyebrow="Modes d'envoi"
        title="Choisissez votre cadence"
        subtitle="Aérien pour aller vite, maritime pour optimiser les volumes."
      />

      <View style={styles.cardsColumn}>
        {SERVICES.map((service, index) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            title={service.title}
            description={service.description}
            deliveryTime={service.deliveryTime}
            icon={service.icon}
            accentColor={serviceAccent(service.id)}
            navigateTo={service.navigateTo}
            index={index}
            onPress={onServicePress}
          />
        ))}
      </View>
    </View>
  );
};
