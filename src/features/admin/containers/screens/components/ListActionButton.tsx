import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from '../ContainerDetailScreen.styles';

interface ListActionButtonProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  subtitle: string;
  iconBackgroundColor: string;
  iconColor: string;
  titleColor: string;
  chevronColor: string;
  gradientColors: readonly [string, string] | string[];
  borderColor?: string;
  style?: any;
  onPress: () => void;
}

export const ListActionButton: React.FC<ListActionButtonProps> = ({
  icon,
  title,
  subtitle,
  iconBackgroundColor,
  iconColor,
  titleColor,
  chevronColor,
  gradientColors,
  borderColor,
  style,
  onPress,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity
      style={[styles.listButton, style, borderColor ? { borderColor } : undefined]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={gradientColors as [string, string]}
        style={styles.listButtonGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={[styles.listButtonIcon, { backgroundColor: iconBackgroundColor }]}>
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>
        <View style={styles.listButtonTextContainer}>
          <Text style={[styles.listButtonTitle, { color: titleColor }]}>{title}</Text>
          <Text style={styles.listButtonSubtitle}>{subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={chevronColor} />
      </LinearGradient>
    </TouchableOpacity>
  );
};
