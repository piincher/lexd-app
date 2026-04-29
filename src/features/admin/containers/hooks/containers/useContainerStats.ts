/**
 * Container Stats Hook
 */
import { Container } from '../../types';
import { useGetAllContainers } from './useContainerList';

export const useContainerStats = () => {
  const { data: allContainers } = useGetAllContainers();

  const responseData = allContainers?.data;
  const containers: Container[] = Array.isArray(responseData)
    ? responseData
    : responseData?.containers || [];

  return {
    total: containers?.length || 0,
    booked:
      containers?.filter((c: Container) => c.status === 'BOOKED').length || 0,
    loading:
      containers?.filter((c: Container) => c.status === 'LOADING').length || 0,
    loaded:
      containers?.filter((c: Container) => c.status === 'LOADED').length || 0,
    inTransit:
      containers?.filter((c: Container) => c.status === 'IN_TRANSIT').length ||
      0,
    arrived:
      containers?.filter((c: Container) => c.status === 'ARRIVED').length || 0,
    sea:
      containers?.filter((c: Container) => c.shippingMode === 'SEA').length ||
      0,
    air:
      containers?.filter((c: Container) => c.shippingMode === 'AIR').length ||
      0,
    readyForPickup:
      containers?.filter((c: Container) => c.status === 'READY_FOR_PICKUP')
        .length || 0,
  };
};
