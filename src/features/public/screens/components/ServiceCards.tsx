/**
 * ServiceCards Component
 * 
 * Horizontal scrollable service cards section.
 */

import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';

import { styles } from '../PublicHomeScreen.styles';

const SERVICES = [
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

interface ServiceCardProps {
  service: typeof SERVICES[0];
  index: number;
  onPress: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, onPress }) => {
  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200).springify()}
      style={styles.serviceCardContainer}
    >
      <Pressable onPress={onPress} style={styles.serviceCardPressable}>
        <Surface style={[styles.serviceCard, { borderLeftColor: service.color }]}>
          <View style={[styles.serviceIconContainer, { backgroundColor: `${service.color}15` }]}>
            <FontAwesome6 name={service.icon as any} size={32} color={service.color} />
          </View>
          <Text style={styles.serviceTitle}>{service.title}</Text>
          <Text style={styles.serviceDescription}>{service.description}</Text>
          <View style={styles.serviceFeatures}>
            {service.features.map((feature, idx) => (
              <View key={idx} style={styles.featureBadge}>
                <MaterialCommunityIcons name="check-circle" size={12} color={service.color} />
                <Text style={[styles.featureText, { color: service.color }]}>{feature}</Text>
              </View>
            ))}
          </View>
        </Surface>
      </Pressable>
    </Animated.View>
  );
};

interface ServiceCardsProps {
  onServicePress: () => void;
}

export const ServiceCards: React.FC<ServiceCardsProps> = ({ onServicePress }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Nos Services</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.servicesScroll}
      >
        {SERVICES.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            onPress={onServicePress}
          />
        ))}
      </ScrollView>
    </View>
  );
};
