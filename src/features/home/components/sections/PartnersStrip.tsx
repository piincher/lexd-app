/**
 * PartnersStrip
 * Horizontal scrollable partner/carrier logos
 */

import React from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { PARTNER_LOGOS } from '../../constants/homeData';

export const PartnersStrip: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <Animated.View
      entering={FadeInDown.delay(800).duration(500).springify()}
      style={styles.container}
    >
      <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
        Nos Partenaires
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {PARTNER_LOGOS.map((logo, index) => (
          <View
            key={index}
            style={[styles.logoCard, { backgroundColor: colors.background.card }]}
          >
            <Image source={{ uri: logo }} style={styles.logo} />
          </View>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    marginBottom: 14,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  logoCard: {
    borderRadius: 12,
    padding: 14,
    ...Theme.shadows.sm,
  },
  logo: {
    width: 72,
    height: 36,
    resizeMode: 'contain',
  },
});
