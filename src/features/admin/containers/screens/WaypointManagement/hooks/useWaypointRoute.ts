import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteTemplate } from '../../../types';

type AdminV2StackParamList = {
  ContainerList: undefined;
  ContainerDetail: { containerId: string };
  WaypointManagement: { containerId: string; containerNumber: string };
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

const MOCK_ROUTE_TEMPLATES: RouteTemplate[] = [
  { id: 'template-1', name: 'Shanghai → Lomé (Standard)', description: 'Route maritime classique via Singapour', waypoints: [{ location: 'Shanghai Port', locationCode: 'CNSHA', type: 'PORT' }, { location: 'Singapore Port', locationCode: 'SGSIN', type: 'PORT' }, { location: 'Lomé Port', locationCode: 'TGLFW', type: 'PORT' }], seaSegments: [{ fromPort: 'CNSHA', toPort: 'SGSIN', carrier: 'MSC' }, { fromPort: 'SGSIN', toPort: 'TGLFW', carrier: 'MSC' }] },
  { id: 'template-2', name: 'Shanghai → Bamako (Multi-modal)', description: "Route maritime + terrestre jusqu'à Bamako", waypoints: [{ location: 'Shanghai Port', locationCode: 'CNSHA', type: 'PORT' }, { location: 'Lomé Port', locationCode: 'TGLFW', type: 'PORT' }, { location: 'Border Togo-Benin', locationCode: 'TGBJN', type: 'BORDER' }, { location: 'Bamako Warehouse', locationCode: 'MLBKO', type: 'WAREHOUSE' }], seaSegments: [{ fromPort: 'CNSHA', toPort: 'TGLFW', carrier: 'MSC' }], roadSegments: [{ fromLocation: 'TGLFW', toLocation: 'MLBKO', carrier: 'Local' }] },
];

export const useWaypointRoute = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const { containerId, containerNumber } = route.params as { containerId: string; containerNumber: string };

  return { containerId, containerNumber, navigation, routeTemplates: MOCK_ROUTE_TEMPLATES };
};
