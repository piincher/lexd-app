import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './HeroSection.styles';

export const HeroTitle: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View>
      <Text style={styles.title}>Chine vers Mali,</Text>
      <Text style={styles.titleAccent}>sans angle mort.</Text>
      <Text style={styles.subtitle}>
        Fret aerien et maritime avec suivi, dedouanement et support WhatsApp au meme endroit.
      </Text>
    </View>
  );
};
