/**
 * WhyUsCard Component
 * Feature highlight card for Why Choose Us section
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface WhyUsCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

export const WhyUsCard: React.FC<WhyUsCardProps> = ({
  icon,
  title,
  description,
  index,
}) => {
  const { colors } = useAppTheme();

  const getCardColors = (c: any) => [
    c.status.info,
    c.accent.mint,
    c.primary.main,
    c.status.warning,
  ];

  const backgroundColor = getCardColors(colors)[index % 4];

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <FontAwesome6 name={icon as any} size={32} color={colors.text.inverse} />
      <Text style={[styles.title, { color: colors.text.inverse }]}>{title}</Text>
      <Text style={[styles.description, { color: colors.text.inverse, opacity: 0.9 }]}>
        {description}
      </Text>
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
    fontFamily: 'bold',
    fontSize: 18,
    marginVertical: 8,
  },
  description: {
    fontFamily: 'medium',
    fontSize: 14,
  },
});

export default WhyUsCard;
