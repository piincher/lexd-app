import { useAirwayBillDetailNavigation } from './detail/useAirwayBillDetailNavigation';
import { useAirwayBillDetailData } from './detail/useAirwayBillDetailData';
import { useAirwayBillDetailUI } from './detail/useAirwayBillDetailUI';
import { useAirwayBillDetailActions } from './detail/useAirwayBillDetailActions';
import { useAirwayBillDetailRefresh } from './detail/useAirwayBillDetailRefresh';
import { useCargoBagsData } from './detail/useCargoBagsData';
import { useCargoBagActions } from './detail/useCargoBagActions';
import { useAirwayBillDetailManifest } from './detail/useAirwayBillDetailManifest';

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

  const { menuVisible, menuKey, createBagVisible, setCreateBagVisible, openMenu, closeMenu } =
    useAirwayBillDetailUI();

  const {
    cargoBags,
    isLoadingCargoBags,
    isRefreshingCargoBags,
    refetchCargoBags,
  } = useCargoBagsData(airwayBillId);

  const manifestState = useAirwayBillDetailManifest(airwayBillId, airwayBill?.awbNumber);

  const { handleRefreshCargoBags } = useAirwayBillDetailRefresh(refetchAwb, refetchWaypoints, async () => {
    await Promise.all([refetchCargoBags(), manifestState.refetchGoodsManifest()]);
  });

  const {
    handleStatusChange,
    handleWaypointStatusChange,
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
    menuKey,
    statusLabels,
    statusColors,
    handleStatusChange,
    handleWaypointStatusChange,
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
    ...manifestState,
  };
};
