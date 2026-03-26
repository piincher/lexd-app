import { useState, useMemo } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { useGetContainerById, useGetUnassignedGoods, useAssignGoodsToContainer, containerQueryKeys } from '../../../hooks';
import { Container, ContainerStatus, CONTAINER_STATUS_LABELS } from '../../../types';
import { Goods } from '../../../../goods/types';

type AdminV2StackParamList = { ContainerList: undefined; ContainerDetail: { containerId: string }; AssignGoods: { containerId: string }; };
type RouteParams = { containerId: string };
type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;
const MAX_CONTAINER_CBM = 67;
const MAX_CONTAINER_WEIGHT = 28000; // kg
const ASSIGNABLE_STATUSES: ContainerStatus[] = ['BOOKED', 'LOADING'];
const canReceiveGoods = (status: ContainerStatus): boolean => ASSIGNABLE_STATUSES.includes(status);

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

export const useAssignGoodsScreen = (): UseAssignGoodsScreenReturn => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const queryClient = useQueryClient();
  const { containerId } = route.params as RouteParams;
  const [selectedGoods, setSelectedGoods] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: containerData, isLoading: isLoadingContainer, error: containerError } = useGetContainerById(containerId);
  const container: Container | undefined = containerData?.data?.container || containerData?.data;
  const isAirContainer = container?.shippingMode === 'AIR';
  const { data: unassignedGoodsData, isLoading: isLoadingGoods, isRefetching, refetch, error: goodsError } = useGetUnassignedGoods(container?.shippingMode);
  const assignMutation = useAssignGoodsToContainer();
  const unassignedGoods: Goods[] = unassignedGoodsData?.data?.goods || unassignedGoodsData?.data || [];
  const containerStatus = container?.status as ContainerStatus;
  const isAssignable = canReceiveGoods(containerStatus);

  const filteredGoods = useMemo(() => {
    if (!searchQuery.trim()) return unassignedGoods;
    const query = searchQuery.toLowerCase();
    return unassignedGoods.filter((goods) => {
      const goodsIdMatch = goods.goodsId.toLowerCase().includes(query);
      const clientNameMatch = typeof goods.clientId === 'object' && goods.clientId &&
        (goods.clientId.firstName.toLowerCase().includes(query) || goods.clientId.lastName.toLowerCase().includes(query));
      return goodsIdMatch || clientNameMatch;
    });
  }, [searchQuery, unassignedGoods]);

  // For AIR containers, use weight (kg); for SEA, use CBM (m³)
  const maxCapacity = isAirContainer ? MAX_CONTAINER_WEIGHT : MAX_CONTAINER_CBM;
  const currentContainerCBM = isAirContainer
    ? (goodsList => goodsList.reduce((sum: number, g: any) => sum + (parseFloat(g?.weight) || 0), 0))(
        Array.isArray(container?.goodsIds) && container.goodsIds.length > 0 && typeof container.goodsIds[0] === 'object'
          ? container.goodsIds : container?.goods || []
      )
    : (container?.totalCBM || 0);
  const totalSelectedCBM = useMemo(() => selectedGoods.reduce((sum, id) => {
    const g = unassignedGoods.find((g) => g._id === id);
    return sum + (isAirContainer ? (parseFloat(String(g?.weight)) || 0) : (g?.actualCBM || 0));
  }, 0), [selectedGoods, unassignedGoods, isAirContainer]);
  const isOverCapacity = currentContainerCBM + totalSelectedCBM > maxCapacity;
  const toggleSelection = (goodsId: string) => setSelectedGoods((prev) => prev.includes(goodsId) ? prev.filter((id) => id !== goodsId) : [...prev, goodsId]);
  const toggleSelectAll = () => setSelectedGoods(selectedGoods.length === filteredGoods.length ? [] : filteredGoods.map((g) => g._id));



  
  const handleAssign = async () => {
    if (selectedGoods.length === 0) return;
    if (!isAssignable) return Alert.alert('Action impossible', `Ce container est en statut "${CONTAINER_STATUS_LABELS[containerStatus]}". Les marchandises ne peuvent être assignées qu'aux containers "Réservé" ou "En Chargement".`, [{ text: 'OK' }]);
    if (isOverCapacity) return Alert.alert('Capacité dépassée', 'La sélection dépasse la capacité du container. Veuillez désélectionner des articles.', [{ text: 'OK' }]);
    try {
      await assignMutation.mutateAsync({ containerId, data: { goodsIds: selectedGoods } });
      Alert.alert('Succès', `${selectedGoods.length} marchandise(s) assignée(s) au container`, [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (error: any) {
      Alert.alert('Erreur', error?.message || "Une erreur s'est produite lors de l'assignation.");
    }
  };

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: containerQueryKeys.unassignedGoods() });
    await refetch();
  };

  return {
    containerId, container, unassignedGoods, selectedGoods, searchQuery,
    isLoading: isLoadingContainer || isLoadingGoods, isRefetching, error: containerError || goodsError,
    isAssignable, filteredGoods, currentContainerCBM, totalSelectedCBM, isOverCapacity,
    isAirContainer, maxCapacity,
    assignMutation, toggleSelection, toggleSelectAll, handleAssign, handleRefresh, setSearchQuery, navigation,
  };
};
