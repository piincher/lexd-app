import React from 'react';
import { ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { AirwayBillSkeleton } from './components';
import { useAirwayBillDetailScreen } from './hooks';
import {
  AirwayBillDetailHeader,
  AirwayBillStatusMenu,
  AirwayBillInfoCard,
  AirwayBillTimeline,
  AirwayBillStatsRow,
  AirwayBillGoodsList,
  AirwayBillDetailActions,
  CargoBagList,
  CargoBagCreateDialog,
} from './components';

export const AirwayBillDetailScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const {
    airwayBill, isLoading, goodsList,
    flightLabel, routeLabel, consignee,
    nextStatuses, menuVisible, statusLabels, statusColors,
    handleStatusChange, handleDelete, handleBack, openMenu, closeMenu,
    handleAssignPress, airwayBillId, isUpdatingStatus,
    cargoBags, isLoadingCargoBags,
    createBagVisible, setCreateBagVisible,
    handleCreateBag, isCreatingBag,
    handleBagPress,
    handleRefreshCargoBags,
    isRefreshingCargoBags,
  } = useAirwayBillDetailScreen();

  if (isLoading || !airwayBill) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.default }}>
        <AirwayBillSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.default }} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 60 }}
        refreshControl={
          <RefreshControl refreshing={isRefreshingCargoBags} onRefresh={handleRefreshCargoBags} tintColor={colors.primary.main} />
        }
      >
        <AirwayBillDetailHeader onBack={handleBack} title="Détail AWB">
          <AirwayBillStatusMenu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                <Ionicons name="ellipsis-vertical" size={24} color={colors.neutral[800]} />
              </TouchableOpacity>
            }
            nextStatuses={nextStatuses}
            statusLabels={statusLabels}
            statusColors={statusColors}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            disabled={isUpdatingStatus}
          />
        </AirwayBillDetailHeader>
        <AirwayBillInfoCard airwayBill={airwayBill} flightLabel={flightLabel} routeLabel={routeLabel} consignee={consignee} />
        <AirwayBillTimeline currentStatus={airwayBill.status} statusLabels={statusLabels} statusColors={statusColors} />
        <AirwayBillStatsRow totalPackages={airwayBill.totalPackages} totalWeight={airwayBill.totalWeight} />
        <CargoBagList
          cargoBags={cargoBags}
          onBagPress={handleBagPress}
          onCreatePress={() => setCreateBagVisible(true)}
          loading={isLoadingCargoBags}
          refreshing={isRefreshingCargoBags}
          onRefresh={handleRefreshCargoBags}
        />
        <AirwayBillGoodsList goodsList={goodsList} cargoBags={cargoBags} airwayBillId={airwayBillId} onAssignPress={handleAssignPress} />
        <AirwayBillDetailActions hasGoods={goodsList.length > 0} onAssignPress={handleAssignPress} />
      </ScrollView>
      <CargoBagCreateDialog
        visible={createBagVisible}
        awbId={airwayBillId}
        onDismiss={() => setCreateBagVisible(false)}
        onSubmit={(_, notes) => handleCreateBag(notes)}
        loading={isCreatingBag}
      />
    </SafeAreaView>
  );
};

export default AirwayBillDetailScreen;
