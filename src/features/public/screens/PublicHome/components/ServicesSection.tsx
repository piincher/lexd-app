import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { ServiceCard } from './ServiceCard';
import { SERVICES } from '../data';

interface ServicesSectionProps {
  onServicePress: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onServicePress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nos Services</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {SERVICES.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            onPress={() => onServicePress(service.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scroll: {
    paddingRight: 16,
  },
});
