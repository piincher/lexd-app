import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useHelpSectionStyles } from './HelpSection.styles';

interface HelpSectionProps {
  onContactSupport: () => void;
}

export const HelpSection: React.FC<HelpSectionProps> = ({ onContactSupport }) => {
  const styles = useHelpSectionStyles();

  return (
    <View style={styles.helpContainer}>
      <Text style={styles.helpText}>
        Une question concernant votre container?
      </Text>
      <Button
        mode="outlined"
        onPress={onContactSupport}
        icon="headset"
        style={styles.helpButton}
      >
        Contacter le Support
      </Button>
    </View>
  );
};
