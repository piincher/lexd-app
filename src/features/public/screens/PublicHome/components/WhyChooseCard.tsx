import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { WhyChooseItem } from '../data';

interface WhyChooseCardProps {
  item: WhyChooseItem;
  index: number;
}

export const WhyChooseCard: React.FC<WhyChooseCardProps> = ({ item, index }) => {
  return (
    <Animated.View
      entering={FadeInUp.delay(index * 100).springify()}
      style={styles.container}
    >
      <Surface style={styles.surface}>
        <MaterialCommunityIcons name={item.icon as any} size={32} color={COLORS.blue} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </Surface>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 150,
    maxWidth: '48%',
    marginBottom: 16,
  },
  surface: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
    color: COLORS.blue,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
});
