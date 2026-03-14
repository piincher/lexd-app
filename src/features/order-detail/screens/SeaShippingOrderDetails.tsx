import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSeaShippingOrderDetails } from './SeaShippingOrderDetails/hooks/useSeaShippingOrderDetails';
import {
  LoadingState,
  ScreenHeader,
  PaymentCard,
  OrderImageCard,
  OrderDetailsList,
  StatusTimeline,
  PaymentSuccessModal,
} from './SeaShippingOrderDetails/components';
import { formatDate } from '@src/utils/formatDate';
import { COLORS } from '@src/constants/Colors';
import { styles } from './SeaShippingOrderDetails/SeaShippingOrderDetails.styles';

export const SeaShippingOrderDetails: React.FC = () => {
  const {
    item,
    isPending,
    statusData,
    balanceData,
    isBalanceSufficient,
    note,
    isPaying,
    showModal,
    fadeAnim,
    handleChat,
    handlePayment,
    handleCloseModal,
    getButtonColors,
    navigation,
  } = useSeaShippingOrderDetails();

  if (!statusData || isPending) {
    return <LoadingState />;
  }

  const formattedLastUpdate = formatDate(item?.updatedAt!);
  const formattedDepartureDate = formatDate(item?.departureDate!);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ScreenHeader navigation={navigation} />

        <View style={styles.contentContainer}>
          <PaymentCard
            priceTotal={item?.priceTotal}
            balance={balanceData?.balance}
            paymentStatus={item?.paymentStatus}
            isBalanceSufficient={isBalanceSufficient}
            isPaying={isPaying}
            onPayment={handlePayment}
            getButtonColors={getButtonColors}
          />

          <OrderImageCard
            imageUrl={item?.images?.[0]?.url}
            categoryName={item?.category?.name}
            packageType={item?.typeOfPackage}
            trackingCode={item?.code}
            onChat={handleChat}
          />

          <OrderDetailsList
            clientName={item?.clientName}
            priceTotal={item?.priceTotal}
            categoryName={item?.category?.name}
            packageType={item?.typeOfPackage}
            currentStatus={item?.currentStatus}
            lastUpdate={formattedLastUpdate}
            departureDate={formattedDepartureDate}
            note={note}
          />

          <StatusTimeline
            statusData={statusData}
            currentStatus={item?.currentStatus!}
            route={item?.route || []}
          />
        </View>

        <PaymentSuccessModal
          visible={showModal}
          fadeAnim={fadeAnim}
          priceTotal={item?.priceTotal}
          onClose={handleCloseModal}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeaShippingOrderDetails;
