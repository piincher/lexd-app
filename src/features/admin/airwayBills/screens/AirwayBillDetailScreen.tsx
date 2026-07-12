import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useAirwayBillDetailScreen } from './hooks';
import { styles } from './AirwayBillDetailScreen.styles';
import { AirwayBillSkeleton, CargoBagCreateDialog } from './components';
import { AirwayBillDetailBody } from '../components/AirwayBillDetailBody';

export const AirwayBillDetailScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const {
    airwayBill, waypointPayload, isLoading, goodsList,
    flightLabel, routeLabel, consignee,
    nextStatuses, menuVisible, menuKey, statusLabels, statusColors,
    handleStatusChange, handleWaypointStatusChange, handleDelete, handleBack, openMenu, closeMenu,
    handleAssignPress, airwayBillId, isUpdatingStatus,
    cargoBags, isLoadingCargoBags,
    createBagVisible, setCreateBagVisible,
    handleCreateBag, isCreatingBag,
    handleBagPress,
    handleRefreshCargoBags,
    isRefreshingCargoBags,
    goodsManifest,
    isLoadingGoodsManifest,
    goodsManifestError,
    handleDownloadGoodsManifest,
    isDownloadingGoodsManifest,
  } = useAirwayBillDetailScreen();

  if (isLoading || !airwayBill) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
        <AirwayBillSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={isRefreshingCargoBags} onRefresh={handleRefreshCargoBags} tintColor={colors.primary.main} />
        }
      >
        <AirwayBillDetailBody
          airwayBill={airwayBill}
          waypointPayload={waypointPayload}
          goodsList={goodsList}
          flightLabel={flightLabel}
          routeLabel={routeLabel}
          consignee={consignee}
          nextStatuses={nextStatuses}
          menuVisible={menuVisible}
          menuKey={menuKey}
          statusLabels={statusLabels}
          statusColors={statusColors}
          handleStatusChange={handleStatusChange}
          handleWaypointStatusChange={handleWaypointStatusChange}
          handleDelete={handleDelete}
          openMenu={openMenu}
          closeMenu={closeMenu}
          handleAssignPress={handleAssignPress}
          handleBack={handleBack}
          airwayBillId={airwayBillId}
          isUpdatingStatus={isUpdatingStatus}
          cargoBags={cargoBags}
          isLoadingCargoBags={isLoadingCargoBags}
          setCreateBagVisible={setCreateBagVisible}
          handleBagPress={handleBagPress}
          handleRefreshCargoBags={handleRefreshCargoBags}
          isRefreshingCargoBags={isRefreshingCargoBags}
          goodsManifest={goodsManifest}
          isLoadingGoodsManifest={isLoadingGoodsManifest}
          goodsManifestError={goodsManifestError}
          handleDownloadGoodsManifest={handleDownloadGoodsManifest}
          isDownloadingGoodsManifest={isDownloadingGoodsManifest}
        />
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
