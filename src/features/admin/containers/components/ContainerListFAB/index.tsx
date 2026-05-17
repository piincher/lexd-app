import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface ContainerListFABProps {
  onPress: () => void;
}

export const ContainerListFAB: React.FC<ContainerListFABProps> = ({ onPress }) => {
  const { colors } = useAppTheme();
  return (
  <TouchableOpacity style={styles.fabContainer} onPress={onPress} activeOpacity={0.9}>
    <LinearGradient colors={Theme.gradients.primary} style={styles.fab} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <Ionicons name="add" size={28} color={colors.text.inverse} />
    </LinearGradient>
  </TouchableOpacity>
);
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    right: Theme.spacing.xl,
    bottom: Theme.spacing.xl,
    borderRadius: Theme.radius.full,
    ...Theme.shadows.xl,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: Theme.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
