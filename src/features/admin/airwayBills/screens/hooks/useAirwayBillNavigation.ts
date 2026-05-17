import { useCallback } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@src/navigations/type';

export const useAirwayBillNavigation = (
  navigation: NativeStackNavigationProp<RootStackParamList>
) => {
  const handleCardPress = useCallback(
    (id: string) => {
      navigation.navigate('AirwayBillDetail', { airwayBillId: id });
    },
    [navigation]
  );

  const handleCreatePress = useCallback(() => {
    navigation.navigate('CreateAirwayBill');
  }, [navigation]);

  return { handleCardPress, handleCreatePress };
};
