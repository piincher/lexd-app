import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AdminV2StackParamList = {
  ContainerDetail: { containerId: string };
  PackingList: { containerId: string };
  LoadingList: { containerId: string };
};

export type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

export const usePackingListParams = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const params = route.params as { containerId: string; clientId?: string } | undefined;
  const containerId = params?.containerId;
  const initialClientId = params?.clientId || null;

  return { containerId, initialClientId, navigation };
};
