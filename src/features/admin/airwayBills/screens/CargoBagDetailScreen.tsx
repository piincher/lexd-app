/**
 * CargoBagDetailScreen - Detail view of a cargo bag with assigned goods
 */

import React from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useCargoBagDetail } from '../hooks/useCargoBagDetail';
import { CargoBagDetailSkeleton } from './components/CargoBagDetailSkeleton';
import { CargoBagDetailHeader } from './components/CargoBagDetailHeader';
import { CargoBagDetailInfoCard } from './components/CargoBagDetailInfoCard';
import { CargoBagDetailGoodsList } from './components/CargoBagDetailGoodsList';
import { CargoBagDetailFooter } from './components/CargoBagDetailFooter';
import { AirwayBillWaypointTimeline } from './components/AirwayBillWaypointTimeline';
import { styles } from './CargoBagDetailScreen.styles';

export const CargoBagDetailScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const {
    cargoBag, waypointPayload, goodsList, isLoading, isRefreshing, handleRefresh, handleBack,
    statusMenuVisible, setStatusMenuVisible, handleChangeStatus, removeMode,
    selectedRemoveIds, handleToggleRemoveMode, handleToggleRemoveSelection,
    handleConfirmRemove, handleAddGoods, handleDeleteBag, isRemoving, isUpdatingStatus,
  } = useCargoBagDetail();

  if (isLoading || !cargoBag) {
    return <CargoBagDetailSkeleton onBack={handleBack} />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]} edges={['bottom']}>
      <CargoBagDetailHeader
        cargoBag={cargoBag}
        removeMode={removeMode}
        onToggleRemoveMode={handleToggleRemoveMode}
        isEmpty={goodsList.length === 0}
        statusMenuVisible={statusMenuVisible}
        onStatusMenuVisibleChange={setStatusMenuVisible}
        onChangeStatus={handleChangeStatus}
        onDeleteBag={handleDeleteBag}
        isUpdatingStatus={isUpdatingStatus}
        onBack={handleBack}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor={colors.primary.main} />
        }
      >
        <CargoBagDetailInfoCard cargoBag={cargoBag} />
        <AirwayBillWaypointTimeline
          waypoints={waypointPayload?.waypoints || cargoBag.waypoints || []}
          currentWaypointIndex={waypointPayload?.currentWaypointIndex ?? cargoBag.currentWaypointIndex ?? -1}
          progressPercentage={waypointPayload?.progressPercentage ?? cargoBag.waypointProgressPercentage ?? 0}
        />
        <CargoBagDetailGoodsList
          goodsList={goodsList}
          removeMode={removeMode}
          selectedRemoveIds={selectedRemoveIds}
          onToggleSelection={handleToggleRemoveSelection}
          onAddGoods={handleAddGoods}
        />
        <View style={styles.spacer} />
      </ScrollView>
      <CargoBagDetailFooter
        removeMode={removeMode}
        selectedCount={selectedRemoveIds.length}
        onConfirmRemove={handleConfirmRemove}
        onAddGoods={handleAddGoods}
        onToggleRemoveMode={handleToggleRemoveMode}
        isRemoving={isRemoving}
        isEmpty={goodsList.length === 0}
      />
    </SafeAreaView>
  );
};

export default CargoBagDetailScreen;
