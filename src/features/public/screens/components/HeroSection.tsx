/**
 * HeroSection Component
 * 
 * Hero section with title, subtitle and tracking input.
 */

import React from 'react';
import { View } from 'react-native';
import { Text, Surface, TextInput, Button } from 'react-native-paper';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { styles } from '../PublicHomeScreen.styles';

interface HeroSectionProps {
  trackingNumber: string;
  setTrackingNumber: (value: string) => void;
  onTrack: () => void;
  isLoading: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  trackingNumber,
  setTrackingNumber,
  onTrack,
  isLoading,
}) => {
  return (
    <Animated.View entering={FadeInDown.duration(800).springify()} style={styles.heroSection}>
      <View style={styles.heroContent}>
        <Text style={styles.heroTitle}>Vos Marchandises</Text>
        <Text style={styles.heroTitleAccent}>de Chine au Mali</Text>
        <Text style={styles.heroSubtitle}>
          Service de fret aérien et maritime fiable, rapide et sécurisé
        </Text>

        {/* Tracking Input */}
        <Surface style={styles.trackingContainer}>
          <Text style={styles.trackingLabel}>Suivez votre envoi</Text>
          <View style={styles.trackingInputContainer}>
            <TextInput
              mode="outlined"
              placeholder="Numéro de suivi (ex: GS-123456)"
              value={trackingNumber}
              onChangeText={setTrackingNumber}
              style={styles.trackingInput}
              left={<TextInput.Icon icon="magnify" />}
              outlineStyle={styles.trackingInputOutline}
            />
            <Button
              mode="contained"
              onPress={onTrack}
              loading={isLoading}
              disabled={!trackingNumber.trim() || isLoading}
              style={styles.trackButton}
              contentStyle={styles.trackButtonContent}
            >
              Suivre
            </Button>
          </View>
          <Text style={styles.trackingHint}>
            Pas besoin de compte pour suivre votre envoi
          </Text>
        </Surface>
      </View>
    </Animated.View>
  );
};
