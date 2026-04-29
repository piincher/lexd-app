import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@src/navigations/type';

export const useAirwayBillDetailNavigation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'AirwayBillDetail'>>();
  const { airwayBillId } = route.params;

  return { navigation, route, airwayBillId };
};
