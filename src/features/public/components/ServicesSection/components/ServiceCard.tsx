/**
 * ServiceCard - Individual service offering card
 */

import React from 'react';
import { View, Pressable } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInRight } from 'react-native-reanimated';

import { Fonts } from '@src/constants/Fonts';
import { styles } from '../ServicesSection.styles';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  features: string[];
}

interface ServiceCardProps {
  service: Service;
  index: number;
  onPress: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, onPress }) => {
  return (
    <AnimatedView
      entering={FadeInRight.delay(index * 200).springify()}
      style={styles.cardContainer}
    >
      <Pressable onPress={onPress} style={styles.cardPressable}>
        <Surface style={[styles.card, { borderLeftColor: service.color }]}>
          <View style={[styles.iconContainer, { backgroundColor: `${service.color}15` }]}>
            <FontAwesome6 name={service.icon} size={32} color={service.color} />
          </View>
          <Text style={[styles.cardTitle, { fontFamily: Fonts.bold }]}>
            {service.title}
          </Text>
          <Text style={[styles.cardDescription, { fontFamily: Fonts.regular }]}>
            {service.description}
          </Text>
          <View style={styles.features}>
            {service.features.map((feature, idx) => (
              <View key={idx} style={styles.featureBadge}>
                <MaterialCommunityIcons name="check-circle" size={12} color={service.color} />
                <Text style={[styles.featureText, { color: service.color, fontFamily: Fonts.medium }]}>
                  {feature}
                </Text>
              </View>
            ))}
          </View>
        </Surface>
      </Pressable>
    </AnimatedView>
  );
};

export default ServiceCard;
