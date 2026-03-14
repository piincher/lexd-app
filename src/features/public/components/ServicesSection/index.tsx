/**
 * ServicesSection - Service offerings horizontal scroll
 * 
 * Displays air and sea freight services with feature badges
 */

import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';

import { Fonts } from '@src/constants/Fonts';
import { ServiceCard, Service } from './components/ServiceCard';
import { styles } from './ServicesSection.styles';

const SERVICES: Service[] = [
  {
    id: 'air',
    icon: 'plane',
    title: 'Fret Aérien',
    description: 'Livraison rapide en 2-3 semaines avec suivi en temps réel',
    color: '#4A90E2',
    features: ['2-3 semaines', 'Suivi temps réel', 'Idéal pour petits colis'],
  },
  {
    id: 'sea',
    icon: 'ship',
    title: 'Fret Maritime',
    description: 'Solution économique pour gros volumes (45-60 jours)',
    color: '#1ED7B5',
    features: ['45-60 jours', 'Meilleur prix/KG', 'Parfait pour bulk'],
  },
];

interface ServicesSectionProps {
  onServicePress?: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onServicePress }) => {
  const handlePress = (serviceId: string) => {
    onServicePress?.(serviceId);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: Fonts.bold }]}>Nos Services</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {SERVICES.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            onPress={() => handlePress(service.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ServicesSection;
