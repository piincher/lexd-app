import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from '../ContainerDetailScreen.styles';

interface GradientActionButtonProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  colors: readonly [string, string] | string[];
  onPress: () => void;
}

export const GradientActionButton: React.FC<GradientActionButtonProps> = ({
  icon,
  label,
  colors: gradientColors,
  onPress,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress} activeOpacity={0.9}>
      <LinearGradient
        colors={gradientColors as [string, string]}
        style={styles.actionGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Ionicons name={icon} size={20} color={colors.text.inverse} />
        <Text style={styles.actionButtonText}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
