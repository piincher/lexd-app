/**
 * WhyChooseUs Component
 * 
 * Features and benefits grid section.
 */

import React from 'react';
import { View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS } from '@src/constants/Colors';
import { styles } from '../PublicHomeScreen.styles';

const WHY_CHOOSE_US = [
  {
    icon: 'clock-check',
    title: '10+ Ans',
    subtitle: "D'expérience",
    description: 'Service logistique fiable depuis 2013',
  },
  {
    icon: 'shield-check',
    title: '100%',
    subtitle: 'Assuré',
    description: 'Protection complète de vos marchandises',
  },
  {
    icon: 'headset',
    title: '24/7',
    subtitle: 'Support',
    description: 'Assistance client disponible à tout moment',
  },
  {
    icon: 'cash-multiple',
    title: 'Meilleurs',
    subtitle: 'Tarifs',
    description: 'Prix compétitifs sans compromis qualité',
  },
];

interface WhyChooseCardProps {
  item: typeof WHY_CHOOSE_US[0];
  index: number;
}

const WhyChooseCard: React.FC<WhyChooseCardProps> = ({ item, index }) => {
  return (
    <Animated.View
      entering={FadeInUp.delay(index * 100).springify()}
      style={styles.whyChooseCard}
    >
      <Surface style={styles.whyChooseSurface}>
        <MaterialCommunityIcons name={item.icon as any} size={32} color={COLORS.blue} />
        <Text style={styles.whyChooseTitle}>{item.title}</Text>
        <Text style={styles.whyChooseSubtitle}>{item.subtitle}</Text>
        <Text style={styles.whyChooseDescription}>{item.description}</Text>
      </Surface>
    </Animated.View>
  );
};

export const WhyChooseUs: React.FC = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pourquoi Nous Choisir ?</Text>
      <View style={styles.whyChooseGrid}>
        {WHY_CHOOSE_US.map((item, index) => (
          <WhyChooseCard key={item.title} item={item} index={index} />
        ))}
      </View>
    </View>
  );
};
