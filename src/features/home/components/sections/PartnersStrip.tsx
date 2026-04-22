/**
 * PartnersStrip
 * "Trusted by" horizontal scroll of carrier logos with
 * refined card styling and subtle backdrop.
 */

import React from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { PARTNER_LOGOS } from '../../constants/homeData';
import { SectionHeader } from '../SectionHeader';

export const PartnersStrip: React.FC = () => {
  const { colors } = useAppTheme();

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
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  logoCard: {
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    ...Theme.shadows.sm,
  },
  logo: {
    width: 76,
    height: 38,
    resizeMode: 'contain',
  },
});
