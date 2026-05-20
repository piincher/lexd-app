import { useAppTheme } from '@src/providers/ThemeProvider';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface SendConfirmationModalHeaderProps {
  styles: any;
}

export const SendConfirmationModalHeader: React.FC<SendConfirmationModalHeaderProps> = ({ styles }) => {
  const { colors } = useAppTheme();
  return (
    <>
      <View style={styles.iconCircle}>
        <Ionicons name="chatbubbles" size={32} color={colors.primary.main} />
      </View>
      <Text style={styles.title}>Confirmer l'envoi</Text>
    </>
  );
};
