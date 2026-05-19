/**
 * ContainerListScreen - Dashboard for container management
 * Phase 2: Container System with visual statistics
 */

import React from 'react';
import { SafeAreaView } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useContainerListScreen } from '../hooks/useContainerListScreen';
import { ContainerListHeader } from '../components/ContainerListHeader';
import { ContainerStatusFilter } from '../components/ContainerStatusFilter';
import { ContainerListContent } from '../components/ContainerListContent';
import { ContainerListFAB } from '../components/ContainerListFAB';
import { createStyles } from './ContainerListScreen.styles';

export const ContainerListScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const {
    selectedStatus,
    setSelectedStatus,
    errorMessage,
    dismissError,
    isLoading,
    isRefetching,
    error,
    filteredContainers,
    stats,
    handleContainerPress,
    handleCreateContainerPress,
    handleRefresh,
  } = useContainerListScreen();

  return (
    <SafeAreaView style={styles.container}>
      <ContainerListHeader stats={stats} />
      <ContainerStatusFilter
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
      />
      <ContainerListContent
        isLoading={isLoading}
        isRefetching={isRefetching}
        error={error}
        filteredContainers={filteredContainers}
        selectedStatus={selectedStatus}
        onRefresh={handleRefresh}
        onContainerPress={handleContainerPress}
        onCreateContainerPress={handleCreateContainerPress}
      />
      <ContainerListFAB onPress={handleCreateContainerPress} />
      <Snackbar
        visible={!!errorMessage}
        onDismiss={dismissError}
        action={{ label: 'Réessayer', onPress: handleRefresh }}
        style={styles.snackbar}
      >
        {errorMessage}
      </Snackbar>
    </SafeAreaView>
  );
};

export default ContainerListScreen;
