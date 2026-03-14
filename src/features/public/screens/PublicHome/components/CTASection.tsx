import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, Button } from 'react-native-paper';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CTASectionProps {
  onLogin: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onLogin }) => {
  return (
    <Animated.View
      entering={FadeInUp.delay(400).springify()}
      style={styles.container}
    >
      <Surface style={styles.surface}>
        <Text style={styles.title}>Prêt à Expédier ?</Text>
        <Text style={styles.subtitle}>
          Créez un compte pour accéder à toutes nos fonctionnalités
        </Text>
        <Button
          mode="contained"
          onPress={onLogin}
          style={styles.button}
          contentStyle={styles.buttonContent}
          icon={({ size, color }) => (
            <MaterialCommunityIcons name="arrow-right" size={size} color={color} />
          )}
        >
          Se Connecter / S'inscrire
        </Button>
        <Text style={styles.hint}>
          Déjà client ? Connectez-vous pour voir vos marchandises
        </Text>
      </Surface>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  surface: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    borderRadius: 8,
    width: '100%',
  },
  buttonContent: {
    height: 48,
  },
  hint: {
    fontSize: 12,
    color: '#999',
    marginTop: 12,
  },
});
