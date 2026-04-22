/**
 * SubmitButton Component
 * Gradient submit button with loading state
 */

import React from 'react';
import { Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts } from '@src/constants/Fonts';
import { hapticMedium } from '@src/shared/lib/haptics';
import { Theme } from '@src/constants/Theme';

interface SubmitButtonProps {
  onPress: () => void;
  loading: boolean;
  text?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ onPress, loading, text = 'Créer le ticket' }) => {


  const handlePress = () => {
    hapticMedium();
    onPress();
  };

  return (
    <Pressable onPress={handlePress} disabled={loading} style={({ pressed }) => [styles.container, pressed && !loading && styles.pressed]}>
      <LinearGradient
        colors={loading ? ['#9CA3AF', '#9CA3AF'] : Theme.gradients.primary.slice(0, 2) as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        {loading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.text}>{text}</Text>}
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { borderRadius: 16, overflow: 'hidden', marginTop: 8 },
  pressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  gradient: { alignItems: 'center', justifyContent: 'center', paddingVertical: 16 },
  text: { fontSize: 16, fontFamily: Fonts.bold, color: '#FFF', letterSpacing: 0.3 },
});

export default SubmitButton;
