import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { styles } from './DashboardSkeleton.styles';

export const DashboardSkeleton: React.FC = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <View
            key={i}
            style={[
              styles.card,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
          />
        ))}
      </View>
      <View style={[styles.chart, { backgroundColor: theme.colors.surfaceVariant }]} />
      <View style={[styles.list, { backgroundColor: theme.colors.surfaceVariant }]} />
    </View>
  );
};
