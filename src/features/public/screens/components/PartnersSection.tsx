/**
 * PartnersSection Component
 * 
 * Partner logos horizontal scroll section.
 */

import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, { FadeInRight } from 'react-native-reanimated';

import { styles } from '../PublicHomeScreen.styles';

const PARTNER_LOGOS = [
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/cma-cgm.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/maersk.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/hapag.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/ethiopian.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/turkish.png',
];

export const PartnersSection: React.FC = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Nos Partenaires</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.partnersScroll}
      >
        {PARTNER_LOGOS.map((logo, index) => (
          <Animated.View
            key={index}
            entering={FadeInRight.delay(index * 100).springify()}
            style={styles.partnerLogoContainer}
          >
            <Image source={{ uri: logo }} style={styles.partnerLogo} />
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};
