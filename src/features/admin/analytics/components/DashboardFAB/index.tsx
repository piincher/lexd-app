import React from 'react';
import { FAB, useTheme } from 'react-native-paper';
import { styles } from './DashboardFAB.styles';

interface DashboardFABProps {
  onPress: () => void;
}

export const DashboardFAB: React.FC<DashboardFABProps> = ({ onPress }) => {
  const theme = useTheme();

  return (
    <FAB
      icon="chart-bar"
      style={[styles.fab, { backgroundColor: theme.colors.primary }]}
      onPress={onPress}
      label="Rapports"
    />
  );
};
