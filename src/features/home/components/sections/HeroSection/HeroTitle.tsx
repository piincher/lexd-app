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
      <Text style={styles.title}>Expediez vos{'\n'}marchandises</Text>
      <Text style={styles.titleAccent}>en toute securite</Text>
      <Text style={styles.subtitle}>
        Service de fret aerien et maritime fiable, rapide et securise entre la Chine et le Mali
      </Text>
    </View>
  );
};
