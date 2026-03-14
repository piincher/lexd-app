import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';

interface WhatsAppFABProps {
  onPress: () => void;
}

export const WhatsAppFAB: React.FC<WhatsAppFABProps> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Surface style={styles.surface}>
        <FontAwesome6 name="whatsapp" size={28} color="#25D366" />
      </Surface>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  surface: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});
