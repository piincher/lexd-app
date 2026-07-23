import React from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGoodsDetailScreenUI } from './hooks/useGoodsDetailScreenUI';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { GoodsDetailHeader } from './components/GoodsDetailHeader';
import { GoodsDetailSummary } from './components/GoodsDetailSummary';
import { PackageLabelsCard } from './components/PackageLabelsCard';
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
import { AssignClientDialog } from './components/AssignClientDialog';
import { createStyles } from './GoodsDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { normalizePhotos } from '@src/shared/lib';

export const GoodsDetailScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const { state, loading, dialogs, containers, airwayBills, mutations, actions, handlers } = useGoodsDetailScreenUI();
  const { goods, client, container, airwayBill, hasQRCode, isAirShipping, isOwnerUnidentified } = state;
  const { isLoading, isRefetching, refetch } = loading;
  const { menuVisible, assignDialogVisible, selectedContainerId, isCorrection, setIsCorrection, setMenuVisible, setSelectedContainerId } = dialogs;
  const { isAssigning, isAssigningClient, isResendingNotification } = mutations;

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
        onUnassignContainerPress={actions.handleUnassignFromContainer}
        canUnassignFromContainer={state.canUnassignFromContainer}
        onDelete={actions.handleDelete}
        onBack={actions.handleGoBack}
        onAssignClientPress={actions.handleOpenAssignClient}
        isOwnerUnidentified={isOwnerUnidentified}
        onResendNotification={actions.handleResendNotification}
        isResendingNotification={isResendingNotification}
      />
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.primary.main} />}
      >
        {/* Narrative Workflow IA: the lifecycle journey rail is the spine, then payment status,
            then cost composition, specs, parties/places — reference (photos/QR) last. */}
        <GoodsDetailTimeline status={goods.status} shippingMode={goods.shippingMode} />
        <GoodsDetailSummary goods={goods} />
        <GoodsDetailFinancial goods={goods} />
        <GoodsDetailProperties goods={goods} />
        <LocationCard
          warehouseLocation={goods.warehouseLocation}
          container={container}
          airwayBill={airwayBill}
          isAirShipping={isAirShipping}
          onNavigateToContainer={actions.handleNavigateToContainer}
        />
        <ClientCard
          client={client}
          onAssignClient={isOwnerUnidentified ? actions.handleOpenAssignClient : undefined}
        />
        {goods.expressTrackingNumber ? (
          <ExpressTrackingCard trackingNumber={goods.expressTrackingNumber} />
        ) : null}
        <ReceptionCard receivedAt={goods.receivedAt} receivedByName={goods.receivedByName} receivedBy={goods.receivedBy} formatDate={actions.formatDate} />
        <DescriptionCard description={goods.description} />
        <GoodsPhotoSection photoUrls={normalizePhotos(goods)} goodsId={goods.goodsId} />
        <PackageLabelsCard goods={goods} />
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
        isCorrection={isCorrection}
        onToggleCorrection={() => setIsCorrection((v: boolean) => !v)}
        onSelectContainer={setSelectedContainerId}
        onSelectAirwayBill={dialogs.setSelectedAirwayBillId}
        onDismiss={handlers.handleDismissAssignDialog}
        onAssignContainer={actions.handleAssignToContainer}
        onAssignAirwayBill={actions.handleAssignToAirwayBill}
      />
      <AssignClientDialog
        visible={dialogs.assignClientDialogVisible}
        selectedClient={dialogs.selectedOwnerClient}
        notes={dialogs.ownerAssignmentNotes}
        isAssigning={isAssigningClient}
        onSelectClient={dialogs.setSelectedOwnerClient}
        onChangeNotes={dialogs.setOwnerAssignmentNotes}
        onDismiss={actions.handleDismissAssignClient}
        onConfirm={actions.handleAssignClient}
      />
    </SafeAreaView>
  );
};

export default GoodsDetailScreen;
