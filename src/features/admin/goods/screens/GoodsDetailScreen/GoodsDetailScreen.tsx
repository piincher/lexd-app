import React, { useMemo } from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '@src/constants/Theme';
import { useGoodsDetailScreen } from './hooks/useGoodsDetailScreen';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { GoodsDetailHeader } from './components/GoodsDetailHeader';
import { QRCard } from './components/QRCard';
import { GoodsPhotoSection } from './components/GoodsPhotoSection';
import { DescriptionCard } from './components/DescriptionCard';
import { ClientCard } from './components/ClientCard';
import { GoodsDetailProperties } from './components/GoodsDetailProperties';
import { LocationCard } from './components/LocationCard';
import { GoodsDetailTimeline } from './components/GoodsDetailTimeline';
import { GoodsDetailFinancial } from './components/GoodsDetailFinancial';
import { ReceptionCard } from './components/ReceptionCard';
import { ActionButtons } from './components/ActionButtons';
import { ExpressTrackingCard } from '../../components/ExpressTrackingCard';
import { GoodsDetailAssignDialog } from '../../components/GoodsDetailAssignDialog';
import { createStyles } from './GoodsDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { normalizePhotos } from '@src/shared/lib';

export const GoodsDetailScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { state, loading, dialogs, containers, airwayBills, mutations, actions } = useGoodsDetailScreen();
  const { goods, client, container, hasQRCode, isAirShipping } = state;
  const { isLoading, isRefetching, refetch } = loading;
  const { menuVisible, assignDialogVisible, selectedContainerId, setMenuVisible, setAssignDialogVisible, setSelectedContainerId } = dialogs;
  const { isAssigning } = mutations;

  if (isLoading) return <LoadingState />;
  if (!goods) return <ErrorState />;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <GoodsDetailHeader
        goods={goods}
        container={container}
        hasContainers={containers.hasContainers}
        hasAirwayBills={airwayBills.hasAirwayBills}
        menuVisible={menuVisible}
        onMenuToggle={setMenuVisible}
        onStatusUpdate={actions.handleStatusUpdate}
        onAssignPress={actions.handleAssignPress}
        onUnassignPress={actions.handleUnassignFromAirwayBill}
        canUnassign={state.canUnassignFromAwb}
        onDelete={actions.handleDelete}
        onBack={actions.handleGoBack}
      />
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={Theme.primary[500]} />}
      >
        <QRCard
          hasQRCode={hasQRCode}
          qrCodeImageUrl={goods.qrCodeImageUrl}
          goodsId={goods.goodsId}
          onShare={actions.handleShareQR}
        />
        <GoodsPhotoSection photoUrls={normalizePhotos(goods)} goodsId={goods.goodsId} />
        <DescriptionCard description={goods.description} />
        {goods.expressTrackingNumber ? (
          <ExpressTrackingCard trackingNumber={goods.expressTrackingNumber} />
        ) : null}
        <ClientCard client={client} />
        <GoodsDetailProperties goods={goods} />
        <LocationCard warehouseLocation={goods.warehouseLocation} container={container} airwayBill={goods?.airwayBillId} />
        <GoodsDetailTimeline status={goods.status} shippingMode={goods.shippingMode} />
        <GoodsDetailFinancial goods={goods} />
        <ReceptionCard receivedAt={goods.receivedAt} receivedByName={goods.receivedByName} receivedBy={goods.receivedBy} formatDate={actions.formatDate} />
        <ActionButtons onEdit={actions.handleNavigateToEdit} onDelete={actions.handleDelete} />
        <View style={styles.bottomSpacer} />
      </ScrollView>
      <GoodsDetailAssignDialog
        isAirShipping={isAirShipping}
        visible={assignDialogVisible}
        containers={containers.containers}
        selectedContainerId={selectedContainerId}
        airwayBills={airwayBills.airwayBills}
        selectedAirwayBillId={dialogs.selectedAirwayBillId}
        isAssigning={isAssigning}
        onSelectContainer={setSelectedContainerId}
        onSelectAirwayBill={dialogs.setSelectedAirwayBillId}
        onDismiss={() => setAssignDialogVisible(false)}
        onAssignContainer={actions.handleAssignToContainer}
        onAssignAirwayBill={actions.handleAssignToAirwayBill}
      />
    </SafeAreaView>
  );
};

export default GoodsDetailScreen;
