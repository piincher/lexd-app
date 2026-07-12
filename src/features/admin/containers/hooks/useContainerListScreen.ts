import { useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';
import { useGetAllContainers, containerQueryKeys } from './useContainers';
import {
  Container,
  ContainerArchiveMode,
  ContainerListResponse,
  ContainerStatus,
} from '../types';

type AdminV2StackParamList = {
  ContainerList: undefined;
  CreateContainer: undefined;
  ContainerDetail: { containerId: string };
  ContainerAnalytics: undefined;
  AssignGoods: { containerId: string };
};

type NavigationProp = NativeStackNavigationProp<AdminV2StackParamList>;

export const useContainerListScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<ContainerStatus | 'all'>('all');
  const [archiveMode, setArchiveMode] = useState<ContainerArchiveMode>('active');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const filters = {
    archive: archiveMode,
    ...(selectedStatus !== 'all' ? { status: selectedStatus } : {}),
  };

  const { data, isLoading, isRefetching, error, refetch } = useGetAllContainers(filters);

  const containers = useMemo(() => {
    const responseData = data?.data;
    const serverContainers: Container[] = Array.isArray(responseData)
      ? responseData
      : (responseData as ContainerListResponse | undefined)?.containers || [];
    return serverContainers.filter((container) => {
      if (archiveMode === 'archived') return container.archived === true;
      if (archiveMode === 'active') return container.archived !== true;
      return true;
    });
  }, [archiveMode, data?.data]);

  const stats = {
    total: containers?.length || 0,
    booked: containers?.filter((c: Container) => c.status === 'BOOKED').length || 0,
    loading: containers?.filter((c: Container) => c.status === 'LOADING').length || 0,
    loaded: containers?.filter((c: Container) => c.status === 'LOADED').length || 0,
    inTransit: containers?.filter((c: Container) => c.status === 'IN_TRANSIT').length || 0,
    arrived: containers?.filter((c: Container) => c.status === 'ARRIVED').length || 0,
    archived: containers?.filter((c: Container) => c.archived === true).length || 0,
  };

  const handleSelectArchiveMode = useCallback((mode: ContainerArchiveMode) => {
    setArchiveMode(mode);
    setSelectedStatus('all');
  }, []);

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
    archiveMode,
    setArchiveMode: handleSelectArchiveMode,
    errorMessage,
    dismissError,
    isLoading,
    isRefetching,
    error,
    filteredContainers: containers,
    stats,
    handleContainerPress,
    handleCreateContainerPress,
    handleOpenAnalytics,
    handleRefresh,
  };
};
