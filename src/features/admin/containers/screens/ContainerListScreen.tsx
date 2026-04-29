/**
 * ContainerListScreen - Dashboard for container management
 * Phase 2: Container System with visual statistics
 */

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useContainerListScreen } from '../hooks/useContainerListScreen';
import { ContainerListHeader } from '../components/ContainerListHeader';
import { ContainerStatusFilter } from '../components/ContainerStatusFilter';
import { ContainerListContent } from '../components/ContainerListContent';
import { ContainerListFAB } from '../components/ContainerListFAB';
import { Theme } from '@src/constants/Theme';

export const ContainerListScreen: React.FC = () => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.default,
  },
  snackbar: {
    backgroundColor: Theme.neutral[800],
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.lg,
  },
});

export default ContainerListScreen;
