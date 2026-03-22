/**
 * ServiceShowcase
 * Air and Sea freight service cards with gradient backgrounds
 */

import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome6 } from '@expo/vector-icons';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { SERVICES } from '../../constants/homeData';

interface ServiceShowcaseProps {
  onServicePress: (navigateTo: string) => void;
}

export const ServiceShowcase: React.FC<ServiceShowcaseProps> = ({ onServicePress }) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
        Nos Solutions
      </Text>

      <View style={styles.cardsRow}>
        {SERVICES.map((service, index) => (
          <Animated.View
            key={service.id}
            entering={FadeInRight.delay(400 + index * 150).duration(500).springify()}
            style={styles.cardWrapper}
          >
            <Pressable
              style={({ pressed }) => [pressed && styles.cardPressed]}
              onPress={() => onServicePress(service.navigateTo)}
            >
              <LinearGradient
                colors={service.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
              >
                <View style={styles.cardIconCircle}>
                  <FontAwesome6 name={service.icon} size={22} color={service.gradient[0]} />
                </View>

                <Text style={styles.cardTitle}>{service.title}</Text>
                <Text style={styles.cardDelivery}>{service.deliveryTime}</Text>
                <Text style={styles.cardDescription}>{service.description}</Text>

                <View style={styles.cardArrow}>
                  <FontAwesome6 name="arrow-right" size={12} color="rgba(255,255,255,0.7)" />
                </View>
              </LinearGradient>
            </Pressable>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    marginBottom: 14,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cardWrapper: {
    flex: 1,
  },
  card: {
    borderRadius: 20,
    padding: 18,
    minHeight: 180,
    justifyContent: 'space-between',
    ...Theme.shadows.md,
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
  cardIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardTitle: {
    fontFamily: Fonts.bold,
    fontSize: 17,
    color: '#FFF',
  },
  cardDelivery: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
  },
  cardDescription: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
    lineHeight: 16,
  },
  cardArrow: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
