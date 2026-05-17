/**
 * GoodsListFAB - Floating Action Button
 * SRP: Add new goods button
 */

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface GoodsListFABProps {
  onPress: () => void;
}

export const GoodsListFAB: React.FC<GoodsListFABProps> = ({ onPress }) => {
  const { colors } = useAppTheme();
  return (
  <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
    <LinearGradient
      colors={Theme.gradients.primary}
      style={styles.button}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Ionicons name="add" size={28} color={colors.text.inverse} />
    </LinearGradient>
  </TouchableOpacity>
);}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: Theme.spacing.xl,
    bottom: Theme.spacing.xl,
    borderRadius: Theme.radius.full,
    ...Theme.shadows.xl,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: Theme.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
