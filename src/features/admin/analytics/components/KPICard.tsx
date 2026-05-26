import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { createStyles } from './KPICard.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  gradientColors: [string, string, string];
  trend?: {
    value: number;
    label: string;
  };
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtitle,
  icon,
  gradientColors,
  trend,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
  <LinearGradient
    colors={gradientColors}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.cardContainer}
  >
    <View style={styles.cardContent}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon} size={24} color={colors.text.inverse} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.value} numberOfLines={1}>{value}</Text>
        {subtitle && <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>}
        {trend && (
          <View style={styles.trendContainer}>
            <MaterialCommunityIcons name={trend.value >= 0 ? 'trending-up' : 'trending-down'} size={14} color={colors.text.inverse} />
            <Text style={styles.trendText}>{trend.value >= 0 ? '+' : ''}{trend.value.toFixed(1)}% {trend.label}</Text>
          </View>
        )}
      </View>
    </View>
  </LinearGradient>
  );
};
