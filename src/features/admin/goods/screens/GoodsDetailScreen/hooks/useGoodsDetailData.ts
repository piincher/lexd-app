import { useRoute } from '@react-navigation/native';
import {
  useGetGoodsById,
  useDeleteGoods,
  useUpdateGoodsStatus,
  useAssignGoodsToContainer,
} from '../../../hooks/useGoods';
import { useGetAllContainers } from '@src/features/admin/containers/hooks/useContainers';
import {
  useGetAllAirwayBills,
  useAssignGoodsToAirwayBill,
  useRemoveGoodsFromAirwayBill,
} from '@src/features/admin/airwayBills/hooks/useAirwayBills';

export const useGoodsDetailData = () => {
  const route = useRoute();
  const { goodsId } = route.params as { goodsId: string };

  const { data, isPending, isFetching, refetch } = useGetGoodsById(goodsId);
  const deleteMutation = useDeleteGoods();
  const updateStatusMutation = useUpdateGoodsStatus();

  const goods = data?.data?.goods || data?.data;
  const isAirShipping = goods?.shippingMode === 'AIR';

  const { data: containersData } = useGetAllContainers(
    { status: ['BOOKED', 'LOADING'] },
    { enabled: !isAirShipping },
  );
  const assignContainerMutation = useAssignGoodsToContainer();
  const containers = Array.isArray(containersData?.data)
    ? containersData?.data
    : containersData?.data?.containers || [];

  const { data: airwayBillsData } = useGetAllAirwayBills(
    { status: 'CREATED' },
    { enabled: isAirShipping },
  );
  const assignAirwayBillMutation = useAssignGoodsToAirwayBill();
  const airwayBills = airwayBillsData?.data?.airwayBills || [];

  const removeAirwayBillMutation = useRemoveGoodsFromAirwayBill();

  const client = goods && typeof goods.clientId === 'object' ? goods.clientId : null;
  const container = goods && typeof goods.containerId === 'object' ? goods.containerId : null;
  const airwayBill = goods && typeof goods.airwayBillId === 'object' ? goods.airwayBillId : null;

  const canUnassignFromAwb = airwayBill && ['CREATED', 'PACKING'].includes(airwayBill.status);
  const balanceDue = goods ? (goods.totalCost || 0) - (goods.amountPaid || 0) : 0;
  const hasQRCode = !!goods?.qrCodeImageUrl;

  return {
    goodsId,
    goods,
    client,
    container,
    airwayBill,
    isAirShipping,
    canUnassignFromAwb,
    balanceDue,
    hasQRCode,
    containers,
    hasContainers: containers.length > 0,
    airwayBills,
    hasAirwayBills: airwayBills.length > 0,
    isPending,
    isFetching,
    refetch,
    deleteMutation,
    updateStatusMutation,
    assignContainerMutation,
    assignAirwayBillMutation,
    removeAirwayBillMutation,
  };
};
