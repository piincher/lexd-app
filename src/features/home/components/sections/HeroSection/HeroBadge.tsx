import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './HeroSection.styles';

export const HeroBadge: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.badge}>
      <View style={styles.pulseDot} />
      <FontAwesome6 name="truck-fast" size={12} color={colors.primary.light} />
      <Text style={styles.badgeText}>Route Chine - Mali</Text>
    </View>
  );
};
