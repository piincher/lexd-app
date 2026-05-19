import { useAppTheme } from '@src/providers/ThemeProvider';
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';

interface WaypointCurrentIndicatorProps {
  styles: any;
  colors: any;
}

export const WaypointCurrentIndicator: React.FC<WaypointCurrentIndicatorProps> = ({ styles, colors }) => (
  <View style={styles.currentIndicator}>
    <LinearGradient colors={[colors.status.info, colors.status.info]} style={styles.currentGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
      <Ionicons name="navigate" size={12} color={colors.text.inverse} />
      <Text style={styles.currentText}>Votre container est ici</Text>
    </LinearGradient>
  </View>
);
