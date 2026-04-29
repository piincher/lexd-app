/**
 * My Containers Screen
 * List view showing all containers where customer has goods
 */

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useMyContainersScreen } from '../hooks/useMyContainersScreen';
import { useMyContainersScreenStyles } from './MyContainersScreen.styles';
import {
  MyContainersHeader,
  MyContainersSearchBar,
  MyContainersFilterChips,
  MyContainersEmptyState,
  MyContainersErrorState,
  MyContainersList,
  ContainerListSkeleton,
} from '../components';

const MyContainersScreen: React.FC<RootStackScreenProps<'MyContainers'>> = ({
  navigation,
}) => {
  const styles = useMyContainersScreenStyles();
  const {
    filter,
    searchQuery,
    filteredContainers,
    isLoading,
    isError,
    error,
    isFetching,
    handlers,
  } = useMyContainersScreen(navigation);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <MyContainersHeader onBack={() => navigation.goBack()} />
        <ContainerListSkeleton />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <MyContainersHeader onBack={() => navigation.goBack()} />
        <MyContainersErrorState
          message={error?.message}
          onRetry={handlers.handleRefresh}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <MyContainersHeader
        onBack={() => navigation.goBack()}
        onRefresh={handlers.handleRefresh}
        refreshing={isFetching}
        showTitleStyle
      />
      <MyContainersSearchBar
        value={searchQuery}
        onChangeText={handlers.handleSearchChange}
      />
      <MyContainersFilterChips
        activeFilter={filter}
        onFilterChange={handlers.handleFilterChange}
      />
      {filteredContainers.length === 0 ? (
        <MyContainersEmptyState
          searchQuery={searchQuery}
          modeFilter={filter}
          onNavigateToGoods={() => navigation.navigate('MyGoods')}
        />
      ) : (
        <MyContainersList
          data={filteredContainers}
          refreshing={isFetching}
          onRefresh={handlers.handleRefresh}
          onContainerPress={handlers.handleContainerPress}
        />
      )}
    </SafeAreaView>
  );
};

export default MyContainersScreen;
