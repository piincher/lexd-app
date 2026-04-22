import React, { useMemo } from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
import { GoodsDetailFinancial } from './components/GoodsDetailFinancial';
import { GoodsDetailTimeline } from './components/GoodsDetailTimeline';
import { ReceptionCard } from './components/ReceptionCard';
import { ActionButtons } from './components/ActionButtons';
import { AssignContainerDialog } from './components/AssignContainerDialog';
import { AssignAirwayBillDialog } from './components/AssignAirwayBillDialog';
import { createStyles } from './GoodsDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const GoodsDetailScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { state, loading, dialogs, containers, airwayBills, mutations, actions } = useGoodsDetailScreen();
  const { goods, client, container, hasQRCode } = state;
  const { isLoading, isRefetching, refetch } = loading;
  const { menuVisible, assignDialogVisible, selectedContainerId, setMenuVisible, setAssignDialogVisible, setSelectedContainerId } = dialogs;
  const { isAssigning } = mutations;
  const isAirShipping = goods?.shippingMode === 'AIR';

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
        <GoodsPhotoSection photoUrls={goods.photos?.length ? goods.photos : (goods.images || [])} goodsId={goods.goodsId} />
        <DescriptionCard description={goods.description} />
        {goods.expressTrackingNumber ? (
          <Card style={styles.sectionCard}>
            <Card.Content>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="truck-fast" size={20} color={Theme.primary[600]} />
                <Text style={styles.sectionTitle}>N° de suivi express</Text>
              </View>
              <Text style={styles.trackingNumber}>{goods.expressTrackingNumber}</Text>
            </Card.Content>
          </Card>
        ) : null}
        <ClientCard client={client} />
        <GoodsDetailProperties goods={goods} />
        <LocationCard warehouseLocation={goods.warehouseLocation} container={container} airwayBill={goods?.airwayBillId} />
        <GoodsDetailTimeline status={goods.status} shippingMode={goods.shippingMode} />
        <GoodsDetailFinancial goods={goods} />
        <ReceptionCard receivedAt={goods.receivedAt} receivedByName={goods.receivedByName} receivedBy={goods.receivedBy} formatDate={actions.formatDate} />
        <ActionButtons onEdit={actions.handleNavigateToEdit} onDelete={actions.handleDelete} />
        <View style={{ height: 40 }} />
      </ScrollView>
      {isAirShipping ? (
        <AssignAirwayBillDialog
          visible={assignDialogVisible}
          airwayBills={airwayBills.airwayBills}
          selectedAirwayBillId={dialogs.selectedAirwayBillId}
          isAssigning={isAssigning}
          onSelect={dialogs.setSelectedAirwayBillId}
          onDismiss={() => setAssignDialogVisible(false)}
          onConfirm={actions.handleAssignToAirwayBill}
        />
      ) : (
        <AssignContainerDialog
          visible={assignDialogVisible}
          containers={containers.containers}
          selectedContainerId={selectedContainerId}
          isAssigning={isAssigning}
          onSelect={setSelectedContainerId}
          onDismiss={() => setAssignDialogVisible(false)}
          onConfirm={actions.handleAssignToContainer}
        />
      )}
    </SafeAreaView>
  );
};

export default GoodsDetailScreen;
