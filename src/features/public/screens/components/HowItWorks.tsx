/**
 * HowItWorks Component
 * 
 * Step-by-step guide section.
 */

import React from 'react';
import { View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS } from '@src/constants/Colors';
import { styles } from '../PublicHomeScreen.styles';

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: 'phone',
    title: 'Contactez-nous',
    description: 'Choisissez votre méthode de livraison préférée',
  },
  {
    step: '02',
    icon: 'warehouse',
    title: 'Adresse Chine',
    description: 'Recevez notre adresse d\'entrepôt en Chine',
  },
  {
    step: '03',
    icon: 'package-variant',
    title: 'Envoyez vos colis',
    description: 'Faites livrer vos achats à notre entrepôt',
  },
  {
    step: '04',
    icon: 'truck-delivery',
    title: 'Livraison Mali',
    description: 'Nous nous occupons du transport jusqu\'à vous',
  },
];

interface HowItWorksStepProps {
  step: typeof HOW_IT_WORKS[0];
  index: number;
}

const HowItWorksStep: React.FC<HowItWorksStepProps> = ({ step, index }) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 150).springify()}
      style={styles.howItWorksStep}
    >
      <View style={styles.stepNumberContainer}>
        <Text style={styles.stepNumber}>{step.step}</Text>
      </View>
      <View style={styles.stepContent}>
        <View style={styles.stepIconContainer}>
          <MaterialCommunityIcons name={step.icon as any} size={24} color={COLORS.blue} />
        </View>
        <View style={styles.stepTextContainer}>
          <Text style={styles.stepTitle}>{step.title}</Text>
          <Text style={styles.stepDescription}>{step.description}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export const HowItWorks: React.FC = () => {
  return (
    <View style={[styles.section, styles.howItWorksSection]}>
      <Text style={styles.sectionTitle}>Comment Ça Marche ?</Text>
      <View style={styles.howItWorksContainer}>
        {HOW_IT_WORKS.map((step, index) => (
          <HowItWorksStep key={step.step} step={step} index={index} />
        ))}
      </View>
    </View>
  );
};
