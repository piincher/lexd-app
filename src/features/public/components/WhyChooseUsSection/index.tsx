/**
 * WhyChooseUsSection - Value proposition grid
 * 
 * 4-column grid of trust indicators
 */

import React from 'react';
import { View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { styles } from './WhyChooseUsSection.styles';

const AnimatedView = Animated.createAnimatedComponent(View);

interface TrustItem {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}

const TRUST_ITEMS: TrustItem[] = [
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

interface TrustCardProps {
  item: TrustItem;
  index: number;
}

const TrustCard: React.FC<TrustCardProps> = ({ item, index }) => {
  return (
    <AnimatedView
      entering={FadeInUp.delay(index * 100).springify()}
      style={styles.card}
    >
      <Surface style={styles.surface}>
        <MaterialCommunityIcons name={item.icon as any} size={32} color={COLORS.blue} />
        <Text style={[styles.title, { fontFamily: Fonts.bold }]}>{item.title}</Text>
        <Text style={[styles.subtitle, { fontFamily: Fonts.medium }]}>{item.subtitle}</Text>
        <Text style={[styles.description, { fontFamily: Fonts.regular }]}>{item.description}</Text>
      </Surface>
    </AnimatedView>
  );
};

export const WhyChooseUsSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { fontFamily: Fonts.bold }]}>Pourquoi Nous Choisir ?</Text>
      <View style={styles.grid}>
        {TRUST_ITEMS.map((item, index) => (
          <TrustCard key={item.title} item={item} index={index} />
        ))}
      </View>
    </View>
  );
};

export default WhyChooseUsSection;
