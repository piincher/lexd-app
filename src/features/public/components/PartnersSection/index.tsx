/**
 * PartnersSection - Shipping partner logos
 * 
 * Horizontal scroll of partner company logos
 */

import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, { FadeInRight } from 'react-native-reanimated';

import { Fonts } from '@src/constants/Fonts';
import { styles } from './PartnersSection.styles';

const AnimatedView = Animated.createAnimatedComponent(View);

const PARTNER_LOGOS = [
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/cma-cgm.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/maersk.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/hapag.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/ethiopian.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/turkish.png',
];

export const PartnersSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: Fonts.bold }]}>Nos Partenaires</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {PARTNER_LOGOS.map((logo, index) => (
          <AnimatedView
            key={index}
            entering={FadeInRight.delay(index * 100).springify()}
            style={styles.logoContainer}
          >
            <Image source={{ uri: logo }} style={styles.logo} />
          </AnimatedView>
        ))}
      </ScrollView>
    </View>
  );
};

export default PartnersSection;
