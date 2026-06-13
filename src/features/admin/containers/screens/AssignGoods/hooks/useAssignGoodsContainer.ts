import { useGetContainerById } from '../../../hooks';
import { Container, ContainerStatus } from '../../../types';

const MAX_CONTAINER_CBM = 67;
const MAX_CONTAINER_WEIGHT = 28000; // kg

// Statuses where assignment is part of the standard warehouse workflow.
// All other statuses still allow assignment (for corrections), but trigger
// a warning and are sent to the backend as isCorrection=true.
const STANDARD_ASSIGNABLE_STATUSES: ContainerStatus[] = ['BOOKED', 'EMPTY_TO_WAREHOUSE', 'LOADING'];

export const canReceiveGoods = (status: ContainerStatus): boolean =>
  // Container assignment is allowed at any status to support corrections.
  // The backend intentionally does not gate on container status.
  Boolean(status);

export const isLateAssignment = (status: ContainerStatus): boolean =>
  !STANDARD_ASSIGNABLE_STATUSES.includes(status);

export const useAssignGoodsContainer = (containerId: string) => {
  const {
    data: containerData,
    isLoading: isLoadingContainer,
    error: containerError,
  } = useGetContainerById(containerId);

  const container: Container | undefined =
    containerData?.data?.container || containerData?.data;
  const isAirContainer = container?.shippingMode === 'AIR';
  const containerStatus = container?.status as ContainerStatus;
  const isAssignable = canReceiveGoods(containerStatus);
  const isLateAssignmentStatus = isLateAssignment(containerStatus);

  const maxCapacity = isAirContainer ? MAX_CONTAINER_WEIGHT : MAX_CONTAINER_CBM;
  const currentContainerCBM = isAirContainer
    ? ((goodsList) =>
        goodsList.reduce(
          (sum: number, g: any) => sum + (parseFloat(g?.weight) || 0),
          0,
        ))(
        Array.isArray(container?.goodsIds) &&
          container.goodsIds.length > 0 &&
          typeof container.goodsIds[0] === 'object'
          ? container.goodsIds
          : container?.goods || [],
      )
    : container?.totalCBM || 0;

  return {
    container,
    isLoadingContainer,
    containerError,
    isAirContainer,
    containerStatus,
    isAssignable,
    isLateAssignment: isLateAssignmentStatus,
    maxCapacity,
    currentContainerCBM,
  };
};
