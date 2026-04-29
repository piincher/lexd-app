import { useNavigation } from '@react-navigation/native';
import { useGoodsDetailData } from './useGoodsDetailData';
import { useGoodsDetailUI } from './useGoodsDetailUI';
import { useGoodsDetailAssignMutations } from './useGoodsDetailAssignMutations';
import { useGoodsDetailUnassignment } from './useGoodsDetailUnassignment';
import { useGoodsDetailAssignDialog } from './useGoodsDetailAssignDialog';
import { useGoodsDetailManagementActions } from './useGoodsDetailManagementActions';
import { useGoodsDetailFormatters } from './useGoodsDetailFormatters';

export const useGoodsDetailScreen = () => {
  const navigation = useNavigation();
  const data = useGoodsDetailData();
  const ui = useGoodsDetailUI();
  const assignMutations = useGoodsDetailAssignMutations(data, ui);
  const unassignment = useGoodsDetailUnassignment(data);
  const assignDialog = useGoodsDetailAssignDialog(data, ui, navigation);
  const management = useGoodsDetailManagementActions(data, navigation);
  const formatters = useGoodsDetailFormatters(data.goods);

  return {
    state: {
      goods: data.goods,
      client: data.client,
      container: data.container,
      balanceDue: data.balanceDue,
      hasQRCode: data.hasQRCode,
      canUnassignFromAwb: data.canUnassignFromAwb,
      isAirShipping: data.goods?.shippingMode === 'AIR',
    },
    loading: {
      isLoading: data.isPending,
      isRefetching: data.isFetching && !data.isPending,
      refetch: data.refetch,
    },
    dialogs: {
      menuVisible: ui.menuVisible,
      assignDialogVisible: ui.assignDialogVisible,
      selectedContainerId: ui.selectedContainerId,
      selectedAirwayBillId: ui.selectedAirwayBillId,
      setMenuVisible: ui.setMenuVisible,
      setAssignDialogVisible: ui.setAssignDialogVisible,
      setSelectedContainerId: ui.setSelectedContainerId,
      setSelectedAirwayBillId: ui.setSelectedAirwayBillId,
    },
    containers: {
      containers: data.containers,
      hasContainers: data.hasContainers,
    },
    airwayBills: {
      airwayBills: data.airwayBills,
      hasAirwayBills: data.hasAirwayBills,
    },
    mutations: {
      isAssigning: data.assignContainerMutation.isPending || data.assignAirwayBillMutation.isPending,
      isUnassigning: data.removeAirwayBillMutation.isPending,
    },
    actions: {
      ...assignMutations,
      ...unassignment,
      ...assignDialog,
      ...management,
      ...formatters,
    },
  };
};
