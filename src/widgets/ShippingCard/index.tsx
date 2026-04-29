/**
 * ShippingCard Widget
 * Reusable gradient shipping solution card.
 */

import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';

interface ShippingCardProps {
  title: string;
  description: string;
  icon: string;
  colors: [string, string];
  onPress: () => void;
  entering?: any;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const ShippingCard: React.FC<ShippingCardProps> = ({
  title,
  description,
  icon,
  colors,
  onPress,
  entering,
}) => (
  <Animated.View entering={entering}>
    <Pressable onPress={onPress} style={styles.card}>
      <LinearGradient colors={colors} style={styles.gradient}>
        <FontAwesome6 name={icon as any} size={48} color="white" />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </LinearGradient>
    </Pressable>
  </Animated.View>
);

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 280,
    borderRadius: 24,
    marginRight: 16,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Bold',
    fontSize: 24,
    color: 'white',
    marginVertical: 12,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Medium',
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 22,
  },
});
