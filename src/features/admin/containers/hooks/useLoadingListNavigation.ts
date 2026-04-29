import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AdminV2StackParamList = {
  ContainerDetail: { containerId: string };
  PackingList: { containerId: string };
  LoadingList: { containerId: string };
};

export type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

export const useLoadingListNavigation = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const params = route.params as { containerId: string; clientId?: string } | undefined;

  return {
    containerId: params?.containerId || '',
    initialClientId: params?.clientId || null,
    navigation,
  };
};
