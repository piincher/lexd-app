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

  return (
    <View style={styles.container}>
      <SectionHeader title="Nos Solutions" subtitle="Choisissez le mode d'expedition adapte a vos besoins" />

      <View style={styles.cardsRow}>
        {SERVICES.map((service, index) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            title={service.title}
            description={service.description}
            deliveryTime={service.deliveryTime}
            icon={service.icon}
            gradient={service.gradient}
            navigateTo={service.navigateTo}
            index={index}
            onPress={onServicePress}
          />
        ))}
      </View>
    </View>
  );
};
