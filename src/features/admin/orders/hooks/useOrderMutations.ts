import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import {
  batchUpdate,
  deleteImage,
  editOrder,
  getOrderBasedOnDate,
  getOrdersBetweenDate,
  placeOrder,
  updateOrder,
  updateOrderToDelivered,
} from '@src/api/order';
import {
  recordPayment,
  syncOrderStatuses,
} from '@src/api/payment';
import { queryKey, ORDERKEY } from '@src/constants/queryKey';

export const usePlaceOrder = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: placeOrder, onSuccess: () => qc.invalidateQueries({ queryKey: [queryKey.ORDERKEY] }) });
};

export const useEditOrder = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: editOrder, onSuccess: () => qc.invalidateQueries({ queryKey: [queryKey.ORDERKEY] }) });
};

export const useMutateBetweenDate = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: getOrdersBetweenDate, onSuccess: () => qc.invalidateQueries({ queryKey: [queryKey.ORDERKEY] }) });
};

export const useDeleteImage = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: deleteImage, onSuccess: () => qc.invalidateQueries({ queryKey: [queryKey.ORDERKEY] }) });
};

export const useUpdateOrder = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: updateOrder, onSuccess: () => qc.invalidateQueries({ queryKey: [queryKey.ORDERKEY] }) });
};

export const useUpdateOrderStatus = () => {
  const qc = useQueryClient();
  const navigation = useNavigation();
  return useMutation({
    mutationFn: batchUpdate,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });
      navigation.navigate('HomeTab', { screen: 'Home' });
    },
  });
};

export const useUpdateStatusDelivery = (id: string) => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: updateOrderToDelivered, onSuccess: () => qc.invalidateQueries({ queryKey: [ORDERKEY, id] }) });
};

export const useGetOrderBaseonDate = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: getOrderBasedOnDate, onSuccess: () => qc.invalidateQueries({ queryKey: [queryKey.ORDERKEY] }) });
};

export const useRecordPayment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: recordPayment,
    onSuccess: (data) => {
      // Admin-side invalidation
      qc.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });
      qc.invalidateQueries({ queryKey: ['order', data.order._id] });
      qc.invalidateQueries({ queryKey: ['goods'] });
      // Customer-side invalidation: goods, balance, payment history, dashboard
      qc.invalidateQueries({ queryKey: ['my-goods'] });
      qc.invalidateQueries({ queryKey: ['goods', data.order._id] });
      qc.invalidateQueries({ queryKey: ['BALANCE'] });
      qc.invalidateQueries({ queryKey: ['payments', 'history'] });
      qc.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error) => console.error('[useRecordPayment] Error:', error),
  });
};

export const useSyncOrderStatuses = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: syncOrderStatuses,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });
      qc.invalidateQueries({ queryKey: ['order'] });
    },
  });
};
