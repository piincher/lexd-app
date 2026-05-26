import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface TrackingMapProps {
  onLogin: () => void;
}

export const TrackingMap: React.FC<TrackingMapProps> = ({ onLogin }) => {
  const { colors, isDark } = useAppTheme();
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
      color: colors.text.primary,
      marginTop: Theme.spacing.md,
    },
    ctaDescription: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.secondary,
      textAlign: 'center',
      marginTop: Theme.spacing.sm,
      marginBottom: Theme.spacing.md,
    },
    ctaButton: {
      width: '100%',
    },
  });

  return (
    <Surface style={styles.ctaCard}>
      <MaterialCommunityIcons name="account-circle" size={48} color={colors.primary.main} />
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
