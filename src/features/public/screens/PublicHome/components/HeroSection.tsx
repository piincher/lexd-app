import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, TextInput, Button } from 'react-native-paper';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

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
    <Animated.View entering={FadeInDown.duration(800).springify()} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Vos Marchandises</Text>
        <Text style={styles.titleAccent}>de Chine au Mali</Text>
        <Text style={styles.subtitle}>
          Service de fret aérien et maritime fiable, rapide et sécurisé
        </Text>
        
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.blue,
    paddingTop: Theme.spacing['4xl'],
    paddingBottom: Theme.spacing['3xl'],
    borderBottomLeftRadius: Theme.radius['2xl'],
    borderBottomRightRadius: Theme.radius['2xl'],
  },
  content: {
    paddingHorizontal: Theme.spacing.lg,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    color: Theme.neutral.white,
  },
  titleAccent: {
    fontFamily: Fonts.black,
    fontSize: 32,
    color: '#1ED7B5',
    marginBottom: Theme.spacing.md,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: `${Theme.neutral.white}CC`,
    marginBottom: Theme.spacing.xl,
    lineHeight: 24,
  },
  trackingContainer: {
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    backgroundColor: Theme.neutral.white,
  },
  trackingLabel: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.md,
  },
  trackingInputContainer: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
  },
  trackingInput: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
    height: 48,
  },
  trackingInputOutline: {
    borderRadius: Theme.radius.md,
  },
  trackButton: {
    borderRadius: Theme.radius.md,
    justifyContent: 'center',
  },
  trackButtonContent: {
    height: 48,
  },
  trackingHint: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: Theme.spacing.sm,
    textAlign: 'center',
  },
});
