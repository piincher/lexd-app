import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Goods } from '../api';
import { ContainerTrackingCard } from './ContainerTrackingCard';
import { AirwayBillTrackingCard } from './AirwayBillTrackingCard';

interface GoodsDetailContainerProps {
  goods: Goods;
}

export const GoodsDetailContainer: React.FC<GoodsDetailContainerProps> = ({ goods }) => {
  const navigation = useNavigation<any>();

  const handleNavigateToContainer = () => {
    if (goods.containerId?._id) {
      navigation.navigate('ContainerTracking', { containerId: goods.containerId._id });
    }
  };

  const handleNavigateToAirwayBill = () => {
    if (goods.airwayBillId?._id) {
      navigation.navigate('AirwayBillTracking', { airwayBillId: goods.airwayBillId._id });
    }
  };

  if (!goods.containerId && !goods.airwayBillId) return null;

  return (
    <>
      {goods.containerId && (
        <ContainerTrackingCard
          containerId={goods.containerId}
          onPress={handleNavigateToContainer}
        />
      )}
      {goods.airwayBillId && (
        <AirwayBillTrackingCard
          airwayBillId={goods.airwayBillId}
          onPress={handleNavigateToAirwayBill}
        />
      )}
    </>
  );
};
