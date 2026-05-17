import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@src/navigations/type';
import { AirwayBill } from '../../types';
import { AirwayBillCard } from '../components';
import { useAirwayBillListScreen } from './useAirwayBillListScreen';

export const useAirwayBillListScreenUI = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const screenData = useAirwayBillListScreen(navigation);

  const renderItem = useCallback(
    ({ item }: { item: AirwayBill }) => (
      <AirwayBillCard item={item} onPress={screenData.handlers.handleCardPress} />
    ),
    [screenData.handlers.handleCardPress]
  );

  return {
    ...screenData,
    handlers: {
      ...screenData.handlers,
      renderItem,
    },
  };
};
