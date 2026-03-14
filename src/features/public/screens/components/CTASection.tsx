/**
 * CTASection Component
 * 
 * Call-to-action section for login/registration.
 */

import React from 'react';
import { Text, Surface, Button } from 'react-native-paper';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from '../PublicHomeScreen.styles';

interface CTASectionProps {
  onLogin: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onLogin }) => {
  return (
    <Animated.View
      entering={FadeInUp.delay(400).springify()}
      style={styles.ctaSection}
    >
      <Surface style={styles.ctaSurface}>
        <Text style={styles.ctaTitle}>Prêt à Expédier ?</Text>
        <Text style={styles.ctaSubtitle}>
          Créez un compte pour accéder à toutes nos fonctionnalités
        </Text>
        <Button
          mode="contained"
          onPress={onLogin}
          style={styles.ctaButton}
          contentStyle={styles.ctaButtonContent}
          icon={({ size, color }) => (
            <MaterialCommunityIcons name="arrow-right" size={size} color={color} />
          )}
        >
          Se Connecter / S'inscrire
        </Button>
        <Text style={styles.ctaHint}>
          Déjà client ? Connectez-vous pour voir vos marchandises
        </Text>
      </Surface>
    </Animated.View>
  );
};
