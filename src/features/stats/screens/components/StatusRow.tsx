import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStatusRowStyles } from './StatusRow.styles';

interface StatusRowProps {
  label: string;
  count: number;
  total: number;
  color: string;
  icon: string;
  index: number;
}

export const StatusRow: React.FC<StatusRowProps> = ({ label, count, total, color, icon, index }) => {
  const { colors } = useAppTheme();
  const styles = createStatusRowStyles(colors);
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 60).springify().damping(15)}
      style={styles.row}
    >
      <View style={styles.rowHeader}>
        <View style={styles.rowLeft}>
          <View style={[styles.statusDot, { backgroundColor: color }]}>
            <Ionicons name={icon as any} size={11} color={colors.text.inverse} />
          </View>
          <Text style={[styles.statusLabel, { color: colors.text.primary }]}>{label}</Text>
        </View>
        <View style={styles.rowRight}>
          <Text style={[styles.statusCount, { color: colors.text.primary }]}>{count}</Text>
          <Text style={[styles.statusPercentage, { color: colors.text.secondary }]}>{percentage.toFixed(0)}%</Text>
        </View>
      </View>
      <View style={[styles.barBg, { backgroundColor: colors.border }]}>
        <View style={[styles.barFill, { width: `${Math.max(percentage, 2)}%`, backgroundColor: color }]} />
      </View>
    </Animated.View>
  );
};
