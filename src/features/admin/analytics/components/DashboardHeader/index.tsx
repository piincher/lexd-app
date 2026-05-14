import React from 'react';
import { Appbar } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './DashboardHeader.styles';

interface DashboardHeaderProps {
  autoRefresh: boolean;
  onToggleAutoRefresh: () => void;
  onRefresh: () => void;
  onExport: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  autoRefresh,
  onToggleAutoRefresh,
  onRefresh,
  onExport,
}) => {
  const { colors } = useAppTheme();
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Content
        title="Tableau de Bord"
        subtitle="Analytics & Business Intelligence"
      />
      <Appbar.Action
        icon={autoRefresh ? 'autorenew' : 'autorenew-off'}
        onPress={onToggleAutoRefresh}
        color={autoRefresh ? colors.status.success : undefined}
      />
      <Appbar.Action icon="refresh" onPress={onRefresh} />
      <Appbar.Action icon="export" onPress={onExport} />
    </Appbar.Header>
  );
};
