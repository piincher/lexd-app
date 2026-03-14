/**
 * HeroSection - Landing page hero with tracking CTA
 * 
 * Features:
 * - Animated title and subtitle
 * - Tracking input with search button
 * - No-login-required hint
 */

import React from 'react';
import { View } from 'react-native';
import { Text, Surface, TextInput, Button } from 'react-native-paper';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { usePublicTracking } from '../../hooks/usePublicTracking';
import { styles } from './HeroSection.styles';

const AnimatedView = Animated.createAnimatedComponent(View);

interface HeroSectionProps {
  trackingNumber: string;
  onTrackingChange: (value: string) => void;
  onTrack: () => void;
  isLoading?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  trackingNumber,
  onTrackingChange,
  onTrack,
  isLoading = false,
}) => {
  return (
    <AnimatedView entering={FadeInDown.duration(800).springify()} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Vos Marchandises</Text>
        <Text style={styles.titleAccent}>de Chine au Mali</Text>
        <Text style={styles.subtitle}>
          Service de fret aérien et maritime fiable, rapide et sécurisé
        </Text>

        <Surface style={styles.trackingContainer}>
          <Text style={styles.trackingLabel}>Suivez votre envoi</Text>
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              placeholder="Numéro de suivi (ex: GS-123456)"
              value={trackingNumber}
              onChangeText={onTrackingChange}
              style={styles.input}
              left={<TextInput.Icon icon="magnify" />}
              outlineStyle={styles.inputOutline}
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
    </AnimatedView>
  );
};

export default HeroSection;
