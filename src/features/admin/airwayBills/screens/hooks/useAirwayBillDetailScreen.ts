import { useAirwayBillDetailNavigation } from './detail/useAirwayBillDetailNavigation';
import { useAirwayBillDetailData } from './detail/useAirwayBillDetailData';
import { useAirwayBillDetailUI } from './detail/useAirwayBillDetailUI';
import { useAirwayBillDetailActions } from './detail/useAirwayBillDetailActions';
import { useAirwayBillDetailRefresh } from './detail/useAirwayBillDetailRefresh';
import { useCargoBagsData } from './detail/useCargoBagsData';
import { useCargoBagActions } from './detail/useCargoBagActions';

export const useAirwayBillDetailScreen = () => {
  const { navigation, airwayBillId } = useAirwayBillDetailNavigation();
  const {
    airwayBill,
    waypointPayload,
    isLoading,
    goodsList,
    flightLabel,
    routeLabel,
    consignee,
    nextStatuses,
    statusLabels,
    statusColors,
    refetchAwb,
    refetchWaypoints,
  } = useAirwayBillDetailData(airwayBillId);

  const {
    menuVisible,
    createBagVisible,
    setCreateBagVisible,
    openMenu,
    closeMenu,
  } = useAirwayBillDetailUI();

  const {
    cargoBags,
    isLoadingCargoBags,
    isRefreshingCargoBags,
    refetchCargoBags,
  } = useCargoBagsData(airwayBillId);

  const { handleRefreshCargoBags } = useAirwayBillDetailRefresh(refetchAwb, refetchWaypoints, refetchCargoBags);

  const {
    handleStatusChange,
    handleDelete,
    handleBack,
    handleAssignPress,
    isUpdatingStatus,
  } = useAirwayBillDetailActions(airwayBillId, navigation, closeMenu);

  const {
    handleCreateBag,
    handleBagStatusChange,
    handleAssignGoodsToBag,
    handleBagPress,
    isCreatingBag,
  } = useCargoBagActions(airwayBillId, navigation, setCreateBagVisible);

  return {
    airwayBill,
    waypointPayload,
    isLoading,
    goodsList,
    flightLabel,
    routeLabel,
    consignee,
    nextStatuses,
    menuVisible,
    statusLabels,
    statusColors,
    handleStatusChange,
    handleDelete,
    handleBack,
    openMenu,
    closeMenu,
    handleAssignPress,
    airwayBillId,
    isUpdatingStatus,
    cargoBags,
    isLoadingCargoBags,
    createBagVisible,
    setCreateBagVisible,
    handleCreateBag,
    handleBagStatusChange,
    handleAssignGoodsToBag,
    isCreatingBag,
    handleBagPress,
    handleRefreshCargoBags,
    isRefreshingCargoBags,
  };
};
