/**
 * WhyUsCard Component
 * Feature highlight card for Why Choose Us section
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';

interface WhyUsCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

const cardColors = ['#4A90E2', '#1ED7B5', '#8B5CF6', '#F59E0B'];

export const WhyUsCard: React.FC<WhyUsCardProps> = ({
  icon,
  title,
  description,
  index,
}) => {
  const backgroundColor = cardColors[index % cardColors.length];

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <FontAwesome6 name={icon as any} size={32} color="white" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 240,
    padding: 20,
    borderRadius: 12,
    marginRight: 16,
  },
  title: {
    fontFamily: 'Bold',
    fontSize: 18,
    color: 'white',
    marginVertical: 8,
  },
  description: {
    fontFamily: 'Medium',
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
});

export default WhyUsCard;
