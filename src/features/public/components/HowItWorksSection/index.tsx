/**
 * HowItWorksSection - Step-by-step process explanation
 * 
 * Shows 4-step workflow from contact to delivery
 */

import React from 'react';
import { View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { styles } from './HowItWorksSection.styles';

const AnimatedView = Animated.createAnimatedComponent(View);

interface Step {
  step: string;
  icon: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
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

interface StepItemProps {
  step: Step;
  index: number;
}

const StepItem: React.FC<StepItemProps> = ({ step, index }) => {
  return (
    <AnimatedView
      entering={FadeInDown.delay(index * 150).springify()}
      style={styles.stepContainer}
    >
      <View style={styles.stepNumberContainer}>
        <Text style={[styles.stepNumber, { fontFamily: Fonts.bold }]}>{step.step}</Text>
      </View>
      <View style={styles.stepContent}>
        <View style={styles.stepIconContainer}>
          <MaterialCommunityIcons name={step.icon as any} size={24} color={COLORS.blue} />
        </View>
        <View style={styles.stepTextContainer}>
          <Text style={[styles.stepTitle, { fontFamily: Fonts.bold }]}>{step.title}</Text>
          <Text style={[styles.stepDescription, { fontFamily: Fonts.regular }]}>
            {step.description}
          </Text>
        </View>
      </View>
    </AnimatedView>
  );
};

export const HowItWorksSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: Fonts.bold }]}>Comment Ça Marche ?</Text>
      <View style={styles.stepsContainer}>
        {STEPS.map((step, index) => (
          <StepItem key={step.step} step={step} index={index} />
        ))}
      </View>
    </View>
  );
};

export default HowItWorksSection;
