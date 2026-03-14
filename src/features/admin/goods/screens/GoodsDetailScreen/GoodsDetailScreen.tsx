import React from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '@src/constants/Theme';
import { useGoodsDetailScreen } from './hooks';
import {
  LoadingState, ErrorState, GoodsDetailHeader, QRCard, PhotoCard, DescriptionCard,
  ClientCard, PropertiesCard, LocationCard, FinancialCard, ReceptionCard,
  ActionButtons, AssignContainerDialog,
} from './components';
import { styles } from './GoodsDetailScreen.styles';

export const GoodsDetailScreen: React.FC = () => {
  const { state, loading, dialogs, containers, mutations, actions } = useGoodsDetailScreen();
  const { goods, client, container, balanceDue, hasQRCode } = state;
  const { isLoading, isRefetching } = loading;
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
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={() => {}} tintColor={Theme.primary[500]} />}
      >
        <QRCard
          hasQRCode={hasQRCode}
          qrCodeImageUrl={goods.qrCodeImageUrl}
          goodsId={goods.goodsId}
          onShare={actions.handleShareQR}
        />
        <PhotoCard photoUrl={goods.photos?.[0]} />
        <DescriptionCard description={goods.description} />
        <ClientCard client={client} />
        <PropertiesCard goods={goods} />
        <LocationCard goods={goods} container={container} />
        <FinancialCard
          goods={goods}
          balanceDue={balanceDue}
          getPaymentStatusColor={actions.getPaymentStatusColor}
          formatCurrency={actions.formatCurrency}
        />
        <ReceptionCard goods={goods} formatDate={actions.formatDate} />
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
