/**
 * WhatsAppFAB - Floating action button
 * 
 * Fixed position WhatsApp contact button
 */

import React from 'react';
import { Pressable } from 'react-native';
import { Surface } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';

import { styles } from './WhatsAppFAB.styles';

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

export default WhatsAppFAB;
