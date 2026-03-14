/**
 * CTASection - Call-to-action banner
 * 
 * Final conversion prompt before footer
 */

import React from 'react';
import { View } from 'react-native';
import { Text, Surface, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { Fonts } from '@src/constants/Fonts';
import { styles } from './CTASection.styles';

const AnimatedView = Animated.createAnimatedComponent(View);

interface CTASectionProps {
  onPress: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onPress }) => {
  return (
    <AnimatedView entering={FadeInUp.delay(400).springify()} style={styles.container}>
      <Surface style={styles.surface}>
        <Text style={[styles.title, { fontFamily: Fonts.bold }]}>Prêt à Expédier ?</Text>
        <Text style={[styles.subtitle, { fontFamily: Fonts.regular }]}>
          Créez un compte pour accéder à toutes nos fonctionnalités
        </Text>
        <Button
          mode="contained"
          onPress={onPress}
          style={styles.button}
          contentStyle={styles.buttonContent}
          icon={({ size, color }) => (
            <MaterialCommunityIcons name="arrow-right" size={size} color={color} />
          )}
        >
          Se Connecter / S'inscrire
        </Button>
        <Text style={[styles.hint, { fontFamily: Fonts.regular }]}>
          Déjà client ? Connectez-vous pour voir vos marchandises
        </Text>
      </Surface>
    </AnimatedView>
  );
};

export default CTASection;
