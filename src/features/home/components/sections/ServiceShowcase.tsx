/**
 * ServiceShowcase
 * Air and Sea freight service cards with gradient backgrounds,
 * enhanced visual depth, and press feedback.
 */

import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome6 } from '@expo/vector-icons';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { SERVICES } from '../../constants/homeData';
import { SectionHeader } from '../SectionHeader';

interface ServiceShowcaseProps {
  onServicePress: (navigateTo: string) => void;
}

export const ServiceShowcase: React.FC<ServiceShowcaseProps> = ({ onServicePress }) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <SectionHeader title="Nos Solutions" subtitle="Choisissez le mode d'expedition adapte a vos besoins" />

      <View style={styles.cardsRow}>
        {SERVICES.map((service, index) => (
          <Animated.View
            key={service.id}
            entering={FadeInRight.delay(300 + index * 150).duration(500).springify()}
            style={styles.cardWrapper}
          >
            <Pressable
              style={({ pressed }) => [styles.pressable, pressed && styles.cardPressed]}
              onPress={() => onServicePress(service.navigateTo)}
            >
              <LinearGradient
                colors={service.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
              >
                {/* Background decorative icon */}
                <View style={styles.bgIconWrap}>
                  <FontAwesome6
                    name={service.icon}
                    size={80}
                    color="rgba(255,255,255,0.06)"
                    style={styles.bgIcon}
                  />
                </View>

                <View style={styles.cardIconCircle}>
                  <FontAwesome6 name={service.icon} size={22} color={service.gradient[0]} />
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{service.title}</Text>
                  <Text style={styles.cardDelivery}>{service.deliveryTime}</Text>
                  <Text style={styles.cardDescription}>{service.description}</Text>
                </View>

                <View style={styles.cardArrow}>
                  <FontAwesome6 name="arrow-right" size={12} color="rgba(255,255,255,0.8)" />
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
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cardWrapper: {
    flex: 1,
  },
  pressable: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.97 }],
  },
  card: {
    borderRadius: 20,
    padding: 18,
    minHeight: 190,
    justifyContent: 'space-between',
    overflow: 'hidden',
    ...Theme.shadows.md,
  },
  bgIconWrap: {
    position: 'absolute',
    bottom: -10,
    right: -10,
  },
  bgIcon: {
    transform: [{ rotate: '-15deg' }],
  },
  cardIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardContent: {
    gap: 2,
  },
  cardTitle: {
    fontFamily: Fonts.bold,
    fontSize: 17,
    color: '#FFF',
  },
  cardDelivery: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  cardDescription: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 4,
    lineHeight: 17,
  },
  cardArrow: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
