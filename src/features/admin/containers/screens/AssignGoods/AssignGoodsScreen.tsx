/**
 * AssignGoodsScreen - Screen to assign unassigned goods to a container
 * Phase 2 Container System
 */
import React from 'react';
import { RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAssignGoodsScreen } from './hooks/useAssignGoodsScreen';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { SelectAllBar } from './components/SelectAllBar';
import { GoodsListItem } from './components/GoodsListItem';
import { EmptyState } from './components/EmptyState';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { BottomActionBar } from './components/BottomActionBar';
import { styles } from './AssignGoodsScreen.styles';
import { ContainerStatus } from '../../types';
import { Theme } from '@src/constants/Theme';

export const AssignGoodsScreen: React.FC = () => {
  const {
    container, filteredGoods, selectedGoods, searchQuery,
    isLoading, isRefetching, error, isAssignable,
    currentContainerCBM, totalSelectedCBM, isOverCapacity,
    isAirContainer, maxCapacity,
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
        isAirContainer={isAirContainer}
        maxCapacity={maxCapacity}
        onBack={() => navigation.goBack()}
      />
      <SearchBar searchQuery={searchQuery} onChangeText={setSearchQuery} />
      <SelectAllBar
        selectedCount={selectedGoods.length}
        totalCount={filteredGoods.length}
        onToggleSelectAll={toggleSelectAll}
      />
      <FlashList
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
        isAir={isAirContainer}
        onAssign={handleAssign}
      />
    </SafeAreaView>
  );
};

export default AssignGoodsScreen;
