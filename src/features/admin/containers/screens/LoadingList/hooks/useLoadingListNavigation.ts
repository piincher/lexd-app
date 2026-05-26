import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AdminV2StackParamList = {
  ContainerDetail: { containerId: string };
  PackingList: { containerId: string; initialClientId?: string; clientId?: string; autoPrint?: boolean };
  LoadingList: { containerId: string; initialClientId?: string; clientId?: string; autoPrint?: boolean };
};

export type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

export const useLoadingListNavigation = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const params = route.params as AdminV2StackParamList['LoadingList'] | undefined;

  return {
    containerId: params?.containerId || '',
    initialClientId: params?.initialClientId || params?.clientId || null,
    navigation,
  };
};
