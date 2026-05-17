import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Container } from '../../../types';
import { Goods } from '../../../../goods/types';

type AdminV2StackParamList = {
  ContainerList: undefined;
  ContainerDetail: { containerId: string };
  AssignGoods: { containerId: string };
};

export type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

export interface UseAssignGoodsScreenReturn {
  containerId: string;
  container?: Container;
  unassignedGoods: Goods[];
  selectedGoods: string[];
  searchQuery: string;
  isLoading: boolean;
  isRefetching: boolean;
  error: any;
  isAssignable: boolean;
  filteredGoods: Goods[];
  currentContainerCBM: number;
  totalSelectedCBM: number;
  isOverCapacity: boolean;
  isAirContainer: boolean;
  maxCapacity: number;
  assignMutation: any;
  toggleSelection: (goodsId: string) => void;
  toggleSelectAll: () => void;
  handleAssign: () => Promise<void>;
  handleRefresh: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  navigation: NavigationProp;
}
