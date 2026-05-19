import { useAppTheme } from '@src/providers/ThemeProvider';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface SendConfirmationModalHeaderProps {
  styles: any;
}

export const SendConfirmationModalHeader: React.FC<SendConfirmationModalHeaderProps> = ({ styles }) => (
  <>
    <View style={styles.iconCircle}>
      <Ionicons name="chatbubbles" size={32} color={Theme.primary[500]} />
    </View>
    <Text style={styles.title}>Confirmer l'envoi</Text>
  </>
);
