import { useNavigation } from '@react-navigation/native';
import { useGoodsDetailData } from './useGoodsDetailData';
import { useGoodsDetailUI } from './useGoodsDetailUI';
import { useGoodsDetailAssignMutations } from './useGoodsDetailAssignMutations';
import { useGoodsDetailUnassignment } from './useGoodsDetailUnassignment';
import { useGoodsDetailAssignDialog } from './useGoodsDetailAssignDialog';
import { useGoodsDetailManagementActions } from './useGoodsDetailManagementActions';
import { useGoodsDetailFormatters } from './useGoodsDetailFormatters';
import { useGoodsDetailOwnerAssignment } from './useGoodsDetailOwnerAssignment';

export const useGoodsDetailScreen = () => {
  const navigation = useNavigation();
  const data = useGoodsDetailData();
  const ui = useGoodsDetailUI();
  const assignMutations = useGoodsDetailAssignMutations(data, ui);
  const unassignment = useGoodsDetailUnassignment(data);
  const assignDialog = useGoodsDetailAssignDialog(data, ui, navigation);
  const management = useGoodsDetailManagementActions(data, navigation);
  const formatters = useGoodsDetailFormatters(data.goods);
  const ownerAssignment = useGoodsDetailOwnerAssignment(
    {
      goods: data.goods,
      refetch: data.refetch,
      assignClientMutation: data.assignClientMutation,
    },
    {
      selectedOwnerClient: ui.selectedOwnerClient,
      setSelectedOwnerClient: ui.setSelectedOwnerClient,
      ownerAssignmentNotes: ui.ownerAssignmentNotes,
      setOwnerAssignmentNotes: ui.setOwnerAssignmentNotes,
      setAssignClientDialogVisible: ui.setAssignClientDialogVisible,
      setMenuVisible: ui.setMenuVisible,
    },
  );

  return {
    state: {
      goods: data.goods,
      client: data.client,
      container: data.container,
      airwayBill: data.airwayBill,
      balanceDue: data.balanceDue,
      hasQRCode: data.hasQRCode,
      canUnassignFromAwb: data.canUnassignFromAwb,
      isAirShipping: data.goods?.shippingMode === 'AIR',
      // True when the parcel was received without a known client (CLIENT_UNKNOWN exception),
      // OR the backend tagged it UNIDENTIFIED. Drives the "Assigner un client" entry points.
      isOwnerUnidentified:
        !!data.goods && (!data.goods.clientId || data.goods.ownerStatus === 'UNIDENTIFIED'),
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
      assignClientDialogVisible: ui.assignClientDialogVisible,
      setAssignClientDialogVisible: ui.setAssignClientDialogVisible,
      selectedOwnerClient: ui.selectedOwnerClient,
      setSelectedOwnerClient: ui.setSelectedOwnerClient,
      ownerAssignmentNotes: ui.ownerAssignmentNotes,
      setOwnerAssignmentNotes: ui.setOwnerAssignmentNotes,
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
      isAssigningClient: data.assignClientMutation.isPending,
      isResendingNotification: data.resendNotificationMutation.isPending,
    },
    actions: {
      ...assignMutations,
      ...unassignment,
      ...assignDialog,
      ...management,
      ...formatters,
      ...ownerAssignment,
    },
  };
};
