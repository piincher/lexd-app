import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';
import { useGetAllContainers, containerQueryKeys } from './useContainers';
import { Container, ContainerStatus } from '../types';

type AdminV2StackParamList = {
  ContainerList: undefined;
  CreateContainer: undefined;
  ContainerDetail: { containerId: string };
  ContainerAnalytics: undefined;
  AssignGoods: { containerId: string };
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

const ASSIGNABLE_STATUSES: ContainerStatus[] = ['BOOKED', 'EMPTY_TO_WAREHOUSE', 'LOADING'];
const canReceiveGoods = (status: ContainerStatus): boolean => ASSIGNABLE_STATUSES.includes(status);

export const useContainerListScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<ContainerStatus | 'all' | 'assignable'>('all');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const filters = selectedStatus === 'assignable'
    ? {}
    : selectedStatus !== 'all'
    ? { status: selectedStatus }
    : undefined;

  const { data, isLoading, isRefetching, error, refetch } = useGetAllContainers(filters);

  const responseData = data?.data;
  const containers: Container[] = Array.isArray(responseData)
    ? responseData
    : responseData?.containers || [];

  const filteredContainers = selectedStatus === 'assignable'
    ? containers.filter((c: Container) => canReceiveGoods(c.status))
    : containers;

  const stats = {
    total: containers?.length || 0,
    booked: containers?.filter((c: Container) => c.status === 'BOOKED').length || 0,
    loading: containers?.filter((c: Container) => c.status === 'LOADING').length || 0,
    loaded: containers?.filter((c: Container) => c.status === 'LOADED').length || 0,
    inTransit: containers?.filter((c: Container) => c.status === 'IN_TRANSIT').length || 0,
    arrived: containers?.filter((c: Container) => c.status === 'ARRIVED').length || 0,
    assignable: containers?.filter((c: Container) => canReceiveGoods(c.status)).length || 0,
  };

  const handleContainerPress = useCallback((containerId: string) => {
    navigation.navigate('ContainerDetail', { containerId });
  }, [navigation]);

  const handleCreateContainerPress = useCallback(() => {
    navigation.navigate('CreateContainer');
  }, [navigation]);

  const handleOpenAnalytics = useCallback(() => {
    navigation.navigate('ContainerAnalytics');
  }, [navigation]);

  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: containerQueryKeys.lists() });
    await refetch();
  }, [queryClient, refetch]);

  const dismissError = useCallback(() => setErrorMessage(null), []);

  return {
    selectedStatus,
    setSelectedStatus,
    errorMessage,
    dismissError,
    isLoading,
    isRefetching,
    error,
    filteredContainers,
    stats,
    handleContainerPress,
    handleCreateContainerPress,
    handleOpenAnalytics,
    handleRefresh,
  };
};
