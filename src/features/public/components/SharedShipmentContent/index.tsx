import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  SharedShipmentData,
  SharedShipmentGoods,
  SharedShipmentContainer,
  SharedShipmentOrder,
} from '../../api/shareApi';
import { SharedShipmentStatusCard } from '../../screens/SharedShipmentScreen/components/SharedShipmentStatusCard';
import { SharedShipmentDetails } from '../../screens/SharedShipmentScreen/components/SharedShipmentDetails';
import { SharedShipmentTimeline } from '../../screens/SharedShipmentScreen/components/SharedShipmentTimeline';
import { SharedShipmentCTA } from '../../screens/SharedShipmentScreen/components/SharedShipmentCTA';

interface SharedShipmentContentProps {
  data: SharedShipmentData;
  token: string;
}

export const SharedShipmentContent: React.FC<SharedShipmentContentProps> = ({ data, token }) => {
  const reference =
    (data.data as SharedShipmentGoods).goodsId ||
    (data.data as SharedShipmentContainer).containerNumber ||
    (data.data as SharedShipmentOrder).orderId ||
    token;

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <SharedShipmentStatusCard
        reference={reference}
        status={data.currentStatus}
        type={data.type}
      />

      <SharedShipmentDetails
        type={data.type}
        data={data.data}
        estimatedDelivery={data.estimatedDelivery}
      />

      <SharedShipmentTimeline timeline={data.timeline} />

      <SharedShipmentCTA url={`https://chinalinkexpress.com/s/${token}`} reference={reference} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
});
