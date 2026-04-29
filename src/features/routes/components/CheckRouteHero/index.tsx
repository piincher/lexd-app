import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export const CheckRouteHero: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.hero}>
      <Text style={[styles.heroTitle, { color: colors.text.primary }]}>Où est votre colis ?</Text>
      <Text style={[styles.heroSubtitle, { color: colors.text.secondary }]}>
        Entrez votre numéro de suivi pour voir l'avancement de votre envoi en temps réel.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  hero: {
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    lineHeight: 20,
  },
});
