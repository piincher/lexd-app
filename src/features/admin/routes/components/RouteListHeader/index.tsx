/**
 * RouteListHeader - Header with gradient and stats
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { RouteStats } from '../RouteStats';
import { createStyles } from './RouteListHeader.styles';

interface RouteListHeaderProps {
  stats: {
    total: number;
    sea: number;
    air: number;
    active: number;
  };
}

export const RouteListHeader: React.FC<RouteListHeaderProps> = ({ stats }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <LinearGradient
      colors={Theme.gradients.glass}
      style={styles.header}
    >
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.headerGreeting}>Gestion</Text>
          <Text style={styles.headerTitle}>Routes</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="filter" size={24} color={colors.neutral[700]} />
        </TouchableOpacity>
      </View>

      <RouteStats stats={stats} />
    </LinearGradient>
  );
};

export default RouteListHeader;
