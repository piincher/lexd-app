import { useMemo } from 'react';
import { useGetAllContainers } from '@src/features/admin/shared/hooks';

export const useGoodsBulkOptions = () => {
  const { data: containersData } = useGetAllContainers();
  const containers = useMemo(() => {
    const responseData = containersData?.data;
    return Array.isArray(responseData) ? responseData : responseData?.containers || [];
  }, [containersData]);

  const containerOptions = useMemo(() =>
    containers.map((c: any) => ({
      label: c.virtualContainerNumber || c.containerNumber || c._id,
      value: c._id,
    })),
  [containers]);

  const statusOptions = useMemo(() => [
    { label: 'Recu au depot', value: 'RECEIVED_AT_WAREHOUSE' },
    { label: 'Colis préparé', value: 'PACKED' },
    { label: 'Assigne au conteneur', value: 'ASSIGNED_TO_CONTAINER' },
    { label: 'Charge dans conteneur', value: 'LOADED_IN_CONTAINER' },
    { label: 'En transit', value: 'IN_TRANSIT' },
    { label: 'Arrive a destination', value: 'ARRIVED_DESTINATION' },
    { label: 'Pret pour retrait', value: 'READY_FOR_PICKUP' },
    { label: 'Livre', value: 'DELIVERED' },
  ], []);

  return { containers, containerOptions, statusOptions };
};
