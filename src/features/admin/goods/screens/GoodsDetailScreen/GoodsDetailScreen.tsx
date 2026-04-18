import React from 'react';
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
import { PhotoCard } from './components/PhotoCard';
import { DescriptionCard } from './components/DescriptionCard';
import { ClientCard } from './components/ClientCard';
import { PropertiesCard } from './components/PropertiesCard';
import { LocationCard } from './components/LocationCard';
import { FinancialCard } from './components/FinancialCard';
import { ReceptionCard } from './components/ReceptionCard';
import { ActionButtons } from './components/ActionButtons';
import { AssignContainerDialog } from './components/AssignContainerDialog';
import { styles } from './GoodsDetailScreen.styles';

export const GoodsDetailScreen: React.FC = () => {
  const { state, loading, dialogs, containers, mutations, actions } = useGoodsDetailScreen();
  const { goods, client, container, balanceDue, hasQRCode } = state;
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
        menuVisible={menuVisible}
        onMenuToggle={setMenuVisible}
        onStatusUpdate={actions.handleStatusUpdate}
        onAssignPress={actions.handleAssignPress}
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
        <PhotoCard photoUrls={goods.photos} />
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
        <PropertiesCard
          actualCBM={goods.actualCBM}
          weight={goods.weight}
          quantity={goods.quantity}
          dimensions={goods.dimensions}
        />
        <LocationCard warehouseLocation={goods.warehouseLocation} container={container} />
        <FinancialCard
          unitPrice={goods?.unitPrice || 0}
          totalCost={goods?.totalCost || 0}
          amountPaid={goods?.amountPaid || 0}
          balanceDue={balanceDue}
          paymentStatus={goods?.paymentStatus || 'UNPAID'}
          getPaymentStatusColor={actions.getPaymentStatusColor}
          formatCurrency={actions.formatCurrency}
        />
        <ReceptionCard receivedAt={goods.receivedAt} receivedByName={goods.receivedByName} receivedBy={goods.receivedBy} formatDate={actions.formatDate} />
        <ActionButtons onEdit={actions.handleNavigateToEdit} onDelete={actions.handleDelete} />
        <View style={{ height: 40 }} />
      </ScrollView>
      <AssignContainerDialog
        visible={assignDialogVisible}
        containers={containers.containers}
        selectedContainerId={selectedContainerId}
        isAssigning={isAssigning}
        onSelect={setSelectedContainerId}
        onDismiss={() => setAssignDialogVisible(false)}
        onConfirm={actions.handleAssignToContainer}
      />
    </SafeAreaView>
  );
};

export default GoodsDetailScreen;
