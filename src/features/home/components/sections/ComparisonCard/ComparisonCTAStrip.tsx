import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './ComparisonCard.styles';

export const ComparisonCTAStrip: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <LinearGradient
      colors={[colors.status.success, colors.primary.main]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.ctaStrip}
    >
      <FontAwesome6 name="trophy" size={14} color={colors.neutral.white} />
      <Text style={styles.ctaText}>Le choix #1 Chine → Mali</Text>
      <View style={styles.ctaScore}>
        <Text style={styles.ctaScoreText}>10/10</Text>
      </View>
    </LinearGradient>
  );
};
