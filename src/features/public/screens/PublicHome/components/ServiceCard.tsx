import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { Service } from '../data';

interface ServiceCardProps {
  service: Service;
  index: number;
  onPress: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, onPress }) => {
  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200).springify()}
      style={styles.container}
    >
      <Pressable onPress={onPress} style={styles.pressable}>
        <Surface style={[styles.card, { borderLeftColor: service.color }]}>
          <View style={[styles.iconContainer, { backgroundColor: `${service.color}15` }]}>
            <FontAwesome6 name={service.icon} size={32} color={service.color} />
          </View>
          <Text style={styles.title}>{service.title}</Text>
          <Text style={styles.description}>{service.description}</Text>
          <View style={styles.features}>
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

const styles = StyleSheet.create({
  container: {
    width: 280,
    marginRight: 16,
  },
  pressable: {
    flex: 1,
  },
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featureText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
