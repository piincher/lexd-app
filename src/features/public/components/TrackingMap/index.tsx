import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

interface TrackingMapProps {
  onLogin: () => void;
}

export const TrackingMap: React.FC<TrackingMapProps> = ({ onLogin }) => {
  return (
    <Surface style={styles.ctaCard}>
      <MaterialCommunityIcons name="account-circle" size={48} color={COLORS.blue} />
      <Text style={styles.ctaTitle}>Vous êtes le propriétaire ?</Text>
      <Text style={styles.ctaDescription}>
        Connectez-vous pour voir plus de détails et gérer vos marchandises
      </Text>
      <Button mode="contained" onPress={onLogin} style={styles.ctaButton}>
        Se Connecter
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  ctaCard: {
    padding: Theme.spacing.xl,
    borderRadius: Theme.radius.xl,
    marginHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    alignItems: 'center',
  },
  ctaTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Theme.neutral[800],
    marginTop: Theme.spacing.md,
  },
  ctaDescription: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Theme.neutral[500],
    textAlign: 'center',
    marginTop: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  ctaButton: {
    width: '100%',
  },
});
