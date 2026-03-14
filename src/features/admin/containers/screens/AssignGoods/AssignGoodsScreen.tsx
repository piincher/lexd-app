/**
 * AssignGoodsScreen - Screen to assign unassigned goods to a container
 * Phase 2 Container System
 */
import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAssignGoodsScreen } from './hooks/index';
import {
  Header, SearchBar, SelectAllBar, GoodsListItem,
  EmptyState, LoadingState, ErrorState, BottomActionBar,
} from './components/index';
import { styles } from './AssignGoodsScreen.styles';
import { ContainerStatus } from '../../types';
import { Theme } from '@src/constants/Theme';

export const AssignGoodsScreen: React.FC = () => {
  const {
    container, filteredGoods, selectedGoods, searchQuery,
    isLoading, isRefetching, error, isAssignable,
    currentContainerCBM, totalSelectedCBM, isOverCapacity,
    assignMutation, toggleSelection, toggleSelectAll,
    handleAssign, handleRefresh, setSearchQuery, navigation,
  } = useAssignGoodsScreen();

  if (isLoading) {
    return <LoadingState onBack={() => navigation.goBack()} />;
  }

  if (error) {
    return <ErrorState onBack={() => navigation.goBack()} onRetry={handleRefresh} />;
  }

  const containerStatus = container?.status as ContainerStatus;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        container={container}
        currentContainerCBM={currentContainerCBM}
        totalSelectedCBM={totalSelectedCBM}
        isAssignable={isAssignable}
        containerStatus={containerStatus}
        onBack={() => navigation.goBack()}
      />
      <SearchBar searchQuery={searchQuery} onChangeText={setSearchQuery} />
      <SelectAllBar
        selectedCount={selectedGoods.length}
        totalCount={filteredGoods.length}
        onToggleSelectAll={toggleSelectAll}
      />
      <FlatList
        data={filteredGoods}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <GoodsListItem
            goods={item}
            isSelected={selectedGoods.includes(item._id)}
            onToggle={() => toggleSelection(item._id)}
            index={index}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} tintColor={Theme.primary[500]} />
        }
        ListEmptyComponent={<EmptyState searchQuery={searchQuery} />}
      />
      <BottomActionBar
        selectedCount={selectedGoods.length}
        totalSelectedCBM={totalSelectedCBM}
        isOverCapacity={isOverCapacity}
        isAssignable={isAssignable}
        isPending={assignMutation.isPending}
        onAssign={handleAssign}
      />
    </SafeAreaView>
  );
};

export default AssignGoodsScreen;
