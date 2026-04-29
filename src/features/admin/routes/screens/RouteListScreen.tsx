/**
 * RouteListScreen - Dashboard for route management
 * Phase 3: Route Management System with visual statistics
 */

import React from 'react';
import { RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Snackbar } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { useRouteList } from '../hooks/useRouteList';
import { Route } from '../types';
import { RouteListHeader } from '../components/RouteListHeader';
import { RouteFilters } from '../components/RouteFilters';
import { RouteCard } from '../components/RouteCard';
import { RouteListLoading } from '../components/RouteListLoading';
import { RouteListError } from '../components/RouteListError';
import { RouteListEmpty } from '../components/RouteListEmpty';
import { RouteListFab } from '../components/RouteListFab';
import { styles } from './RouteListScreen.styles';

export const RouteListScreen: React.FC = () => {
  const {
    routes,
    stats,
    selectedMode,
    setSelectedMode,
    isLoading,
    isRefetching,
    error,
    errorMessage,
    setErrorMessage,
    handleRoutePress,
    handleCreateRoute,
    handleRefresh,
  } = useRouteList();

  const renderRoute = ({ item }: { item: Route }) => (
    <RouteCard route={item} onPress={() => handleRoutePress(item._id)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <RouteListHeader stats={stats} />
      <RouteFilters selectedMode={selectedMode} onSelectMode={setSelectedMode} />
      {isLoading ? (
        <RouteListLoading />
      ) : error ? (
        <RouteListError onRetry={handleRefresh} />
      ) : (
        <FlashList
          data={routes}
          keyExtractor={(item) => item._id}
          renderItem={renderRoute}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={handleRefresh}
              tintColor={Theme.primary[500]}
            />
          }
          ListEmptyComponent={
            <RouteListEmpty
              selectedMode={selectedMode}
              onCreateRoute={handleCreateRoute}
            />
          }
        />
      )}
      <RouteListFab onPress={handleCreateRoute} />
      <Snackbar
        visible={!!errorMessage}
        onDismiss={() => setErrorMessage(null)}
        action={{ label: 'Réessayer', onPress: handleRefresh }}
        style={styles.snackbar}
      >
        {errorMessage}
      </Snackbar>
    </SafeAreaView>
  );
};

export default RouteListScreen;
