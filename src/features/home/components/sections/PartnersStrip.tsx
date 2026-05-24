/**
 * PartnersStrip
 * "Trusted by" horizontal scroll of carrier logos with
 * refined card styling and subtle backdrop.
 */

import React from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { PARTNER_LOGOS } from '../../constants/homeData';
import { SectionHeader } from '../SectionHeader';

export const PartnersStrip: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const logoShadow = {
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: isDark ? 0.18 : 0.05,
    shadowRadius: 3,
    elevation: isDark ? 0 : 2,
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(400).duration(500).springify()}
      style={styles.container}
    >
      <SectionHeader title="Nos Partenaires" subtitle="Nous collaborons avec les leaders mondiaux du transport" align="center" />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {PARTNER_LOGOS.map((logo, index) => (
          <View
            key={index}
            style={[
              styles.logoCard,
              logoShadow,
              { backgroundColor: colors.background.card, borderColor: colors.border },
            ]}
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
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  logoCard: {
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderWidth: 1,
  },
  logo: {
    width: 76,
    height: 38,
    resizeMode: 'contain',
  },
});
