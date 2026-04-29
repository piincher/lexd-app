import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGetRoute } from './useRoutes';

type AdminV2StackParamList = {
  RouteList: undefined;
  RouteForm: { routeId?: string };
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;
type RouteFormRouteProp = RouteProp<AdminV2StackParamList, 'RouteForm'>;

export const useRouteFormInit = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteFormRouteProp>();
  const routeId = route.params?.routeId;
  const isEditMode = !!routeId;

  const { data: routeData, isLoading: isLoadingRoute } = useGetRoute(routeId);

  return { navigation, routeId, isEditMode, isLoadingRoute, routeData };
};
