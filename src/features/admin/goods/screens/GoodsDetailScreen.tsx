import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGoodsDetailScreen } from './GoodsDetailScreen/hooks/useGoodsDetailScreen';
import {
  LoadingState,
  ErrorState as EmptyState,
  GoodsDetailHeader as Header,
  QRCard,
  PhotoCard,
  DescriptionCard,
  ClientCard,
  PropertiesCard,
  LocationCard,
  FinancialCard,
  ReceptionCard,
  ActionButtons,
  AssignContainerDialog as AssignDialog,
} from './GoodsDetailScreen/components';
import { styles } from './GoodsDetailScreen/GoodsDetailScreen.styles';

export const GoodsDetailScreen: React.FC = () => {
  const {
    goods,
    isLoading,
    client,
    container,
    balanceDue,
    menuVisible,
    setMenuVisible,
    assignDialogVisible,
    setAssignDialogVisible,
    selectedContainerId,
    setSelectedContainerId,
    containers,
    hasContainers,
    assignMutation,
    navigation,
    handleDelete,
    handleStatusUpdate,
    handleAssignPress,
    handleAssignToContainer,
    handleShareQR,
    getPaymentStatusColor,
    formatDate,
    formatCurrency,
  } = useGoodsDetailScreen();

  if (isLoading) {
    return <LoadingState />;
  }

  if (!goods) {
    return <EmptyState />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        goods={goods}
        container={container}
        hasContainers={hasContainers}
        menuVisible={menuVisible}
        onMenuToggle={setMenuVisible}
        onBack={() => navigation.goBack()}
        onAssignPress={handleAssignPress}
        onStatusUpdate={handleStatusUpdate}
        onDelete={handleDelete}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <QRCard
          hasQRCode={!!goods.qrCodeImageUrl}
          qrCodeImageUrl={goods.qrCodeImageUrl}
          goodsId={goods.goodsId}
          onShare={handleShareQR}
        />

        <PhotoCard photoUrl={goods.photos?.[0]} />

        <DescriptionCard description={goods.description} />

        <ClientCard client={client} />

        <PropertiesCard
          actualCBM={goods.actualCBM}
          weight={goods.weight}
          quantity={goods.quantity}
          dimensions={goods.dimensions}
        />

        <LocationCard
          warehouseLocation={goods.warehouseLocation}
          container={container}
        />

        <FinancialCard
          unitPrice={goods.unitPrice}
          totalCost={goods.totalCost}
          amountPaid={goods.amountPaid}
          balanceDue={balanceDue}
          paymentStatus={goods.paymentStatus}
          getPaymentStatusColor={getPaymentStatusColor}
          formatCurrency={formatCurrency}
        />

        <ReceptionCard
          receivedAt={goods.receivedAt}
          receivedByName={goods.receivedByName}
          formatDate={formatDate}
        />

        <ActionButtons
          onEdit={() => navigation.navigate('AdminGoodsList' as never)}
          onDelete={handleDelete}
        />

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <AssignDialog
        visible={assignDialogVisible}
        containers={containers}
        selectedContainerId={selectedContainerId}
        onSelect={setSelectedContainerId}
        onDismiss={() => setAssignDialogVisible(false)}
        onConfirm={handleAssignToContainer}
        isAssigning={assignMutation.isPending}
      />
    </SafeAreaView>
  );
};

export default GoodsDetailScreen;
