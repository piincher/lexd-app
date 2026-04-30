import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useActiveOrderDetails } from './hooks/useActiveOrderDetails';
import { ActiveOrderHeader, ActiveOrderHeaderCard, ActiveOrderStats, ActiveOrderInfo, ActiveOrderRouteTimeline, ActiveOrderActions } from '../components';
import { styles } from './ActiveOrderDetails.styles';

const ActiveOrderDetails = ({
  route: navRoute,
  navigation,
}: RootStackScreenProps<'ActiveOrderDetails'>) => {
  const { colors } = useAppTheme();
  const {
    item,
    isLoading,
    refetch,
    Status,
    isDelivered,
    isAir,
    orderPrice,
    selectedCheckboxes,
    note,
    actualLocation,
    pickerValue,
    isPending,
    updateDeliver,
    handleStepChange,
    updateTransiteStatus,
    handleCheckboxPress,
  } = useActiveOrderDetails(navRoute.params.id);

  const handleViewGoods = () => {
    (navigation as any).navigate('OrderDetailWithGoods', { orderId: navRoute.params.id });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ActiveOrderHeader
        title={item?.code || 'Commande'}
        onBack={() => navigation.goBack()}
        rightAction={
          <NotificationBell
            onPress={() => navigation.navigate('Notifications' as never)}
            size={22}
            color="#1A1A2E"
          />
        }
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor={colors.primary.main} />
        }
      >
        <ActiveOrderHeaderCard
          clientName={item?.clientName}
          clientPhone={item?.clientPhone}
          status={item?.status}
          isDelivered={isDelivered}
          isAir={isAir}
          orderPrice={orderPrice}
        />
        <ActiveOrderStats
          quantity={item?.quantity}
          packageWeight={item?.packageWeight}
          packageCBM={item?.packageCBM}
        />
        <ActiveOrderInfo item={item} note={note} />
        <ActiveOrderRouteTimeline
          routeData={Status}
          selectedCheckboxes={selectedCheckboxes}
          pickerValue={pickerValue}
          actualLocation={actualLocation}
          onStepChange={handleStepChange}
          onCheckboxPress={handleCheckboxPress}
        />
        <ActiveOrderActions
          isDelivered={isDelivered}
          isPending={isPending}
          onUpdateTransiteStatus={updateTransiteStatus}
          onUpdateDeliver={updateDeliver}
          onViewGoods={handleViewGoods}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActiveOrderDetails;
